import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import DefaultUser from 'svg/user';
import Critic from 'svg/critic';
import Logo from 'svg/logoWithNoBg';
import StringConstants from "utils/StringConstants";
import FontFamily from "utils/FontFamily";
import { Rating } from "react-native-ratings";
import OttBox from "./OttBox";
import { OTTIcon } from "../Atoms/OTTIcon";

export const MovieShareCard: React.FC = ({item, genres, movieOTTList}) => {

    const [readMore, setReadMore] = useState(
        item?.synopsis && item?.synopsis?.length > SCREEN_WIDTH * 0.35
    ); 

    if(genres?.length > 0) {
        genres = genres.join(", ");
    }else{
        genres = "";
    }

    let coverPicture = item?.backdropimage;
    if (item.backdropimage == null || item.backdropimage == "") {
      coverPicture = item?.movieimage;
    }
    else {
      coverPicture = "https://image.tmdb.org/t/p/w780/" + item.backdropimage;
    }

    return (
        <AppConsumer>
        {(appConsumer) => (
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <Image source={{uri : coverPicture }} style={styles.movieImage} />
            <Text style={styles.details}>
                {item?.title}
          </Text>
          <View style={styles.metaInfoContainer}>
            <Text style={styles.metaData}>
             {genres} 
             {item?.runningtime != null && item?.runningtime != "" && item?.runningtime ? ' | ' + `${item.runningtime}` : ''}
             {item?.releasedate != null && item?.releasedate != "" && item?.releasedate ? ' | ' + item.releasedate : ''}
             {item?.isseries != null && item?.isseries != "" && item?.isseries != undefined ? (item?.isseries == true ? ' | Series' : ' | Movie') : ''}
             {item?.language != null && item?.language != "" && item?.language ? ' | ' + item.language : ''}
            </Text>
          </View>
          {
            item?.arrating &&
            item?.arrating != "0" ? (
            <View
              style={styles.ratingContainer}
            >
              <Rating
                ratingCount={5}
                imageSize={18}
                fractions={1}
                startingValue={parseFloat(item.arrating)}
                jumpValue={0.5}
                ratingColor="#e9c46a"
                tintColor={appConsumer.theme.colors.primary}
                readonly={true}
              />
              <Text style={[styles.metaData, styles.ratingText]}>{`(${item.arrating}/5)`}</Text>
            </View>
            ) : null
          }
          {readMore 
            ? (
                    <View>
                      <Text style={[styles.metaData,{paddingHorizontal: 20}]}>
                        {item.synopsis.substring(0, SCREEN_WIDTH * 0.7).trim()}...
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={[styles.metaData,{paddingHorizontal: 20}]}>
                        {item.synopsis && item.synopsis.trim()}
                        {item.synopsis &&
                        item.synopsis.length > SCREEN_WIDTH * 0.7 ? '' : null}
                        </Text>
                    </View>
                  )}
                  {movieOTTList?.length > 0 ? (
                    <View
                        style={styles.ottContainer}
                    >
                        <Text style={[styles.metaData, {marginRight: 4}]}>{'Available on : '}</Text>
                        {movieOTTList.map((value) => {
                        return (
                            <View style={{marginHorizontal: 4}}>
                              <OTTIcon iconName={value.name == 'Amazon Prime Video' ||
                                  value.name == 'Amazon Prime'
                                      ? 'Prime'
                                      : value.name} 
                              />
                            </View>
                            );
                        })}
                    </View>
                    )
                    :
                    null
                 }
            </View>
            <Text
                style={[
                styles.metaData,
                { marginVertical: scaledHeight(18) },
                ]}
            >
                {'View More Details at'}
            </Text>
            <Logo height={scaledHeight(44)} width={scaledWidth(106)} />
        </View>
        )}
      </AppConsumer>
    );
  }


const styles = StyleSheet.create({
    details: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE,
        marginTop: 25
      },
      outerContainer: {alignItems: 'center', marginTop: scaledHeight(10), backgroundColor: "#121212"},
      ottContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: scaledHeight(31), alignItems: 'center' },
      metaInfoContainer: {flexDirection: 'row', marginTop: 2},
      moreAndLessText: {
        opacity: 0.8,
        top: 4,
        position: 'relative',
      },
      metaData: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
        //marginTop: 25
      },
      ratingText: {marginLeft: 9, fontSize: 14},
      ratingContainer: {
        alignItems: "center",
        paddingTop: 14,
        paddingBottom: 27, 
        flexDirection: 'row',
      },
      movieImage: {
        height: scaledHeight(152),
        width: '100%',
        borderTopLeftRadius: scaledWidth(13),
        borderTopRightRadius: scaledWidth(13),
      },
      container: {
        backgroundColor: AppColors.GREY_VARIANT2, 
        borderRadius: scaledWidth(11), 
        alignItems: 'center', 
        width: SCREEN_WIDTH * 0.93, 
        paddingBottom: scaledHeight(24)  
    },
   
});
