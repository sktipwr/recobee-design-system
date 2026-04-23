import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, LayoutChangeEvent, Easing } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import AppColors from 'utils/Colors';
import StringConstants from 'utils/StringConstants';
import FontFamily from 'utils/FontFamily';
import Theatre from 'svg/theatreNew.svg';
import Cross from 'icons/Cross';
import Congrats from 'svg/congrats.svg';
import recommendationsAPI from 'api/recommendationsAPI';
import userProfileAPI from 'api/userProfileAPI';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface MovieSurveyCardProps {
  movieId: string | number;
  showSentimentOnly?: boolean;
  showPredictionOnly?: boolean;
}

export default function MovieSurveyCard({ movieId, showSentimentOnly = false, showPredictionOnly = false }: MovieSurveyCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [showSentiment, setShowSentiment] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const [shouldShow, setShouldShow] = useState(false);
  const [startingQuestion, setStartingQuestion] = useState<number>(1);
  const borderAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchSurveyData();
  }, [movieId]);

  const fetchSurveyData = async () => {
    try {
      const response = await recommendationsAPI.getSurveyQuestions(movieId);
      if (response?.status === 200 && response?.data) {
        const exists = response.data?.exists;
        
        if (showSentimentOnly) {
          const sentimentValue = exists ? response.data?.responses?.sentiment_alignment : response.data?.sentiment_alignment;
          if (sentimentValue === null) {
            setShowSentiment(true);
            setShouldShow(true);
          }
        } else if (showPredictionOnly) {
          const predictionValue = exists ? response.data?.responses?.day1_prediction : response.data?.day1_prediction;
          if (predictionValue === null) {
            setShowPrediction(true);
            setShouldShow(true);
          }
        } else {
          const surveyStage = response.data?.surveyStage;
          if (surveyStage === 0 || surveyStage === 1 || surveyStage === 2) {
            const questionNumber = surveyStage + 1;
            setStartingQuestion(questionNumber);
            setCurrentQuestion(questionNumber);
            setShouldShow(true);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching survey questions:', err);
    }
  };

  const handleAnswer = async (continueFlow: boolean, answerValue?: any) => {
    if (showSentimentOnly) {
      try {
        await recommendationsAPI.answerSurveyQuestion(movieId, { sentiment_alignment: answerValue });
        await userProfileAPI.updateAdhocPoints('A', 10);
        setShouldShow(false);
      } catch (err) {
        console.error('Error answering sentiment question:', err);
      }
      return;
    }

    if (showPredictionOnly) {
      try {
        await recommendationsAPI.answerSurveyQuestion(movieId, { day1_prediction: answerValue });
        await userProfileAPI.updateAdhocPoints('A', 10);
        setShouldShow(false);
      } catch (err) {
        console.error('Error answering prediction question:', err);
      }
      return;
    }

    const questionsAnswered = currentQuestion - startingQuestion + 1;
    
    let body: any = { survey_stage: currentQuestion  };
    
    if (currentQuestion === 1) {
      body.has_watched_trailer = answerValue;
    } else if (currentQuestion === 2) {
      body.trailer_reaction = answerValue;
    } else if (currentQuestion === 3) {
      body.watch_intent = answerValue;
    }
    try {
      await recommendationsAPI.answerSurveyQuestion(movieId, body);
      await userProfileAPI.updateAdhocPoints('A', 10);
    } catch (err) {
      console.error('Error answering survey question:', err);
    }
    
    if (!continueFlow) {
      showSuccessMessage(questionsAnswered * 10);
      return;
    }

    if (currentQuestion === 3) {
      showSuccessMessage(questionsAnswered * 10);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const showSuccessMessage = (points: number) => {
    setShowSuccess(true);
    
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldShow(false);
      });
    }, 100);
  };

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShouldShow(false);
    });
  };

  const perimeter = cardDimensions.width && cardDimensions.height 
    ? 2 * (cardDimensions.width + cardDimensions.height) 
    : 1000;

  const dashOffset = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, perimeter],
  });

  const handleCardLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (cardDimensions.width === 0) {
      setCardDimensions({ width, height });
    }
  };

  if (!shouldShow || (!showSentimentOnly && !showPredictionOnly && currentQuestion === null)) {
    return null;
  }

  if (showSuccess) {
    const questionsAnswered = currentQuestion - startingQuestion + 1;
    const points = questionsAnswered * 10;
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.successCard} onLayout={handleCardLayout}>
          {cardDimensions.width > 0 && (
            <Svg style={styles.svgBorder} width={cardDimensions.width} height={cardDimensions.height} viewBox={`0 0 ${cardDimensions.width} ${cardDimensions.height}`}>
              <AnimatedRect
                x="1.5"
                y="1.5"
                width={cardDimensions.width - 3}
                height={cardDimensions.height - 3}
                rx="12"
                stroke={AppColors.LIGHT_YELLOW4}
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${perimeter} ${perimeter}`}
                strokeDashoffset={dashOffset}
              />
            </Svg>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Cross width={24} height={24} color={AppColors.GREY_VARIANT4} />
          </TouchableOpacity>
          <View style={styles.successContent}>
            <Congrats width={48} height={48} />
            <View style={styles.textContainer}>
              <Text style={styles.successPoints}>{points} {StringConstants.POINTS_EARNED}</Text>
              <Text style={styles.successText}>{StringConstants.THANKS_FOR_SHARING_VIBE}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim , marginHorizontal: showSentimentOnly || showPredictionOnly ? -16 : 16,marginVertical: showSentimentOnly || showPredictionOnly ? -16 : 16, }]}>
      <View style={styles.card}>
        {showSentimentOnly && showSentiment && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{StringConstants.AGREE_WITH_SENTIMENT}</Text>
            <View style={styles.optionsRowWithMargin}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 1)}>
                <Text style={styles.optionText}>{StringConstants.YES}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 2)}>
                <Text style={styles.optionText}>{StringConstants.TOO_LOW}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 3)}>
                <Text style={styles.optionText}>{StringConstants.TOO_HIGH}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showPredictionOnly && showPrediction && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{StringConstants.GUESS_FIRST_DAY_COLLECTION}</Text>
            <View style={styles.optionsRowWithMargin}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 1)}>
                <Text style={styles.optionText}>{StringConstants.RANGE_1_5_CR}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 2)}>
                <Text style={styles.optionText}>{StringConstants.RANGE_5_10_CR}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 3)}>
                <Text style={styles.optionText}>{StringConstants.RANGE_10_20_CR}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 4)}>
                <Text style={styles.optionText}>{StringConstants.RANGE_20_PLUS_CR}</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        )}

        {!showSentimentOnly && currentQuestion === 1 && (
          <View style={styles.questionContainer}>
            <View style={styles.questionRow}>
              <Text style={styles.questionText}>{StringConstants.WATCHED_TRAILER}</Text>
              <View style={styles.optionsRow}>
                <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(true, true)}>
                  <Text style={styles.optionText}>{StringConstants.YES}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, false)}>
                  <Text style={styles.optionText}>{StringConstants.NO}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {!showSentimentOnly && currentQuestion === 2 && (
          <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{StringConstants.LIKED_TRAILER}</Text>
              <View style={styles.optionsRowWithMargin}>
                <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(true, 1)}>
                  <Text style={styles.optionText}>{StringConstants.LOVED_IT}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(true, 2)}>
                  <Text style={styles.optionText}>{StringConstants.OK_OK}</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(false, 3)}>
                  <Text style={styles.optionText}>{StringConstants.DID_NOT_LIKE}</Text>
                </TouchableOpacity>
              </View>
           
          </View>
        )}

        {!showSentimentOnly && currentQuestion === 3 && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{StringConstants.HOW_WATCH_MOVIE}</Text>
            <View style={styles.optionsRowWithMargin}>
              <TouchableOpacity style={styles.optionButtonLarge} onPress={() => handleAnswer(false, 1)}>
                <Theatre width={18} height={18} />
                <Text style={styles.optionText}>{StringConstants.THEATRE}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButtonLarge} onPress={() => handleAnswer(false, 2)}>
                <Text style={styles.optionText}>{StringConstants.OTT}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButtonLarge} onPress={() => handleAnswer(false, 3)}>
                 <Cross width={24} height={24} strokeWidth={2} color={AppColors.ERROR_RED} />
                <Text style={styles.optionText}>{StringConstants.WONT_WATCH}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  card: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  successCard: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  svgBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  questionContainer: {
   // paddingTop: 8,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionsRowWithMargin: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderColor: AppColors.GREY_VARIANT6,
    borderWidth: 2,
    alignItems: 'center',
  },
  optionButtonLarge: {
    borderColor: AppColors.GREY_VARIANT6,
    borderWidth: 2,    
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  optionText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansMedium,
    color: AppColors.WHITE,
  },
  successContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 16,
  },
  textContainer: {
    flex: 1,
  },
  successPoints: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    lineHeight: 22,
  },
  successText: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
    lineHeight: 20,
  },
});
