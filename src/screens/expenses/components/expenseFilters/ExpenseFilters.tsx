import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {primaryGray} from 'styles/colors';
import {baseFontSize, baseMargin} from 'styles/spacing';
import {getResponsiveSize} from 'utills/responsiveSize';

interface IProps {
  handleFilter: (filter: string) => void;
}
const ExpenseFilters: FC<IProps> = ({handleFilter}) => {
  const filters = [
    {
      label: 'Today',
      value: 'Day',
    },
    {
      label: 'This week',
      value: 'Week',
    },
    {
      label: 'This month',
      value: 'Month',
    },
    {
      label: 'This year',
      value: 'Year',
    },
    {
      label: 'By Category',
      value: 'Category',
    },
  ];
  const onFilterPress = (filter: any) => {
    handleFilter(filter.value);
  };
  return (
    <View style={styles.container}>
      {filters.map(filter => (
        <TouchableOpacity
          
          key={filter.value}
          onPress={() => onFilterPress(filter)}>
          <View style={styles.viewRow}>
            <View style={styles.rounderView}></View>
            <Text style={styles.filterTitle}>{filter.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
  },
  filterTitle: {
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    fontWeight: '600',
    color: primaryGray,
  },
  rounderView: {
    width: getResponsiveSize(20, 'ms'),
    height: getResponsiveSize(20, 'ms'),
    borderRadius: getResponsiveSize(10, 'ms'),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: primaryGray,
    marginRight: getResponsiveSize(baseMargin, 'ms'),
  },
});
export default ExpenseFilters;
