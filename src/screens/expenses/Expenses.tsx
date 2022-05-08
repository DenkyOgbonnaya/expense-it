import {Filter} from 'assets';
import {Expense} from 'components';
import React, {FC} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense} from 'sharables/interface/Expense';
import {backgroundColor, primaryDarkColor, primaryGray} from 'styles/colors';
import {baseFontSize, baseMarginLg, basePaddingLg} from 'styles/spacing';
import {formatCurrency} from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';

interface IExpenses {
  label: string;
  expenses: IExpense[];
}

const Expenses: FC = () => {
  const expensesList: IExpenses[] = [
    {
      label: '2020-01-01',
      expenses: [
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
          title: 'Expense 2',
          amount: 200,
          date: '2020-01-02',
          category: 2,
          description: 'Expense 2 description',
        },
        {
          id: 3,
          title: 'Expense 3',
          amount: 300,
          date: '2020-01-03',
          category: 3,
          description: 'Expense 3 description',
        },
      ],
    },
    {
      label: '2018-01-01',
      expenses: [
        {
          id: 4,
          title: 'Expense 4',
          amount: 400,
          date: '2020-01-04',
          category: 4,
          description: 'Expense 4 description',
        },
        {
          id: 5,
          title: 'Expense 5',
          amount: 500,

          date: '2020-01-05',
          category: 5,
          description: 'Expense 5 description',
        },
        {
          id: 6,
          title: 'Expense 6',
          amount: 600,
          date: '2020-01-06',
          category: 6,
          description: 'Expense 6 description',
        },
        {
          id: 7,
          title: 'Expense 6',
          amount: 600,
          date: '2020-01-06',
          category: 6,
          description: 'Expense 6 description',
        },
        {
          id: 8,
          title: 'Expense 6',
          amount: 600,
          date: '2020-01-06',
          category: 6,
          description: 'Expense 6 description',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>TOTAL MONEY SPENT SO FAR</Text>
        <Text style={styles.amountText}>N {formatCurrency(100000)}</Text>
        <View style={styles.filter}>
          <TouchableWithoutFeedback>
            <Filter height={35} width={35} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.expensesList}>
          <>
            {expensesList.map(expense => (
              <View key={expense.label} style={styles.expenseList}>
                <Text style={styles.expenseListLabel}>{expense.label}</Text>
                <View style={styles.expenseListContainer}>
                  {expense.expenses.map(exp => (
                    <Expense key={exp.id} expense={exp} />
                  ))}
                </View>
              </View>
            ))}
          </>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingTop: getResponsiveSize(basePaddingLg, 'ms'),
    marginBottom: getResponsiveSize(baseMarginLg, 'ms'),
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
  },
  filter: {
    marginTop: getResponsiveSize(baseMarginLg + 5, 'ms'),
    alignSelf: 'flex-end',
    paddingHorizontal: getResponsiveSize(basePaddingLg, 'ms'),
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
  },
});
export default Expenses;
