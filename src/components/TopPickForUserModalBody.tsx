import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { RoundedBtn } from './Common/RoundedBtn';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import CalendarIcon from 'svg/calendar_bold.svg'
import CommonStyles from '../../Styles';
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Colon from 'svg/colon'
import Edit from "../icons/Pencil";
import { CalendarView } from './Common/CalendarView';
import { convertTimestampTo24HourFormat, yyyyMMDD } from 'utils/DatetimeHelperFunctions';
import EncryptedStorage from "react-native-encrypted-storage";
import LinearGradient from 'react-native-linear-gradient';
import { WatchlistBtn } from './WatchlistBtn';
import mixpanel from 'mixpanel';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import Toast from 'react-native-toast-message';
import watchlistAPI from 'api/watchlistAPI';
import { AddedBtn } from './AddedBtn';
import recommendationsAPI from 'api/recommendationsAPI';
import { LOG } from 'config';

interface TopPickForUserModalBodyParams {
    hasImage: boolean,
    image: any,
    item: any,
    dismissClicked: Function,
    onRewardMovieClick: Function
}

export const TopPickForUserModalBody: React.FC<TopPickForUserModalBodyParams> = ({
        hasImage,
        image,
        item,
        dismissClicked,
        onRewardMovieClick
    }) => 
    {
    var extendedLog = LOG.extend('TopRecoScreen');

    const [name, setName] = useState('')
    const [isWatchlisted, setIsWatchlisted] = useState(false)
    const [markedSeen, setMarkSeen] = useState(false)

    useEffect(() => {
        getName()
    },[])

    // get user full name
    const getName = async () => {
        try {
            EncryptedStorage.getItem("user_fname").then((userFName) => {
                setName(userFName);
            });
        }
        catch(e){
            console.log({e})
        }
    }

    //top reco watchlist api
    const watchlistClicked = async (movieId) => {
        try {
          await watchlistAPI.addItemToWatchlist(movieId, "1", "Reco");
          setTimeout(() => {
            dismissClicked()
          }, 500);
          setIsWatchlisted(true)
          mixpanel.track("Add_Watchlist", {
            screen: "HomeTab",
            movieID: movieId,
            source: "MyReward",
          });
          AppEventsLogger.logEvent("Add_Watchlist", {
            screen: "HomeTab",
            movieID: movieId,
            source: "MyReward",
          })
          Toast.show({
            text1: "Added to your watchlist",
            type: "beeToast",
            visibilityTime: 2000,
            position: "bottom",
            autoHide: true,
          });
        } catch (error) {
            setTimeout(() => {
                dismissClicked()
            }, 500);
          Toast.show({
            text1: "Could not add to your watchlist",
            type: "beeToast",
            visibilityTime: 2000,
            position: "bottom",
            autoHide: true,
          });
        }
      };

    //mark movie as seen
    const markSeen = (movieId: any) => {
        recommendationsAPI.updateSeenFlag(movieId, 'true').then(() => {
            setMarkSeen(true)
            Toast.show({
                text1: "Marked as seen",
                type: "beeToast",
                visibilityTime: 2000,
                position: "bottom",
                autoHide: true,
              });
            mixpanel.track("MarkSeen", {
                screen: "HomeTab",
                movieID: movieId,
                source: "MyReward",
            });
            setTimeout(() => {
                dismissClicked()
              }, 500);
        }).catch((error) => {
            setTimeout(() => {
                dismissClicked()
              }, 500);
            extendedLog.error(
                'Error in recommendationsAPI.updateSeenFlag with message: ',
                error
              );
        })
    }

    return (
        <AppConsumer>
        {(appConsumer) => (
            <View style={styles.container}>
                <Text style={styles.userName}>{StringConstants.HEY} {name}!</Text>
                <Text style={[styles.reco]}>{StringConstants.HERE_IS_FIRST_RECO}</Text>
                <Text style={[styles.quickRight]}>{StringConstants.QUICK_RIGHT}</Text>
                <TouchableOpacity
                    onPress={() => {
                        onRewardMovieClick(item)
                    }}
                    style={[styles.movieContainer]}
                > 
                    <Image
                        style={styles.movieContainer}
                        source={hasImage && image != null ? { uri: image } : require("assets/defaultMovie.png")}
                        resizeMode={'cover'}
                    />
                    <LinearGradient
                        colors={['#00000000', AppColors.BLACK]}
                        style={styles.darkOverlay}>
                    <Text style={[styles.movieTitle]}>
                        {item?.title ?? ''}
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.height12} />
                <View style={[CommonStyles.rowAlignCenter]}>
                    {markedSeen ?
                            <AddedBtn label={StringConstants.SEEN} width={scaledWidth(100)} height={32} />
                        :
                            <RoundedBtn
                                text={StringConstants.MARK_AS_SEEN} 
                                textColor={AppColors.GREY_VARIANT4}
                                onClick={() => markSeen(item?.movieid || item?.id)} 
                                borderRadius={8} 
                                height={32}
                                width={scaledWidth(100)}
                                borderColor={AppColors.GREY_VARIANT6}
                                bgColor={AppColors.GREY_VARIANT6}
                            />
                    }
                    <View style={styles.gap} />
                    {isWatchlisted ? (
                        <AddedBtn width={scaledWidth(100)} height={32} />
                        ) : (
                            <WatchlistBtn onPress={() => watchlistClicked(item?.movieid || item?.id)}  width={scaledWidth(100)} height={32} />
                        )}

                </View>
                <Text onPress={() => dismissClicked()} style={styles.dismiss}>{StringConstants.DISMISS}</Text>
            </View>
        )}
        </AppConsumer>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: AppColors.BLACK_VARIANT4,
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.6,
        borderRadius: 20,
        borderColor: AppColors.GREY_VARIANT6,
        borderWidth: 1
    },
    userName: {
        fontSize: 20,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE_VARIANT3,
        marginBottom: 14
    },
    reco: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE_VARIANT3,
        marginBottom: 2
    },
    quickRight: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
        marginBottom: 12
    },
    movieContainer: {
        height: scaledWidth(271), 
        width: scaledWidth(212), 
        borderRadius: 8,
        overflow: 'hidden'
      },
    darkOverlay: {
        borderRadius: 8, 
        height: scaledWidth(271), 
        width: scaledWidth(212), 
        position: 'absolute'
    },
    movieTitle: {
        position: 'absolute',
        color: AppColors.WHITE,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: FontFamily.DMSansBold,
        paddingHorizontal: 20
    },
    height12: {
        height: 14,
    },
    dismiss: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT1,
        marginTop: 12
    },
    gap: {
        width: 8
    }
    
});
