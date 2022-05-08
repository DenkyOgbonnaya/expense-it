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
import { getResponsiveSize } from 'utills/responsiveSize';
import { baseFontSize, baseMargin, basePadding, basePaddingLg, basePaddingSm } from 'styles/spacing';
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
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState('');

  const handleDayPress = (dateString: string) => {
    setDate(dateString);
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
            {date ? (
              <Text style={styles.date}>{date}</Text>
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
                backgroundColor: primaryBlueColor,
                calendarBackground: primaryBlueColor,
                selectedDayBackgroundColor: primaryWhite,
                selectedDayTextColor: primaryWhite,
                arrowColor: primaryDarkColor,
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
  containerWrapper : {
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
    backgroundColor: primaryWhite,
    borderRadius: '5@ms',
    height: '55@vs',
    paddingHorizontal: getResponsiveSize(basePaddingSm, 'ms'),
    paddingVertical: 4,
  },
  container: {
    backgroundColor: primaryBlueColor,
  },
  calendar: {
    width: '100%',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    overflow: 'visible',
  },
  calenderView: {
    position: 'absolute',
    //width: '100%',
    left: 0,
    //backgroundColor: yellow
  },

  wrapper: {
    paddingHorizontal: getResponsiveSize(basePaddingSm-5, 'ms'),
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
    backgroundColor: primaryGrayLight,
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
    color: primaryBlueColor,
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
