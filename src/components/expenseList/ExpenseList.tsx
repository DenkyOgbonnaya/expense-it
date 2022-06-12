import Expense from '../expense/Expense';
import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense, IExpenseData} from 'sharables/interface/Expense';
import {primaryDarkColor, primaryGray} from 'styles/colors';
import {baseFontSize, baseMarginLg} from 'styles/spacing';
import {getResponsiveSize} from 'utills/responsiveSize';
import { dateFormatter } from 'utills/helper';

interface IProps {
  expense: IExpenseData;
  loadMore?: () => void;
  pressHandler: (expense: IExpense) => void;
}
const ExpenseList: React.FC<IProps> = ({expense, pressHandler}) => {
  return (
    <View style={styles.container}>
              <View style={styles.expenseList}>
                <Text style={styles.expenseListLabel}> {dateFormatter(expense._id)} </Text>
                <View style={styles.expenseListContainer}>
                  {expense.expenses.map(exp => (
                    <Expense key={exp._id} expense={exp} pressHandler={() => pressHandler(exp)} />
                  ))}
                </View>
              </View>
          
         
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    // marginBottom: "200@vs",
    // flex: 1,
    // backgroundColor: 'red'
  },
  noExpenses: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
  },
  expensesList: {
    marginTop: getResponsiveSize(baseMarginLg, 'ms'),
  },
  expenseList: {
    marginBottom: getResponsiveSize(baseMarginLg, 'ms'),
  },
  expenseListLabel: {
    fontSize: getResponsiveSize(baseFontSize + 5, 'ms'),
    fontWeight: 'bold',
    color: primaryGray,
    marginLeft: getResponsiveSize(baseMarginLg, 'ms'),
  },
  expenseListContainer: {
    marginTop: getResponsiveSize(baseMarginLg, 'ms'),
    // flex: 1
  },
});
export default ExpenseList;
