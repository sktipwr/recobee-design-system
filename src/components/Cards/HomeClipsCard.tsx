

import AppColors from "utils/Colors";

import React, { FC, useCallback, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import { scaledWidth } from "utils/Dimensions";
import Video, { VideoRef } from 'react-native-video';
import recommendationsAPI from "api/recommendationsAPI";
import { LOG } from 'config';

var extendedLog = LOG.extend('TopRecoScreen');

export type HomeClipsProps = {
    item: any,
    onMovieClick: Function,
    onReelClick: Function,
    index: number,
    data: any,
    sectionType: string
  };

  export const HomeClipsCard: FC<HomeClipsProps> = ({
    item, 
    onMovieClick,
    onReelClick,
    index,
    sectionType,
    data
  }) => {

    const reelVideoRef = useRef<VideoRef>(null);

    const onPlayError = (error?) => {};

    //handle movie click
    const movieClicked = useCallback(async() => {
        try {
            const response = await recommendationsAPI.getMovieDetails(item.movieId);

            if(response?.data){
                onMovieClick(
                    item.movieId,
                    response?.data,
                    data,
                    false,
                    sectionType,
                    'homeClipsCard'
                );
            }
        }
        catch (err){
            extendedLog.error(
                'Error in retreiving recommendationsAPI.getMovieDetails with message: ',
                err
              );
        }
    }, [item])

    //show movie name and image
    const renderMoviewView = () => {
      return (
        <TouchableOpacity
            onPress={() =>  movieClicked()}
            style={[CommonStyles.rowAlignCenter, styles.movieInfo]}
        >
            {((item?.image && item?.image != '') ||
                (item?.posterImage && item?.posterImage != '')) && (
                <Image
                    source={{
                        uri:
                        item?.posterImage && item?.posterImage != ''
                            ? item?.posterImage
                            : item?.image,
                    }}
                    style={styles.movieImage}
                />
            )}
            <Text numberOfLines={2} style={styles.title}>
                {item?.title}
            </Text>
        </TouchableOpacity>
        );
    };
    
  return (
        <TouchableOpacity style={styles.container} onPress={() => onReelClick(index)}>
            <Video
                source={{uri: item?.videoLink}}
                ref={reelVideoRef}
                resizeMode={'cover'}
                controls={false}
                ignoreSilentSwitch="ignore"
                onError={(error) => onPlayError(error)} // Callback when video cannot be loaded
                paused={true}
                style={styles.videoThumbnail}
                onLoad={() => {
                    reelVideoRef?.current?.seek(0); // this will set first frame of video as thumbnail
                }}
            />
            {renderMoviewView()}
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        color: AppColors.WHITE_VARIANT3,
        fontFamily: FontFamily.DMSansBold,
        width: scaledWidth(120)
    },
    videoThumbnail: {
        height: scaledWidth(239),
        width: scaledWidth(160),
        borderRadius: 4,
        overflow: 'hidden'
    },
    container: {
        marginRight: 16
    },
    movieImage: {
        width: scaledWidth(24),
        height: scaledWidth(30),
        marginVertical: 2,
        borderRadius: scaledWidth(2),
        marginRight: 4,
    },
    movieInfo: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        zIndex: 5,
        borderRadius: 4,
        width: scaledWidth(144)
    },
});
