import Expense from '../expense/Expense';
import React from 'react';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense} from 'sharables/interface/Expense';
import {primaryDarkColor, primaryWhite} from 'styles/colors';
import {baseFontSize, baseMargin} from 'styles/spacing';
import {getResponsiveSize} from 'utills/responsiveSize';

interface IProps {
  expenses: IExpense[];
  loadMore?: () => void;
  pressHandler?: (expense: IExpense) => void;
}
const ExpenseList: React.FC<IProps> = ({expenses, loadMore, pressHandler}) => {
  const handleEndReached = () => {
    if (loadMore) loadMore();
  };
  return (
    <>
      <FlatList
        data={expenses}
        renderItem={({item}) => (
          <Expense expense={item} pressHandler={pressHandler} />
        )}
        keyExtractor={item => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
            <View >
              <ActivityIndicator size="small" color={primaryDarkColor} />
            </View>
          )}
          ListEmptyComponent={
            <View style={{height: getResponsiveSize(baseMargin, 'ms')}}>
              <Text style={styles.noExpenses}>No expenses found</Text>
            </View>
          }
      />
    </>
  );
};

const styles = ScaledSheet.create({
  noExpenses: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
  },
});
export default ExpenseList;
