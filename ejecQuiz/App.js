import React, { useState } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Linking requires that you provide'
])

export default function App() {  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#343a40" />
      <Routes />
    </>
  );
};