import 'react-native-get-random-values';
import apiService from './api';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

// Todo 4 - Inicializar App Config

// Todo 5 - implemntar pullChanges

// Todo 6 - implementar pushChanges

export async function syncAppData(realmInstance) {
  const { isConnected } = await NetInfo.fetch();
  if (isConnected) {
    // await pullChanges(realmInstance);
    // await pushChanges(realmInstance);
  } else {
    Alert.alert('Dispositivo offline!');
  }
}
