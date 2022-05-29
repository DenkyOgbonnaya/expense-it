import React, {useState, FC} from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {ScaledSheet} from 'react-native-size-matters';
import AppModal from '../appModal/AppModal';
import {MONTHS} from 'utills/helper';
import {
  primaryBlueColor,
  primaryGrayLight,
  primaryDarkColor,
  primaryWhite,
  primaryGray,
} from 'styles/colors';
import {getResponsiveSize} from 'utills/responsiveSize';
import {
  baseBorderRadiusLg,
  baseFontSize,
  baseMargin,
  baseMarginLg,
  basePadding,
  basePaddingLg,
  basePaddingSm,
} from 'styles/spacing';
import {CalendarIcon} from 'assets';

interface IProps {
  selectHandler: (date: string) => void;
  date: string;
  errorText: string;
  label: string;
  placeHolder: string;
}

const DateInput: FC<IProps> = ({
  errorText,
  selectHandler,
  label,
  placeHolder = 'DD/MM/YYYY',
  date
}) => {
  const [show, setShow] = useState(false);
  const [theDate, setTheDate] = useState(date || "");

  const handleDayPress = (dateString: string) => {
    setTheDate(dateString);
    selectHandler(dateString);
    toggleCalender();
  };

  const renderHeader = (date: any) => {
    const currentDate = new Date(date);
    return (
      <View style={styles.headerWrap}>
        <Text style={styles.dateText}>
          {' '}
          {`${
            MONTHS[currentDate.getMonth()]
          } ${currentDate.getDate()}, ${currentDate.getFullYear()}`}{' '}
        </Text>
      </View>
    );
  };
  const toggleCalender = () => {
    setShow(!show);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.rowView}>
          <View style={styles.wrapper}>
            {theDate ? (
              <Text style={styles.date}>{theDate}</Text>
            ) : (
              <Text style={styles.placeHolder}> {placeHolder} </Text>
            )}
          </View>
          <View style={styles.iconWrap}>
            <CalendarIcon />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      {show && (
        <AppModal visible={show} closeModal={toggleCalender}>
          <View style={styles.calendar}>
            <Calendar
              onDayPress={dateData => handleDayPress(dateData.dateString)}
              style={styles.container}
              theme={{
                backgroundColor: primaryWhite,
                calendarBackground: primaryWhite,
                selectedDayBackgroundColor: primaryWhite,
                selectedDayTextColor: primaryWhite,
                arrowColor: primaryBlueColor,
                dayTextColor: primaryDarkColor,
              }}
              renderHeader={date => renderHeader(date)}
            />
          </View>
        </AppModal>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  containerWrapper: {
    marginBottom: getResponsiveSize(baseMarginLg + 10, 'ms'),
    backgroundColor: primaryWhite,
    borderRadius: '5@ms',
    height: '55@vs',
    paddingHorizontal: getResponsiveSize(basePaddingSm, 'ms'),
    paddingVertical: 4,
  },
  container: {
    backgroundColor: primaryWhite,
  },
  calendar: {
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50@ms',
    overflow: 'visible',
    borderWidth: getResponsiveSize(1, 'ms'),
    borderColor: primaryBlueColor,
    borderRadius: getResponsiveSize(baseBorderRadiusLg, 'ms'),
    paddingRight: getResponsiveSize(basePadding, 'ms'),
  },
  calenderView: {
    position: 'absolute',
    //width: '100%',
    left: 0,
    //backgroundColor: yellow
  },

  wrapper: {
    paddingHorizontal: getResponsiveSize(basePaddingSm - 5, 'ms'),
    paddingVertical: getResponsiveSize(basePaddingSm, 'ms'),
    overflow: 'visible',
  },
  iconWrap: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '10@ms',
  },

  dayText: {
    textAlign: 'center',
  },
  headerWrap: {
    backgroundColor: primaryBlueColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  date: {
    color: primaryGray,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    fontWeight: '600',
  },
  placeHolder: {
    color: primaryGrayLight,
    fontSize: '14@ms',
  },
  dateText: {
    color: primaryWhite,
    fontSize: '15@ms',
  },
  errorText: {
    color: primaryDarkColor,
    fontSize: '14@ms',
  },
  dayWrap: {
    backgroundColor: primaryDarkColor,
    width: '20@ms',
    height: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
  },
  label: {
    color: primaryDarkColor,
    marginLeft: 1,
    marginBottom: 5,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    fontWeight: '600',
  },
});

export default DateInput;
