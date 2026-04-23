// import Geolocation from "@react-native-community/geolocation";

import searchAPI from "api/searchAPI";
import { POSTER_IMAGE_BASEURL, TMDB_BASEURL, abbreviateNumber, lowestMatchingIndexInFirstArray } from "./HelperFunctions";
import EncryptedStorage from "react-native-encrypted-storage";
import Config from "react-native-config";

// reorder array in way that selected items are at top
export const reorderArrayByBooleanKey = (array, keyName) => {
    // Initialize two arrays to separate items based on the boolean key
    const itemsWithKeyTrue = [];
    const itemsWithKeyFalse = [];
  
    // Separate items with a single iteration
    array.forEach(item => {
      if (item[keyName]) {
        itemsWithKeyTrue.push(item);
      } else {
        itemsWithKeyFalse.push(item);
      }
    });
  
    // Combine the arrays to place items with key === true at the start
    return [...itemsWithKeyTrue, ...itemsWithKeyFalse];
  };

  //fetch cast images based on cast name
  export const getCastImages = (castName: any, extendedLog: any) => {
    if (castName != '') {
      return searchAPI
        .getMovieSearchResultsByPerson(castName.trim(), null, 0)
        .then((response) => {
          let image = response?.data?.details?.tmdbprofilepath ?? null;
          if(image != null){
            image = TMDB_BASEURL + image;
          }
          return {image: image, name: castName}
        })
        .catch((error) => {
          extendedLog.error(
            'Error executing searchAPI.getMovieSearchResultsByPerson with message:',
            error
          );
          return {image: null, name: castName}
        });
    }
  };

  //sum by key name in an array
  export const sumByKey = (arr: any, key: string) => {
    let sum = 0;
    for (const item of arr) {
      sum += (item[key] < 0 ? 0 : (item[key] || 0))
    }
    return sum;
  }

  export const isEmptyObject = (obj) => {
    return !obj || Object.keys(obj).length === 0 || obj == null;
  }

  export const getTopNFromList = (data, count = 3) => {
   
    let top3 = data
    .sort((a, b) => (parseInt(b.count) || 0) - (parseInt(a.count)) || 0)  // Sort by count in descending order
       
    if(top3?.length > 3){
     return top3?.slice(0, 3)
    }
    return top3;
  }


  export const getOTTData = (ottValue: any, userPrefsState: any) => {
    try {
      //let ottList = ottValue.map((value) => value.networkprovider);
      let ottList = Array.isArray(ottValue) && ottValue?.length > 0 ? ottValue?.slice() : ottValue;
      let inTheatres = false;
      //new logic
      let finalOTTItem = null;
      let allOTTData = userPrefsState?.prefsData?.ott;

      if(ottList?.length > 0 && allOTTData?.length > 0){
        const apiOTTPrefNames = ottList?.map(obj => obj?.networkprovider);
        //
        if(apiOTTPrefNames?.includes('Theatre')){
          inTheatres = true;
          finalOTTItem = allOTTData?.filter(obj => obj?.networkprovider == 'Theatre')
        }
        else {
            finalOTTItem = allOTTData.filter(value => apiOTTPrefNames.includes(value?.name));
        }
        
      }
      return {
        inTheatres,
        finalOTTItem
      }

    }
    catch(err){
      const inTheatres = false;
      const finalOTTItem = [];
      console.log({err})

      return {
        inTheatres,
        finalOTTItem
      }
    }
  }

//remove data when logging out 
export const clearLocalStorage = async() => {
  await removeLocalItem("user_mobile");
  await removeLocalItem("user_country_code");
  await removeLocalItem("user_country");
  await removeLocalItem("user_id");
  await removeLocalItem("user_role");
  await removeLocalItem("user_pushtoken");
  await removeLocalItem("secure_id_token");
  await removeLocalItem("auto_play");
  await removeLocalItem("secure_refresh_token");
  await removeLocalItem("isCoachMarkShown");
  await removeLocalItem("user_preferences");
  await removeLocalItem("user_fname");
  await removeLocalItem("user_lname");
  await removeLocalItem("user_bio");
  await removeLocalItem("user_email");
  await removeLocalItem("topRecoUsers");
  await removeLocalItem("user_followers");
  await removeLocalItem("user_following");
  await removeLocalItem("blockedUsers");
  await removeLocalItem("user_thumbnail");
  await removeLocalItem("user_dp");
  await removeLocalItem("user_cover");
  await removeLocalItem("user_idp_id");
  await removeLocalItem("gender");
  await removeLocalItem("dob");
  await removeLocalItem("triviaDate");
  await removeLocalItem("triviaStatus");
  await removeLocalItem("recapNavigationDone");
  await removeLocalItem("reco_preferences");
  
}

// remove local storage item
const removeLocalItem = async(itemKey: string) => {
  try {
      await EncryptedStorage.removeItem(itemKey);
  } catch (error) {
      // There was an error on the native side
      // You can find out more about this error by using the `error.code` property
      //console.log(error.code); // ex: -25300 (errSecItemNotFound)
  }
}

  // fetch ottinfo
  export const getOTTInfoForMovie = async (movieID, countryCode, extendedLog, userPrefsState) => {
    return searchAPI
      .getOTTDetailForMovie(movieID, countryCode)
      .then((response) => {
        if (response && response.data) {
          let ottList = response.data.map((value) => value.networkprovider);
            //new logic
            let supportedOTTs = userPrefsState?.prefsData?.supportedOTTs;
            
            let supportedOTTsResponse = ottList.filter(value => supportedOTTs.includes(value));
            if(supportedOTTsResponse?.length > 0){
              //
              if(supportedOTTsResponse.includes('Theatre') && ottList?.includes('Theatre')){
              }
              
              let ottPrefsApiData = userPrefsState.userPrefsApiData?.otts;
              if(ottPrefsApiData?.length > 0){
                const finalOTTs = ottPrefsApiData.filter(obj => supportedOTTsResponse?.includes(obj.name));
                return {id: movieID, data: finalOTTs};
              }
              
             return {id: movieID, data: []};
            }
        
        }
      })
      .catch((error) => {
        extendedLog.error(
          'Error executing searchAPI.getOTTInfoForMovie with message:',
          error
        );
        return {id: movieID, data: []};
      });
  };

  // Function to check if OTT names exist for a given ID
  export const checkIfOttLinked = (idNameMap, id, ottNames) => {
    // Get the OTT names for the provided ID
    const existingOttNames = idNameMap[id] || [];
    // Check if any of the passed OTT names exist
    return ottNames.some((name) => existingOttNames.includes(name));
  }


  //navigate forcefully once for year recap
  export const yearRecapForceNavigation = async(navigation) => {
    try {
      // Check if activity has been done before
      const isActivityDone = await EncryptedStorage.getItem('recapNavigationDone');
  
      if (!isActivityDone) {
        // Perform the one-time activity
        console.log("Performing one-time activity...");
        navigation.navigateDeprecated('YearRecapStory')
        // Set the flag in EncryptedStorage
        await EncryptedStorage.setItem(
          'recapNavigationDone',
          JSON.stringify({ done: true })
        );
  
        console.log("Activity completed and stored.");
      } else {
        console.log("Activity has already been completed.");
      }
    } catch (error) {
      console.error("Error accessing EncryptedStorage:", error);
    }
  }

  export const userFullName = async() => {
    // get user full name
      try {
          const name = await EncryptedStorage.getItem("user_fname");
          return name ?? '';
      }
      catch(e){
        console.log({e})
        return '';
      }
  }

  //get complete https link
  export const getSafeSubstring = (paragraph: string, maxLength: any) => {

    let trimmedText = paragraph.substring(0, maxLength).trim();

    // Improved URL regex pattern for detection
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Find all URLs in the original paragraph
    const urls = [...paragraph.matchAll(urlRegex)];

    // Check if any URL is partially included in the trimmed text
    for (const url of urls) {
      const urlStart = url.index;
      const urlEnd = urlStart + url[0].length;

      // If the URL starts within the trimmed text and extends beyond it
      if (urlStart < maxLength && urlEnd > maxLength) {
        // Extend the trimmed text to include the full URL
        trimmedText = paragraph.substring(0, urlEnd);
      }
    }

    return trimmedText;
  }

  export const getMoviePoster = (movieID: any) => {
    const url = "https://" + Config.CF_DOMAIN + "/movies/posters/256x384/" + movieID + ".webp";
    return url;
  }

  export const getCastImageById = (castID: any) => {
    const url = "https://" + Config.CF_DOMAIN + "/movies/cast/" + castID + ".jpg";
    return url;
  }

  export const getMovieBackdropImage = (movieID: any) => {
    const url = "https://" + Config.CF_DOMAIN + "/movies/backdrops/Original/" + movieID + ".webp";
    return url;
  }

  export const getMovieBackdropImageJpg = (movieID : any) =>{
    const url = "https://" + Config.CF_DOMAIN + "/movies/backdrop/original/" + movieID + ".jpg";
    return url;
  }

  //poster image from movie data in case latest webp image don't load
  export const apiPosterImage = (item: any) => {
    let image = null;
    if(item?.posterimageurl && item?.posterimageurl != null && item?.posterimageurl != ''){
      image = item?.posterimageurl;
    }
    else if(item?.posterimage && item?.posterimage != null && item?.posterimage != ''){
      image = TMDB_BASEURL + item?.posterimage;
    }
    else if(item?.movieimage && item?.movieimage != null && item?.movieimage != ''){
      image = item?.movieimage;
    }
    return image;
  }

  //backdrop image from movie data in case latest webp image don't load
  export const apiBackdropImage = (item: any) => {
    let image = null;
    if (item?.backdropimageurl && item?.backdropimageurl != null && item?.backdropimageurl != "") {
      image = item.backdropimageurl;
    }
    else if(item?.backdropimage != null && item?.backdropimage != ""){
      image = POSTER_IMAGE_BASEURL + item?.backdropimage;
    }
    else if(item?.posterimage && item?.posterimage != null && item?.posterimage != ''){
      image = POSTER_IMAGE_BASEURL + item?.posterimage;
    }
    else if(item?.movieimage && item?.movieimage != null && item?.movieimage != ''){
      image = item?.movieimage;
    }
    return image;
  }

  //get numeric value
  export const getNumericValue = (value: any) => {
    let count = value;
    if(count && count != null && typeof count == 'string'){
      try{
        count = parseInt(count)
        count = abbreviateNumber(count)
      }
      catch(e){
        console.log({e})
      }
    }
    return count;
  }
  