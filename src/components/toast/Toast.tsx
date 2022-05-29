import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, Text, View, Animated} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/AntDesign';
import {
  ERROR_TOAST,
  INFO_TOAST,
  SHOW_TOAST_MESSAGE,
  SUCCESS_TOAST,
} from 'constants/toastConstants';
import {
  primaryBlue,
  primaryDarkColor,
  primaryGreen,
  primaryRed,
  primaryWhite,
} from 'styles/colors';
import {baseFontFamily} from 'styles/typography';
import { Check } from 'assets';

interface toasteHandlerParam {
  duration: number;
  type: string;
  message: string;
}
const Toast = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<string>('');
  const [toastDuration, setToastDuration] = useState(5000);
  const [animationStarted, setAnimationStarted] = useState(false);
  const intervalRef = useRef<any>(null);
  const fadeValue = new Animated.Value(1);

  const bgColors = {
    [ERROR_TOAST]: primaryWhite,
    [SUCCESS_TOAST]: primaryWhite,
    [INFO_TOAST]: primaryWhite,
  };
  const iconsColors = {
    [ERROR_TOAST]: primaryRed,
    [SUCCESS_TOAST]: primaryGreen,
    [INFO_TOAST]: primaryBlue,
  };
  const icons = {
    [SUCCESS_TOAST]: <Check height={20} width={20} />,
    [INFO_TOAST]: <Text>Info</Text>,
    [ERROR_TOAST]: <Text>Error</Text>,
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, toastMessageHandler);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);
  useEffect(() => {
    if (message) {
      handleStartAnimation();
      setAnimationStarted(true);
      intervalRef.current = setInterval(() => {
        if (toastDuration === 0) {
          closeToast();
        } else {
          setToastDuration(prev => prev - 1000);
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [message, toastDuration]);

  const toastMessageHandler = ({
    message,
    type,
    duration,
  }: toasteHandlerParam) => {
    if (duration) setToastDuration(duration);
    setMessage(message);
    setMessageType(type);
  };
  const closeToast = () => {
    setMessage('');
    setToastDuration(5000);
    setAnimationStarted(false);
  };

  const handleStartAnimation = () => {
    if (!animationStarted)
      return Animated.timing(fadeValue, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }).start();
  };

  if (!message) return null;
  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: bgColors[messageType]},
        {opacity: fadeValue},
      ]}>
      {icons[messageType]}
      <Text style={styles.toastText}> {message} </Text>
    </Animated.View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: '4%',
    right: '4%',
    backgroundColor: primaryRed,
    zIndex: 1,
    elevation: 1,
    padding: '10@ms',
    borderRadius: '5@ms',
  },
  toastText: {
    color: primaryDarkColor,
    fontSize: '14@ms',
    fontFamily: baseFontFamily,
    marginLeft: '10@ms',
    fontWeight: '800',
  },
});
export default Toast;
