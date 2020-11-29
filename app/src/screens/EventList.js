import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

import { getRealmInstance } from '../database';
import { syncAppData } from '../services/sync';

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

  console.log('--- EventListScreen events', events);

  return (
    <View>
      <Text>Lista</Text>
      {events.map((event) => (
        <Text>{event.name}</Text>
      ))}
    </View>
  );
}
