import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, SectionList } from 'react-native';

import { getRealmInstance } from '../database';
import { syncAppData } from '../services/sync';
import { groupEventsByDate } from '../services/formatter';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const realmInstance = useRef(null);

  useEffect(() => {
    async function getEventList() {
      if (realmInstance.current === null) {
        realmInstance.current = await getRealmInstance();
      }

      const eventsFromRealm = realmInstance.current.objects('Event');
      eventsFromRealm.addListener(() => {
        console.log('------ Listener fired!', eventsFromRealm);
        setEvents([...eventsFromRealm]);
      });

      await syncAppData(realmInstance.current);
    }

    function cleanUp() {
      if (realmInstance.current) {
        realmInstance.current.close();
        realmInstance.current = null;
        setEvents([]);
      }
    }

    getEventList();
    return cleanUp;
  }, []);

  const formattedGroups = groupEventsByDate(events);

  return (
    <SafeAreaView>
      <SectionList
        sections={formattedGroups}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
    </SafeAreaView>
  );
}
