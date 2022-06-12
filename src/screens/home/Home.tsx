import {useNavigation} from '@react-navigation/core';
import {Plus} from 'assets';
import {AppModal} from 'components';
import ExpenseForm from 'components/expenseForm/ExpenseForm';
import ExpenseList from 'components/expenseList/ExpenseList';
import {GET_EXPENSES_API} from 'constants/endpoints/expense';
import {CATEGORIES_SCREEN, EXPENSES_SCREEN} from 'navigations/constants';
import React, {FC, useState} from 'react';
import {Filter} from 'assets';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useInfiniteQuery, useQuery} from 'react-query';
import {handleGetRequest} from 'services/shared';
import {IExpense, IExpenseData} from 'sharables/interface/Expense';
import {
  backgroundColor,
  primaryBlueColor,
  primaryDarkColor,
  primaryGrayLight,
  primaryWhite,
} from 'styles/colors';
import {
  baseBorderRadiusLg,
  baseFontSize,
  baseFontSizeLg,
  baseFontSizeXl,
  baseFontWeight,
  baseLineHeight,
  baseMargin,
  baseMarginLg,
  baseMarginSm,
  baseMarginXl,
  basePadding,
  basePaddingLg,
  basePaddingXl,
} from 'styles/spacing';
import {getResponsiveSize} from 'utills/responsiveSize';
import ExpenseSummaryCard from './components/expenseSummaryCard/ExpenseSummaryCard';
import ExpenseFilters from 'screens/expenses/components/expenseFilters/ExpenseFilters';
import {
  getWeekStartEndDate,
  getMonthStartEndDate,
  getYearStartEndDate,
  getDayStartEndDate,
} from 'utills/helper';

interface page {
  results: any;
  totalPages: number;
  nextPage: number | undefined;
}
interface IInfiniteData {
  pages: page[];
}
const Home: FC = () => {
  const [showExpenseForm, setShowExpenseForm] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [date, setDate] = useState({
    startDate: '2022/01/01',
    endDate: '2022/08/25',
  });
  const [showFilters, setShowFilters] = React.useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [expense, setExpense] = React.useState<IExpense | undefined>(undefined);
  const navigation = useNavigation();
  const limit = 20;

  const fetchRecords = async ({pageParam = 1}) => {
    const response = await handleGetRequest(
      `${GET_EXPENSES_API}${'user1'}?startDate=${date.startDate}&endDate=${
        date.endDate
      }`,
    );
    if (response.data) {
      return {
        results: response.data,
        totalPages: Math.ceil(response.total_count / limit),
        nextPage: pageParam + 1,
      };
    }
    return {results: [], totalPages: 0, nextPage: 0};
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery([date.startDate, date.endDate], fetchRecords, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });
  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleAddExpense = () => {
    setExpense(undefined);
    toggleExpenseForm();
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
  };

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
        case 'Day':
          {
            const {startDateString, endDateString} = getDayStartEndDate();
            setDate({
              startDate: startDateString,
              endDate: endDateString,
            });
          }
          break;
      case 'Week':
        {
          const {startDateString, endDateString} = getWeekStartEndDate();
          setDate({
            startDate: startDateString,
            endDate: endDateString,
          });
        }
        break;

      case 'Month':
        {
          const {startDateString, endDateString} = getMonthStartEndDate();
          setDate({
            startDate: startDateString,
            endDate: endDateString,
          });
        }
        break;
      case 'Year':
        {
          const {startDateString, endDateString} = getYearStartEndDate();
          setDate({
            startDate: startDateString,
            endDate: endDateString,
          });
        }
        break;
      default:
        return;
    }
  };

  const getExpensesData = (data: IInfiniteData | IInfiniteData | undefined) => {
    if (data) {
      const expenseData = data?.pages.map(page => page.results).flat();
      return expenseData;
    }
    return [];
  };


  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={primaryBlueColor} />
      </View>
    );
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={styles.titleText}>
          Best way to{' '}
          <Text style={styles.titleTextBlue}>Track your expenses</Text>{' '}
        </Text> */}
        <ExpenseSummaryCard amount={1000000} />
        <View style={styles.expenses}>
          <View style={styles.expenseSection}>
            <TouchableWithoutFeedback onPress={handleAddExpense}>
              <View style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Add Exense</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.filter}>
              <TouchableWithoutFeedback onPress={toggleFilters}>
                <View style={styles.filterButton}>
                  <Filter height={20} width={20} />
                  <Text style={styles.filterButtonText}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View>
            <FlatList
              data={getExpensesData(data)}
              renderItem={({item}) => (
                <ExpenseList expense={item} pressHandler={handleExpressView} />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={{flexGrow: 1}}
              onEndReachedThreshold={5}
              onEndReached={handleEndReached}
              ListEmptyComponent={() => (
                <View style={styles.footer}>
                  <Text style={styles.noActiveText}>No Expenses </Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={styles.footer}>
                  {isFetchingNextPage && (
                    <ActivityIndicator size="small" color={primaryWhite} />
                  )}
                </View>
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
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
                <Text style={styles.addExpenseText}>
                  {!expense ? 'Add' : 'Update'} Expense
                </Text>
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
    </>
  );
};

const styles = ScaledSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: backgroundColor,
    paddingTop: getResponsiveSize(baseMargin, 'ms'),
    paddingHorizontal: getResponsiveSize(basePadding, 'ms'),
    paddingBottom: '240@vs',
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
    marginTop: getResponsiveSize(baseMarginXl - 20, 'ms'),
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
  modalContainer: {
    backgroundColor: primaryWhite,
    width: '100%',
    padding: '10@ms',
    borderTopRightRadius: getResponsiveSize(baseBorderRadiusLg + 10, 'ms'),
    borderTopLeftRadius: getResponsiveSize(baseBorderRadiusLg + 10, 'ms'),
  },

  closeModal: {
    alignSelf: 'flex-end',
  },
  closeModalText: {
    color: primaryDarkColor,
    fontSize: '12@ms',
    marginBottom: '10@ms',
  },
  addExpenseText: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSizeXl + 5, 'ms'),
    fontWeight: '600',
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
  },
  footer: {},
  noActiveText: {
    alignSelf: 'center',
  },
  filter: {
    marginTop: getResponsiveSize(baseMarginLg + 5, 'ms'),
    alignSelf: 'flex-end',
    paddingHorizontal: getResponsiveSize(basePaddingLg, 'ms'),
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
    fontSize: getResponsiveSize(baseFontSize + 3, 'ms'),
    marginLeft: getResponsiveSize(baseMarginSm, 'ms'),
    color: primaryBlueColor,
  },
});
export default Home;
