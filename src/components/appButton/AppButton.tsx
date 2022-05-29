import React, {FC} from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {primaryBlueColor, primaryGrayLight, primaryWhite} from 'styles/colors';
import { baseBorderRadius, baseFontSize, baseFontSizeLg, basePaddingLg } from 'styles/spacing';
import { getResponsiveSize } from 'utills/responsiveSize';

interface IProps {
  btnText: string;
  onPressHandler: () => void;
  customBtnStyle?: any;
  customBtnTextStyle?: any;
  icon?: React.ComponentType | null;
  disabled?: boolean;
}

const AppButton: FC<IProps> = ({
  btnText,
  onPressHandler,
  customBtnStyle = {},
  customBtnTextStyle = {},
  icon: Icon,
  disabled,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPressHandler} disabled={disabled}>
      <View style={[styles.btn, customBtnStyle, {opacity: disabled ? 0.4 : 1}]}>
        {Icon && (
          <View style={styles.icon}>
            <Icon />
          </View>
        )}
        {btnText && (
          <Text style={[styles.btnText, customBtnTextStyle]}>{btnText}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = ScaledSheet.create({
  btn: {
    flexDirection: 'row',
    backgroundColor: primaryGrayLight,
    fontWeight: 'bold',
    paddingVertical: getResponsiveSize(basePaddingLg, 'ms'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    borderRadius: baseBorderRadius + 10,
  },
  btnText: {
    fontSize:getResponsiveSize(baseFontSizeLg, 'ms'),
    color: primaryWhite,
    fontWeight: '600',
  },
  icon: {
    marginRight: 10,
  },
});
export default AppButton;
