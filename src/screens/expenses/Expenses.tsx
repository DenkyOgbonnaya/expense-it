import {useNavigation} from '@react-navigation/core';
import {Filter} from 'assets';
import {AppModal, Expense} from 'components';
import {CATEGORIES_SCREEN} from 'navigations/constants';
import React, {FC} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense} from 'sharables/interface/Expense';
import {
  backgroundColor,
  primaryBlueColor,
  primaryDarkColor,
  primaryGray,
  primaryWhite,
} from 'styles/colors';
import {
  baseBorderRadius,
  baseFontSize,
  baseMargin,
  baseMarginLg,
  baseMarginSm,
  basePaddingLg,
} from 'styles/spacing';
import {formatCurrency} from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';
import ExpenseFilters from './components/expenseFilters/ExpenseFilters';

interface IExpenses {
  label: string;
  expenses: IExpense[];
}

const Expenses: FC = () => {
  const [showFilters, setShowFilters] = React.useState(false);
  const navigation = useNavigation();
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
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const handleFilterPress = (filter: string) => {
    toggleFilters();
    switch (filter) {
      case 'Category':
        //@ts-ignore
        navigation.navigate(CATEGORIES_SCREEN);
        break;
      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>TOTAL MONEY SPENT SO FAR</Text>
        <Text style={styles.amountText}>N {formatCurrency(100000)}</Text>
        <View style={styles.filter}>
          <TouchableWithoutFeedback onPress={toggleFilters}>
            <View style={styles.filterButton}>
              <Filter height={20} width={20} />
              <Text style={styles.filterButtonText}>Filter</Text>
            </View>
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
      {showFilters && (
        <AppModal visible={showFilters} closeModal={toggleFilters}>
          <View style={styles.modalContainer}>
            <View style={styles.heading}>
              <Text style={styles.expenseFilterText}>
                Expenses filter options
              </Text>
              <TouchableWithoutFeedback onPress={toggleFilters}>
                <View style={styles.closeModal}>
                  <Text style={styles.closeModalText}>X</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <ExpenseFilters handleFilter={handleFilterPress} />
          </View>
        </AppModal>
      )}
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
  modalContainer: {
    backgroundColor: primaryWhite,
    width: '100%',
    padding: '20@ms',
    borderTopRightRadius: getResponsiveSize(baseBorderRadius + 10, 'ms'),
    borderTopLeftRadius: getResponsiveSize(baseBorderRadius + 10, 'ms'),
    // marginBottom: '120@ms',
  },

  closeModal: {
    alignSelf: 'flex-end',
  },
  closeModalText: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSize + 5, 'ms'),
  },
  expenseFilterText: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSize + 5, 'ms'),
    fontWeight: '600',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveSize(baseMarginLg + 10, 'ms'),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: getResponsiveSize(baseFontSize + 5, 'ms'),
    marginLeft: getResponsiveSize(baseMarginSm, 'ms'),
    color: primaryBlueColor,
  },
});
export default Expenses;
