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

// Todo 4 - Implementar pullChanges
async function pullChanges(realmInstance) {}

// Todo 5 - Implementar pushChanges
async function pushChanges(realmInstance) {}

export async function syncAppData(realmInstance) {
  const { isConnected } = await NetInfo.fetch();
  if (isConnected) {
    // await pullChanges(realmInstance);
    // await pushChanges(realmInstance);
  } else {
    Alert.alert('Dispositivo offline!');
  }
}
