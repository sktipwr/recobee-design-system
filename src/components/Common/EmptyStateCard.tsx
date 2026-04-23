import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'react-native-linear-gradient';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';

interface EmptyStateCardProps {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
  buttonText: string;
  onButtonPress: () => void;
  arrowIcon: React.ReactNode;
}

export default function EmptyStateCard({
  icon,
  heading,
  subheading,
  onButtonPress,
  buttonText,
  arrowIcon,
}: EmptyStateCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subheading}>{subheading}</Text>
      <TouchableOpacity onPress={onButtonPress} style={styles.buttonContainer}>
        <MaskedView
          maskElement={<Text style={styles.buttonText}>{buttonText}</Text>}
        >
          <LinearGradient
            colors={[AppColors.LIGHT_YELLOW_GRADIENT, AppColors.DARK_YELLOW_GRADIENT]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.buttonText, { opacity: 0 }]}>{buttonText}</Text>
          </LinearGradient>
        </MaskedView>
        {arrowIcon}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    marginBottom: 2,
  },
  heading: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT1,
    marginBottom: 2,
  },
  subheading: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT1,
    marginBottom: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansMedium,
  },
});
