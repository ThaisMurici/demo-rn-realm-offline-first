import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FloatingAction } from 'react-native-floating-action';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  background-color: #01a699;
  padding: 12px 8px;
`;

export const ListTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
`;

export const SyncText = styled.Text`
  color: #fff;
`;

export const StyledIcon = styled(Icon).attrs({
  name: 'add',
})`
  font-size: 24px;
  color: #fff;
`;

export const FloatingButton = styled(FloatingAction).attrs({
  color: '#01a699',
  distanceToEdge: 30,
  overrideWithAction: true,

  actions: [
    {
      text: 'New Event',
      name: 'new_event',
      position: 1,
      icon: <StyledIcon />,
    },
  ],
})``;

export const Button = styled.TouchableHighlight`
  margin: 8px 24px;
  padding: 8px 0px;
  background-color: ${(props) => (props.light ? 'transparent' : '#01a699')};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => (props.light ? '#01a699' : '#ffffff')};
  font-size: 16px;
  font-weight: bold;
`;
