import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCurrentUser = async (userId:string) => {
  try {
    await AsyncStorage.setItem('@current_user', userId);
  } catch (e) {
    // saving error
  }
};
export const getCurrentUser = async () => {
  try {
    const value = await AsyncStorage.getItem('@current_user');
    if (value !== null) {
      return value;
    }
    return '';
  } catch (e) {
    // error reading value
  }
};