import React, {FC} from 'react';
import {Modal, View, StyleSheet} from 'react-native';

interface IProps {
  visible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const AppModal: FC<IProps> = ({closeModal, visible, children}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={[styles.container]}>{children}</View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
export default AppModal;
