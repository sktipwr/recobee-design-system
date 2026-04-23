import React, { useState, useEffect, useCallback, useContext } from 'react';
import { AppConsumer } from 'context';
import DefaultUser from 'svg/user';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  Image as RNImage,
} from 'react-native';
//import { CF_DOMAIN } from "env";
import Config from 'react-native-config';
import { CLOUD_BASEURL } from 'utils/HelperFunctions';
import { UserPrefsContext } from '../../stores/userPrefs/userPrefsContext';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from 'utils/Colors';
import { scaledHeight, scaledWidth } from 'utils/Dimensions';
import FontFamily from 'utils/FontFamily';
import { apiPosterImage, getMoviePoster } from 'utils/utilFunctions';


function GroupCard({
  item,
  onClick,
  list,
  url,
  cardheight,
  cardwidth,
  alignment,
  sectionType,
}) {

  const [imageLoadError, setImageLoadError] = useState(false)
  const [chartsImgLoadError, setChartsImgLoadError] = useState(false)

  let title = '';
  let listID =
    item[0] &&
    (item[0].listid || item[0].fromfriendid || item[0].networkprovider);
  if (!listID) {
    listID = item.id;
  }
  if (item[0]) {
    if (item[0].pref) {
      title = item[0].pref;
    } else if (item[0].networkprovider) {
      if (item[0].networkprovider == 'Amazon Prime Video') {
        title = `Buzzing on Prime Video`;
      } else {
        title = `Buzzing on ` + item[0].networkprovider;
      }
      listID = item[0].networkprovider;
    } else if (item[0].senderfname) {
      title = item[0].senderfname + `'s Recos`;
    }
  } else {
    title = item.title;
  }
  const [hasImage, setHasImage] = useState(true);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);


  let uri = require('assets/defaultMovie.png');
  if (item.url || item.image) {
    uri = item.url || item.image;
  } else if (item[0].posterimageurl && item[0].posterimageurl != null) {
    uri = item[0].posterimageurl;
  } else if (item[0].posterimage == null || item[0].posterimage == '') {
    uri = item[0].movieimage;
  } else {
    uri = 'https://image.tmdb.org/t/p/w780/' + item[0].posterimage;
  }

  const getImage = () => {
    if (item[0].pref) {
      return (
        <RNImage
          source={require('assets/BlackBee.png')}
          fadeDuration={0}
          style={{
            width: 6,
            height: 10,
          }}
        />
      );
    } else if (item[0].senderfname) {
      switch (item[0].thumbnail) {
        case null:
          return <DefaultUser height={20} width={20} />;
        default:
          return (
            <RNImage
              source={{ uri: item[0].thumbnail }}
              fadeDuration={0}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />
          );
      }
    } else if (item[0].networkprovider) {
      // get selected ott value based on item clicked
      let isAmazonVideo = item[0].networkprovider == 'Amazon Video' ? true : false;

      const condition = (obj) => obj.name == item[0].networkprovider;
      // below is for static provider as "Amazon Video"'
      const conditionForPrime = (obj) => "Amazon Video" == item[0].networkprovider;
        
      const selectedOTT = userPrefsState?.prefsData?.ott?.find(isAmazonVideo ? conditionForPrime : condition);
      return (
          <FastImage
            source={{ uri:  CLOUD_BASEURL + selectedOTT?.logoName }}
            // fadeDuration={0}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
            }}
          />
        );
      
    }
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <>
        {sectionType == 'charts' ? 
          <TouchableOpacity
            onPress={() => onClick(listID, item, list, url, sectionType)}
            style={styles.chartContainer}
          > 
            {!chartsImgLoadError || apiPosterImage(item[0]) != null
              ?
                <FastImage
                  style={styles.chartContainer}
                  source={{ uri: !chartsImgLoadError ? getMoviePoster(item[0]?.id || item[0]?.movieid || item[0]?.movieId) : apiPosterImage(item[0])}}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => setChartsImgLoadError(true)}
                  defaultSource={require("assets/defaultMovie.png")}
                />
              : 
                <FastImage
                  style={[styles.chartContainer]}
                  source={require("assets/defaultMovie.png")}
                  resizeMode={FastImage.resizeMode.cover}
                />

            }
            <LinearGradient
                colors={['#00000000', AppColors.BLACK]} 
                style={styles.darkOverlay}>
              <Text style={styles.chartTitle}>
                {title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          :
          <View
            style={[
              styles.container,
              {
                height: cardheight || 0.511 * Dimensions.get('window').width,
                width: cardwidth || 0.38055 * Dimensions.get('window').width,
              },
            ]}
          >
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => onClick(listID, item, list, url, sectionType)}
              >
                {!imageLoadError || apiPosterImage(item[0]) != null ? (
                  <>
                    <FastImage
                      style={[
                        styles.movieLogo,
                        {
                          height:
                            cardheight || 0.511 * Dimensions.get('window').width,
                          width:
                            cardwidth || 0.38055 * Dimensions.get('window').width,
                        },
                      ]}
                      source={{ uri: !imageLoadError ? getMoviePoster(item[0]?.id || item[0]?.movieid || item[0]?.movieId) : apiPosterImage(item[0]) }}
                      resizeMode={FastImage.resizeMode.cover}
                      onError={() => setImageLoadError(true)}
                      defaultSource={require('assets/defaultMovie.png')}

                    />
                    <View
                      style={{
                        justifyContent: 'center',
                        padding: 8,
                        height: 54,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        width:
                          cardwidth || 0.38055 * Dimensions.get('window').width,
                        backgroundColor: '#212121',
                        position: 'absolute',
                        bottom: 0,
                      }}
                    >
                      <Text
                        style={[
                          styles.txtImage,
                          { color: '#EEEEEE', textAlign: alignment || 'left' },
                        ]}
                      >
                        {title}
                      </Text>
                  </View>
                </>
              ) : (
                <View
                  style={[
                    styles.movieLogo,
                    {
                      backgroundColor: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                  ]}
                >
                  <Text style={styles.txtImage}>{title}</Text>
                </View>
              )}
              {item[0] && (
                <View
                  style={{
                    position: 'absolute',
                    right: 8,
                    bottom: 62,
                    backgroundColor: '#FEEF68',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                  }}
                >
                  {getImage()}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        }
        </>
      )}
    </AppConsumer>
  );
}

export default React.memo(GroupCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 0.38055 * Dimensions.get('window').width,
    height: 0.511 * Dimensions.get('window').width,
    marginRight: 16,
  },
  chartContainer: {
    height: scaledWidth(212),
    width: scaledWidth(138),
    marginRight: 16,
    borderRadius: 8, 
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.LIGHT_YELLOW_VARIANT4,
    marginHorizontal: 8,
    position: 'absolute',
    bottom: 21
  },
  darkOverlay: {
    borderRadius: 8, 
    height: scaledWidth(212),
    width : '100%', 
    position: 'absolute'
  },
  imageContainer: {
    flex: 1,
    borderRadius: 4,
  },
  movieLogo: {
    width: 0.38055 * Dimensions.get('window').width,
    height: 0.511 * Dimensions.get('window').width,
    justifyContent: 'flex-end',
    borderRadius: 4,
  },
  txtImage: {
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'DMSans-Bold',
    color: '#FFFFFF',
  },
});
