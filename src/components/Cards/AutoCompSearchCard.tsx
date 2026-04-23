import React, { useState, useEffect } from 'react';
import { AppConsumer } from 'context';
import { LOG } from 'config';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
import User from 'svg/user.svg';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  Image as RNImage,
} from 'react-native';
import { FastImageComponent } from './FastImageComponent';
import { getCastImageById } from '../../utils/utilFunctions';

function AutoCompSearchCard({
  item,
  backgroundColor = '#212121',
  height = 60,
  padding = 16,
  onMovieClick,
  onUserClick,
  onListClick,
  onCastClick,
}) {
  const [selected, setSelected] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  let title = item.title;
  let desc = '';
  if (item.releasedate && item.releasedate != null) {
    desc = desc + item.releasedate;
  }
  if (item.genre && item.genre != null && item.genre.length > 0) {
    if (Array.isArray(item.genre)) {
      desc = desc + ' | ' + item.genre[0];
    } else {
      if (item.genre.indexOf(', ') > 0) {
        desc =
          desc +
          ' | ' +
          item.genre
            .toString()
            .substring(0, item.genre.toString().indexOf(', '));
      } else {
        desc = desc + ' | ' + item.genre;
      }
    }
  }
  if (
    item.director &&
    item.director != null &&
    item.director != '' &&
    item.director != 'N/A'
  ) {
    if (Array.isArray(item.director)) {
      desc = desc + ' | ' + item.director[0];
    } else {
      if (item.director.indexOf(', ') > 0) {
        desc =
          desc +
          ' | ' +
          item.director
            .toString()
            .substring(0, item.director.toString().indexOf(', '));
      } else {
        desc = desc + ' | ' + item.director;
      }
    }
  }

  let uri = require('assets/defaultMovie.png');
  switch (item.type) {
    case 'Movie':
      if (item.posterimageurl && item.posterimageurl != null) {
        uri = item.posterimageurl;
      } else if (item.posterimage == null || item.posterimage == '') {
        uri = item.movieimage;
      } else {
        uri = 'https://image.tmdb.org/t/p/w780/' + item.posterimage;
      }
      break;
    case 'Friend':
    case 'User':
      if (item.thumbnail && item.thumbnail != null) {
        uri = item.thumbnail;
      }
      break;
    case 'Cast':
      if (item.tmdbprofilepath && item.tmdbprofilepath != null) {
        uri = 'https://image.tmdb.org/t/p/w780/' + item.tmdbprofilepath;
      }
      else if(item.id && item.id != null){
        uri = getCastImageById(item.id);
      }
      break;
    case 'List':
      if (item.posterimage && item.posterimage != null) {
        uri = 'https://image.tmdb.org/t/p/w780/' + item.posterimage;
      }
      break;
    default:
      if (item.posterimageurl && item.posterimageurl != null) {
        uri = item.posterimageurl;
      } else if (item.posterimage == null || item.posterimage == '') {
        uri = item.movieimage;
      } else {
        uri = 'https://image.tmdb.org/t/p/w780/' + item.posterimage;
      }
      break;
  }

  const renderCard = (appConsumer) => {
    switch (item.type) {
      case 'Movie':
        return renderMovieCard(appConsumer);
      case 'Friend':
      case 'User':
        return renderUserCard(appConsumer);
      case 'List':
        return renderListCard(appConsumer);
      case 'Cast':
        return renderCastCard(appConsumer);
      default:
        return renderMovieCard(appConsumer);
    }
  };

  const renderUserCard = (appConsumer) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let newVal = !selected;
          setSelected(newVal);
          onUserClick(item.id);
        }}
        style={styles.cardContainer}
      >
        <View style={{ paddingRight: 15 }}>
          {item.thumbnail && item.thumbnail != null ? (
            <FastImage
              style={styles.userLogo}
              source={{ uri: uri }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <User height={36} width={36} />
          )}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.txtHeader,
                  { color: appConsumer.theme.colors.text },
                ]}
              >
                {item.fname}
              </Text>
            </View>
            {item.usertag && (
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    styles.txtBody,
                    {
                      color: appConsumer.theme.colors.grey5,
                      maxWidth: Dimensions.get('window').width * 0.5,
                    },
                  ]}
                >
                  @{item.usertag}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.cardType}>
            <View>
              <Text style={[styles.txtBody, { color: '#757575' }]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListCard = (appConsumer) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let newVal = !selected;
          setSelected(newVal);
          onListClick(item.id);
        }}
        style={styles.cardContainer}
      >
        <View style={{ paddingRight: 15 }}>
          {item.image && item.image != null ? (
            <FastImage
              style={styles.userLogo}
              source={{ uri: uri }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <RNImage
              style={styles.userLogo}
              source={require('assets/defaultMovie.png')}
            ></RNImage>
          )}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.txtHeader,
                  { color: appConsumer.theme.colors.text },
                ]}
              >
                {item.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.txtBody,
                  {
                    color: appConsumer.theme.colors.grey5,
                    maxWidth: Dimensions.get('window').width * 0.5,
                  },
                ]}
              >
                {item.count} Movies
              </Text>
            </View>
          </View>
          <View style={styles.cardType}>
            <View>
              <Text style={[styles.txtBody, { color: '#757575' }]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMovieCard = (appConsumer) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let newVal = !selected;
          setSelected(newVal);
          onMovieClick(item.id, item, newVal);
        }}
        style={styles.cardContainer}
      >
        <View style={{ paddingRight: 15 }}>
          <FastImageComponent item={item} imgStyle={styles.movieLogo} movieId={item?.id || item?.movieid || item?.movieId} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.txtHeader,
                  { color: appConsumer.theme.colors.text },
                ]}
              >
                {title}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.txtBody,
                  {
                    color: appConsumer.theme.colors.grey5,
                    maxWidth: Dimensions.get('window').width * 0.5,
                  },
                ]}
              >
                {desc}
              </Text>
            </View>
          </View>
          <View style={styles.cardType}>
            <View>
              <Text style={[styles.txtBody, { color: '#757575' }]}>
                {item.isseries ? 'TV Series' : 'Movie'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCastCard = (appConsumer) => {
    const fallbackImage = item?.castid ? getCastImageById(item.castid) : null;
    return (
      <TouchableOpacity
        onPress={() => {
          let newVal = !selected;
          setSelected(newVal);
          onCastClick(item.name);
        }}
        style={styles.cardContainer}
      >
        <View style={{ paddingRight: 15 }}>
          {item.tmdbprofilepath && item.tmdbprofilepath != null ? (
            <FastImage
              style={styles.userLogo}
              source={{ uri: uri }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ): fallbackImage ? (
              <FastImage
                style={styles.userLogo}
                source={{ uri: fallbackImage }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <User height={36} width={36} />
            ) }
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.txtHeader,
                  { color: appConsumer.theme.colors.text },
                ]}
              >
                {item.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.txtBody,
                  {
                    color: appConsumer.theme.colors.grey5,
                    maxWidth: Dimensions.get('window').width * 0.5,
                  },
                ]}
              >
                {item?.profession}
              </Text>
            </View>
          </View>
          <View style={styles.cardType}>
            <View>
              <Text style={[styles.txtBody, { color: '#757575' }]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            {
              padding: padding,
              height: height,
              paddingBottom: 10,
              paddingRight: 35,
              paddingTop: 10,
              borderColor: '#424242',
              borderTopWidth: 0,
              backgroundColor: backgroundColor,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: '#424242',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        >
          {renderCard(appConsumer)}
        </View>
      )}
    </AppConsumer>
  );
}

export default React.memo(AutoCompSearchCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
  },
  movieLogo: {
    height: 40,
    width: 33,
  },
  userLogo: {
    height: 36,
    width: 36,
    borderRadius: 36,
  },
  txtHeader: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
  },
  ott: {
    height: 30,
    width: 30,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginLeft: 4,
  },
  txtBody: {
    fontSize: 10,
    fontFamily: 'DMSans-Regular',
  },
  actionAltButtonStyle: {
    width: Dimensions.get('window').width * 0.422,
    height: 32,
    backgroundColor: '#121212',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 16,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardType: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 32,
    alignItems: 'center',
    alignContent: 'center',
  },
});
