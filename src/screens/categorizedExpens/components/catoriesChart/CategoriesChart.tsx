import React, {FC} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import { ScaledSheet } from 'react-native-size-matters';
import {backgroundColor, primaryBlueColor} from 'styles/colors';
import { basePadding, basePaddingLg } from 'styles/spacing';
import {baseFontFamily} from 'styles/typography';
import { getResponsiveSize } from 'utills/responsiveSize';

const CategoriesChart: FC = () => {
  const data = [
    {
      name: "Food",
      population: 2150,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Entertainment",
      population: 2803,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Transport",
      population: 5248,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Utilities",
      population: 820,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Shopping",
      population: 910,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width -30}
        height={230}
        chartConfig={{
          backgroundColor: backgroundColor,
          backgroundGradientFrom: backgroundColor,
          backgroundGradientTo: backgroundColor,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: primaryBlueColor,
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
          },
          propsForLabels: {
            fontSize: 9,
            fontFamily: baseFontFamily,
          },
          
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[0, 0]}
        absolute
      />
    </View>
  );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: getResponsiveSize(basePadding, 'ms'),
        // paddingVertical: getResponsiveSize(basePaddingLg, 'ms'),
    },
});
export default CategoriesChart;
