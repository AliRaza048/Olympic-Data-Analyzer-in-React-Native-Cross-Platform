
import React from 'react';
import { Svg, Rect, Text as SvgText  } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';



const interpolateColor = (value, maxValue) => {
    const hue = ((1 - value / maxValue) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
  };
  const Heatmap = ({ data, sports, years, width, height }) => {
    if (!data || data.length === 0) return null;
  
    const maxValue = Math.max(...data.flat());
    const cellWidth = width / years.length;
    const cellHeight = height / sports.length;
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No. of Events over time (Every Sport)</Text>
        <Svg height={height} width={width}>
          {data.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <React.Fragment key={`cell-${rowIndex}-${colIndex}`}>
                <Rect
                  x={colIndex * cellWidth}
                  y={rowIndex * cellHeight}
                  width={cellWidth}
                  height={cellHeight}
                  fill={interpolateColor(value, maxValue)}
                />
                <SvgText
                  x={colIndex * cellWidth + cellWidth / 2}
                  y={rowIndex * cellHeight + cellHeight / 2}
                  fontSize={14}
                  fill="white"
                  textAnchor="middle"
                  alignmentBaseline="central"
                >
                  {value}
                </SvgText>
              </React.Fragment>
            ))
          )}
        </Svg>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default Heatmap;
