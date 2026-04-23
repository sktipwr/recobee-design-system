import { SCREEN_WIDTH, scaledWidth ,SCREEN_HEIGHT} from "./Dimensions";
import WorthWatching from "svg/worth_watching.svg";
import RateMovies from "svg/rate_movies.svg";
import DiaryContent from "svg/diary_content.svg";
import AppColors from "./Colors";
import StringConstants from "./StringConstants";

// Regular expression to match any special character
export const specialCharsRegex = /[^a-zA-Z0-9\s]/;

export const httpRegex = /(https?:\/\/[^\s]+)(?=\s|$)/g; // Regex to detect links

export const movieReportReasons = [{
    "id": 1,
    "reason": "Missing Trailer",
    "selected": false
},
{
    "id": 2,
    "reason": "Missing Movie Info",
    "selected": false
},
{
    "id": 4,
    "reason": "Issue with Movie details",
    "selected": false
},
{
    "id": 5,
    "reason": "Other",
    "selected": false
}]

export const searchResultsReportReasons = [{
    "id": 1,
    "reason": "The search results were not relevant",
    "selected": false
},
{
    "id": 2,
    "reason": "Missing Details on search",
    "selected": false
},
{
    "id": 3,
    "reason": "Other",
    "selected": false
}]

export const dailyPicsReportReasons = [
{
    "id": 1,
    "reason": "Don't like such movies",
    "selected": false
},
{
    "id": 2,
    "reason": "Not my preferred Genre",
    "selected": false
},
{
    "id": 3,
    "reason": "Not available on my OTT ",
    "selected": false
},
{
    "id": 4,
    "reason": "Not a fan of the cast/director",
    "selected": false
},
{
    "id": 5,
    "reason": "Other",
    "selected": false
}]

export const noActivityItemsState = {
    title: "Oh Snap!",
    icon: "thinking",
    width: SCREEN_WIDTH * 0.233,
    height: SCREEN_WIDTH * 0.208,
    message: 'Could not find activites data, pls try again.'
  };

export const  emptySearchGuestItem = {
      title: 'Oh Snap!',
      message:
        'Looks like there is no movie with this name. Try some other search.',
      icon: 'sad',
      width: SCREEN_WIDTH* 0.233,
      height: SCREEN_WIDTH* 0.208,
    };

export const ACTIVITY_YEAR_FILTER_DATA = [
    {value: 'all', label: 'All'},
    {value: '2023', label: '2023'},
    {value: '2024', label: '2024'}
]

export const MOODS_DATA = [
    {name: 'Adventurous', icon: 'adventurous'},
    {name: 'Inspiring', icon: 'inspiring'},
    {name: 'Happy', icon: 'happy'},
    {name: 'Sad', icon: 'sad'},
    {name: 'Kids', icon: 'kids'},
    {name: 'Couple', icon: 'romantic'},
    {name: 'Dark', icon: 'dark'},
    {name: 'Relaxed', icon: 'relaxed'},
    {name: 'Reflective', icon: 'reflective'},
    {name: 'Classics', icon: 'classics'},
    {name: 'Bored', icon: 'bored'},
    {name: 'Watchparty', icon: 'watchparty'}
]

export const emptyRecoGeneratorResults = {
    title: "Oh Snap!",
    icon: "thinking",
    width: SCREEN_WIDTH * 0.233,
    height: SCREEN_WIDTH * 0.208,
    message: `Could not find recos for given inputs, let's try other combinations`
  };

export const TERMS_OF_USE = "https://www.reco-bee.com/t&c"

export const GENDER_DROPDOWN_DATA = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
    {label: 'Other', value: 'N'},
    {label: 'Prefer not to say', value: 'D'},
]
export const EmptyStateItemRecommend = {
  title: "Oh Snap!",
  icon: "thinking",
  message: "No Results Found. Try different search word.",
  width: SCREEN_WIDTH* 0.233,
  height: SCREEN_WIDTH * 0.208,
};

export const EmptyFriendItem = {
    title: "No Friends!",
    icon: "crying",
    message: `Oops! Don't be lonely out there, Go ahead and invite your Friends on RecoBee.`,
    width: SCREEN_HEIGHT* 0.233,
    height: SCREEN_WIDTH * 0.208,
  };
  export const emptyGroupItem = {
    icon: 'Happy',
    message: 'Start a conversation now by sending a movie recommendation..',
    width: SCREEN_HEIGHT* 0.233,
    height: SCREEN_WIDTH * 0.208,
  };

export const EmptyStateItemNoChats = {
  imageSource: require('../../assets/images/png/emptyInbox.png'),
  mainText: 'Your Chat is Empty',
  subText: StringConstants.NO_FRIENDS,
  buttonText: 'Start Now',
  height: SCREEN_WIDTH * 0.45,
};

export const NoFriendState = {
    imageSource: require('../../assets/images/png/userThree.png'),
    mainText: "ooh ! you Don't have any Friend",
    subText: StringConstants.NO_FRIENDS,
    height: SCREEN_WIDTH * 0.45,
    buttonText: 'Add New Friends',
    buttonShow: true,
  }

export const tagSearchEmptyStateItem = {
    title: "Oops!",
    message: `No results found for this tag value. Try with other tags!`,
    icon: "oo",
    width: SCREEN_WIDTH * 0.233,
    height: SCREEN_WIDTH * 0.208,
};

export const genreSearchEmptyStateItem = {
    title: "Oops!",
    message: `No results found for this genres. Try with other genres!`,
    icon: "oo",
    width: SCREEN_WIDTH * 0.233,
    height: SCREEN_WIDTH * 0.208,
};

export const emptyStateRail = {
  title: "",
  icon: 'yellow-oo',
  width: scaledWidth(60),
  height: scaledWidth(60),
  message: "Looks like there's nothing to show right now.\nCheck back soon for fresh content!"
};

export const homeSectionTypes = [
    'top_carousel',
    //update prefs card
    //streak and trivia
    'top_10_trending',
    //sec0 separator
    'clips',
    'add_is_watching',
    'weekly_list',
    'recent_releases',
    'upcoming_movies',
    'discover_friends_carousel',
    //sec1 separator
    'more_recos_for_you',
    'similar_recos',
    'latest_reviews',
    'ott_recos',
    'fav_friends',
    'short_films', //since you like
    //sec2 separator
    'buzzing_ott',
    'recobee_leaderboard',
    'charts',
    //ad
  ]
// nostalgic, family_friendly, scary

export const LOGIN_CAROUSEL_DATA = [
    {id: 1, title: "Personalized guide to what’s worth watching", image: <WorthWatching height={scaledWidth(390)} width={SCREEN_WIDTH - 32} />, description: "Get movie picks that match your mood and taste, and explore different cinema."},
    {id: 2, title: "Rate & review your favorite movies & shows", image: require('../../assets/rateMovies.png'), description: "Share, critique, and connect with film enthusiasts."},
    {id: 3, title: "Your activities become your movie diary", image: require('../../assets/diaryContent.png'), description: "Everything you do is saved, helping us create a diary and give you useful insights."},
]

export const MOVIE_DIARY_ACTIVITY_TYPES = [
    {name: 'Seen', type: 'seen'},
    {name: 'Rate', type: 'rate'},
    {name: 'Like', type: 'like'},
    {name: 'Review', type: 'review'},
    {name: 'Watching', type: 'watching'},
    {name: 'Watchlist', type: 'watchlist'},
    {name: 'Post', type: 'post'},
    {name: 'List', type: 'list'},
    {name: 'Recommend', type: 'recommend'}
]

export const SWIPER_LABEL_STYLES = {
    left: {
      title: 'DISLIKE',
      style: {
        label: {
          backgroundColor: AppColors.LIGHT_YELLOW,
          color: AppColors.GREY_VARIANT2,
          fontSize: 10,
          height: 30,
        },
        wrapper: {
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          marginTop: 0,
          marginLeft: -63
        }
      }
    },
    right: {
      title: 'LIKE',
      style: {
        label: {
          backgroundColor: AppColors.LIGHT_YELLOW,
          color: AppColors.GREY_VARIANT2,
          fontSize: 10,
          height: 30,
        },
        wrapper: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: 0,
          marginLeft: 0
        }
      }
    },
    top: {
      title: 'NOT SEEN',
      style: {
        label: {
          backgroundColor: AppColors.LIGHT_YELLOW,
          color: AppColors.GREY_VARIANT2,
          fontSize: 10,
          height: 30,
        },
        wrapper: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -20
        }
      }
    }
  }

export const viewabilityConfig = {
  itemVisiblePercentThreshold: 100, // Trigger when 100% of the item is visible
};

export const STAR_RATING_DATA = [
  {label: 'None', value: 1},
  {label: 'Little', value: 2},
  {label: 'Some', value: 3},
  {label: 'Much', value: 4},
  {label: 'Huge', value: 5},
]

export const FEEDBACK_TAGS = [
  'Not personalised enough',
  'Feels Repetitive',
  'I’ve Already Seen Most Movies / Show’s',
  'Doesn’t Match with My Preferences',
];