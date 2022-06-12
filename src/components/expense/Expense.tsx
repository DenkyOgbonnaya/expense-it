import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense} from 'sharables/interface/Expense';
import {
  primaryDarkColor,
  primaryGray,
  primaryGrayLight,
  primaryWhite,
} from 'styles/colors';
import {
  baseBorderRadiusLg,
  baseBorderRadiusSm,
  baseFontSize,
  baseFontSizeLg,
  baseFontSizeSm,
  baseMarginSm,
  basePadding,
} from 'styles/spacing';
import {baseFontFamily} from 'styles/typography';
import {dateFormatter, formatCurrency} from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';
interface IProps {
  expense: IExpense;
  pressHandler?: (expense: IExpense) => void;
}
const Expense: React.FC<IProps> = ({expense, pressHandler}) => {
  const handlePress = () => {
    if (pressHandler) pressHandler(expense);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>{expense.title}</Text>
          <Text style={styles.dateText}>{dateFormatter(expense.date)}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>N{formatCurrency(expense.amount)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: getResponsiveSize(basePadding, 'ms'),
    backgroundColor: primaryWhite,
    marginBottom: getResponsiveSize(baseMarginSm - 5, 'ms'),
    alignItems: 'center',
  },
  titleText: {
    color: primaryGray,
    fontSize: getResponsiveSize(baseFontSizeLg, 'ms'),
    fontFamily: baseFontFamily,
  },
  amountText: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSizeLg, 'ms'),
    fontFamily: baseFontFamily,
  },
  amountContainer: {
    padding: getResponsiveSize(basePadding - 5, 'ms'),
    backgroundColor: primaryGrayLight,
    borderRadius: getResponsiveSize(baseBorderRadiusLg, 'ms'),
  },
  dateText: {
    color: primaryGray,
    fontSize: getResponsiveSize(baseFontSizeSm, 'ms'),
    fontFamily: baseFontFamily,
    marginTop: getResponsiveSize(baseMarginSm, 'ms'),
  },
});
export default Expense;
