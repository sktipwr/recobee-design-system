import React from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConditionalSafeArea = ({ children, style }) => {
  // On Android, wrap children in SafeAreaView; on iOS, fallback to a simple View.
  return Platform.OS === 'android' ? (
    <SafeAreaView style={style}>
      {children}
    </SafeAreaView>
  ) : (
    <View style={style}>
      {children}
    </View>
  );
};

export default ConditionalSafeArea;
