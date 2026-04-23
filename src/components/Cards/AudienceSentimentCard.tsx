import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StringConstants from '../../utils/StringConstants';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import MovieSurveyCard from './MovieSurveyCard';

interface AudienceSentimentCardProps {
  positive: number;
  neutral: number;
  negative: number;
  sentimentValue: number;
  fromMovieDetails?: boolean;
  movieId?: string | number;
}

export default function AudienceSentimentCard({
  positive,
  neutral,
  negative,
  sentimentValue = 0,
  fromMovieDetails= false,
  movieId,
}: AudienceSentimentCardProps) {
  const total = positive + neutral + negative;
  const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;
  const neutralPercent = total > 0 ? Math.round((neutral / total) * 100) : 0;
  const negativePercent = total > 0 ? Math.round((negative / total) * 100) : 0;

  const getSentimentLevel = () => {
    if (positivePercent >= 80) return 'Very High';
    if (positivePercent >= 65) return 'High';
    if (positivePercent >= 50) return 'Medium';
    return 'Low';
  };

  const sentimentLevel = getSentimentLevel();

  return (
    <>
      <View style={fromMovieDetails ? styles.containerFromMovieDetails : styles.container}>
        {!fromMovieDetails && <View style={styles.header}>
          <Text style={styles.title}>{StringConstants.REVIEW_SENTIMENT}</Text>
        </View>}
        <View style={styles.content}>
       { !fromMovieDetails && <View style={styles.excitementRow}>
          <Text style={styles.excitementLabel}>{StringConstants.SENTIMENT_SCORE}</Text>
          <View style={styles.levelContainer}>
          <Text style={styles.percentageText}>{Math.round(sentimentValue * 100)}/</Text>
          <Text style={styles.percentageByHundred}>{StringConstants.HUNDRED}</Text>
          </View>
        </View>}

        <View style={styles.barContainer}>
          <View style={[styles.barSegment, styles.negativeBar, { flex: negativePercent }]} />
          <View style={[styles.barSegment, styles.neutralBar, { flex: neutralPercent }]} />
          <View style={[styles.barSegment, styles.positiveBar, { flex: positivePercent }]} />

        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.negativeDot]} />
            <Text style={styles.legendText}>{StringConstants.NEGATIVE}  </Text>
            <Text style={styles.legendPercentText}>{negativePercent}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.neutralDot]} />
            <Text style={styles.legendText}>{StringConstants.NEUTRAL}  </Text>
            <Text style={styles.legendPercentText}>{neutralPercent}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.positiveDot]} />
            <Text style={styles.legendText}>{StringConstants.POSITIVE}  </Text>
            <Text style={styles.legendPercentText}>{positivePercent}%</Text>
          </View>
        </View>

          <Text style={styles.footerText}>
           {`${StringConstants.BASED_ON} ${total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total} ${fromMovieDetails ? StringConstants.REVIEWS_ON_RECOBEE : StringConstants.TRAILER_REACTIONS_SOCIAL_SIGNALS}`}
          </Text>
          <View >
            {movieId && <MovieSurveyCard movieId={movieId} showSentimentOnly={true} />}
          </View>
        </View>    
      </View>  
    </>
  );
}

const styles = StyleSheet.create({
  containerFromMovieDetails: { 
    marginHorizontal: -16,
    marginTop: 16,
   },
  container: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  levelIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  levelText: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.LIGHT_YELLOW4,
  },
  content: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: 16,
  },
  excitementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  excitementLabel: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
  },
  percentageText: {
    fontSize: 22,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  percentageByHundred: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  barContainer: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  barSegment: {
    height: '100%',
  },
  positiveBar: {
    backgroundColor: AppColors.GREEN_VARIANT1,
  },
  neutralBar: {
    backgroundColor: AppColors.YELLOW_VARIANT1,
  },
  negativeBar: {
    backgroundColor: AppColors.RED_VARIANT,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  positiveDot: {
    backgroundColor: AppColors.GREEN_VARIANT1,
  },
  neutralDot: {
    backgroundColor: AppColors.YELLOW_VARIANT1,
  },
  negativeDot: {
    backgroundColor: AppColors.RED_VARIANT,
  },
  legendText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
  },
  legendPercentText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE,
  },
  footerText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
    textAlign: 'left',
  },
});
