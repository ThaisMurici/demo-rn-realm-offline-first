import React from 'react';
import styled from 'styled-components/native';
import { SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FloatingAction } from 'react-native-floating-action';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ListTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 16px 8px;
  background-color: #01a699;
`;

export const StyledSectionList = styled(SectionList)``;

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

export const Button = styled.Button`
  width: 70%;
  background-color: #01a699;
  color: #fff;
`;
