import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StringConstants from '../../utils/StringConstants';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { getRange } from 'utils/HelperFunctions';
import MovieSurveyCard from './MovieSurveyCard';

interface PredictedCollectionCardProps {
  prediction: number;
  movieId?: string | number;
}

export default function PredictedCollectionCard({ prediction, movieId }: PredictedCollectionCardProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{StringConstants.DAY_ONE_PREDICTED}</Text>
        <View style={styles.content}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['rgba(200, 180, 80, 0.25)', 'rgba(200, 180, 80, 0.1)', 'transparent']}
            start={{ x: 0.8, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
        </View>
        <View style={styles.predictionRow}>
          <Text style={styles.rupeeSymbol}>{StringConstants.RUPEE_ICON}</Text>
          <Text style={styles.predictionValue}>{getRange(prediction)}</Text>
          <Text style={styles.crText}>{StringConstants.CRORE_SHORTHAND}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{StringConstants.AI}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{StringConstants.ML}</Text>
          </View>
          <Text style={styles.footerText}>{StringConstants.PREDICTION_BASED_ON_AI_ML}</Text>
        </View>
        <View >
          {movieId && <MovieSurveyCard movieId={movieId} showPredictionOnly />}
        </View>
      </View>
        
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 16,
  },
  content: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 12,
    padding: 20,
    borderWidth: 0.2,
    borderColor: AppColors.LIGHT_YELLOW_VARIANT10,
    overflow: 'hidden',
  },
  gradientContainer: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 130,
    height: 140,
    borderRadius: 60,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  predictionRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  rupeeSymbol: {
    fontSize: 32,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginRight: 4,
  },
  predictionValue: {
    fontSize: 48,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  crText: {
    fontSize: 28,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth:1,
    borderColor: AppColors.BLACK,
    backgroundColor: AppColors.GREY_VARIANT6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -8,
  },
  iconText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  footerText: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
