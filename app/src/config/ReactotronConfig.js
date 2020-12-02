/** @format */

import Reactotron, { asyncStorage } from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.1.2' })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .use(asyncStorage())
    .connect();

  tron.clear();

  console.tron = tron;
}
