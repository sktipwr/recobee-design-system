import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Share as Shared,
} from 'react-native';
import { linkCopiedToast } from 'utils/SocialShareUtils';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../Styles';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { socialShareLink } from 'utils/HelperFunctions';
import EncryptedStorage from 'react-native-encrypted-storage';
import { LinearGradient } from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import AlertCircle from 'assets/images/icon/alert_circle';
import VectorLeft from 'assets/images/icon/vector_left';
import VectorRight from 'assets/images/icon/vector_right';
import CheckTickDouble from 'assets/images/icon/check_tick_double';
import LottieView from 'lottie-react-native';
import LockedBadge from 'assets/images/icon/locked_badges';
import BadgeLottie from 'data/lotties/congratulationsBadge.json';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import mixpanel from 'mixpanel';
import BadgeShareCard from './Cards/BadgeShareCard';
import Config from 'react-native-config';
import { ContentSharingModal } from 'components/Modals/ContentSharingModal';
import RenderBadgeImage from 'components/Common/RenderBadgeImage';
import CustomProgressBar from 'components/Common/CustomProgressBar';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  scaledHeight,
  scaledWidth,
} from 'utils/Dimensions';
const BatchDetailsModalBody = ({
  item,
  count,
  badgeType,
  goToBadgeScreen,
  seenCount = 0,
  reviewCount = 0,
}) => {
  const [sharingModalVisible, setSharingModalVisibility] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userTag, setUserTag] = useState('');
  const [userDP, setUserDP] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    EncryptedStorage.getItem('user_unq_id').then((val) => {
      setUserTag(val);
    });
    EncryptedStorage.getItem('user_id').then((val) => {
      setUserID(val);
    });
    EncryptedStorage.getItem('user_fname').then((val) => {
      setUserName(val);
    });
    EncryptedStorage.getItem('user_dp').then((val) => {
      setUserDP(val);
    });
  }, []);

  //when clicked on share
  const shareClicked = async () => {
    mixpanel.track('ShareClicked', {
      screen: 'BadgeScreen',
      purpose: 'Sharing the badge',
    });
    let shareContent = null;
    let shareOptions = null;
    let msgBody =
      `Checkout my profile on RecoBee, an App to solve the problem of What to Watch! Search by my usertag @` +
      userTag +
      `.`;

    if (Platform.OS == 'ios') {
      shareContent = {
        message:
          msgBody +
          `\n\n` +
          `https://` +
          Config.DOMAIN_URL +
          `/user/` +
          userID +
          `\n` +
          `- via RecoBee`,
      };
      shareOptions = {
        subject: msgBody,
      };
    } else {
      shareContent = {
        message:
          msgBody +
          `\n\n` +
          `https://` +
          Config.DOMAIN_URL +
          `/user/` +
          userID +
          `\n` +
          `- via RecoBee`,
      };

      shareOptions = {
        dialogTitle: 'View My Profile on RecoBee App',
      };
    }

    Shared.share(shareContent, shareOptions);
  };

  //share to instagram chats
  const shareToInstaChats = async (isWhatsApp: any) => {
    let msgBody =
      `Checkout my profile on RecoBee, an App to solve the problem of What to Watch! Search by my usertag @` +
      userTag +
      `.`;

    const url =
      msgBody +
      `\n\n` +
      `https://` +
      Config.ROOT_URL +
      `/user/` +
      userID +
      `\n` +
      `- via RecoBee`;

    socialShareLink(isWhatsApp, url);
  };

  //when link is copied
  const copyLinkClicked = () => {
    Clipboard.setString(`https://` + Config.DOMAIN_URL + `/user/` + userID);
    linkCopiedToast();
  };

  const modalBody = (
    <BadgeShareCard
      item={item}
      badgeType={badgeType}
      name={userName}
      photo={userDP}
      userDP={userDP}
      seenCount={seenCount}
      reviewCount={reviewCount}
    />
  );

  let unlocked =
    count > item.startingthreshold && count >= item.endingthreshold;

  const shareBadge = () => {
    mixpanel.track('shareClicked', {
      screen: 'BadgeScreen',
      purpose: 'sharing the earned badge',
    });
    setSharingModalVisibility(true);
  };
  return (
    <View style={[styles.container]}>
      {(badgeType == StringConstants.BADGE_TYPE_REVIEW_CONGRATULATIONS ||
        badgeType == StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS) && (
        <View style={styles.lottieContainer}>
          <LottieView autoPlay style={styles.lottie} source={BadgeLottie} />
        </View>
      )}
      {(badgeType == StringConstants.BADGE_TYPE_REVIEW_CONGRATULATIONS ||
        badgeType == StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS) && (
        <Image
          source={require('../../assets/yellowRay.png')}
          style={[styles.badgeImage]}
        />
      )}
      {badgeType === StringConstants.BADGE_TYPE_MOVIE ||
      badgeType == StringConstants.BADGE_TYPE_REVIEW ? (
        <View style={styles.header}>
          {unlocked ? (
            <Text style={styles.title}>{StringConstants.MILESTONE_BADGE}</Text>
          ) : (
            <Text style={styles.title}>{StringConstants.EXPLORER_BADGE}</Text>
          )}
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.congratulations}>
            {StringConstants.CONGRATULATIONS} {userName} 🥳
          </Text>
          <Text style={styles.unlocked}>
            {StringConstants.UNLOCKED_NEW_BADGE}
          </Text>
        </View>
      )}
      {!unlocked && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.rightText}>
            <Text style={styles.count}>{`${count}`}</Text>
            {`/${item.endingthreshold}`}
          </Text>
          <View style={styles.progressContainer}>
            <CustomProgressBar
              current={count}
              total={item.endingthreshold}
              width={300}
              height={15}
            />
          </View>
          <View style={[CommonStyles.flexRowAlignCenter, styles.remaining]}>
            <AlertCircle />
            {badgeType === StringConstants.BADGE_TYPE_MOVIE ? (
              <Text style={styles.remainingCountText}>
                <Text style={styles.remainingCount}>
                  {item.endingthreshold - count}{' '}
                </Text>
                {StringConstants.MOVIE_REMAINING_TO_UNLOCK}
              </Text>
            ) : (
              <Text style={styles.remainingCountText}>
                <Text style={styles.remainingCount}>
                  {item.endingthreshold - count}{' '}
                </Text>
                {StringConstants.REVIEW_REMAINING_TO_UNLOCK}
              </Text>
            )}
          </View>
        </View>
      )}
      {!unlocked ? (
        <View style={styles.imageContainer}>
          <LockedBadge height={184} width={184} />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <RenderBadgeImage
            condition={
              badgeType === StringConstants.BADGE_TYPE_MOVIE ||
              badgeType === StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS
            }
            tier={item.name}
            width={188.14}
            height={180}
          />
        </View>
      )}
      <View style={[CommonStyles.flexRowAlignCenter, styles.badgeName]}>
        <VectorLeft />
        <Text style={styles.name}>{item.name}</Text>
        <VectorRight />
      </View>
      {(badgeType === StringConstants.BADGE_TYPE_REVIEW_CONGRATULATIONS ||
        badgeType === StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS) && (
        <View style={{ marginTop: 10 }} />
      )}
      <View style={[CommonStyles.flexRowAlignCenter, styles.leftToAdd]}>
        <CheckTickDouble />
        {!unlocked ? (
          badgeType == StringConstants.BADGE_TYPE_MOVIE ? (
            <Text style={[styles.points]}>
              {StringConstants.ADD}
              <Text style={styles.remainingCount}>
                {' '}
                {item.endingthreshold - count}{' '}
              </Text>
              {StringConstants.MOVIE_UNLOCK}
            </Text>
          ) : (
            <Text style={[styles.points]}>
              {StringConstants.WRITE}
              <Text style={styles.remainingCount}>
                {' '}
                {item.endingthreshold - count}{' '}
              </Text>
              {StringConstants.REVIEW_UNLOCK}
            </Text>
          )
        ) : (
          <Text style={[styles.points]}>
            {(badgeType === StringConstants.BADGE_TYPE_MOVIE ||
              badgeType ===
                StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS) && (
              <>
                {StringConstants.ADDED}{' '}
                <Text style={styles.remainingCount}>{count}</Text>{' '}
                {StringConstants.ADDED_MOVIES}
              </>
            )}
            {(badgeType === StringConstants.BADGE_TYPE_REVIEW ||
              badgeType ===
                StringConstants.BADGE_TYPE_REVIEW_CONGRATULATIONS) && (
              <>
                {StringConstants.WRITTEN}{' '}
                <Text style={styles.remainingCount}>{count}</Text>{' '}
                {StringConstants.WRITTEN_REVIEWS}
              </>
            )}
          </Text>
        )}
      </View>
      {unlocked && (
        <View>
          {(badgeType === StringConstants.BADGE_TYPE_REVIEW_CONGRATULATIONS ||
            badgeType === StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS) && (
            <View style={{ marginBottom: 10 }} />
          )}
          <TouchableOpacity
            style={[CommonStyles.ottContainer, styles.shareBtn]}
            onPress={() => {
              shareBadge();
            }}
          >
            <View>
              <Text style={styles.share}>{StringConstants.SHARE}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {(badgeType === StringConstants.BADGE_TYPE_REVIEW_CONGRATULATIONS ||
        badgeType === StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS) && (
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => {
              goToBadgeScreen();
            }}
          >
            <View>
              <Text style={styles.seeAllBadges}>
                {StringConstants.SEE_ALL_BADGES}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {sharingModalVisible && (
        <ContentSharingModal
          isModalVisible={sharingModalVisible}
          modalHeight={SCREEN_HEIGHT * 0.96}
          source={'BadgeScreen'}
          id={userID}
          headerTitle={StringConstants.SHARE_BADGES}
          modalBody={modalBody}
          cancelModal={() => {
            setSharingModalVisibility(false);
          }}
          userTag={userTag}
          userID={userID}
          isMoreClicked={shareClicked}
          isCopyLinkClicked={copyLinkClicked}
          shareToInstaChatsClicked={() => shareToInstaChats(false)}
          shareToWhatsappClicked={() => shareToInstaChats(true)}
        />
      )}
    </View>
  );
};
export default BatchDetailsModalBody;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
  },
  points: {
    color: AppColors.WHITE,
    fontSize: 14,
    marginLeft: 2,
    fontFamily: FontFamily.DMSansRegular,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 5,
  },
  progressContainer: {
    alignItems: 'center',
  },
  rightText: {
    textAlign: 'right',
    color: AppColors.GREY_VARIANT4,
    marginBottom: 4,
  },
  badgeImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  shareBtn: {
    backgroundColor: AppColors.LIGHT_YELLOW,
    borderRadius: 50,
    alignSelf: 'center',
    width: scaledWidth(280),
    height: 50,
    marginTop: scaledHeight(38),
  },
  header: {
    padding: 10,
    backgroundColor: AppColors.GREY_VARIANT26,
    borderRadius: 20,
  },
  unlocked: {
    fontSize: 16,
    color: AppColors.WHITE,
    marginTop: 8,
    marginBottom: 35,
    fontFamily: FontFamily.DMSansRegular,
  },
  remaining: {
    marginTop: 10,
  },
  badgeName: {
    marginTop: scaledHeight(25),
  },
  leftToAdd: {
    marginTop: 20,
  },
  name: {
    color: AppColors.WHITE,
    fontSize: 32,
    marginHorizontal: 10,
    fontFamily: FontFamily.DMSansRegular,
  },
  congratulations: {
    fontSize: 22,
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansBold,
    textAlign: 'center',
  },
  lottie: {
    width: '100%',
    height: 500,
  },
  lottieContainer: { position: 'absolute', flex: 1 },
  count: {
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  remainingCountText: {
    marginLeft: 3,
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular,
  },
  remainingCount: { fontFamily: FontFamily.DMSansBold },
  imageContainer: {
    marginTop: scaledHeight(35),
  },
  seeAllBadges: { color: AppColors.WHITE, fontSize: 14 },
  share: { color: AppColors.BLACK },
});
