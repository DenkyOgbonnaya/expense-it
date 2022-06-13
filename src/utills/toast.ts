import {DeviceEventEmitter} from 'react-native';
import {
  ERROR_TOAST,
  INFO_TOAST,
  SHOW_TOAST_MESSAGE,
  SUCCESS_TOAST,
} from 'constants/toastConstants';
import { toasteHandlerParam } from 'components/toast/Toast';

const toast = {
  message: (options:toasteHandlerParam) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: INFO_TOAST});
  },
  success: (options:toasteHandlerParam) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: SUCCESS_TOAST});
  },
  error: (options: toasteHandlerParam) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: ERROR_TOAST});
  },
};

export default toast;
