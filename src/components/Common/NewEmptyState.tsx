import React from 'react';
import ArrowRight from '../../../assets/arrow-right.svg'
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CustomCard = ({
  imageSource,
  mainText,
  subText,
  buttonText,
  onButtonPress,
  height,
  containerStyle,
  buttonShow=true
}) => {
  return (
    <View style={[styles.container,containerStyle]}>
      <Image
        source={imageSource}
        style={[styles.image, { height:height,resizeMode: 'contain'}]}
      />
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.subText}>{subText}</Text>
     {buttonShow && (<TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
         <ArrowRight />
      </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
  },
  image: {
    // height: 220,
    marginBottom:30
  },
  mainText: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 12,
    color: AppColors.GREY_VARIANT4,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: AppColors.LIGHT_YELLOW,
    fontSize: 14,
    paddingRight: 4,
    textAlign: 'center',
  },
});

export default CustomCard;
