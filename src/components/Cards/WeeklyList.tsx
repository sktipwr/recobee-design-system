

import React, { useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import FastImage from "react-native-fast-image";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { RoundedBtn } from "../Common/RoundedBtn";
import LinearGradient from "react-native-linear-gradient";
import PremiumBadge from 'svg/premium_badge_icon';
import HomeMovieCard from "./HomeMovieCard";
import { BlurView } from "@react-native-community/blur";

const getWeeklyDateRange = () => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Calculate days to last Thursday (4)
  const daysSinceLastThursday = (currentDay + 3) % 7; // +3 because (4 + 3) % 7 = 0 for Thursday
  const lastThursday = new Date(now);
  lastThursday.setDate(now.getDate() - daysSinceLastThursday - 7);
  
  // This Thursday is lastThursday + 7 days
  const thisThursday = new Date(lastThursday);
  thisThursday.setDate(lastThursday.getDate() + 7);
  
  // Format dates as 'MMM D' (e.g., 'Jul 18')
  const formatDate = (date: Date) => {
    return date.toLocaleString('default', { month: 'short', day: 'numeric' });
  };
  
  return `${formatDate(lastThursday)} - ${formatDate(thisThursday)}`;
};

export const WeeklyListCard: React.FC = ({ data, onAddClick, url, onMovieClick, sectionType, onSeenClick, onListClick, isPremiumUser , showButton = true , clickable = true }) => {

  const coverPicItems = useMemo(
    () => (data?.length >= 3 ? data.slice(0, 3) : data || []),
    [data]
  );

  // 2. Track how many have loaded
  const [loadedCount, setLoadedCount] = useState(0);
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    setDateRange(getWeeklyDateRange());
  }, []);

  return (
    <AppConsumer>
      {(appConsumer) => (
        <>
          {/* This is the rail ui of weekly list commented for now 
       {data?.length > 0 ? 
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item, index) =>
              'movie-card-' + index + '-' + item?.id
            }
            showsHorizontalScrollIndicator={false}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            renderItem={({ item, index }) => {
              if(index == 0)
                return (
                  <HomeMovieCard
                    item={item}
                    list={data}
                    onAddClick={onAddClick}
                    onMovieClick={onMovieClick}
                    onSeenClick={onSeenClick}
                    isTrending={false}
                    isOTT={false}
                    sectionType={sectionType}
                  ></HomeMovieCard>
                )
              else {
                return (
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    if(!isPremiumUser){
                      onListClick(null, data, null, url, sectionType)
                    }
                  }}>
                    <HomeMovieCard
                      item={item}
                      list={data}
                      onAddClick={onAddClick}
                      onMovieClick={onMovieClick}
                      onSeenClick={onSeenClick}
                      isTrending={false}
                      isOTT={false}
                      disableTouch={true}
                      sectionType={sectionType}
                    >
                    </HomeMovieCard>
                    {!isPremiumUser &&
                      <BlurView
                        style={styles.absolute}
                        blurType="light"
                        overlayColor="transparent"
                        blurAmount={8}
                        reducedTransparencyFallbackColor="transparent"
                      />
                    }
                    {!isPremiumUser &&
                    <View style={styles.premiumLogo}>
                       <PremiumBadge height={40} width={40} />
                     </View>
                    }
                  </TouchableOpacity>
                )
              }
            }
            }
        />
         */}
        {clickable ? (
          <TouchableOpacity style={styles.weeklyCard} onPress={()=> {onListClick(null, data, null, url, sectionType)}}>
            <View style={[styles.cover]}>
              {coverPicItems.map((item, idx) => {
                const uri =
                  item.posterimageurl ||
                  item.movieimage ||
                  (item.posterimage && `https://image.tmdb.org/t/p/w780/${item.posterimage}`) ||
                  null;

                // Calculate width to ensure no gaps
                const imageCount = coverPicItems.length;
                const imageWidth = imageCount === 1 
                  ? styles.cover.width 
                  : Math.ceil(styles.cover.width / imageCount);

                return (
                  <FastImage
                    key={idx}
                    style={{
                      width: imageWidth,
                      height: styles.cover.height,
                      // Ensure no gaps between images
                      marginRight: idx < imageCount - 1 ? 0 : 0,
                    }}
                    source={uri ? { uri } : require("assets/defaultMovie.png")}
                    onLoadEnd={() => setLoadedCount(c => c + 1)}
                    resizeMode="cover"
                  />
                );
              })}
            </View>
              <LinearGradient
                colors={['#00000000', AppColors.BLACK]} 
                style={styles.darkOverlay}>
                {/* this is commented for now
               <View style={styles.weeklistSparkle}>
                <PremiumBadge height={30} width={30} />
              </View> */}
              <View style={[CommonStyles.rowSpaceBetween, styles.overlayItems]}>
                  <View style={{width: '70%'}}>
                  { showButton ?
                  (<>
                  <Text style={styles.recoText}>{StringConstants.GET_SPEICIAL_LIST_RECO}</Text>
                    <Text style={styles.activityBased}>{StringConstants.MOVIES_BASED_ON_ACTIVITIES}</Text>
                    </>):(
                      <>
                      <Text style={styles.dateRange}>{dateRange}</Text>
                      <Text style={styles.cardTitle}>{StringConstants.YOUR_WEEKLY_MOVIE_PICKS}</Text>
                        <Text style={styles.cardDescription}>{StringConstants.BASED_ON_RECENT_ACTIVITY}</Text>
                        </>
                    )}
                  </View>
                 {showButton && <RoundedBtn
                      text={StringConstants.VIEW_LIST} 
                      textColor={AppColors.GREY_VARIANT2}
                      height={22}
                      fontSize={10}
                      fontFamily={FontFamily.DMSansRegular}
                      onClick={() => {onListClick(null, data, null, url, sectionType)}} 
                      marginRight={0}
                      borderRadius={10} 
                      width={scaledWidth(74)}
                      borderColor={AppColors.LIGHT_YELLOW}
                      bgColor={AppColors.LIGHT_YELLOW}
                  />}
              </View>

            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.weeklyCard}>
            <View style={[styles.cover]}>
              {coverPicItems.map((item, idx) => {
                const uri =
                  item.posterimageurl ||
                  item.movieimage ||
                  (item.posterimage && `https://image.tmdb.org/t/p/w780/${item.posterimage}`) ||
                  null;

                // Calculate width to ensure no gaps
                const imageCount = coverPicItems.length;
                const imageWidth = imageCount === 1 
                  ? styles.cover.width 
                  : Math.ceil(styles.cover.width / imageCount);

                return (
                  <FastImage
                    key={idx}
                    style={{
                      width: imageWidth,
                      height: styles.cover.height,
                      // Ensure no gaps between images
                      marginRight: idx < imageCount - 1 ? 0 : 0,
                    }}
                    source={uri ? { uri } : require("assets/defaultMovie.png")}
                    onLoadEnd={() => setLoadedCount(c => c + 1)}
                    resizeMode="cover"
                  />
                );
              })}
            </View>
              <LinearGradient
                colors={['#00000000', AppColors.BLACK]} 
                style={styles.darkOverlay}>
                {/* this is commented for now
               <View style={styles.weeklistSparkle}>
                <PremiumBadge height={30} width={30} />
              </View> */}
              <View style={[CommonStyles.rowSpaceBetween, styles.overlayItems]}>
                  <View style={{width: '70%'}}>
                  { showButton ?
                  (<>
                  <Text style={styles.recoText}>{StringConstants.GET_SPEICIAL_LIST_RECO}</Text>
                    <Text style={styles.activityBased}>{StringConstants.MOVIES_BASED_ON_ACTIVITIES}</Text>
                    </>):(
                      <>
                      <Text style={styles.dateRange}>{dateRange}</Text>
                      <Text style={styles.cardTitle}>{StringConstants.YOUR_WEEKLY_MOVIE_PICKS}</Text>
                        <Text style={styles.cardDescription}>{StringConstants.BASED_ON_RECENT_ACTIVITY}</Text>
                        </>
                    )}
                  </View>
                 {showButton && <RoundedBtn
                      text={StringConstants.VIEW_LIST} 
                      textColor={AppColors.GREY_VARIANT2}
                      height={22}
                      fontSize={10}
                      fontFamily={FontFamily.DMSansRegular}
                      onClick={() => {onListClick(null, data, null, url, sectionType)}} 
                      marginRight={0}
                      borderRadius={10} 
                      width={scaledWidth(74)}
                      borderColor={AppColors.LIGHT_YELLOW}
                      bgColor={AppColors.LIGHT_YELLOW}
                  />}
              </View>

            </LinearGradient>
          </View>
        )}
        
        </>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  weeklyCard: {
    width: SCREEN_WIDTH - 32, 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: AppColors.GREY,
    overflow: 'hidden', // Ensure border radius clips content
  },
  cover: {
    width: SCREEN_WIDTH - 32,
    height: scaledHeight(153),
    borderRadius: 10,
    flexDirection: "row",
    overflow: 'hidden', // Ensure images don't overflow rounded corners
  },
  weeklistSparkle: {
    position: 'absolute',
    right: 14,
    top: 14,
    elevation: 20
  },
  movieImage: {
    height: scaledHeight(153),
    width: SCREEN_WIDTH * 0.295,
    borderRadius: 10
  },
  darkOverlay: {
    borderRadius: 10, 
    height: scaledHeight(153),
    width : '100%', 
    position: 'absolute'
  },
  recoText: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 10,
    color: AppColors.WHITE_VARIANT3
  },
  overlayItems: {
    position: 'absolute', 
    left: 10, 
    right: 10,
    bottom: 16,
    alignItems: 'center'
  },
  activityBased: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.WHITE_VARIANT3
  },
  premiumLogo: {
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: -14, 
    right: 0, 
    zIndex: 19, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: SCREEN_WIDTH * 0.5,
    width: SCREEN_WIDTH * 0.355,
    borderRadius: 8
  },
  cardTitle: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 28,
    color: AppColors.WHITE_VARIANT3
  },
  cardDescription: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14,
    color: AppColors.WHITE_VARIANT3
  },
  dateRange: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 12,
    color: AppColors.WHITE_VARIANT3,
    opacity: 0.8
  },
});
