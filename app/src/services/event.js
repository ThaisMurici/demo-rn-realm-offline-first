import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import NetInfo from '@react-native-community/netinfo';
import apiService from './api';

export const createEvent = async (eventData, realmInstance) => {
  const { isConnected } = await NetInfo.fetch();

  const eventBody = {
    id: uuidv4(),
    name: eventData.name,
    start_date: new Date(eventData.start_date),
    end_date: new Date(eventData.end_date),
    created_at: new Date(),
    updated_at: null,
    deleted_at: null,
  };

  if (isConnected) {
    await apiService.post('/events', eventBody);
  }

  realmInstance.write(() => {
    realmInstance.create('Event', eventBody, true);
  });
};

export const clearAllEventsFromDatabase = (realmInstance) => {
  realmInstance.write(() => {
    const allEvents = realmInstance.objects('Event');
    realmInstance.delete(allEvents);

    realmInstance.create(
      'Setting',
      {
        id: '0',
        lastSyncedAt: null,
      },
      true,
    );
  });
};
