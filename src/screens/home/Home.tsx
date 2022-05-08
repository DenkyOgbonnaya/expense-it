import {Plus} from 'assets';
import ExpenseList from 'components/expenseList/ExpenseList';
import React, {FC} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense} from 'sharables/interface/Expense';
import {
  backgroundColor,
  primaryBlueColor,
  primaryDarkColor,
} from 'styles/colors';
import {
  baseFontSize,
  baseFontSizeLg,
  baseFontSizeXl,
  baseFontWeight,
  baseLineHeight,
  baseMargin,
  baseMarginXl,
  basePadding,
  basePaddingXl,
} from 'styles/spacing';
import {getResponsiveSize} from 'utills/responsiveSize';
import ExpenseSummaryCard from './components/expenseSummaryCard/ExpenseSummaryCard';

export const expenses: IExpense[] = [
  {
    id: 1,
    title: 'Expense 1',
    amount: 100,
    date: '2020-01-01',
    category: 1,
    description: 'Expense 1 description',
  },
  {
    id: 2,
    title: 'Expense 1',
    amount: 100,
    date: '2020-01-01',
    category: 1,
    description: 'Expense 1 description',
  },
  {
    id: 3,
    title: 'Expense 1',
    amount: 100,
    date: '2020-01-01',
    category: 1,
    description: 'Expense 1 description',
  },
  {
    id: 4,
    title: 'Expense 1',
    amount: 100,
    date: '2020-01-01',
    category: 1,
    description: 'Expense 1 description',
  },
];
const Home: FC = () => {
  const handleViewAllRecent = () => {};
  const handleAddExpense = () => {};

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Best way to{' '}
          <Text style={styles.titleTextBlue}>Track your expenses</Text>{' '}
        </Text>
        <ExpenseSummaryCard amount={1000000} />
        <View style={styles.expenses}>
          <View style={styles.expenseSection}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableWithoutFeedback onPress={handleViewAllRecent}>
              <Text style={styles.sectionTitleBlue}>View All</Text>
            </TouchableWithoutFeedback>
          </View>
          <ExpenseList expenses={expenses} />
        <View style={styles.plusBtnWrapper}>
        <TouchableWithoutFeedback onPress={handleAddExpense} >
            <View style={styles.plusBtn}>
              <Plus height={30} width={30} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        
        </View>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: backgroundColor,
    paddingTop: getResponsiveSize(baseMargin, 'ms'),
    margin: 0,
    paddingHorizontal: getResponsiveSize(basePadding, 'ms'),
  },
  titleText: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSizeXl + 8, 'ms'),
    fontWeight: baseFontWeight,
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
  },
  titleTextBlue: {
    color: primaryBlueColor,
  },
  expenses: {
    marginTop: getResponsiveSize(baseMarginXl + 10, 'ms'),
  },
  expenseSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getResponsiveSize(baseMarginXl, 'ms'),
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
  },
  sectionTitle: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSizeLg, 'ms'),
    fontWeight: '600',
  },
  sectionTitleBlue: {
    color: primaryBlueColor,
    fontSize: getResponsiveSize(baseFontSizeLg, 'ms'),
    fontWeight: '600',
  },
  plusBtnWrapper: {
    position: 'absolute',
    bottom: getResponsiveSize(-80, 'ms'),
    right: getResponsiveSize(0, 'ms'),
    backgroundColor: primaryBlueColor,
    borderRadius: getResponsiveSize(baseMargin, 'ms'),
    padding: getResponsiveSize(basePadding, 'ms'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusBtn: {
    backgroundColor: primaryBlueColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsiveSize(basePaddingXl + 5, 'ms'),
  },
});
export default Home;
