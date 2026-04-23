import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { GenericModal } from 'components/Modals/GenericModal';
import { scaledWidth, scaledHeight, SCREEN_WIDTH } from 'utils/Dimensions';
import Star from 'svg/gradient_star.svg';
import Close from 'icons/Cross';
import CommonStyles from '../../../Styles';
import userProfileAPI from 'api/userProfileAPI';
import mixpanel from 'mixpanel';
import { LOG } from 'config';

interface TrailerReactionCardProps {
  exploreCardsData?: any[];
  onReactionPress?: (reactionType: string, points: number) => void;
}

var extendedLog = LOG.extend('TrailerReactionCard');


const TrailerReactionCard: React.FC<TrailerReactionCardProps> = ({ exploreCardsData, onReactionPress }) => {
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [trailerData, setTrailerData] = useState(null);


  useEffect(() => {
    if (exploreCardsData && exploreCardsData.length > 0) {
      const trailerCard = exploreCardsData.find(item => item.type === 'trailer_reaction');
      if (trailerCard) {
        setTrailerData(trailerCard);
      }
    }
  }, [exploreCardsData]);

  // update adhoc points api
  const updateAdhocPointsApi = async () => {
    mixpanel.track('UpdateTriviaPoints', {
      screen: 'TrailerReactionCard',
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

  const handleReactionPress = async (reactionType: string, answerId: string) => {
    try {
      await userProfileAPI.setTriviaAnswer(trailerData.questionid, answerId, 'false');
      const points = 50;
      setEarnedPoints(points);
      updateAdhocPointsApi();
      setShowCongratulationsModal(true);
      onReactionPress?.(reactionType, points);
    } catch (error) {
      console.error('Error submitting reaction:', error);
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

  const getAnswerIdForReaction = (reactionType: string) => {
    const answers = trailerData.answers;
    switch (reactionType) {
      case 'loved':
        return answers.find(a => a.answer.toLowerCase().includes('loved'))?.id;
      case 'okay':
        return answers.find(a => a.answer.toLowerCase().includes('ok'))?.id;
      case 'didnt_connect':
        return answers.find(a => a.answer.toLowerCase().includes('not convinced'))?.id;
      default:
        return answers[0]?.id;
    }
  };

  return (
    <>
   { trailerData && ( <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{StringConstants.WATCH_AND_SHARE_OPINION}</Text>
        <Text style={styles.subHeaderText}>{StringConstants.WIN_LEADERBOARD_POINTS}</Text>
      </View>
      
      <View style={styles.trailerContainer}>
        <YoutubePlayer
          height={SCREEN_WIDTH * 0.5}
          play={false}
          videoId={trailerData.metadata.trailerkey}
          webViewProps={{
            allowsInlineMediaPlayback: false,
          }}
          webViewStyle={{ opacity: 0.99 }}
        />
      </View>

      <View style={styles.reactionsContainer}>
        <TouchableOpacity 
          style={styles.reactionButton}
          onPress={() => handleReactionPress('loved', getAnswerIdForReaction('loved'))}
        >
          <Image 
            source={require('assets/images/png/heart_smily.png')} 
            style={styles.reactionIcon} 
          />
          <Text style={styles.reactionText}>{StringConstants.LOVED_IT}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.reactionButton}
          onPress={() => handleReactionPress('okay', getAnswerIdForReaction('okay'))}
        >
          <Image 
            source={require('assets/images/png/happy_smily.png')} 
            style={styles.reactionIcon} 
          />
          <Text style={styles.reactionText}>{StringConstants.IT_WAS_OKAY}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.reactionButton}
          onPress={() => handleReactionPress('didnt_connect', getAnswerIdForReaction('didnt_connect'))}
        >
          <Image 
            source={require('assets/images/png/sad_smily.png')} 
            style={styles.reactionIcon} 
          />
          <Text style={styles.reactionText}>{StringConstants.DIDNT_CONNECT}</Text>
        </TouchableOpacity>
      </View>
    </View>)}
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
      )}</>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: scaledWidth(8),
    marginHorizontal: scaledWidth(16),
    marginBottom: scaledHeight(24),
  },
  headerContainer: {
    marginBottom: scaledHeight(8),
  },
  headerText: {
    fontSize: scaledWidth(18),
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3,
    marginBottom: scaledHeight(4),
  },
  subHeaderText: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  trailerContainer: {
    position: 'relative',
    borderRadius: scaledWidth(8),
    overflow: 'hidden',
  },
  trailerBackground: {
    width: '100%',
    minHeight: SCREEN_WIDTH * 0.5,
  },
  trailerBackgroundImage: {
    borderRadius: scaledWidth(8),
  },

  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaledWidth(8),
  },
  reactionIcon: {
    width: scaledWidth(24),
    height: scaledWidth(24),
  },
  reactionText: {
    fontSize: scaledWidth(12),
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3,
    marginTop: scaledHeight(4),
    textAlign: 'center',
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

export default TrailerReactionCard;