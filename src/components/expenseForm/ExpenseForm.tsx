import InputField from '../inputField/InputField';
import DateInput from '../dataInput/DateInput';
import SelectField from '../selectField/SelectField';
import AppButton from '../appButton/AppButton';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {IExpense, IExpenseErrors} from 'sharables/interface/Expense';
import {getResponsiveSize} from 'utills/responsiveSize';
import {baseMarginLg} from 'styles/spacing';
import {PlusCircle} from 'assets';

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

  const handleChange = (name: string, value: string | number) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    submitHandler(state);
  };
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
      />
      <AppButton
        btnText={expense ? 'Update' : 'Add'}
        onPressHandler={handleSubmit}
        customBtnStyle={styles.addBtn}
        icon={PlusCircle}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  addBtn: {
    marginVertical: getResponsiveSize(baseMarginLg, 'ms'),
  },
});
export default ExpenseForm;
