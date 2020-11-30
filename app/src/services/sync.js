import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import apiService from './api';

async function pullChanges(realmInstance) {
  const response = await apiService.get('/events');
  const events = response.data;
  console.log('--- events from api', events);
  realmInstance.write(() => {
    events.forEach((event) => {
      realmInstance.create(
        'Event',
        {
          id: event.id,
          name: event.name,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
          created_at: new Date(event.created_at),
        },
        true,
      );
    });
  });
}

async function pushChanges() {}

export async function syncAppData(realmInstance) {
  try {
    console.log('--- Realm Path', realmInstance.path);
    await pullChanges(realmInstance);
  } catch (error) {
    console.log('--- ERROR', error.message);
  }

  // Check if online
  // If online
  // Call api and save data to realm
  // After saving data, send data to server
  // If not, trow Error
}
