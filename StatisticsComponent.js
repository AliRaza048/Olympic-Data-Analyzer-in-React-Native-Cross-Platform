import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import jsonData from './dataset.json';

const StatisticsComponent = () => {
  const statistics = {
    editions: new Set(jsonData.map(item => item.Year)).size,
    cities: new Set(jsonData.map(item => item.City)).size,
    sports: new Set(jsonData.map(item => item.Sport)).size,
    events: new Set(jsonData.map(item => item.Event)).size,
    athletes: new Set(jsonData.map(item => item.Name)).size,
    nations: new Set(jsonData.map(item => item.region)).size,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Analysis</Text>
      {Object.entries(statistics).map(([key, value]) => (
        <Text style={styles.stats} key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stats: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default StatisticsComponent;
