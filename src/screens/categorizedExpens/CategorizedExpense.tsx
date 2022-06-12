import React, {FC, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  backgroundColor,
  primaryBlueColor,
  primaryDarkColor,
  primaryGray,
} from 'styles/colors';
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
import {
  getWeekStartEndDate,
  getMonthStartEndDate,
  getYearStartEndDate,
  getDayStartEndDate,
} from 'utills/helper';
import {useQuery} from 'react-query';
import {handleGetRequest} from 'services/shared';
import {GET_CATEGORIZED_EXPENSE_API} from 'constants/endpoints/expense';
import { ICategory } from 'sharables/interface/Category';

interface category {
  _id:string,
  total: number
}

const CategoryExpense: FC = () => {
  const [date, setDate] = useState(() => {
    const {startDateString, endDateString} = getYearStartEndDate()
   return  {
    startDate: startDateString,
    endDate: endDateString,
  }});
  const [total, setTotal] = useState(0)

  const {isLoading, data} = useQuery(
    [date.startDate, date.endDate, 'categories'],
    async () => {
      return await handleGetRequest(
        `${GET_CATEGORIZED_EXPENSE_API}${'user1'}/categories?startDate=${
          date.startDate
        }&endDate=${date.endDate}`,
      );
    },
    {
      onSuccess: (data) => {
        const total = data?.data.reduce((acc:number, curr:category) => acc+curr.total, 0)
        setTotal(total)
      }
    }
  );

  const handleFilterPress = (filter: string) => {
    switch (filter) {
      case 'Category':
        //@ts-ignore
        navigation.navigate(CATEGORIES_SCREEN);
        break;
      case 'day':
        {
          const {startDateString, endDateString} = getDayStartEndDate();
          setDate({
            startDate: startDateString,
            endDate: endDateString,
          });
        }
        break;
      case 'week':
        {
          const {startDateString, endDateString} = getWeekStartEndDate();
          setDate({
            startDate: startDateString,
            endDate: endDateString,
          });
        }
        break;

      case 'month':
        {
          const {startDateString, endDateString} = getMonthStartEndDate();
          setDate({
            startDate: startDateString,
            endDate: endDateString,
          });
        }
        break;
      case 'year':
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
  const handlePress = (control: IControl) => {
    setTotal(0)
    handleFilterPress(control.value);
  };

  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>TOTAL MONEY SPENT SO FAR</Text>
        <Text style={styles.amountText}>N {formatCurrency(total)}</Text>
        <ChartControls pressHanler={handlePress} />
        {isLoading ? (
          <ActivityIndicator size="large" color={primaryBlueColor} />
        ) : (
          <>
            {data?.data.length ? (
              <>
                <CategoriesChart data={data?.data} />
                <CategoryList categories={data?.data} />
              </>
            ) : (
              <Text>No Expenses</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
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
    paddingHorizontal: getResponsiveSize(basePadding, 'ms'),
    paddingTop: getResponsiveSize(basePaddingLg, 'ms'),
    backgroundColor: backgroundColor,
    marginBottom: getResponsiveSize(baseMarginLg + 5, 'ms'),
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
