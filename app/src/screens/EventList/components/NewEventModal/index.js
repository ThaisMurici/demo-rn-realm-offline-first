import React, { useState } from 'react';
import { Modal, Alert } from 'react-native';

import { createEvent } from '../../../../services/event';

import {
  Container,
  Title,
  TextInput,
  TextInputTitle,
  Button,
  ButtonText,
} from './styles';

export default function NewEventModal({
  modalVisible,
  setModalVisible,
  realmInstance,
}) {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <Container>
        <Title>Novo evento</Title>
        <TextInputTitle>Nome do evento</TextInputTitle>
        <TextInput
          style={{}}
          onChangeText={(text) => setEventName(text)}
          value={eventName}
        />
        <TextInputTitle>Início</TextInputTitle>
        <TextInput
          style={{}}
          onChangeText={(text) => setStartDate(text)}
          value={startDate}
        />
        <TextInputTitle>Fim</TextInputTitle>
        <TextInput
          style={{}}
          onChangeText={(text) => setEndDate(text)}
          value={endDate}
        />
        <Button
          onPress={async () => {
            createEvent(
              {
                name: eventName,
                start_date: startDate,
                end_date: endDate,
              },
              realmInstance,
            );
            setModalVisible(false);
            setEventName('');
            setStartDate('');
            setEndDate('');
          }}>
          <ButtonText>Criar evento</ButtonText>
        </Button>
        <Button
          light
          onPress={() => {
            setModalVisible(false);
            setEventName('');
            setStartDate('');
            setEndDate('');
          }}>
          <ButtonText light>Cancelar</ButtonText>
        </Button>
      </Container>
    </Modal>
  );
}
