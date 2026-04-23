import CommonStyles from '../../Styles';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppColors from 'utils/Colors';
import StringConstants from 'utils/StringConstants';
import AddCircle from "icons/AddCircle";
import FontFamily from 'utils/FontFamily';

  export const WatchlistBtn: React.FC = ({onPress, width = '100%', height = 36}) => 
  {
    return (
      <TouchableOpacity
        style={[
          CommonStyles.ottContainer,
          styles.carouselBtn,
          {width: width, height: height}
        ]}
        onPress={() => {
          onPress()
        }}
      >
        <View style={CommonStyles.rowAlignCenter}>
          <AddCircle width={15} height={15} color={AppColors.GREY_VARIANT2} strokeWidth={"2"} />
          <Text
            style={[
              styles.txtBody,
              styles.watchlistText,
            ]}
          >
            {StringConstants.WATCHLIST}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  carouselBtn: {
    backgroundColor: AppColors.LIGHT_YELLOW, 
    borderRadius: 8, 
    alignSelf: 'center',
    height: 36
  },
  watchlistText: { 
    color: AppColors.GREY_VARIANT2, 
    fontSize: 14, 
    fontFamily: FontFamily.DMSansBold,
    paddingLeft: 4 
  },
  txtBody: {
    fontSize: 15,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3
  },
});
