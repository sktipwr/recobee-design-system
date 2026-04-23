import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { GenericModal } from 'components/Modals/GenericModal';
import { scaledWidth, scaledHeight, SCREEN_WIDTH } from 'utils/Dimensions';
import Star from 'svg/gradient_star.svg';
import Close from 'icons/Cross';
import Tick from '../../icons/Tick';
import CommonStyles from '../../../Styles';
import userProfileAPI from 'api/userProfileAPI';
import Config from 'react-native-config';
import mixpanel from 'mixpanel';
import { LOG } from 'config';

var extendedLog = LOG.extend('PredictionMeterCard');

interface PredictionMeterCardProps {
  exploreCardsData?: any[];
  onPredictionPress?: (predictionType: string, points: number) => void;
  headerText?: string;
}

const PredictionMeterCard: React.FC<PredictionMeterCardProps> = ({ exploreCardsData, onPredictionPress, headerText }) => {
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [predictionData, setPredictionData] = useState(null);

  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  useEffect(() => {
    if (exploreCardsData && exploreCardsData.length > 0) {
      const predictionCard = exploreCardsData.find(item => 
        item.type === 'prediction_meter' || item.type === 'movie_reaction'
      );
      if (predictionCard) {
        setPredictionData(predictionCard);
      }
    }
  }, [exploreCardsData]);

  // update adhoc points api
  const updateAdhocPointsApi = async () => {
    mixpanel.track('UpdateTriviaPoints', {
      screen: 'predictionMeterCard',
      purpose: 'Gave answer',
    });
    userProfileAPI
      .updateAdhocPoints('Q', "50")
      .then((response) => {
        if (response && response.data) {}
      })
      .catch((error) => {
        extendedLog.error(
          'Error in updating adhoc points: ',
          error
        );
      });
  };

  const handlePredictionPress = async (answerId: string, answerText: string) => {
    if (selectedAnswerId) return;
    
    setSelectedAnswerId(answerId);
    
    try {
      await userProfileAPI.setTriviaAnswer(predictionData.questionid, answerId, 'false');
      const points = 50;
      setEarnedPoints(points);
      updateAdhocPointsApi();
      setTimeout(() => {
        setShowCongratulationsModal(true);
        onPredictionPress?.(answerText, points);
      }, 1000);
    } catch (error) {
      console.error('Error submitting prediction:', error);
    }
  };

  const toggleCongratulationsModal = () => {
    setShowCongratulationsModal(!showCongratulationsModal);
  };

  const CongratulationsModal = () => {
    return (
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.cross} onPress={toggleCongratulationsModal}>
          <Close color={AppColors.GREY_VARIANT4} width={28} height={28} />
        </TouchableOpacity>
        <View style={CommonStyles.alignCenter}>
          <Star height={scaledWidth(128)} width={scaledWidth(128)} />
        </View>
        <Text style={styles.congratsText}>
          {StringConstants.CONGRATS_YOU_WON}
          <Text style={styles.pointsValue}>{` ${earnedPoints} pts `}</Text>
          {StringConstants.LEADERBOARD_POINTS}
        </Text>
      </View>
    );
  };

  const getPosterUrl = (movieId: string) => {
    return `https://${Config.CF_DOMAIN}/movies/poster/${movieId}.jpg`;
  };

  if (!predictionData) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{headerText || StringConstants.BOX_OFFICE_PREDICTION}</Text>
            <Text style={styles.subHeaderText}>{StringConstants.WIN_LEADERBOARD_POINTS}</Text>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.movieInfoContainer}>
                <Text style={styles.movieTitle}>{predictionData.metadata.title}</Text>
                <Text style={styles.movieGenre}>{predictionData.metadata.genre}</Text>
              </View>
              
              <View style={styles.optionsContainer}>
                {predictionData.answers.map((answer, index) => {
                  const isSelected = selectedAnswerId === answer.id;
                  return (
                    <TouchableOpacity
                      key={answer.id}
                      style={[
                        styles.optionButton,
                        isSelected && { borderColor: AppColors.LIGHT_YELLOW }
                      ]}
                      onPress={() => handlePredictionPress(answer.id, answer.answer)}
                      disabled={selectedAnswerId !== null}
                    >
                      <Text style={[
                        styles.optionText,
                        isSelected && { color: AppColors.LIGHT_YELLOW }
                      ]}>
                        {String.fromCharCode(65 + index)}. {answer.answer}
                      </Text>
                      {isSelected ? (
                        <View style={[
                          CommonStyles.radio,
                          CommonStyles.alignCentre,
                          styles.radioButton,
                          { backgroundColor: AppColors.LIGHT_YELLOW }
                        ]}>
                          <Tick height={15} width={15} />
                        </View>
                      ) : (
                        <View style={[
                          CommonStyles.radio,
                          styles.radioButton,
                          {
                            borderWidth: 1,
                            borderColor: AppColors.WHITE_VARIANT3,
                          }
                        ]} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            
            <Image 
              source={{ uri: getPosterUrl(predictionData.metadata.movieid) }}
              style={styles.posterImage}
            />
          </View>
        </View>

      {showCongratulationsModal && (
        <GenericModal
          borderRadius={12}
          isModalVisible={showCongratulationsModal}
          cancelModal={toggleCongratulationsModal}
          alignCenter={true}
          horizontalGap={90}
          hideTopSection={true}
          modalHeight={scaledWidth(270)}
          bgColor={AppColors.THEME_BG_COLOR}
          modalTitle=""
          modalBody={<CongratulationsModal />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 12,
    padding: scaledWidth(16),
    marginHorizontal: scaledWidth(16),
    marginBottom: scaledHeight(24),
  },
  headerContainer: {
    marginBottom: scaledHeight(8),
  },
  headerText: {
    fontSize: scaledWidth(18),
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: scaledHeight(4),
  },
  subHeaderText: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  contentContainer: {
    flex: 1,
  },
  movieInfoContainer: {
    marginBottom: scaledHeight(8),
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftContainer: {
    width: '60%',
    marginRight: scaledWidth(6),
  },
  posterImage: {
    width: scaledWidth(121),
    height: scaledWidth(186),
    borderRadius: 8,
    marginTop: scaledHeight(10),
    paddingVertical: scaledWidth(6),
  },
  movieTitle: {
    fontSize: scaledWidth(16),
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: scaledHeight(2),
  },
  movieGenre: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  
  optionsContainer: {
    gap: scaledHeight(6),
  },
  optionButton: {
    backgroundColor: AppColors.BLACK,
    borderRadius: 6,
    paddingVertical: scaledHeight(6),
    paddingHorizontal: scaledWidth(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: AppColors.BLACK,
  },
  optionText: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3,
    flex: 1,
    letterSpacing: 0.5,
  },
  radioButton: {
    position: 'absolute',
    right: scaledWidth(12),
  },
  modalView: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: scaledWidth(12),
    padding: scaledWidth(20),
  },
  cross: {
    padding: scaledWidth(4),
    alignItems: 'flex-end',
  },
  congratsText: {
    fontSize: scaledWidth(12),
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular,
    textAlign: 'center',
    paddingHorizontal: scaledWidth(20),
    marginTop: scaledHeight(30),
  },
  pointsValue: {
    fontSize: scaledWidth(12),
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansRegular,
  },
});

export default PredictionMeterCard;