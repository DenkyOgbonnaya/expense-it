import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {backgroundColor, primaryDarkColor, primaryGray} from 'styles/colors';
import {
  baseFontSize,
  baseMarginLg,
  basePadding,
  basePaddingLg,
} from 'styles/spacing';
import {formatCurrency} from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';
import CategoryList from './components/categoryList/CategoryList';
import CategoriesChart from './components/catoriesChart/CategoriesChart';
import ChartControls, {IControl} from './components/chartControls/ChartContols';

const CategoryExpense: FC = () => {
  const categories = [
    {
      id: 1,
      name: 'Food',
      amount: 100,
    },
    {
      id: 2,
      name: 'Entertainment',
      amount: 200,
    },
    {
      id: 3,
      name: 'Transport',
      amount: 300,
    },
    {
      id: 4,
      name: 'Utilities',
      amount: 400,
    },
    {
      id: 5,
      name: 'Shopping',
      amount: 500,
    },
  ];
  const handlePress = (control: IControl) => {};
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>TOTAL MONEY SPENT SO FAR</Text>
        <Text style={styles.amountText}>N {formatCurrency(100000)}</Text>
        <ChartControls pressHanler={handlePress} />
        <CategoriesChart />
        <CategoryList categories={categories} />
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getResponsiveSize(basePadding, 'ms'),
    paddingTop: getResponsiveSize(basePaddingLg, 'ms'),
    backgroundColor: backgroundColor,
    marginBottom: getResponsiveSize(baseMarginLg+5, 'ms'),
  },
  titleText: {
    fontSize: getResponsiveSize(baseFontSize + 5, 'ms'),
    fontWeight: 'normal',
    color: primaryGray,
    alignSelf: 'center',
  },
  amountText: {
    fontSize: getResponsiveSize(basePaddingLg + 10, 'ms'),
    alignSelf: 'center',
    fontWeight: 'bold',
    color: primaryDarkColor,
    marginTop: getResponsiveSize(baseMarginLg, 'ms'),
    marginBottom: getResponsiveSize(baseMarginLg + 20, 'ms'),
  },
});
export default CategoryExpense;
