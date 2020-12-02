import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { getRealmInstance } from '../../database';
import { createEvent, clearAllEventsFromDatabase } from '../../services/event';
import {
  groupEventsByDate,
  isoStringToReadableDateString,
} from '../../services/formatter';
import { initializeAppConfig, syncAppData } from '../../services/sync';

import NewEventModal from './components/NewEventModal';

import {
  ListTitle,
  FloatingButton,
  StyledSectionList,
  Container,
  Button,
} from './styles';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState(null);
  const realmInstance = useRef(null);

  useEffect(() => {
    async function getEventList() {
      if (realmInstance.current === null) {
        realmInstance.current = await getRealmInstance();
      }

      const eventsFromRealm = realmInstance.current
        .objects('Event')
        .sorted('created_at');

      eventsFromRealm.addListener(() => {
        setEvents([...eventsFromRealm]);
      });

      initializeAppConfig(realmInstance.current, setLastSyncDate);
      const appSetting = realmInstance.current.objects('Setting');
      appSetting.addListener((newAppSetting) => {
        console.tron.log('Listener!', newAppSetting);
        setLastSyncDate(newAppSetting[0].lastSyncedAt);
      });
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
    <Container>
      <ListTitle>Próximos Eventos</ListTitle>
      <Text>
        Última sincronização: {isoStringToReadableDateString(lastSyncDate)}
      </Text>
      <StyledSectionList
        sections={formattedGroups}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <View style={{ margin: 8 }}>
            <Text>{item.name}</Text>
            <Text>created_at: {item.created_at.toISOString()}</Text>

            {item.deleted_at && (
              <Text>deleted_at: {item.deleted_at.getTime()}</Text>
            )}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
        onRefresh={async () => {
          setLoading(true);
          await syncAppData(realmInstance.current);
          setLoading(false);
        }}
        refreshing={loading}
      />
      <Button
        title="Criar evento"
        onPress={async () =>
          createEvent(
            {
              name: 'Evento criado no app',
              start_date: '2020-11-30T21:09:12.307Z',
              end_date: '2020-11-30T21:09:12.307Z',
            },
            realmInstance.current,
          )
        }
      />
      <Button
        title="Limpar dados"
        onPress={() => clearAllEventsFromDatabase(realmInstance.current)}
      />

      {/* <NewEventModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
      {/* <FloatingButton
        actions={[]}
        onPressItem={async () =>
          createEvent(
            {
              name: 'Evento 13',
              start_date: '2020-11-30T21:09:12.307Z',
              end_date: '2020-11-30T21:09:12.307Z',
            },
            realmInstance.current,
          )
        }
      /> */}

      {/* <Button
        title="Criar evento"
        onPress={() =>
          createEvent(
            {
              name: 'Evento 5',
              start_date: '2020-11-29T21:09:12.307Z',
              end_date: '2020-11-29T21:09:12.307Z',
            },
            realmInstance.current,
          )
        }
      /> */}
    </Container>
  );
}
