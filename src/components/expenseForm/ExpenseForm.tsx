import InputField from '../inputField/InputField';
import DateInput from '../dataInput/DateInput';
import SelectField from '../selectField/SelectField';
import AppButton from '../appButton/AppButton';
import React, {FC, useState} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense, IExpenseErrors} from 'sharables/interface/Expense';
import {getResponsiveSize} from 'utills/responsiveSize';
import {
  baseBorderRadiusLg,
  baseFontSizeLg,
  baseMargin,
  baseMarginLg,
  basePaddingXl,
} from 'styles/spacing';
import {PlusCircle} from 'assets';
import {primaryBlueColor, primaryDarkColor, primaryWhite} from 'styles/colors';
import {AppModal} from 'components';
import CategoryForm from 'components/categoryForm/CategoryForm';
import {ICategory} from 'sharables/interface/Category';

interface IProps {
  expense: IExpense | undefined;
  submitHandler: (expense: IExpense) => void;
  errorMessage?: string;
}
interface IState {
  state: IExpense;
}
const ExpenseForm: FC<IProps> = ({expense, submitHandler, errorMessage}) => {
  const [state, setState] = useState<IState['state']>(
    expense || {
      title: '',
      amount: 0,
      date: '',
      category: 0,
    },
  );
  const [errors, setErrors] = useState<IExpenseErrors>({});
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const handleChange = (name: string, value: string | number) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    submitHandler(state);
  };
  const toggleCategoryForm = () => {
    setShowCategoryForm(!showCategoryForm);
  };
  const dissMissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleSaveCategory = (category: ICategory) => {};
  return (
    <View>
      <InputField
        label="Expense Name"
        placeholder="E.g Eat out"
        changeHandler={(value: string) => {
          handleChange('title', value);
        }}
        value={state.title || ''}
        type="default"
        returnKeyType="next"
        // customWrapperStyle={styles.customInputWraper}
        // customInputStyle={styles.customInputWrap}
        // customLabelStyle={styles.labelText}
        errorText={errors.title}
      />
      <DateInput
        label="Date"
        selectHandler={(value: string) => {
          handleChange('date', value);
        }}
        placeHolder="DD/MM/YYYY"
        date={state.date || ''}
        errorText={''}
      />
      <InputField
        label="Amount Spent"
        placeholder="00.00"
        changeHandler={(value: string) => {
          handleChange('amount', value);
        }}
        value={String(state.amount || '')}
        type="numeric"
        returnKeyType="next"
        errorText={errors.title}
      />
      <SelectField
        label="Category Name"
        placeholder="-- Select Category --"
        changeHandler={value => {
          handleChange('category', value);
        }}
        data={[
          {label: 'Food', value: 1},
          {label: 'Transport', value: 2},
          {label: 'Entertainment', value: 3},
          {label: 'Shopping', value: 4},
          {label: 'Others', value: 5},
        ]}
        value={String(state.category || '')}
        errorText={errors.title}
        addFormToggler={toggleCategoryForm}
      />
      <AppButton
        btnText={expense ? 'Update' : 'Add'}
        onPressHandler={handleSubmit}
        customBtnStyle={styles.addBtn}
        icon={PlusCircle}
      />
      {showCategoryForm && (
        <AppModal visible={showCategoryForm} closeModal={toggleCategoryForm}>
          <TouchableWithoutFeedback onPress={dissMissKeyboard}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={toggleCategoryForm}>
                <View style={styles.closeModal}>
                  <Text style={styles.closeModalText}>Close</Text>
                </View>
              </TouchableOpacity>
              <>
                <Text style={styles.addCategoryText}>Add Category</Text>
                <CategoryForm
                  submitHandler={handleSaveCategory}
                  errorMessage={''}
                  category={undefined}
                />
              </>
            </View>
          </TouchableWithoutFeedback>
        </AppModal>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  addBtn: {
    marginVertical: getResponsiveSize(baseMarginLg, 'ms'),
    backgroundColor: primaryBlueColor,
    paddingVertical: getResponsiveSize(basePaddingXl + 5, 'vs'),
  },
  modalContainer: {
    backgroundColor: primaryWhite,
    width: '100%',
    padding: '10@ms',
    height: '40%',
    borderTopRightRadius: getResponsiveSize(baseBorderRadiusLg + 10, 'ms'),
    borderTopLeftRadius: getResponsiveSize(baseBorderRadiusLg + 10, 'ms'),
  },

  closeModal: {
    alignSelf: 'flex-end',
  },
  closeModalText: {
    color: primaryDarkColor,
    fontSize: '12@ms',
    marginBottom: '10@ms',
  },
  addCategoryText: {
    color: primaryDarkColor,
    fontSize: getResponsiveSize(baseFontSizeLg + 5, 'ms'),
    fontWeight: '600',
    marginBottom: getResponsiveSize(baseMargin+20, 'ms'),
  },
});
export default ExpenseForm;
