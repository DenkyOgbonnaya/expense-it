import React, {FC, useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import AppModal from '../appModal/AppModal';
import {
  primaryDarkColor,
  primaryGray,
  primaryGrayLight,
  primaryWhite,
} from 'styles/colors';
import { getResponsiveSize } from 'utills/responsiveSize';
import { baseFontSize, baseMargin, basePaddingSm } from 'styles/spacing';
import { CalendarIcon, ChevronDown } from 'assets';

interface selectFieldData {
  label: string;
  value: string | number;
}
interface IProps {
  label: string;
  icon?: React.ComponentType;
  placeholder: string;
  value: string | number;
  changeHandler: (value: string | number) => void;
  errorText: string | undefined;
  customWrapperStyle?: any;
  data: selectFieldData[];
  editable?: boolean;
}
const SelectField: FC<IProps> = ({
  label,
  icon,
  placeholder,
  value,
  changeHandler,
  errorText,
  customWrapperStyle,
  data = [],
  editable = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [inputVaue, setInputValue] = useState(value || '');
  useEffect(() => {
    let val = null;
    val = data.find(option => option.value === value);
    if (val) {
      setInputValue(val.label);
    }
  }, [data]);
  const toggleModal = () => {
    setShowModal(state => !state);
  };
  const handleSelect = (item: selectFieldData) => {
    setInputValue(item.label);
    changeHandler(item.value);

    toggleModal();
  };
  return (
    <TouchableWithoutFeedback onPress={toggleModal} disabled={!editable}>
      <>
      <View style={[styles.wrapper, customWrapperStyle]}>
        {label ? (
          <View style={styles.labelContainer}>
            {icon && icon}
            <Text style={styles.label}>{label}</Text>
          </View>
        ) : null}
        <View
          style={[
            styles.textInpuContainer,
            !editable && {backgroundColor: primaryGrayLight},
          ]}>
        
            < >
              <Text
                style={[
                  styles.inputVaue,
                  !editable && {color: primaryGrayLight},
                ]}>
               <Text style={styles.textGrey}>{inputVaue}</Text>
              </Text>
              {!inputVaue ? (
                <Text style={styles.textGrey}>{placeholder}</Text>
              ) : null}
            </>
          

          <View style={styles.iconWrap}>
            <ChevronDown />
          </View>
        </View>

        <>
          {showModal && (
            <AppModal visible={showModal} closeModal={toggleModal}>
              <View style={styles.modal}>
                <View>
                  <Text style={styles.label}>{''}</Text>
                  <View style={styles.closeWrap}>
                    <TouchableOpacity onPress={toggleModal}>
                      <Text style={{fontSize: 15, color: primaryWhite}}>x</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.list}>
                  {!data.length ? (
                    <View style={styles.noDataTextWrap}>
                      <Text style={styles.noDataText}>No data</Text>
                    </View>
                  ) : (
                    <FlatList
                      keyExtractor={item => item.label}
                      data={data}
                      showsVerticalScrollIndicator={true}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => handleSelect(item)}
                          style={styles.labelRow}>
                          <Text style={styles.label}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  )}
                </View>
              </View>
            </AppModal>
          )}
        </>
      </View>

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    marginBottom: getResponsiveSize(baseMargin, 'ms'),
    backgroundColor: primaryWhite,
    borderRadius: '5@ms',
    height: '55@vs',
    paddingHorizontal: getResponsiveSize(basePaddingSm, 'ms'),
    paddingVertical: 4,
    position: 'relative',
  },
  modal: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: '10@ms',
    position: 'relative',
    maxHeight: '80%',
  },
  list: {
    backgroundColor: primaryDarkColor,
    // elevation: 3,

    // position: 'absolute',
    // zIndex: 3,
    // //top: 74,
    // left: 10,
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // paddingBottom: '20@ms',
    minHeight: '100@ms',
  },
  iconWrap: {
    alignSelf: 'flex-end',
    position: 'relative',
    top: -15,
  },
  closeWrap: {
    alignSelf: 'flex-end',
    // backgroundColor: ,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    elevation: 5,
    marginRight: '10@ms',
    marginBottom: '10@ms',
  },
  labelContainer: {
    flexDirection: 'row',
  },

  textInpuContainer: {
    paddingVertical: 0,
    // height: '45@ms',
  },
  textInput: {
    fontSize: '15@ms',
    color: primaryWhite,

    height: '45@ms',
    paddingLeft: '8@ms',
  },
  labelRow: {
    flexDirection: 'row',
    marginTop: 15,
    //borderBottomWidth: 0.3,
    borderColor: primaryGray,
    paddingHorizontal: 20,
  },
  label: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    fontWeight: '600',
  },
  noDataText: {
    color: primaryGray,
    fontSize: '12@ms',
    marginLeft: 2,
    marginBottom: 5,
    fontWeight: '600',
    alignSelf: 'center',
    position: 'relative',
    top: '30@ms',
  },
  noDataTextWrap: {
    justifyContent: 'center',
  },
  textGrey: {
    color: primaryGray,
    fontSize: getResponsiveSize(baseFontSize, 'ms'),
    fontWeight: '600',
    marginTop: getResponsiveSize(-baseMargin, 'ms'),
  },
 
  inputVaue: {
    color: primaryGray,
   
  },
  errorText: {
    color: primaryWhite,
    fontSize: '14@ms',
    marginTop: '12@ms',
    marginLeft: '8@ms',
  },
});

export default SelectField;
