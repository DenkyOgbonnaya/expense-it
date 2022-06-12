import React, {FC, useEffect, useState} from 'react';
import {View, Dimensions, Text, TextBase, ScrollView} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {ScaledSheet} from 'react-native-size-matters';
import {backgroundColor, primaryBlueColor} from 'styles/colors';
import {baseFontSize, baseMargin, basePadding, basePaddingLg} from 'styles/spacing';
import {baseFontFamily} from 'styles/typography';
import { truncateWords } from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';

interface IProps {
  data: {
    _id: string;
    total: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
    name: string;
  }[];
}
const CategoriesChart: FC<IProps> = ({data}) => {
  const [chartData, setChartData] = useState<IProps['data']>([]);
  const colors = ['purple', 'green', `${primaryBlueColor}`, 'orange', 'white'];

  useEffect(() => {
    if (data) {
      const preparedData: any = data.map((item, index) => ({
        name: item._id,
        _id: item._id,
        total: item.total,
        color: colors[index],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));

      setChartData(preparedData);
    }
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width/2+30}
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
            padding: 0
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
        accessor={'total'}
        backgroundColor={'transparent'}
        paddingLeft={'5'}
        
        center={[40, 0]}
        absolute
        hasLegend={false}
        // style={{backgroundColor:'red', }}
        
      />
      <View style={styles.legendWrap} >
        {chartData.map(legendItem => (
          <View key={legendItem.name} style={styles.legend}>
            <View
              style={[styles.legendIcon, {backgroundColor: legendItem.color}]}
            />
            <Text
              style={[styles.legendName, {color: legendItem.legendFontColor}]}>
              {truncateWords(legendItem.name, 10)}
            </Text>
          </View>
        ))}
      </View>
      </View>
    </ScrollView>
  
  );
};
const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    // paddingHorizontal: getResponsiveSize(basePadding, 'ms'),
    // paddingVertical: getResponsiveSize(basePaddingLg, 'ms'),
  },
  legendWrap: {
    justifyContent: 'space-between',
    padding: getResponsiveSize(basePadding+10, "ms")
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  legendIcon: {
    width: '10@ms',
    height: '10@ms',
    borderRadius: 2,
  },
  legendName: {
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    marginLeft: getResponsiveSize(baseMargin, "ms")
  },
});
export default CategoriesChart;
