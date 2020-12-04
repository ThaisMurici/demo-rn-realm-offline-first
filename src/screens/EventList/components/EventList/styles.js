import React from 'react';
import styled from 'styled-components/native';
import { SectionList } from 'react-native';

export const StyledSectionList = styled(SectionList)`
  padding: 0px 12px 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  margin-top: 16px;
`;

export const EventContainer = styled.View`
  margin: 8px;
  padding: 12px 8px;
  border-radius: 3px;
  border: 1px solid #808080;
`;

export const EventName = styled.Text`
  color: #333;
  text-decoration: ${(props) => (props.deleted ? 'line-through' : 'none')};
`;
