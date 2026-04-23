import communityAPI from "api/communityAPI";
import ActionTypes from "../stores/actionTypes";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./Dimensions";
import EncryptedStorage from 'react-native-encrypted-storage';
import { adImpressionApi } from "./CommonApiCalls";

export const mergeDiaryActityEntries = (existing, newEntries) => {
   
// Initialize existing data if it's not an array
if (!Array.isArray(existing)) {
    existing = [];
  }

  // Convert existing to a dictionary for easier lookup
  const existingMap = existing.reduce((map, item) => {
    map[item.title] = item;
    return map;
  }, {});

  for (const [newTitle, newData] of Object.entries(newEntries)) {
    if (existingMap[newTitle]) {
      // Process existing month data
      newData.forEach(newEntry => {
        const existingDateEntry = existingMap[newTitle].data.find(
          entry => entry.date === newEntry.date
        );

        if (existingDateEntry) {
          // Merge activities for existing date entry
          newEntry.activities.forEach(activity => {
            existingDateEntry.activities.push(activity);
          });
        } else {
          // Add new date entry if it doesn't exist
          existingMap[newTitle].data.push(newEntry);
        }
      });
    } else {
      // Add new month entry
      existing.push({
        title: newTitle,
        data: newData
      });
    }
  }

  return existing;

  };
  
  //get screen name for analytics
  export const getAnalyticScreenName = (searchType: any) => {
    let screenName = 'MySeen';
    if(searchType == 'TAGS'){
      screenName = 'TagsSearchScreen'
    } 
    else if(searchType == 'GENRES'){
      screenName = 'GenresSearchScreen'
    } 
    else if(searchType == 'MICRO_GENRES'){
      screenName = 'MicroGenresScreen'
    }
    return screenName;
  }

  //get placeholder value
  export const getSeenSearchPlaceholder = (searchType: any) => {
    let placeholder = 'Search in your seen list...';
    if(searchType == 'TAGS'){
      placeholder = 'Search tags...'
    } 
    else if(searchType == 'GENRES'){
      placeholder = 'Search genres...'
    } 
    else if(searchType == 'MICRO_GENRES'){
      placeholder = 'Search micro genres...'
    }
    
  }

  // remove spaces from a string
  export const removeSpaces = (input: any) => {
    // Check if the input is a valid string
    if (typeof input === 'string' && input.trim().length > 0) {
        // Remove all spaces from the string
        return input.replace(/\s+/g, '');
    } else {
        // Return null or handle invalid input case
        return null;
    }
  }

  // remove spaces from a string
  export const removeInitialSpaces = (input: any) => {
    // Check if the input is a valid string
    if (typeof input === 'string' && input.trim().length > 0) {
        // Remove all spaces from the string
        return input.replace(/^\s+/, "");
    } else {
        // Return null or handle invalid input case
        return null;
    }
  }
export const checkAdVisibilityInViewPort = (scrollY: any, viewRef: any, adType: string) => {

  viewRef?.current?.measure((x, y, width, height, pageX, pageY) => {
    const rectTop = pageX;
    const rectBottom = pageY + height;
    const  rectWidth = pageX + width;
    const isVisible = rectBottom != 0 
                      && rectTop >= 0 
                      && rectBottom <= SCREEN_HEIGHT
                      && rectWidth > 0 
                      && rectWidth <= SCREEN_WIDTH;
    if(isVisible){
      handleContinuousScrollVisibility(adType, isVisible)
    }
  })
}

// Function to handle visibility and count impressions
const handleContinuousScrollVisibility = async (bannerType: string, isVisible: boolean) => {
  try {
    // Retrieve stored banner visibility data
    const storedVisibilityData = await EncryptedStorage.getItem('bannerVisibilityData');
    let bannerVisibilityData = storedVisibilityData ? JSON.parse(storedVisibilityData) : {};

    // Retrieve the current visibility flag for the banner type
    const currentVisibility = bannerVisibilityData[bannerType] || false;
    // Check if visibility changes from false to true
    if (!currentVisibility && isVisible) {
      // Increment the count when visibility changes from false to true
      await setAdImpressionCount(bannerType, ActionTypes.VIEW)

      // Update the visibility flag to true in EncryptedStorage
      bannerVisibilityData[bannerType] = true;
      await EncryptedStorage.setItem(
        'bannerVisibilityData',
        JSON.stringify(bannerVisibilityData)
      );
    } else if (!isVisible && currentVisibility) {
      // If the banner is no longer visible, reset the visibility flag to false
      bannerVisibilityData[bannerType] = false;
      await EncryptedStorage.setItem(
        'bannerVisibilityData',
        JSON.stringify(bannerVisibilityData)
      );
    }
  } catch (error) {
    console.error('Error handling banner visibility:', error);
  }
};

export const setAdImpressionCount = async(bannerType: string, actionType: string) => {
  try {
    // Retrieve existing data from EncryptedStorage
    const storedData = await EncryptedStorage.getItem('bannerAdViews');
    let bannerAdViews = storedData ? JSON.parse(storedData) : [];
    // Check if the bannerType already exists
    const bannerIndex = bannerAdViews.findIndex((item) => item.type === bannerType);

    if (bannerIndex !== -1) {
      // If it exists, increase the count
      if (actionType === 'VIEW') {
        bannerAdViews[bannerIndex].viewCount += 1;
        bannerAdViews[bannerIndex].clickCount = bannerAdViews[bannerIndex]?.clickCount ?? 0;
      } else if (actionType === 'CLICK') {
        bannerAdViews[bannerIndex].clickCount += 1;
        bannerAdViews[bannerIndex].viewCount = bannerAdViews[bannerIndex]?.viewCount ?? 0;
      }
      
      const  apidata = bannerAdViews[bannerIndex]

      adImpressionApi(apidata)
    } else {
      const data = { 
        type: bannerType,
        viewCount: actionType === 'VIEW' ? 1 : 0,
        clickCount: actionType === 'CLICK' ? 1 : 0
      }
      adImpressionApi(data);
      // If it doesn't exist, add new entry with count 1
      bannerAdViews.push(data);
    }

    // Save the updated banner data back to EncryptedStorage
    await EncryptedStorage.setItem('bannerAdViews', JSON.stringify(bannerAdViews));
  } catch (error) {
    console.error('Error updating banner count:', error);
  }
  
}

// Function to store post IDs in local storage (uniquely)
export const storeReviewsImpressions = async (postId: any) => {
  try {
    // Retrieve existing post IDs from local storage
    const storedIds = await EncryptedStorage.getItem('reviewsImpressions');
    let postIds = storedIds ? JSON.parse(storedIds) : [];

    // Check if the post ID is already in the array
    if (!postIds.includes(postId)) {
      // If not, add it to the array
      postIds.push(postId);

      // Save the updated array back to local storage
      await EncryptedStorage.setItem('reviewsImpressions', JSON.stringify(postIds));
    } else {
      console.log('Post ID already exists, skipping:', postId);
    }
  } catch (error) {
    console.error('Error storing post ID:', error);
  }
};

// Function to delete all ad type data
export const deleteAllAdImpressionData = async () => {
  try {
    // Remove specific keys for banner data and visibility data
    EncryptedStorage.removeItem('bannerAdViews').then(() => {}).catch((err) => {
      console.error('Error deleting bannerAdViews data:', err);

    });          // Removes the banner count data
    EncryptedStorage.removeItem('bannerVisibilityData').then(() => {}).catch((err) => {
      console.error('Error deleting bannerVisibilityData data:', err);
    }); 
    // Removes the bannerVisibilityData data
    //TODO: not used for now
    // await EncryptedStorage.removeItem('reviewsImpressions');          
    // Removes the banner count data
  } catch (error) {
    console.error('Error deleting ad type data:', error);
  }
};
