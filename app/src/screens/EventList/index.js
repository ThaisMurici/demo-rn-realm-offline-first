import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { getRealmInstance } from '../../database';
import { createEvent, clearAllEventsFromDatabase } from '../../services/event';
import {
  groupEventsByDate,
  isoStringToReadableDateString,
} from '../../services/formatter';
import { initializeAppConfig } from '../../services/sync';

import NewEventModal from './components/NewEventModal';
import EventList from './components/EventList';

import {
  ListTitle,
  Container,
  Button,
  HeaderContainer,
  SyncText,
  ButtonText,
} from './styles';

export default function EventListScreen() {
  const [events, setEvents] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState(null);
  const realmInstance = useRef(null);

  useEffect(() => {
    // Todo 2 - Adicionar Listeners
    // Todo 3 - Inicializar App Config
    async function getEventList() {}

    function cleanUp() {}

    getEventList();
    return cleanUp;
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <ListTitle>Próximos Eventos</ListTitle>
        <SyncText>
          Última sincronização: {isoStringToReadableDateString(lastSyncDate)}
        </SyncText>
      </HeaderContainer>
      <EventList events={events} realmInstance={realmInstance.current} />
      <View>
        <Button onPress={() => setModalVisible(true)}>
          <ButtonText>Criar evento</ButtonText>
        </Button>
        <Button
          light
          onPress={() => clearAllEventsFromDatabase(realmInstance.current)}>
          <ButtonText light>Limpar dados</ButtonText>
        </Button>
        <NewEventModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          realmInstance={realmInstance.current}
        />
      </View>
    </Container>
  );
}
