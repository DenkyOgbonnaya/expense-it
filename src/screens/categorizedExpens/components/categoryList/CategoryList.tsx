import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  primaryDarkColor,
  primaryGray,
  primaryGrayLight,
  primaryWhite,
} from 'styles/colors';
import {
  baseBorderRadiusLg,
  baseFontSizeLg,
  baseFontSizeSm,
  baseMarginSm,
  basePadding,
} from 'styles/spacing';
import {baseFontFamily} from 'styles/typography';
import { formatCurrency, truncateWords } from 'utills/helper';
import {getResponsiveSize} from 'utills/responsiveSize';

interface IProps {
  categories: any;
}
const CategoryList: FC<IProps> = ({categories=[]}) => {
  return (
    <View>
      {categories.map((category: any) => (
        <View style={styles.container} key={category._id}>
          <View>
            <Text style={styles.titleText}>{truncateWords(category._id, 20)}</Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>N{formatCurrency(category.total)}</Text>
          </View>
        </View>
      ))}
    </View>
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
export default CategoryList;
