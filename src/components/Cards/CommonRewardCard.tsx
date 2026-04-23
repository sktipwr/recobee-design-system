import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { scaledWidth, scaledHeight } from 'utils/Dimensions';

export interface CommonRewardCardProps {
  onPress: () => void;
  title: string;
  subtitle: string;
  categories?: string;
  rightIcon: ReactNode;
  backgroundDecoration: ReactNode;
  rightImage?: ReactNode;
  bottomContent?: ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  cardRef?: any;
}

const CommonRewardCard: React.FC<CommonRewardCardProps> = ({
  onPress,
  title,
  subtitle,
  categories,
  rightIcon,
  backgroundDecoration,
  rightImage,
  bottomContent,
  containerStyle,
  titleStyle,
  subtitleStyle,
  cardRef,
}) => {
  return (
    <TouchableOpacity ref={cardRef} style={[styles.container, containerStyle]} onPress={onPress}>
      {backgroundDecoration}
      
      <View style={styles.header}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {rightIcon}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
          {categories && <Text style={styles.categories}>{categories}</Text>}
        </View>
        
        {rightImage && <View style={styles.rightImageContainer}>{rightImage}</View>}
      </View>
      
      {bottomContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 12,
    padding: scaledWidth(16),
    marginHorizontal: 0,
    marginBottom: scaledHeight(16),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaledHeight(8),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: scaledWidth(12),
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  subtitle: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginBottom: scaledHeight(8),
    lineHeight: scaledHeight(16),
  },
  categories: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT4,
  },
  rightImageContainer: {
    justifyContent: 'flex-end',
  },
});

export default CommonRewardCard;
