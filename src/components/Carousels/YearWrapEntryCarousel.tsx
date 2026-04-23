import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import StringConstants from 'utils/StringConstants';
import YearWrapCardButton from '../Common/YearWrapCardButton';


const YearWrapEntryCarousel = ({ navigation, data, onCardPress }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const renderItem = ({ item }) => (
    item.name == 'NEW' ?
      <View style={[styles.card,]}>
        <ImageBackground
          source={require('../../../assets/communitiesBg.png')}
          resizeMode="contain"
          imageStyle={{
            resizeMode: "contain",
            marginLeft: 82,
          }}
          style={styles.backgroundImage}>
          <TouchableOpacity style={styles.cardInnerContainer} onPress={() => onCardPress(item.name)}>
            <View style={styles.textRow}>
              <Text style={styles.recap}>{StringConstants.WHATS_NEW}</Text>
              <Text style={styles.recobee}>{StringConstants.RECOBEE}</Text>
            </View>
            <YearWrapCardButton description={item.description} buttonText={StringConstants.EXPLORE} onPress={() => onCardPress(item.name)} />
          </TouchableOpacity>
        </ImageBackground>
      </View> :
      <View style={styles.card}>
        <ImageBackground
          source={require('../../../assets/recapYearBg.png')}
          resizeMode="stretch"
          imageStyle={{
            borderRadius: 6,
            padding: 1
          }}
          style={styles.backgroundImage}>
          <TouchableOpacity style={styles.cardInnerContainer} onPress={() => onCardPress(item.name)}>
            <View style={styles.textRow}>
              <Text style={styles.recobee}>{'2024'}</Text>
              <Text style={styles.recap}>{' ' + StringConstants.RECAP}</Text>
            </View>
            <YearWrapCardButton description={item.description} buttonText={StringConstants.PLAY_NOW} onPress={() => onCardPress(item.name)} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH} // Set to the width of a single card
        itemWidth={SCREEN_WIDTH - 32}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotContainerStyle={{ marginHorizontal: 3, }}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInnerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backgroundImage: {
    height: 84,
    width: SCREEN_WIDTH - 32,
  },
  textRow: { flexDirection: 'row', alignItems: 'baseline' },
  card: {
    backgroundColor: AppColors.GREY_VARIANT8,
    borderRadius: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: AppColors.GREY
  },
  yearName: {
    color: AppColors.LIGHT_YELLOW,
    fontSize: 24,
    fontFamily: FontFamily.DMSansBold
  },
  recobee: {
    color: AppColors.LIGHT_YELLOW,
    fontSize: 20,
    fontFamily: FontFamily.DMSansBold
  },
  recap: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold
  },
  paginationContainer: {
    paddingVertical: 12,
    marginBottom: 24
    //paddingVertical: 8,
  },
  paginationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginHorizontal: 0,
    marginTop: 0,
    backgroundColor: AppColors.LIGHT_YELLOW, // Yellow color
  },
  paginationInactiveDot: {
    backgroundColor: AppColors.GREY_VARIANT4, // Inactive dot color
    width: 6,
    height: 6,
    borderRadius: 3,
  },

});

export default YearWrapEntryCarousel;
