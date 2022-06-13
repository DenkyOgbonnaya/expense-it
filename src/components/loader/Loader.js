import { LoaderLottie } from 'assets';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, } from 'react-native';
import  AnimatedLoader from 'react-native-animated-loader';

const Loader = ({children}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    
    (() => {
      setVisible(true)
    })();
    return () => {
      setVisible(false)
    };
  }, []);

  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(0, 0, 0, 0.3)"
      source={LoaderLottie}
      animationStyle={styles.lottie}
      speed={1}
    >
      {children}
    </AnimatedLoader>
  );
};
export default Loader;
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 150,
    position: 'relative'
  },
});
