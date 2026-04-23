import React, { useContext } from 'react';
import { AppConsumer } from 'context';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image as RNImage,
  Platform,
} from 'react-native';
import { CLOUD_BASEURL } from 'utils/HelperFunctions';
import { UserPrefsContext } from '../../stores/userPrefs/userPrefsContext';
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from 'utils/Dimensions';
import CommonStyles from '../../../Styles';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { PosterAndTitleCard } from './PosterAndTitleCard';

function PreferredOTTsCard({
  dataItem,
  onClick,
  list,
  url,
  cardheight,
  cardwidth,
  alignment,
  sectionType,
}) {
  let title = '';
  let listID =
  dataItem[0] &&
    (dataItem[0].listid || dataItem[0].fromfriendid || dataItem[0].networkprovider);
  if (!listID) {
    listID = dataItem.id;
  }
  if (dataItem[0]) {
    if (dataItem[0].pref) {
      title = dataItem[0].pref;
    } else if (dataItem[0].networkprovider) {
      if (dataItem[0].networkprovider == 'Amazon Prime Video') {
        title = `Buzzing on Prime Video`;
      } else {
        title = `Buzzing on ` + dataItem[0].networkprovider;
      }
      listID = dataItem[0].networkprovider;
    } else if (dataItem[0].senderfname) {
      title = dataItem[0].senderfname + `'s Recos`;
    }
  } else {
    title = dataItem.title;
  }

  const { userPrefsState, dispatch } = useContext(UserPrefsContext);

  const checkMovieImage = (value) => {
    let present = true;
    if (
        value &&
        (value?.posterimage == null || value?.posterimage == '') &&
        value?.posterimageurl == null
      ) {
        if (
            value?.movieimage == null ||
            value?.movieimage == '' ||
            value?.movieimage == 'N/A'
        ) {
            present = false
        }
      }
      return present;
  }

  const getPoster = (value) => {
    let uri = require('assets/defaultMovie.png');
    if (value.url || value.image) {
      uri = value.url || value.image;
    } else if (value.posterimageurl && value.posterimageurl != null) {
      uri = value.posterimageurl;
    } else if (value.posterimage == null || value.posterimage == '') {
      uri = value.movieimage;
    } else {
      uri = 'https://image.tmdb.org/t/p/w780/' + value.posterimage;
    }
    return uri;
  }

  const renderItem = (item, index) => {
    return (
        <View
          style={[
            index != 2 && { marginRight: 9}
            
          ]}
        >
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => onClick(listID, item, list, url, sectionType)}
            >
              <PosterAndTitleCard item={item} index={index} />
            </TouchableOpacity>
          </View>
        </View>
    )
  }

  const getOTTLogo = (value) => {
    if (value[0].networkprovider) {
        // get selected ott value based on item clicked
        let isAmazonVideo = (value[0].networkprovider == 'Amazon Video') || (value[0].networkprovider == "Amazon Prime Video") ? true : false;
  
        const condition = (obj) => obj.name == value[0].networkprovider;
        // below is for static provider as "Amazon Video"'
        const conditionForPrime = (obj) => ("Amazon Prime Video" == obj.name) || ("Amazon Prime" == obj.name);
          
        const selectedOTT = userPrefsState?.prefsData?.ott?.find(isAmazonVideo ? conditionForPrime : condition);
        return (
            <FastImage
              source={{ uri:  CLOUD_BASEURL + selectedOTT?.logoName }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 20,
              }}
            />
          );
        
      }
  }

  let data = dataItem?.length >= 3 ? dataItem?.slice(0, 3) : dataItem

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={styles.container}>
            <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, {marginBottom: 13}]}>
                <TouchableOpacity style={[CommonStyles.rowAlignCenter]} onPress={() => onClick(listID, dataItem, list, url, sectionType)}>
                    {dataItem[0]?.networkprovider ? getOTTLogo(dataItem) : 
                        <RNImage
                            source={require('assets/BlackBee.png')}
                            fadeDuration={0}
                            style={styles.ottIcon}
                        />
                    }
                    <Text style={styles.title}>
                        {dataItem[0]?.networkprovider}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClick(listID, dataItem, list, url, sectionType)}><Text style={styles.viewAll}>{StringConstants.VIEW_ALL}</Text></TouchableOpacity>
            </View>
            <View style={[CommonStyles.flexDirRow]}>
            {data?.map((value, index) => {
                return(
                    renderItem(value, index)
                )
            })}
            </View>
            
        </View>
        
      )}
    </AppConsumer>
  );
}

export default React.memo(PreferredOTTsCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.THEME_BG_COLOR,
    marginRight: 16,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  posterImage: {
    height: 118,
    width: 76,
    borderRadius: 4
  },
  ottIcon: {
    width: 24,
    height: 24,
  },
  viewAll: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.LIGHT_YELLOW
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3
  },
  imageContainer: {
    // flex: 1,
    borderRadius: 4,
    maginRight: 9
  },
});
