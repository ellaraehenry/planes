import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import layout from './constants/Layout'
import WorkerProfiles from './components/WorkerProfiles';


export default function App() {
  return (
    <SafeAreaView style={layout.safeAreaContainer}>
      <StatusBar barStyle="dark-content" />
      <WorkerProfiles />
    </SafeAreaView>
  );
}
