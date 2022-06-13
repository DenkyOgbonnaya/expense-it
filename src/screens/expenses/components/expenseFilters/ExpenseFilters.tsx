import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {primaryGray} from 'styles/colors';
import {baseFontSize, baseMargin} from 'styles/spacing';
import {getResponsiveSize} from 'utills/responsiveSize';

export interface IFilterOption {
  label: string,
  value: string
}
interface IProps {
  handleFilter: (filter: IFilterOption) => void;
}
const ExpenseFilters: FC<IProps> = ({handleFilter}) => {
  const filters = [
    {
      label: 'Today',
      value: 'Day',
    },
    {
      label: 'This Week',
      value: 'Week',
    },
    {
      label: 'This Wonth',
      value: 'Month',
    },
    {
      label: 'This Year',
      value: 'Year',
    },
    {
      label: 'By Category',
      value: 'Category',
    },
  ];
  const onFilterPress = (filter: any) => {
    handleFilter(filter);
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
