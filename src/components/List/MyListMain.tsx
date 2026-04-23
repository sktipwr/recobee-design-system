import React from 'react';
import { AppConsumer } from 'context';
import Carousel from 'react-native-snap-carousel';
import MovieList from 'components/List/MovieList';
import Tick from '../../icons/Tick';
// import MoreVertical from 'icons/MoreVertical';
import MoreVertical from 'svg/expanded_vertical_dots';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../Styles';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { Tabs } from "react-native-collapsible-tab-view";
import StringConstants from 'utils/StringConstants';

export default function ListMain({
  userlists,
  onMovieClick,
  onAddClick,
  loadMoreItems,
  onShareClick,
  onMoreClick,
  isPublic,
  horizontal = false,
  noBorder = false,
  userName,
  hasFriends,
  selected,
  isListView = true,
  maxWidth = SCREEN_WIDTH * 0.36,
  tabView = false,
  loadMore = false,
  feedOver = false
}) {

  const renderCarouselItem = ({ item, i }) => {
    return (
      <MovieList
        key={i}
        item={item}
        width={61}
        aspectRatio={1.44}
        onMovieClick={onMovieClick}
      />
    );
  };

  const getAccessType = (access) => {
    let text = '';
    switch (access) {
      case 'G':
        text = 'Public';
        break;
      case 'P':
        text = 'Private';
        break;
      case 'F':
        text = 'Friends';
        break;
      default:
        break;
    }
    return text;
  }

  const renderItem = ({ item, i }) => {
    let text = getAccessType(item[0]?.access)
    let showMoreOptions = item?.length == 1 && (item[0]?.movieid == null || item[0]?.movieid == undefined) ? false : true

    return (
      <AppConsumer>
        {(appConsumer) => (
          <TouchableOpacity
            onPress={() => onMovieClick(null, item[0])}
            style={[styles.listItemContainer, {marginRight: horizontal ? 16 : 0}]}
          >
            <View style={{}}>
              <Carousel
                data={item}
                loop={true}
                renderItem={renderCarouselItem}
                useScrollView
                sliderWidth={isListView ? 120 : SCREEN_WIDTH * 0.38}
                itemWidth={52}
                autoplay={false}
                firstItem={0}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.9}
              ></Carousel>
            </View>
            <View
              style={[{paddingLeft: 16}, tabView ? styles.listContainer : styles.listInfo]}
            >
              <View style={[CommonStyles.flexDirRow]}>
                <View
                  style={[{maxWidth: maxWidth}]}
                >
                  <Text
                    numberOfLines={horizontal ? 1 : 2}
                    style={[styles.txtHeader, { color: AppColors.WHITE_VARIANT3 }]}
                  >
                    {item[0].name}
                  </Text>
                  {showMoreOptions ?
                  <Text
                    style={styles.movies}
                  >
                    {item.length} Movies
                  </Text>
                  : <View style={styles.verticalGap}/>}
                </View>
                
                {isPublic || noBorder ? null : 
                  <View style={[styles.moreContainer]}>
                      <TouchableOpacity
                        style={styles.moreIcon}
                        onPress={() => onMoreClick(item)}
                      >
                        <MoreVertical height={20} width={20} />
                      </TouchableOpacity>
                  </View>
                }
              </View>
              {text != null && text != '' && (
                    <View style={styles.listType}>
                      <Text style={styles.listTypeText}>
                        {text}
                      </Text>
                    </View>
                )}
              
                <>
                  {isPublic ? (
                    <View
                      style={styles.flexEnd}
                    >
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => onAddClick(item)}
                      >
                        <Text
                          style={styles.addToList}
                        >
                          + Add to My List
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={styles.flexEnd}
                    >
                      
                    </View>
                  )}
                </>
             
            </View>
          </TouchableOpacity>
        )}
      </AppConsumer>
    );
  };

  // handle ui for footer of list
  const footerComponent = () => {
    if(isListView){
      if (feedOver && !loadMore) return renderFeedoverMsginFooter();
      else if (!feedOver && loadMore) return footerLoadingComponent();
    }
    else {
      return <></>
    }
   
  };


  // message for footer when all items are loaded
  const renderFeedoverMsginFooter = () => {
    if(userlists?.length > 5)
      return (

          <View style={[CommonStyles.footerContainer, {marginBottom: 15}]}>
            <Text style={[CommonStyles.footerFeedOverMsgTxt]}>
              {StringConstants.END_OF_LISTS_FEED}
            </Text>
          </View>
      );
    else return null;
  };

  // footer loading component when data is loading
  const footerLoadingComponent = () => {
    return (
      <View style={[CommonStyles.footerLoaderContainer, {marginBottom: 25}]}>
        <ActivityIndicator animating={loadMore} color={AppColors.WHITE_VARIANT} size='small' />
        <Text style={CommonStyles.loaderText}>{StringConstants.LOADING}</Text>
      </View>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
            <View style={[styles.container]}>
              {tabView ? 
                <Tabs.FlatList
                  data={userlists}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: horizontal ? 0 : 80 }}
                  keyExtractor={(item) => `${item?.[0]?.id ?? item?.[0]?.listid ?? item?.[0]?.movieid}`}
                  onEndReached={()=> {if(userlists?.length > 0) {
                    if(typeof loadMoreItems === 'function' && !loadMore && !feedOver)
                      loadMoreItems()
                    }}}
                  onEndReachedThreshold={0.1}
                  horizontal={horizontal ? true : false}
                  ListFooterComponent={footerComponent}
                  renderItem={renderItem}
                />
                :
                <FlatList
                  data={userlists}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: horizontal ? 0 : 80 }}
                  keyExtractor={(item) => `${item?.[0]?.id ?? item?.[0]?.listid ?? item?.[0]?.movieid}`}
                  onEndReached={()=> {if(userlists?.length > 0) {
                    if(typeof loadMoreItems === 'function' && !loadMore && !feedOver)
                      loadMoreItems()
                    }}}
                  onEndReachedThreshold={0.1}
                  horizontal={horizontal ? true : false}
                  renderItem={renderItem}
                  ListFooterComponent={footerComponent}

                />
              }
            </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  verticalGap: {
    height: 3
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  listInfo: {
    paddingTop: 5,
    paddingRight: 0,
    flex: 1,
  },
  addToList: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 12,
    color: AppColors.WHITE,
    opacity: 0.6,
  },
  listMeta: {
    maxWidth: 0.36 * SCREEN_WIDTH 
  },
  moreIcon: {
    paddingBottom: 2,
    width: 50,
    alignItems: 'flex-end',
  },
  moreContainer: { 
    flex: 1, 
    alignItems: 'flex-end' 
  },
  listTypeText: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 12,
    color: AppColors.GREY_VARIANT4
  },
  movies: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4
  },
  listItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    
  },
  listItem: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  listType: {
    //paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
    maxWidth: 90,
    backgroundColor: AppColors.GREY_VARIANT6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtHeader: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 16,
    color: AppColors.WHITE_VARIANT3
  },
  addBtn: {},
  radio: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: 'absolute',
    bottom: 9,
    right: 9,
  },
  listContainer: {
    paddingTop: 5,
    flex: 1,
    paddingRight: 0,
    marginRight: 29
  }
});
