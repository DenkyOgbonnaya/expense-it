import React, {FC, useState} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  primaryBlueColor,
  primaryDarkColor,
  primaryGray,
  primaryGrayLight,
  primaryWhite,
} from 'styles/colors';
import {baseFontFamily} from 'styles/typography';

export interface IControl {
  label: string;
  value: string;
}
interface IProps {
  pressHanler: (control: IControl) => void;
}
const ChartControls: FC<IProps> = ({pressHanler}) => {
  const [controlItems] = useState<IControl[]>(controls);
  const [active, setActive] = useState<IControl['label']>('Today');

  const handlePress = (control: IControl) => {
    setActive(control.label);
    pressHanler(control);
  };
  const isActive = (label: IControl['label']) => {
    return active === label;
  };

  return (
    <>
      <View style={styles.container}>
        {controlItems.map(control => (
          <TouchableWithoutFeedback
            key={control.value}
            onPress={() => handlePress(control)}>
            <View
              style={[
                styles.item,
                {
                  backgroundColor: isActive(control.label)
                    ? primaryBlueColor
                    : primaryGrayLight,
                },
              ]}>
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive(control.label)
                      ? primaryDarkColor
                      : primaryGray,
                  },
                ]}>
                {control.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '35@ms',
    width: '100%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10@ms',
    paddingVertical: '5@ms',
    borderRadius: '5@ms',
  },
  label: {
    color: primaryWhite,
    fontSize: '14@ms',
    fontFamily: baseFontFamily,
  },
});
export default ChartControls;
const controls: IControl[] = [
  {
    label: 'Today',
    value: 'day',
  },
  {
    label: 'This week',
    value: 'week',
  },
  {
    label: 'This month',
    value: 'month',
  },
  {
    label: 'This year',
    value: 'year',
  },
];
