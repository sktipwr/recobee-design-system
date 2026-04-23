import React from 'react';
import { View, Modal as RNModal, StyleSheet, TouchableOpacity } from 'react-native';

// Mock react-native-modal with basic RN Modal
const MockModal = ({ children, isVisible, onBackdropPress, style, ...props }: any) => {
  if (!isVisible) return null;
  return (
    <RNModal visible={isVisible} transparent animationType="fade" {...props}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onBackdropPress}
      >
        <View style={[styles.content, style]}>{children}</View>
      </TouchableOpacity>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#272727',
    borderRadius: 16,
    padding: 16,
    maxWidth: '90%',
  },
});

export default MockModal;
