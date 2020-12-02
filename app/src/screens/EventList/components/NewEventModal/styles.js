import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: white;
  padding: 24px 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const TextInputTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput`
  height: 40px;
  border: 1px;
  margin-bottom: 24px;
`;

export const Button = styled.TouchableHighlight`
  padding: 8px 0px;
  background-color: ${(props) => (props.light ? 'transparent' : '#01a699')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => (props.light ? '#01a699' : '#ffffff')};
  font-size: 16px;
  font-weight: bold;
`;
