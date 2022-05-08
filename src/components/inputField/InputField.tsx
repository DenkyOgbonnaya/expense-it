import React, {FC, useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from 'react-native';
import {primaryDarkColor, primaryGray, primaryWhite} from 'styles/colors';
import { getResponsiveSize } from 'utills/responsiveSize';
import { baseFontSize, baseMargin, basePaddingSm } from 'styles/spacing';

const fontSize = '15@ms';
interface IProps {
  label: string;
  icon?: React.ComponentType;
  valIcon?: React.ComponentType;
  placeholder: string;
  value: string | undefined;
  changeHandler: (value: string) => void;
  type: KeyboardTypeOptions;
  multiline?: boolean;
  count?: number;
  errorText: string | undefined;
  returnKeyType?: ReturnKeyTypeOptions;
  customWrapperStyle?: any;
  secureTextEntry?: boolean;
  customInputStyle?: any;
  customLabelStyle?: any;
  placeholderTextColor?: string;
  editable?: boolean;
  focusHandler?: () => void;
  blurHandler?: (val: string | undefined) => void;
}
const InputField: FC<IProps> = ({
  label,
  icon,
  valIcon,
  placeholder,
  value,
  changeHandler,
  type = 'default',
  multiline = false,
  count = 5,
  errorText,
  returnKeyType = 'next',
  customWrapperStyle,
  secureTextEntry = false,
  customInputStyle,
  customLabelStyle,
  placeholderTextColor,
  editable = true,
  focusHandler,
  blurHandler,
}) => {
  const [state, setState] = useState<string | undefined>(value || '');

  useEffect(() => {
    setState(value);
  }, [value]);
  const handleChange = (val: string) => {
    setState(val);
    if (changeHandler) changeHandler(val);
  };
  const handleFocus = () => {
    if (focusHandler) focusHandler();
  };
  const handleBlur = () => {
    if (blurHandler) blurHandler(state);
  };
  return (
    <>
      <View style={[styles.wrapper, customWrapperStyle]}>
        <View style={styles.labelContainer}>
          {icon && icon}
          <Text style={[styles.label, customLabelStyle]}>{label}</Text>
        </View>
        <View
          style={[
            styles.textInpuContainer,
            !editable && {backgroundColor: primaryGray},
          ]}>
          <TextInput
            style={[
              styles.textInput,
              customInputStyle,
              !editable && {color: primaryGray},
            ]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || primaryGray}
            onChangeText={handleChange}
            keyboardType={type}
            value={state}
            multiline={multiline}
            numberOfLines={count}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            editable={editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <View style={styles.validationIcon}>{valIcon && valIcon}</View>
        </View>
      </View>
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    overflow: 'visible',
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
    backgroundColor: primaryWhite,
    borderRadius: '5@ms',
    height: '55@vs',
    paddingHorizontal: getResponsiveSize(basePaddingSm, 'ms'),
    paddingVertical: 4,
  },

  labelContainer: {
    flexDirection: 'row',
  },

  textInpuContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: '40@vs',
    width: '100%',
  },
  textInput: {
    fontSize,
    color: primaryGray,
    width: '100%',
  },
  label: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    fontWeight: '600',
  },
  errorText: {
    fontSize: '12@ms',
    marginLeft: '10@ms',
  },
  validationIcon: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
});

export default InputField;
