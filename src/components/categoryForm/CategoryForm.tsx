import InputField from '../inputField/InputField';
import AppButton from '../appButton/AppButton';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {ICategory, ICategoryErrors} from 'sharables/interface/Category';
import {getResponsiveSize} from 'utills/responsiveSize';
import {baseMarginLg, basePaddingXl} from 'styles/spacing';
import {primaryBlueColor} from 'styles/colors';

interface IProps {
  category: ICategory | undefined;
  submitHandler: (category: ICategory) => void;
  errorMessage?: string;
  loading: boolean
}
interface IState {
  state: ICategory;
}
const CategoryForm: FC<IProps> = ({category, submitHandler, errorMessage, loading}) => {
  const [state, setState] = useState<IState['state']>(
    category || {
      name: '',
    },
  );
  const [errors, setErrors] = useState<ICategoryErrors>({name: ''});

  const handleChange = (name: string, value: string | number) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    if(!errors.name){
      setErrors({
        name:"Enter category name"
      })
      return
    }
    submitHandler(state);
  };
  return (
    <View>
      <InputField
        label="Category Name"
        placeholder="E.g Fashion"
        changeHandler={(value: string) => {
          handleChange('name', value);
        }}
        value={state.name || ''}
        type="default"
        returnKeyType="next"
        errorText={errors.name}
      />

      <AppButton
        btnText="Save"
        onPressHandler={handleSubmit}
        customBtnStyle={styles.addBtn}
        icon={null}
        disabled={loading}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  addBtn: {
    marginVertical: getResponsiveSize(baseMarginLg+10, 'ms'),
    backgroundColor: primaryBlueColor,
    padding: getResponsiveSize(basePaddingXl + 15, 'vs'),
    alignSelf: 'flex-end',
  },
});
export default CategoryForm;
