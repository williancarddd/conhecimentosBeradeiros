import 'react-native-gesture-handler';


import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
    <StatusBar backgroundColor="#030C1A" barStyle="light-content" /> 
    <Routes />
   </>
  );
}