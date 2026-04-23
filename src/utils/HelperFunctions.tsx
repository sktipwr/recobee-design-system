import { Platform, Linking,   Share as Shared, View, Text, FlatList, ScrollView, ViewStyle, TextStyle} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import ImagePicker from 'react-native-image-crop-picker';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import ImageToBase64 from 'react-native-image-base64';
import Config from "react-native-config";
import GridViewIcon from 'svg/grid-view';
import Media from 'svg/media';
import PlatformIcon from 'svg/platform';
import ChooseMood from 'svg/mood_plus';
import Star from 'icons/Rate';
import Time from 'svg/time';
import ListViewIcon from 'icons/ListViewIcon';
import TimeLineIcon from 'svg/timeline_coloured';
import Share from 'react-native-share';
import Toast from "react-native-toast-message";
import ShareIOS from "icons/ShareIOS";
import ShareGreyAndroid from 'svg/share_grey';
import InAppReview from 'react-native-in-app-review';
import Critic from 'svg/critic';
import CelebrityCritic from 'svg/celebrity_critic';
import ProfessionCritic from 'svg/prof_critic';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledHeight } from "./Dimensions";
import StringConstants from "./StringConstants";
import AppColors from "./Colors";
import EncryptedStorage from "react-native-encrypted-storage";
import CommonStyles from "../../Styles";
import userProfileAPI from "api/userProfileAPI";
import searchMainPageDefaultConfig from 'data/searchMainPage.json';
import { LOG } from 'config';
import FontFamily from "./FontFamily";
import RazorpayCheckout from 'react-native-razorpay';
import LanguageIcon from 'svg/ion_language'
import GenreIcon from 'svg/mask_happy.svg'
import ShareAndroid from "icons/ShareAndroid";
export const SeparatorLine = () => <View style={CommonStyles.horizontalLine} />;
import StarFilled from 'icons/StarFilled';
import HomeMovieCard from "../../src/components/Cards/HomeMovieCard";

const extendedLogsHelper = LOG.extend('HelperFunctions');

export const BOTTOM_TAB_HEIGHT = scaledHeight(22);

export const ListViewType = Object.freeze({
  GRID: 'grid',
  LIST: 'list',
  TIMELINE: 'timeline'
});

export const focusedHomeTab = Object.freeze({
  EXPLORE: 'Exploration',
  RECO: 'Recommendation',
});

export const TriviaStatus = Object.freeze({
  TRIVIA_NOT_ATTEMPTED: 'TRIVIA_NOT_ATTEMPTED',
  TRIVIA_WON: 'TRIVIA_WON',
  TRIVIA_LOST_WITH_TIMEOUT: 'TRIVIA_LOST_WITH_TIMEOUT',
  TRIVIA_LOST: 'TRIVIA_LOST'

});

export const AdPosition = Object.freeze({
  HOME_TOP: 'HOME_TOP',
  HOME_BOTTOM: 'HOME_BOTTOM',
  MOVIE_DETAILS: 'MOVIE_DETAILS',
  SHORTS : 'SHORTS',
  RECENT_RELEASES: 'RECENT_RELEASES',
  SOCIAL_FEED_BOTTOM: 'SOCIAL_FEED_BOTTOM',
  TRIVIA_CAROUSEL: 'TRIVIA_CAROUSEL'
});

export const TMDB_BASEURL = 'https://image.tmdb.org/t/p/w780/';
export const STATIC_COMMUNITY_ID = "33506abcd78potqq"
export const EMAIL_REGEX_TEST =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const GRAPH_MONTHS_LABEL = ['Jan', '', 'Mar', '', 'May', '', 'Jul', '', 'Sept', '', 'Nov', '']

const BADGE_CONSTRAINTS = [
  {
    'constraint_type': 'add_to_list',
    'badges_list': [
      {
        'max_allowed': 20,
        'type': 'admin'
      },
      {
        'max_allowed': 20,
        'type': 'critic'
      },
      {
        'max_allowed': 25,
        'type': 'prof'
      },
      {
        'max_allowed': Infinity,
        'type': 'celebrity'
      },
      {
        'max_allowed': Infinity,
        'type': 'premium'
      },
      {
        'max_allowed': 15,
        'type': null
      },
      {
        'max_allowed': 15,
        'type': ''
      },
      {
        'max_allowed': 15,
        'type': undefined
      },
    ],
  },
  {
    'constraint_type': 'community',
    'badges_list': [
      {
        'max_allowed': 2,
        'type': 'admin'
      },
      {
        'max_allowed': 2,
        'type': 'verified'
      },
      {
        'max_allowed': 2,
        'type': 'critic'
      },
      {
        'max_allowed': 5,
        'type': 'prof'
      },
      {
        'max_allowed': Infinity,
        'type': 'celebrity'
      },
      {
        'max_allowed': Infinity,
        'type': 'premium'
      },
      {
        'max_allowed': 0,
        'type': null
      },
      {
        'max_allowed': 0,
        'type': ''
      },
      {
        'max_allowed': 0,
        'type': undefined
      },
    ],
  },
];

export const NO_CONTACTS_ON_RECOBEE = {
  title: StringConstants.OH_SNAP,
  icon: "smile",
  width: SCREEN_WIDTH * 0.233,
  height: SCREEN_WIDTH * 0.208,
  message: StringConstants.INVITE_FRIENDS_ON_RECO_BEE,
};

export const MATCH_NOT_FOUND_ON_RECOBEE = {
  title: StringConstants.OH_SNAP,
  icon: "smile",
  width: SCREEN_WIDTH * 0.233,
  height: SCREEN_WIDTH * 0.208,
  message: StringConstants.MATCH_NOT_FOUND_DESC,
};

export const NO_FRIENDS_TO_ADD = {
  title: StringConstants.NO_FRIENDS_TO_ADD,
  icon: "sad",
  width: SCREEN_WIDTH * 0.233,
  height: SCREEN_WIDTH * 0.208,
  message: '',
};

export const NO_RESULTS_FOUND = {
  title: "Oh Snap!",
  icon: "thinking",
  width: SCREEN_WIDTH * 0.233,
  height: SCREEN_WIDTH * 0.208,
  message: "No Results Found. Try different search word.",
};


export const DP_ACTION_LIST = [
  { actionName: 'Remove Photo', actionIcon: 'delete' },
  { actionName: 'Add from Gallery', actionIcon: 'gallery' },
  { actionName: 'Camera', actionIcon: 'camera' },
];

export const NO_DP_ACTION_LIST = [
  { actionName: 'Add from Gallery', actionIcon: 'gallery' },
  { actionName: 'Camera', actionIcon: 'camera' },
];



export const checkGalleryPickerPermissions = async() => {
    let permissionGiven = true;
    
    let permissionResult;
    if (Platform.OS === 'android') {
      permissionResult = await requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      ]);
    } else {
      permissionResult = await requestMultiple([
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      ]);
    }
    
    if (
      (Platform.OS === 'android' &&
        permissionResult[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !==
          'granted' &&
        permissionResult[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !==
          'granted' && 
          permissionResult[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] !==
          'granted'
          ) ||
      (Platform.OS === 'ios' &&
        permissionResult[PERMISSIONS.IOS.PHOTO_LIBRARY] !== 'granted' &&
        permissionResult[PERMISSIONS.IOS.PHOTO_LIBRARY] !== 'limited' &&
        permissionResult[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] !==
          'limited' &&
        permissionResult[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] !== 'granted')
    ) {
        permissionGiven = false;
    }
    return permissionGiven;

}

export const openGalleryPicker = async (width = 1080, height = 1080) => {
  let pickerResult = await ImagePicker.openPicker({
    cropping: true,
    showCropGuidelines: false,
    width: width,
    height: height,
    mediaType: 'photo',
  });

  return pickerResult;
}

export const openImageManipulator = async (
  pickerResult: any,
  outHeight: number,
  outWidth: number
)=> {
  try {
    if( Platform.OS === 'ios'){
    let uri = pickerResult.sourceURL;
    const cropRegion = pickerResult.cropRect
      ? {
          x: pickerResult.cropRect.x,
          y: pickerResult.cropRect.y,
          width: pickerResult.cropRect.width,
          height: pickerResult.cropRect.height,
        }
      : { x: 0, y: 0, width: pickerResult.width, height: pickerResult.height };
    const size = { width: outWidth, height: outHeight };
    const quality = 90;
    const processedPath = await RNPhotoManipulator.batch( uri, [], cropRegion, size, quality );
    const base64String = await ImageToBase64.getBase64String(processedPath);
    return base64String;
  } else {
    const cropRegion = { x: 0, y: 0, width:pickerResult.width, height: pickerResult.height };
    const quality = 90;
    const size = { width: outWidth, height:  outHeight}
    const profileImage = await RNPhotoManipulator.batch(pickerResult.path, [], cropRegion, size , quality);
    const base64String = await ImageToBase64.getBase64String(profileImage);
    return base64String;
  }
} catch (err) {
    console.error('openImageManipulator error', err);
  }
};

export const  getSuffixForNumber = (value) => {
  let number = typeof value == 'string' ? parseInt(value) : value;
  const lastDigit = number % 10;
  const suffixes = ["th", "st", "nd", "rd"];

  // Special case for numbers ending in 11, 12, and 13
  const specialCase = number % 100 >= 11 && number % 100 <= 13;

  // Use the appropriate suffix
  const suffix = specialCase ? "th" : suffixes[lastDigit] || "th";

  return `${suffix}`;
}

export const monthShortDateYearFormat = (inputDateStr) => {

    const date = new Date(inputDateStr);
    const month = MONTHS_SHORTNAME[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day < 10 ? '0' + day : day}, ${year}`;

    return formattedDate;

}

export const abbreviateNumber = (number) => {
  const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

  // Short scale: (1 billion = 10^9, 1 trillion = 10^12, etc.)
  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  if (tier === 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}



export const indexOfLatestDateTime = (data: any) => {
  // Find the index of the item with the latest date-time
  const indexOfLatestItem = data.reduce((maxIndex, currentObject, currentIndex, array) => {
    const currentDateTime = new Date(currentObject.datetime);
    const maxDateTime = new Date(array[maxIndex].datetime);
  
    if (currentDateTime > maxDateTime) {
      return currentIndex;
    } else {
      return maxIndex;
    }
  }, 0);
  return indexOfLatestItem;
}
  
export const retriveUserRank = (storedUserRank: any) => {
  let userRank = '';
  if(storedUserRank != null){
    try {
      let parsedRankData = JSON.parse(storedUserRank);
      if(typeof (parsedRankData?.rank) == 'number'){
        userRank = parsedRankData?.rank;
      }
      else if(typeof (parsedRankData?.rank) == 'string'){
        userRank = `${parseInt(parsedRankData?.rank)}`
      }
    }
    catch(error){
      console.error("Error:", error?.message);
    }
  }
  return userRank;
}

export const getBadgeInfo = async() => {
  try {
    const response = await fetch(CLOUD_BASEURL + 'badgeInfo.json');
    let json = await response.json();

    return json;
  }
  catch (e) {
    console.log({e})
  }
}

export const fetchPremiumInfo = async() => {
  try {
    const response = await fetch(CLOUD_BASEURL + 'premiumData.json');
    let json = await response.json();
    return json;
  }
  catch (e) {
    console.log({e})
  }
}

export const getOTTLinkingUrl = (appLink: string, OTTData: any, ottID: any, title: any, isNameBasedComparision: boolean) => {
  let appUrl = "";
  // get selected ott value based on item clicked
  const condition = (obj) => obj.code == appLink;
  const nameBasedCondition = (obj) => obj.name == appLink;
  const selectedOTT = OTTData?.find(isNameBasedComparision ? nameBasedCondition : condition);
 
  if (ottID && ottID != "NULL" && ottID != "null" && ottID != "") {
    let ottWatchUrl = selectedOTT?.watchUrl.replace('WATCH_ID_HERE', ottID);
    appUrl = ottWatchUrl;
  }
  else if(title != null && title != undefined){
    // get appUrl based on whether to search or watch item on ott platform
    const isSearchableUrl = OTTData?.some(obj => obj?.searchUrl?.includes('SEARCH_TITLE_HERE'));
    let ottSearchUrl;
    if((appLink == 'Amazon Prime Video' ||
      appLink == 'Amazon Video' || appLink == 'aiv') && Platform.OS == 'android'){
        ottSearchUrl = selectedOTT?.defaultUrl;
        appUrl = ottSearchUrl;
    }
    else {
      if(isSearchableUrl){
        ottSearchUrl = selectedOTT?.searchUrl.replace('SEARCH_TITLE_HERE', title);
        appUrl = ottSearchUrl;
      }
      else {
        appUrl = selectedOTT?.defaultUrl;
      }
    } 

  }
  else {
    appUrl = selectedOTT?.defaultUrl;
  }
  return appUrl;
}

export const openLinkingUrl = (link : string) => {
  try {
    Linking.openURL(link);
    // Process the response here
  } catch (error) {
    console.error('Error:', error.message);
  }
} 

export const lowestMatchingIndexInFirstArray = (arrayA, arrayB) => {
  let lowestIndex = Infinity;

  for (let i = 0; i < arrayA.length; i++) {
    for (let j = 0; j < arrayB.length; j++) {
      if (arrayA[i] === arrayB[j] && i < lowestIndex) {
        lowestIndex = i;
      }
    }
  }

  if (lowestIndex === Infinity) {
    return -1; // No matching elements found
  } else {
    return lowestIndex;
  }
}

export const CLOUD_BASEURL = "https://" + Config.CF_DOMAIN + "/movies/app/";
export const POSTER_IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w780/';

export const calculatePercentage = (value) => {
  if (value) {
    return (value / 5) * 100;
  } else {
    return 0;
  }
};

// Function to remove duplicate entries based on a specific key
export function removeDuplicates(array, key) {
  const seen = new Set();
  return array.filter(obj => {
    const objKey = obj[key];
    if (!seen.has(objKey)) {
      seen.add(objKey);
      return true;
    }
    return false;
  });
}

export const timelineFormattedData = (data, isSeen = false, isUpcoming = false, isWatchlist = false) => {
  if(data?.length > 0){
      const arrangedData = data.reduce((acc, obj) => {
      const date = new Date(isSeen ? obj.modifiedat : isUpcoming ? obj?.releasedatetmdb : isWatchlist ? obj.createdat : obj.datetime);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const formattedDate = `${("0" + day).slice(-2)} ${month.substr(0, 3)}`;
      const title = `${year} ${month}`;

      if (!acc[title]) {
          acc[title] = { title, data: [] };
      }

      let existingDay;
      for (const dayObj of acc[title].data) {
          if (Object.keys(dayObj)[0] === formattedDate) {
              existingDay = dayObj;
              break;
          }
      }

      if (!existingDay) {
          existingDay = { [formattedDate]: [] };
          acc[title].data.push(existingDay);
      }

      existingDay[formattedDate].push(obj);

      return acc;
        }, {});
        const result = Object.values(arrangedData);

        return result;
      }
      else return [];
}

export const getListViewIcon = (selectedView) => {
  let icon = <TimeLineIcon />;
 
  if(selectedView == ListViewType.TIMELINE){
    icon = <GridViewIcon />;
  }
  else if(selectedView == ListViewType.GRID){
    icon =  <ListViewIcon />;
  }
  else if(selectedView == ListViewType.LIST){
    icon =  <TimeLineIcon />;
  }

  return icon;
}

export const updateListView = (selectedView) => {
  let listView = ListViewType.TIMELINE;
  if(selectedView == ListViewType.TIMELINE){
    listView = ListViewType.GRID
  }
  else if(selectedView == ListViewType.GRID){
    listView = ListViewType.LIST
  }
  else if(selectedView == ListViewType.LIST){
    listView = ListViewType.TIMELINE
  }
  return listView;
}
 // function to format the title to lower-case and - separated 
 const formatTitleForUrl = title =>
  title.toLowerCase().replace(/\s+/g, '-');
  // to extract only the year out of the releasdate string 
const   extractYear = str => {
    const match = str.match(/\d{4}/);
    return match ? match[0] : '';
  };
  export const commonShareCb = async (reviewObj,releasdate) => {
    let postId = reviewObj?.postid ?? reviewObj?.id ?? reviewObj?.movieid;
  let shareContent = null;
  let shareOptions = null;

  let url =
    `https://` +
    Config.ROOT_URL +
    `/movie/` +extractYear(releasdate) + `/`+ formatTitleForUrl(reviewObj.moviename)+ `/review/` +
    postId?.substring(6);
  let reviewLength = reviewObj?.reviewcomment?.length;
  let trimLength = 0;
  let shareMessage = '';
  if (reviewLength % 2 == 0) {
    trimLength = reviewLength / 2;
  } else {
    trimLength = (reviewLength + 1) / 2;
  }

  if (reviewLength < 280) {
    trimLength = reviewLength;
    shareMessage =
      `Checkout Review of '` +
      reviewObj?.moviename +
      `'` +
      ` on RecoBee\n\n` +
      reviewObj?.reviewcomment?.substring(0, trimLength) +
      `\n\n\Continue Reading it on RecoBee, open the App now: ` +
      url;
  } else {
    shareMessage =
      `Checkout Review of '` +
      reviewObj.moviename +
      `'` +
      ` on RecoBee\n\n` +
      reviewObj?.reviewcomment?.substring(0, trimLength) +
      `..\n\n\To Finish reading the Review, Click: ` +
      url;
  }

  if (Platform.OS == 'ios') {
    shareContent = {
      message: shareMessage,
    };
    shareOptions = {
      subject: reviewObj?.moviename + ' Review',
    };
  } else {
    shareContent = {
      message: shareMessage,
    };

    shareOptions = {
      dialogTitle: 'Check the Review on RecoBee App',
    };
  }
  //setSharingModalVisibility(true);
  Shared.share(shareContent, shareOptions);
};


export const shareToInstaChats = async (reviewObj, isWhatsApp,releasdate) => {
  let postId = reviewObj?.postid ?? reviewObj?.id ?? reviewObj?.movieid;
  let url =
    `https://` +
    Config.ROOT_URL +
    `/movie/` +extractYear(releasdate) + `/`+ formatTitleForUrl(reviewObj.moviename)+ `/review/` +
    postId.substring(6);
  let reviewLength = reviewObj?.reviewcomment?.length;
  let trimLength = 0;
  let shareMessage = '';
  if (reviewLength % 2 == 0) {
    trimLength = reviewLength / 2;
  } else {
    trimLength = (reviewLength + 1) / 2;
  }

  if (reviewLength < 280) {
    trimLength = reviewLength;
    shareMessage =
      `Checkout Review of '` +
      reviewObj?.moviename +
      `'` +
      ` on RecoBee\n\n` +
      reviewObj.reviewcomment.substring(0, trimLength) +
      `\n\n\Continue Reading it on RecoBee, open the App now: ` +
      url;
  } else {
    shareMessage =
      `Checkout Review of '` +
      reviewObj.moviename +
      `'` +
      ` on RecoBee\n\n` +
      reviewObj?.reviewcomment.substring(0, trimLength) +
      `..\n\n\To Finish reading the Review, Click: ` +
      url;
  }

  socialShareLink(isWhatsApp, shareMessage)
 
};

export const copyLinkClicked = (reviewObj,releasdate) => {
  let postId = reviewObj?.postid ?? reviewObj?.id ?? reviewObj?.movieid;

  Clipboard.setString(
    `https://` +
      Config.ROOT_URL +
      `/movie/` +extractYear(releasdate) + `/`+ formatTitleForUrl(reviewObj.moviename)+ `/review/` +
      postId?.substring(6)
  );
  Toast.show({
    type: 'beeToast',
    text1: 'Link copied to clipboard',
    visibilityTime: 2000,
    position: 'top',
    autoHide: true,
  });
};


export const getUserBadgeIcon = (type?: string, size = 16) => {
  if(type == 'admin' || type == 'critic'){
    return <Critic height={size} width={size} />
  }
  else if(type == 'prof'){
    return <ProfessionCritic height={size} width={size} />
  }
  else if(type == 'celebrity'){
    return <CelebrityCritic height={size} width={size} />
  }
  else {
    return null;
  }
}

export const getUserBadgeName = (type: string | undefined | null) => {
  if(type == 'admin' || type == 'critic'){
    return 'Verified ';
  }
  else if(type == 'prof'){
    return 'Professional ';
  }
  else if(type == 'celebrity'){
    return 'Celebrity '
  }
  else {
    return '';
  }
}

export const checkBadge = (type: string | undefined | null) => {
  if(type == 'admin' || type == 'critic' || type == 'prof' || type == 'celebrity'){
    return true;
  }
  else {
    return false;
  }
}

export const getBadgeContraint = (userRole: string, constraintType: string) => {
  let userRoleFinal = (userRole == 'admin' || userRole == 'critic') ? 'admin' : userRole;
  let contraintValue = null;
  BADGE_CONSTRAINTS.map((value) => {
    if(value.constraint_type == constraintType){
      value.badges_list?.map((value2) => {
        if(value2.type == userRoleFinal){
          contraintValue = value2.max_allowed;
        }
      })
    }
  })
  return contraintValue;
}

export const groupedName = (items: string[], areMutualFriends: any) => {
  const length = items.length;
  if (length === 0) {
    return "";
  } else if (length === 1) {
    return items[0];
  } else if (length === 2) {
    return items.join(" & ");
  } else if (length === 3) {
    return items.slice(0, 2).join(", ") + " & " + items[2];
  } else {
    return items.slice(0, 2).join(", ") + " & " + (length - 2) + (areMutualFriends ? " others" : " more");
  }
}

export const getShareIcon = (size, color = null, isShortsCard = false) => {
  
  let shareAndroid = isShortsCard ? <ShareGreyAndroid strokeWidth={"1.7"} height={size} width={size} color={AppColors.BLACK} /> : <ShareAndroid strokeWidth={"1.7"} color={color} height={size} width={size} />;
  let shareIos =  isShortsCard ? <ShareIOS strokeWidth={"1.7"} color={AppColors.GREY_VARIANT4} height={size} width={size} /> : <ShareIOS color={color} height={size} width={size} strokeWidth={"1.7"} />;

  return Platform.OS == 'ios' ? shareIos : shareAndroid;
}


export const setUserInfo = (response) => {
  if (response?.data?.id && response?.data?.id != null) {
    EncryptedStorage.setItem('user_id', response.data.id);
  }
  if (response?.data?.fname && response?.data?.fname != null) {
    EncryptedStorage.setItem('user_fname', response.data.fname);
  }
  if (response?.data?.dob && response?.data?.dob != null) {
    EncryptedStorage.setItem('dob', `${response.data?.dob}`);
  }
  if (response?.data?.gender && response?.data?.gender != null) {
    EncryptedStorage.setItem('gender', `${response.data.gender}`);
  }
  if (response?.data?.usertag && response?.data?.usertag != null) {
    EncryptedStorage.setItem('user_unq_id', response.data.usertag);
  }
  if (response?.data?.lname && response?.data?.lname != null) {
    EncryptedStorage.setItem('user_lname', response.data.lname);
  }
  if (response?.data?.email && response?.data?.email != null) {
    EncryptedStorage.setItem('user_email', response.data.email);
  }
  if (response?.data?.country && response?.data?.country != null) {
    EncryptedStorage.setItem('user_country', response.data.country);
  }
  if (response?.data?.thumbnail && response?.data?.thumbnail != null) {
    EncryptedStorage.setItem('user_thumbnail', response.data.thumbnail);
  }
  if (response?.data?.photo && response?.data?.photo != null) {
    EncryptedStorage.setItem('user_dp', response.data.photo);
  }
  if (response?.data?.coverpic && response?.data?.coverpic != null) {
    EncryptedStorage.setItem(
      'user_cover',
      JSON.stringify(response.data.coverpic)
    );
  }
  if (response?.data?.intro && response?.data?.intro != null) {
    EncryptedStorage.setItem('user_bio', response.data.intro);
  }
  if (response?.data?.biolink && response?.data?.biolink != null) {
    EncryptedStorage.setItem('user_bio_link', response.data.biolink);
  }
  if (response?.data?.idpuniqueid && response?.data?.idpuniqueid != null) {
    EncryptedStorage.setItem('user_idp_id', response.data.idpuniqueid);
  }
  if (response?.data?.mobilenumber && response?.data?.mobilenumber != null) {
    EncryptedStorage.setItem('user_mobile', response.data.mobilenumber);
  }
}

export const isReferralRewardActive = (progress, maxValue) => {
  let isActive = false;
    if(maxValue == 10){
      isActive = true;
    }
    else if(maxValue == 30){
      if(progress >= 10){
        isActive = true;
      }
    }
    else if(maxValue == 50){
      if(progress >= 30){
        isActive = true;
      }
    }
    return isActive;
}

const setReviewStatus = async() => {
  userProfileAPI
    .setReviewStatus()
    .then((res) => {
    })
    .catch((error) => {
      if (error) {
        logError(true, error)
      }
    });
}

const logError = (isSetReview, error) => {
  var extendedLog = LOG.extend('MovieDetailsScreen');
        extendedLog.error(
          isSetReview ? 
          "Error executing  userProfileAPI.setReviewStatus with message:"
          :
          "Error executing  userProfileAPI.getReviewStatus with message:",
          error
        );
}

const askForReview = () => {
  // trigger UI InAppreview
  InAppReview.RequestInAppReview()
  .then((hasFlowFinishedSuccessfully) => {

   
    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

    if (hasFlowFinishedSuccessfully) {
      EncryptedStorage.setItem('reviewPopupShowedDate', new Date().toString());
      setReviewStatus();
      // do something for ios
      // do something for android
    }

    // for android:
    // The flow has finished. The API does not indicate whether the user
    // reviewed or not, or even whether the review dialog was shown. Thus, no
    // matter the result, we continue our app flow.

    // for ios
    // the flow lanuched successfully, The API does not indicate whether the user
    // reviewed or not, or he/she closed flow yet as android, Thus, no
    // matter the result, we continue our app flow.
  })
  .catch((error) => {
    //we continue our app flow.
    // we have some error could happen while lanuching InAppReview,
    // Check table for errors and code number that can return in catch.
    console.log(error);
  });
}

const checkReviewStatus = async() => {
  userProfileAPI
    .getReviewStatus()
    .then((res) => {
      if (res.status == 200) {
        if(res?.data == false || res?.data == "false"){
            askForReview()
        }
      }
    })
    .catch((error) => {
      if (error) {
        logError(false, error)
      }
    });
}

export const canRequestReview = async() => {

  try {
    EncryptedStorage.getItem('reviewPopupShowedDate').then((savedDate) => {
      if (!savedDate) {
        checkReviewStatus()
      }
      else {
        
        const today = new Date();
        const oneDayAgo = new Date(today);
        oneDayAgo.setDate(today.getDate() - 1);
        if(new Date(savedDate) < oneDayAgo){
          checkReviewStatus()
        }
      }
    })
  } catch (error) {
    console.error('Error loading last review date:', error);
  }
};

export const showAdForUser = (userRole: any) => {
  let showAd = false;
  if(userRole == '' || userRole == null || userRole == 'admin' || userRole == 'critic' || userRole == 'verified'){
    showAd = true;
  }
  return showAd;
}

export const loadRank = async () => {
  try {
  const rankResp = await userProfileAPI.getUserRank(0);
    if (rankResp?.data) {
      EncryptedStorage.setItem('user_rank', JSON.stringify(rankResp?.data));
    }
  }
  catch(e){
    
  }
}

export const getAdvanceFilterConfigs = async ({hideMood = false, hideRatings = false, hideReleaseYear = false, isUpcomingMoviesModal = false, addPlatforms = false, supportedOTTs = []} = {}) => {
  let userPref;
  let configs;
  try {
    try {
      userPref = await EncryptedStorage.getItem('user_preferences');
    }
    catch(error){
      extendedLogsHelper.error('Error executing EncryptedStorage.getItem("user_preferences") with messag: ' + error)
    }
    if (!userPref) {
      try {
        let userPrefResponse = await userProfileAPI.getUserPreferences();
        if (
          userPrefResponse &&
          userPrefResponse.data &&
          userPrefResponse.data.preferences != null
        ) {
          userPref = userPrefResponse.data.preferences;
          EncryptedStorage.setItem('user_preferences', userPref);
        }
      }
      catch(error){
        extendedLogsHelper.error('Error executing userProfileAPI.getUserPreferences with messag: ' + error)
      }
    }
    userPref = { ...searchMainPageDefaultConfig, ...JSON.parse(userPref) };

    let language;
    if (userPref.language) {
      language = userPref.language.map((itm) => itm.name);
    }
    configs =
      userPref.genre.length > 0
        ? { ...searchMainPageDefaultConfig, ...{ genre: userPref.genre } }
        : searchMainPageDefaultConfig;
    
    if(isUpcomingMoviesModal){
      if(language?.length > 0){
        configs = {...configs, language: userPref.language}
      }
      else {
        configs = {...configs, language: [{id: '201', name: 'Hindi', check: true}, {id: '202', name: 'English', check: true}]}
      }
    }

    if(addPlatforms && supportedOTTs?.length > 0){
      configs = {...configs, platform: supportedOTTs.map((value, index) => {return {"id": index, "name": value}})}
    }
    
    configs = Object.entries(configs);
    

    configs = configs.map((itm) => {
      const lbl = itm[0];
      let items = itm[1];
      return {
        category: lbl,
        label:
          lbl == 'mood'
            ? 'Choose your mood'
            : lbl == 'title'
            ? 'Content Type' 
            :
            lbl == 'release_year' ? 'Release year'
            : lbl[0].toUpperCase() + lbl.slice(1),
        items: items,
      };
    });

    if(hideMood){
      configs = configs?.filter((val) => val.category != 'mood')
    }
    if(hideReleaseYear){
      configs = configs?.filter((val) => val.category != 'release_year')
    }
    if(hideRatings){
      configs = configs?.filter((val) => val.category != 'ratings')
    }
  }
  catch(error){
    extendedLogsHelper.error('Error executing getAdvanceFilterConfigs with messag: ' + error)
  }
  return configs;
};

export const formatName = (name) => {
  switch (name) {
    case 'SuperHero':
      name = 'Superhero';
      break;
    case 'BookBased':
      name = 'Book Based';
      break;
    case 'TimeTravel':
      name = 'Time Travel';
      break;
    case 'TrueStory':
      name = 'True Story';
      break;
    case 'HiddenGems':
      name = 'Surprise Me!';
      break;
    default:
      break;
  }
  return name;
};

export const getFilterLabelIcon = (label: string) => {
  let icon = <Media height={24} width={24} />
  switch (label) {
    case 'Choose your mood':
      icon = <ChooseMood height={24} width={24} />;
      break;
    case 'Content Type':
      icon = <Media height={24} width={24} />;
      break;
    case 'Genre':
      icon = <GenreIcon height={20} width={20} />;
      break;
    case 'Language':
      icon = <LanguageIcon height={20} width={20} />;
      break;
    case 'Ratings':
      icon = <Star height={24} width={24} />;
      break;
    case 'Release year':
      icon = <Time height={24} width={24} />;
      break;
    case 'Platform':
      icon = <PlatformIcon height={24} width={24} />;
      break;
    default:
      break;
  }
  return icon;
}

export const areArraysEqual = (array1, array2) => {
  // Check if lengths are the same
  if (array1?.length !== array2?.length) {
      return false;
  }

  // Iterate through each element and compare
  if(array1?.length > 0 && array2?.length > 0){
    for (let i = 0; i < array1?.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
  }

  return true;
}

export const drawerStyle = {
  activeTintColor: AppColors.GREY_VARIANT2,
  backgroundColor: AppColors.GREY_VARIANT2,
  inactiveTintColor: AppColors.GREY_VARIANT2,
  labelStyle: {
    fontFamily: FontFamily.DMSansRegular,
    marginHorizontal: 0,
  },
  iconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  drawerStyle: {
    width: SCREEN_WIDTH < 370 ? SCREEN_WIDTH * 0.84 : SCREEN_WIDTH * 0.78
  },
  itemStyle: {},
};

export const MONTHS_SHORTNAME = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const MONTHS_FULLNAME = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]

export const fullMonthNameAndYear = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = MONTHS_FULLNAME[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export const validityDateformat = (inputDate) => {
    
  
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = MONTHS_SHORTNAME[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    return `${day} ${month}, ${year}`;
}

const getGraphValue = (item, type) => {
  let value = 0;
  if(type == "Reviews"){
    value = item?.reviewCount
  }
  else if(type == "Lists"){
    value = item?.listCount;
  }
  else if(type == "Movie Seen"){
    value = item?.seenCount;
  }
  else if(type == "Followers"){
    value = item?.followerCount;
  }

  return value;
}

export const getNumericValue = (input: any) => {
  // Check if the input is null, undefined, or an empty string
  if (input === null || input === undefined || input === "") {
    return 0; // or return 0, depending on what you want for these cases
  }

  // Use a regular expression to extract numbers from the string
  const numericValue = input.match(/\d+/);
  
  // Return the numeric value if found, otherwise return null
  return numericValue ? Number(numericValue[0]) : null;
  
}

export const graphGenreData = (genreData: any) => {
  let maxValue = 0;
  let maxIndex = null;
  const data = genreData?.map((value) => {
      return {
        label: value?.genre,
        value: value?.count ? parseFloat(value?.count) : value?.count
      }
    }
  );

  for(var index = 0; index < data?.length; index++){
    const count =  data[index].value;
    if(count > 0 && count > maxValue){
      maxValue = count;
      maxIndex = index;
    }
  }
  

  if(maxIndex != null && maxValue != 0){
    data[maxIndex] = {...data[maxIndex], frontColor: AppColors.GREY_VARIANT4,
      topLabelComponent: () => (
            <Text style={[CommonStyles.graphTopLabel, {color: AppColors.GREY_VARIANT4}]}>{data[maxIndex]?.value}</Text>
      ),
      
    }
  }
  return data;
}

export const graphRatingsData = (ratingsData: any) => {
  let maxValue = 0;
  let maxIndex = null;
  const data = Object.entries(ratingsData).map(([key, value]) => ({
    label: key,
    value: value
  }));

  for(var index = 0; index < data?.length; index++){
    const count =  data[index].value;
    if(count > 0 && count > maxValue){
      maxValue = count;
      maxIndex = index;
    }
    const labelValue = index + 1;
    data[index] = {...data[index],
      labelComponent: () => (
        <View style={[CommonStyles.rowAlignCenter, {justifyContent: 'center'}]}>
          <StarFilled height={12} width={12} color={AppColors.LIGHT_YELLOW} strokeWidth={2} />
          <Text style={[CommonStyles.graphBottomLabel]}>
            {labelValue}
          </Text>
        </View>
      )
    }
   
  }
  

  if(maxIndex != null && maxValue != 0){
    data[maxIndex] = {...data[maxIndex], frontColor: AppColors.GREY_VARIANT4,
      topLabelComponent: () => (
            <Text style={[CommonStyles.graphTopLabel, {color: AppColors.GREY_VARIANT4}]}>{data[maxIndex]?.value}</Text>
      ),
      
    }
  }  
  return data;
}

export const graphYearlyData = (moviesSeenByYear: any) => {
  let maxValue = 0;
  let maxIndex = null;
  let fullYearData = moviesSeenByYear && moviesSeenByYear != null ?
    moviesSeenByYear?.map((value) => ({
      label: value?.year,
      value: getNumericValue(value?.count) ?? 0
    }))
  : [];

  for(var index = 0; index < fullYearData?.length; index++){

    let count =  fullYearData[index].value;

    if(count > 0 && count > maxValue){
      maxValue = count;
      maxIndex = index;
    }
   
  }

  if(maxIndex != null && maxValue != 0){
    fullYearData[maxIndex] = {...fullYearData[maxIndex], frontColor: AppColors.GREY_VARIANT4,
      topLabelComponent: () => (
            <Text style={[CommonStyles.graphTopLabel, {color: AppColors.GREY_VARIANT4}]}>{fullYearData[maxIndex]?.value}</Text>
      ),
    }
  }
  return fullYearData;
}

export const graphMonthlyData = (year, moviesSeenByMonth: any, isReview = false) => {
  let monthsData = []
  let maxValue = 0;
  let maxIndex = null;
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');  // Pads month with '0' if needed (e.g., '01', '02', etc.)
    return `${year}-${month}`;
  });

  const fullYearData = [];

  months.forEach(month => {
    let count = moviesSeenByMonth[month] ? parseFloat(isReview ? moviesSeenByMonth[month] : moviesSeenByMonth[month]?.N) : 0;
    count = isNaN(count) ? 0 : count;
    fullYearData.push({
      month: month,
      N: count
    });
  });


  for(var value = 0; value < GRAPH_MONTHS_LABEL.length; value++){

    let count =  fullYearData[value]?.N ?? 0;

    if(count > 0 && count > maxValue){
      maxValue = count;
      maxIndex = value;
    }
    monthsData[value] = {
      "label": GRAPH_MONTHS_LABEL[value],
      "value": count
    }
  }

  if(maxIndex != null && maxValue != 0){
    monthsData[maxIndex] = {...monthsData[maxIndex], frontColor: AppColors.GREY_VARIANT4,
      topLabelComponent: () => (
            <Text style={[CommonStyles.graphTopLabel, {color: AppColors.GREY_VARIANT4}]}>{monthsData[maxIndex]?.value}</Text>
      ),
    }
  }
  return monthsData;
}

export const graphAggregateFormattedData = (data) => {
    let monthsData = []
    let maxValue = 0;
    let maxIndex = null;
    for(var value = 0; value < GRAPH_MONTHS_LABEL.length; value++){
      
      let responseItem = data?.find((item) => {
        
        if(parseInt(item?.month) == (value + 1)){
          return true
        }
        else return false;
      })

      const count =  typeof responseItem != "undefined" ? ((responseItem?.seenCount ?? 0) + (responseItem?.reviewCount ?? 0)) : 0
      if(count > 0 && count > maxValue){
        maxValue = count;
        maxIndex = value;
      }
      monthsData[value] = {
        "label": GRAPH_MONTHS_LABEL[value],
        "value": count < 0 ? 0 : count
      }
    }
    if(maxIndex != null && maxValue != 0){
      monthsData[maxIndex] = {...monthsData[maxIndex], frontColor: AppColors.GREY_VARIANT4,
        topLabelComponent: () => (
              <Text style={[CommonStyles.graphTopLabel, {color: AppColors.GREY_VARIANT4}]}>{monthsData[maxIndex]?.value}</Text>
        ),
      }
    }

    return monthsData;
}

export const graphFormattedData = (data) => {

  let types = ["Reviews", "Lists", "Movie Seen", "Followers"]

  let formattedData = []

  for(let val = 0; val < types.length; val++){
    let monthsData = []
    let maxValue = 0;
    let maxIndex = null;
    for(var value = 0; value < GRAPH_MONTHS_LABEL.length; value++){
      
      let responseItem = data?.find((item) => {
        
        if(parseInt(item?.month) == (value + 1)){
          return true
        }
        else return false;
      })
      let count =  typeof responseItem != "undefined" ? getGraphValue(responseItem, types[val]) : 0
      if(count > 0 && count > maxValue){
        maxValue = count;
        maxIndex = value;
      }
      monthsData[value] = {
        "label": GRAPH_MONTHS_LABEL[value],
        "value": count
      }
    }
    if(maxIndex != null && maxValue != 0){
      monthsData[maxIndex] = {...monthsData[maxIndex], frontColor: AppColors.GREY_VARIANT4,
        topLabelComponent: () => (
              <Text style={[CommonStyles.graphTopLabel, {color: AppColors.GREY_VARIANT4}]}>{monthsData[maxIndex]?.value}</Text>
        ),
      }
    }
    formattedData[val] = {
      "title": types[val],
      "data": monthsData
    }

  }
  return formattedData;
}

export const getRemainingDays = (endDate) => {
  let remainingDays = Infinity;
  if(endDate != null){
    let futureDate = new Date(endDate)
    let today = new Date()

    // Calculate the difference in milliseconds
    const difference = futureDate - today;
    remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  }
  return remainingDays;
}

export const storeNotifyOnReleaseIds = async (id) => {
  try {
    // Retrieve IDs already stored in local storage
    let storedIdsJson = await EncryptedStorage.getItem('notify_release_ids');
    const storedIds = storedIdsJson ? JSON.parse(storedIdsJson) : [];

    // Check if the ID is already stored
    const isIdStored = storedIds.includes(`${id}`);

    if (!isIdStored) {
      // If the ID is not already stored, store it
      storedIds.push(`${id}`);
      await EncryptedStorage.setItem('notify_release_ids', JSON.stringify(storedIds));
    } 
  } catch (error) {
    console.error('Error storing ID:', error);
  }
};


export const paymentCheckout = ({amount, currency, orderId, userEmail, userContactNo, userName, postPaymentCb, onPaymentFailure} = {}) => {

  var options = {
    description: 'Credits towards premium membership',
    image: CLOUD_BASEURL + 'appicon.png',
    currency: currency,
    key: Config.RAZORPAY_KEY,
    amount: amount,
    name: 'RecoBee',
    order_id: orderId,//Replace this with an order_id created using Orders API.
    prefill: {
      email: userEmail,
      contact: userContactNo,
      name: userName
    },
    theme: {color: AppColors.GREY_VARIANT2}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    postPaymentCb(data)
    // postPayment(data?.razorpay_order_id, data?.razorpay_payment_id, data?.razorpay_signature)

  }).catch((error) => {
    // handle failure
    onPaymentFailure()
    var extendedLog = LOG.extend('RecoBeePremiumScreen');

    extendedLog.error(
      'Error executing paymentCheckout with message:',
      error
    );
  });
}

export const formatDateMonthAndYear = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export const contactsAccessDenied = {
  title: "Denied Access",
  icon: "sad",
  width: SCREEN_WIDTH * 0.233,
  height: SCREEN_WIDTH * 0.208,
  message: `Looks like RecoBee doesn't have access to Read Contacts on your phone. Grant the same to discover friends !!`,
};

export const getDateTense = (date) => {
  // Parse the given date string
  const givenDate = new Date(date);
  givenDate.setHours(0, 0, 0, 0);
  let releasingDay = StringConstants.RELEASED_ON;
  // Get the current date without time part
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time part to midnight to only compare the date

  // Compare the given date with the current date
  if (givenDate.getTime() === currentDate.getTime()) {
    releasingDay = StringConstants.RELEASED_TODAY;
  } else if (givenDate.getTime() > currentDate.getTime()) {
    releasingDay = StringConstants.COMING_SOON;
  } else {
    releasingDay = StringConstants.RELEASED_ON;
  }
  return releasingDay;
};

export const getShareOptionsForInvite = () => {
  let shareOptions = null;
  if (Platform.OS == "ios") {
    shareOptions = {
      subject: "RecoBee Invite",
    };
  } else {
    shareOptions = {
      dialogTitle: "RecoBee Invite",
    };
  }
  return shareOptions;
}


export const getShareContentForInvite = () => {
  let shareContent = null;
  if (Platform.OS == "ios") {
    shareContent = {
      message:
        `Hi there !` +
        `\n\nSurfing through Netflix, Prime Video and yet not finding anything to watch? Checkout this cool app "RecoBee" for sharing Movies/Series Recommendations with Friends. Search for Movies based on your preferences, customize your Reco Feed, keep track of trending items across OTTs and much more cool stuff.` +
        `\n\n` +
        `Download the app here: http://onelink.to/buh5s3`,
    };
  } else {
    shareContent = {
      message:
        `Hi there !` +
        `\n\nSurfing through Netflix, Prime Video and yet not finding anything to watch? Checkout this cool app "RecoBee" for sharing Movies/Series Recommendations with Friends. Search for Movies based on your preferences, customize your Reco Feed, keep track of trending items across OTTs and much more cool stuff.` +
        `\n\n` +
        `Download the app here: http://onelink.to/buh5s3`,
    };
  }
  return shareContent;

}

// content to show while sharing app link
export const getShareContent = (deepLink : any) => {
  let shareContent = null;
  if (Platform.OS == 'ios') {
    shareContent = {
      message:
      `Hey!` +
      `\n\nSurfing through Netflix, Prime Video and yet not finding anything to watch? Checkout this cool app "RecoBee" for sharing Movies/Series Recommendations with Friends. Search for Movies based on your preferences, customize your Reco Feed, keep track of trending items across OTTs and much more cool stuff.` +
      `\n\n` +
      `Download using my personal referral link ${deepLink}`,
    };
  } else {
    shareContent = {
      message:
      `Hey!` +
      `\n\nSurfing through Netflix, Prime Video and yet not finding anything to watch? Checkout this cool app "RecoBee" for sharing Movies/Series Recommendations with Friends. Search for Movies based on your preferences, customize your Reco Feed, keep track of trending items across OTTs and much more cool stuff.` +
      `\n\n` +
      `Download using my personal referral link ${deepLink}`
    };
  }
  return shareContent;
}

// content to show while sharing app link
export const getShareOptions = () => {
  let shareOptions = null;
  if (Platform.OS == 'ios') {
    shareOptions = {
      subject: 'Invite Friends',
    };
  } else {
    shareOptions = {
      dialogTitle: 'Install RecoBee App',
    };
  }
  return shareOptions;
}

// check if it's a movie or series
export const checkIsSeries = (value: any) => {
  let isSeries = false
  if(value && typeof(value) == 'string'){
    if(value?.length > 0){
      if(value?.includes('-')){
        isSeries = true
      }
    }
  }
  return isSeries;
}
// is email valid
export const isEmailValid = (value: string) => {
    let isValid = false;
    if(EMAIL_REGEX_TEST.test(value)){
      isValid = true;
    }
    return isValid;
}

// get dynamic modal height 
export const getModalHeight = (length: any) => {
  let height = SCREEN_HEIGHT * 0.9;
  if (length > 0) {
    height = (SCREEN_HEIGHT * 0.085 + 16) * length;
    height = height + SCREEN_HEIGHT * 0.17;
  }
  if (height > SCREEN_HEIGHT * 0.9) {
    return SCREEN_HEIGHT * 0.9;
  } else return height;
};

// Function to update a single item in accessStatus
export const updatePrefsCompletionStatus = async (type: string, value: boolean) => {
 
  try {
    // Retrieve the current stored status
    const existingStatus = await EncryptedStorage.getItem('prefsCompletionStatus');
    
    // Initialize or update the current status
    const newStatus = existingStatus
      ? JSON.parse(existingStatus)
      : { language: false, ott: false, genre: false };
    
    // Update the relevant key based on the type parameter
    newStatus[type] = value;

    // Store the updated status
    await EncryptedStorage.setItem('prefsCompletionStatus', JSON.stringify(newStatus));
  } catch (error) {
    console.log('Error updating access status', error);
  }
};

// fetch status for how many prefs updated
export const retrievePrefsCompletionStatus = async () => {
  try {
    const status = await EncryptedStorage.getItem('prefsCompletionStatus');
    
    // Initialize the default values
    const defaultStatus = { language: false, ott: false, genre: false };

    if (status !== null) {
      const parsedStatus = JSON.parse(status);
      
      // Use the default value (false) if a key is missing
      const { language = false, ott = false, genre = false } = {
        ...defaultStatus,
        ...parsedStatus
      };

      // Calculate completion
      const totalItems = 3;
      const accessedItems = [language, ott, genre].filter(Boolean).length;
      const completion = `${accessedItems}/${totalItems}`;

      return completion;  // e.g., "2/3 complete"
    } else {
      // If no data stored, return the initial default
      return '0/3';
    }
  } catch (error) {
    console.log('Error retrieving access status', error);
    return 'Error';
  }
};
//process comment with mentions
export const processComment = (comment, onTagClick) => {
  if (comment.indexOf(`@[`) === -1) {
    return comment;
  }
  let users = comment
    .split(`@[`)
    .map((el) => {
      let match = el.substring(0, el.indexOf(')'));
      return match
        ? {
          name: match.substring(0, match.indexOf(']')),
          id: match.substring(match.indexOf('(') + 1),
          match: `@[${match})`,
        }
        : undefined;
    })
    .filter((el) => el);
  let processedComment = [];
  users.forEach((el) => {
    let [first, ...cArr] = comment.split(el.match);
   

    processedComment.push(<Text>{first}</Text>);
    processedComment.push(
      <Text
        style={{ fontFamily: 'DMSans-Bold', fontSize: 14, color: '#E9C638' }}
        onPress={() => onTagClick(el.id)}
      >
        {el.name}
      </Text>
    );
    comment = cArr.join(el.match);
  });
  processedComment.push(<Text>{comment}</Text>);
  return processedComment;
}

export const socialShareLink = async(isWhatsApp: any, url: any) => {
  try {
    if (isWhatsApp) {
      // For WhatsApp, use shareSingle with proper message content
      const shareOptions = {
        title: 'Share via WhatsApp',
        message: url,
        social: Share.Social.WHATSAPP,
        type: 'text/plain',
      };
      await Share.shareSingle(shareOptions);
    } else {
      // For Instagram, use shareSingle with proper message content
      const shareOptions = {
        title: 'Share via Instagram',
        message: url,
        social: Share.Social.INSTAGRAM,
        type: 'text/plain',
      };
      await Share.shareSingle(shareOptions);
    }
  } catch (err) {
    console.log("Error sharing to social media:", err);
    // Fallback to general share dialog if specific app sharing fails
    try {
      await Share.open({
        title: 'Share',
        message: url,
        type: 'text/plain',
      });
    } catch (fallbackErr) {
      console.log("Fallback share also failed:", fallbackErr);
    }
  }
}

//remove storage entry of critic ob if user role changes
export const checkCriticObRole = async() => {
  try {
   let role = await EncryptedStorage.getItem('is_critic');
   if(role && role == 'true'){
    EncryptedStorage.setItem('is_critic', 'false');
   }
  }
  catch(err){
    
  }
}
export interface RailUIProps {
  title: string;
  railData: any[];
  sectionType: string;
  showNumbers: boolean;
  onScroll?: (event: any) => void;

  cardProps?: { [key: string]: any };
  
  containerComponent?: React.ElementType;
  
  containerStyle?: ViewStyle;
 
  titleStyle?: TextStyle;
}

export const railUI = ({
  title,
  railData,
  sectionType,
  showNumbers,
  onScroll,
  cardProps = {},
  containerComponent: Container = View,
  containerStyle = { paddingLeft: 16, marginBottom: 36 },
  titleStyle = {
    color: AppColors.WHITE_VARIANT,
    flex: 1,
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    marginBottom: 16,
  },
}: RailUIProps) => {
  return (
    <Container style={containerStyle}>
    {title && title != '' &&( <View style={{ flexDirection: 'row' }}>
        <Text style={[titleStyle]}>{title}</Text>
      </View>)}
      <FlatList
        data={railData}
        horizontal
        keyExtractor={(item, index) => 'movie-card-' + index + '-' + item.id}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        onScroll={onScroll}
        renderItem={({ item, index }) => (
          <HomeMovieCard
            item={item}
            index={index + 1}
            list={railData}
            sectionType={sectionType}
            isOTT={showNumbers}
            {...cardProps}
          />
        )}
      />
    </Container>
  );
};

export const getRange = (pred) => {
      const lower = Math.round(pred * 0.9);
      const upper = Math.round(pred * 1.1);
      if(lower == upper){
        return `${lower} `;
      }
      return `${lower}-${upper} `;
    };

    export  const formattedDate = (releaseDate) => {
        try {
          let date = new Date(releaseDate);
          let day = date.getDate();
          return `${day} ${MONTHS_SHORTNAME[date.getMonth()]} ${date.getFullYear()}`;
        } catch (e) {
          return releaseDate;
        }
      };