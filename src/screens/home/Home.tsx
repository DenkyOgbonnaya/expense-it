import {Plus} from 'assets';
import {AppModal} from 'components';
import ExpenseForm from 'components/expenseForm/ExpenseForm';
import ExpenseList from 'components/expenseList/ExpenseList';
import React, {FC} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense} from 'sharables/interface/Expense';
import {
  backgroundColor,
  primaryBlueColor,
  primaryDarkColor,
  primaryWhite,
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
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [expense, setExpense] = React.useState<IExpense | undefined>(undefined);
  const handleViewAllRecent = () => {};
  const handleAddExpense = () => {
    setExpense(undefined);
    toggleExpenseForm()
  };

  const toggleExpenseForm = () => {
    setShowExpenseForm(!showExpenseForm);
  };

  const handleAddExpensePress = () => {
    toggleExpenseForm();
  };
  const dissMissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleExpressView = (expense: IExpense) => {
    setExpense(expense);
    toggleExpenseForm();
  }
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
          <ExpenseList expenses={expenses} pressHandler={handleExpressView} />
          <View style={styles.plusBtnWrapper}>
            <TouchableWithoutFeedback onPress={handleAddExpense}>
              <View style={styles.plusBtn}>
                <Plus height={30} width={30} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      {showExpenseForm && (
        <AppModal visible={showExpenseForm} closeModal={toggleExpenseForm}>
          <TouchableWithoutFeedback onPress={dissMissKeyboard}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={toggleExpenseForm}>
                <View style={styles.closeModal}>
                  <Text style={styles.closeModalText}>Close</Text>
                </View>
              </TouchableWithoutFeedback>
              <ScrollView>
                <Text style={styles.addExpenseText}>{!expense ? "Add" : "Update"} Expense</Text>
                <ExpenseForm
                  submitHandler={handleAddExpensePress}
                  errorMessage={errorMessage}
                  expense={expense}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </AppModal>
      )}
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
  modalContainer: {
    backgroundColor: primaryBlueColor,
    //height: '60%',
    width: '100%',
    padding: '20@ms',
    marginBottom: '120@ms',
  },

  closeModal: {
    alignSelf: 'flex-end',
  },
  closeModalText: {
    color: primaryWhite,
    fontSize: '12@ms',
    marginBottom: '10@ms',
  },
  addExpenseText: {
    color: primaryWhite,
    fontSize: getResponsiveSize(baseFontSizeXl + 5, 'ms'),
    fontWeight: '600',
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
  },
});
export default Home;
