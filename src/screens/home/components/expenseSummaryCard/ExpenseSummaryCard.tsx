import {Arrow} from 'assets';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {primaryBlueColor, primaryWhite} from 'styles/colors';
import {
  baseBorderRadiusLg,
  baseFontSizeLg,
  baseFontSizeXl,
  baseMarginLg,
  basePaddingLg,
} from 'styles/spacing';
import { formatCurrency } from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';

interface IProps {
  amount: number;
}
const ExpenseSummaryCard: FC<IProps> = ({amount}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Total Expense Summary</Text>
        <Text style={styles.valueText}>N{formatCurrency(amount)}</Text>
      </View>
      <Arrow height={50} width={50} />
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: primaryBlueColor,
    paddingHorizontal: getResponsiveSize(basePaddingLg, 'ms'),
    height: '150@ms',
    elevation: 5,
    borderRadius: getResponsiveSize(baseBorderRadiusLg + 10, 'ms'),
    alignItems: 'center',
  },
  titleText: {
    color: primaryWhite,
    fontSize: getResponsiveSize(baseFontSizeLg, 'ms'),
    fontWeight: 'bold',
  },
  valueText: {
    color: primaryWhite,
    fontSize: getResponsiveSize(baseFontSizeXl + 8, 'ms'),
    fontWeight: 'bold',
    marginTop: getResponsiveSize(baseMarginLg, 'ms'),
  },
});
export default ExpenseSummaryCard;
