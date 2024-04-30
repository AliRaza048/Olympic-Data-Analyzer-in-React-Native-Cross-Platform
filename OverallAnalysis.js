import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
import jsonData from './dataset.json';
import { dataOverTime } from './utils';
import Heatmap from './Heatmap';
import { processYourDataIntoHeatmapFormat } from './utils';

const OverallAnalysis = () => {
  const [chartData, setChartData] = useState({
    nations: [],
    events: [],
    athletes: [],
  });

  // Initial statistics
  const statistics = {
    editions: new Set(jsonData.map(item => item.Year)).size - 1,
    cities: new Set(jsonData.map(item => item.City)).size,
    sports: new Set(jsonData.map(item => item.Sport)).size,
    events: new Set(jsonData.map(item => item.Event)).size,
    athletes: new Set(jsonData.map(item => item.Name)).size,
    nations: new Set(jsonData.map(item => item.region)).size,
  };

  useEffect(() => {
    const nationsData = dataOverTime(jsonData, 'region');
    const eventsData = dataOverTime(jsonData, 'Event');
    const athletesData = dataOverTime(jsonData, 'Name');
    setChartData({ nations: nationsData, events: eventsData, athletes: athletesData });
  }, []);

  const renderChartJSChart = (data, label) => {
    const chartJSData = {
      labels: data.map(d => d.label), // Make sure your dataOverTime function generates labels appropriately
      datasets: [
        {
          label: label,
          data: data.map(d => d.value),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    return <Line data={chartJSData} />;
  };

  const [heatmapData, setHeatmapData] = useState({ data: [], sports: [], years: [] });

  useEffect(() => {
    const { heatmapData, sports, years } = processYourDataIntoHeatmapFormat(jsonData);
    setHeatmapData({ data: heatmapData, sports, years });
  }, []);

  const { width } = Dimensions.get('window');
  const heatmapHeight = 800; // Example height

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Analysis</Text>
      <Text style={styles.title}>Top Statistics</Text>
      {Object.entries(statistics).map(([key, value]) => (
        <Text style={styles.statseditions} key={key}>{`${key}: ${value}`}</Text>
      ))}
      {Platform.OS !== 'web' ? (
        <>
          {renderLineChart(chartData.nations, 'Participating Nations over the years')}
          {renderLineChart(chartData.events, 'Events over the years')}
          {renderLineChart(chartData.athletes, 'Athletes over the years')}
          <ScrollView contentContainerStyle={styles.container}>
           <Heatmap
             data={heatmapData.data}
             sports={heatmapData.sports}
             years={heatmapData.years}
             width={width - 40} // Account for padding/margins
             height={heatmapHeight}
            />
          </ScrollView>
        </>
      ) : (
        <>
          {renderChartJSChart(chartData.nations, 'Participating Nations over the years')}
          {renderChartJSChart(chartData.events, 'Events over the years')}
          {renderChartJSChart(chartData.athletes, 'Athletes over the years')}
          <ScrollView contentContainerStyle={styles.container}>
           <Heatmap
             data={heatmapData.data}
             sports={heatmapData.sports}
             years={heatmapData.years}
             width={width - 40} // Account for padding/margins
             height={heatmapHeight}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statseditions: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default OverallAnalysis;

