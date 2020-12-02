import 'react-native-get-random-values';
import apiService from './api';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export function initializeAppConfig(realmInstance) {
  realmInstance.write(() => {
    realmInstance.create(
      'Setting',
      {
        id: '0',
        lastSyncedAt: null,
      },
      true,
    );
  });
}

async function pullChanges(realmInstance) {
  const { lastSyncedAt } = realmInstance.objects('Setting')[0];

  const syncEndpoint = lastSyncedAt
    ? `/sync?lastSyncedAt=${lastSyncedAt.getTime()}`
    : `/sync`;

  const response = await apiService.get(syncEndpoint);
  const { events } = response.data;

  realmInstance.write(() => {
    events.created.forEach((event) => {
      realmInstance.create(
        'Event',
        {
          id: event.id,
          name: event.name,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
          created_at: new Date(event.created_at),
          updated_at: null,
          deleted_at: null,
        },
        true,
      );
    });

    events.updated.forEach((event) => {
      realmInstance.create(
        'Event',
        {
          id: event.id,
          name: event.name,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
          created_at: new Date(event.created_at),
          updated_at: new Date(event.updated_at),
          deleted_at: null,
        },
        true,
      );
    });

    events.deleted.forEach((event) => {
      realmInstance.create(
        'Event',
        {
          id: event.id,
          deleted_at: new Date(event.deleted_at),
        },
        true,
      );
    });
  });
}

async function pushChanges(realmInstance) {
  const { lastSyncedAt } = realmInstance.objects('Setting')[0];

  if (lastSyncedAt) {
    const lastSyncedAtPredicate = lastSyncedAt
      .toISOString()
      .split('Z')[0]
      .replace('T', '@')
      .split('.')[0];

    const createdObjectsSinceLastSync = realmInstance
      .objects('Event')
      .filtered(
        'created_at >= $0 AND updated_at == null AND deleted_at == null',
        lastSyncedAt,
      );

    const updatedObjectsSinceLastSync = realmInstance
      .objects('Event')
      .filtered('updated_at >= $0 AND deleted_at == null', lastSyncedAt);

    const deletedObjectsSinceLastSync = realmInstance
      .objects('Event')
      .filtered('deleted_at >= $0', lastSyncedAt);

    const eventData = {
      events: {
        created: createdObjectsSinceLastSync,
        updated: updatedObjectsSinceLastSync,
        deleted: deletedObjectsSinceLastSync,
      },
    };

    const response = await apiService.post('/sync', eventData);
  }

  realmInstance.write(() => {
    realmInstance.create(
      'Setting',
      {
        id: '0',
        lastSyncedAt: new Date(),
      },
      true,
    );
  });
}

export async function syncAppData(realmInstance) {
  const { isConnected } = await NetInfo.fetch();
  if (isConnected) {
    await pullChanges(realmInstance);
    await pushChanges(realmInstance);
  } else {
    Alert.alert('Dispositivo offline!');
  }
}
