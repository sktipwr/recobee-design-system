import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { scaledWidth } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import Config from 'react-native-config';

export type MoviesPosterListingProps = {
  movieIds: string[],
  icon: React.ComponentType,
  title: string,
  onMovieClick: Function
};

export const MoviesPosterListing: FC<MoviesPosterListingProps> = ({
    movieIds,
    icon,
    title,
    onMovieClick
}) => {

  return (
    <View style={styles.container}>
      <View style={[CommonStyles.rowSpaceBetween, {paddingHorizontal: 12}]}>
        <View style={[CommonStyles.flexDirRow]}>
          {icon}
          <Text style={[styles.title, {marginLeft: 8}]}>{title}</Text>
        </View>
        <Text style={[styles.title]}>{movieIds?.length}</Text>
      </View>
      <FlatList
        data={movieIds}
        contentContainerStyle={styles.flatlist}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={[styles.imageContainer, (index + 1 == movieIds?.length) && {marginRight: 40}]} onPress={() => onMovieClick(item)}>
            {/* TODO: replace image */}
            <Image source={{ uri: 'https://' + Config.CF_DOMAIN + '/movies/poster/' + item + '.jpg'  }} style={[styles.image]} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index?.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        ItemSeparatorComponent={() => <View style={{ width: 4 }} />} // 4 units of spacing
        pagingEnabled={false} // Optional, set to true if snapping is desired
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.BLACK_VARIANT4,
    width: '100%',
    borderRadius: 8,
    borderColor: AppColors.GREY,
    paddingVertical: 11,
    borderWidth: 1,
    marginBottom: 12
  },
  title: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
  },
  imageContainer: {
    borderWidth: 1, // Grey border
    borderColor: AppColors.GREY,
    borderRadius: 8, // Border radius of 8
    overflow: 'hidden', // Ensure the image fits within the rounded corners
  },
  image: {
    width: scaledWidth(80), // 90% of the screen width
    height: scaledWidth(110),
    resizeMode: 'cover',
  },
  flatlist: {
    marginTop: 16,
    marginLeft: 12,
  }
  
});