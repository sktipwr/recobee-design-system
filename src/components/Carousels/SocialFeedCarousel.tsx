import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import MovieList from "components/List/MovieList";
import EncryptedStorage from "react-native-encrypted-storage";

const SocialFeedCarousel = ({
  item,
  onMovieClick,
  onViewWatchlistClick,
  onAddToMyProfileClick,
}) => {
  let actioBtnText = `View All ` + item.store.movies.length + ` Movies`;
  let arrLength = item.store && item.store.movies && item.store.movies.length;

  const [userID, setUserID] = useState();
  EncryptedStorage.getItem("user_id").then((storedUserID) => {
    setUserID(storedUserID);
  });
  const renderItem = ({ item, index }) => {
    let width = 70;
    let aspectRatio = 1.538;
    if (arrLength < 5) {
      if (!item?.backdropimageurl && item?.backdropimageurl == null) {
        if (item.backdropimage == null || item.backdropimage == "")
          item.movieimage = item.movieimage;
        else item.posterimage = item.backdropimage;
      } else {
        item.posterimageurl = item.backdropimageurl;
      }
      width = 137;
      aspectRatio = 0.584;
    }
    return (
      <View style={{marginRight: 4}}><MovieList
        item={item}
        onMovieClick={onViewWatchlistClick}
        width={width}
        aspectRatio={aspectRatio}
        borderRadius={4}
        border={0.5}
      ></MovieList></View>
    );
  };

  return item.store.movies && item.store.movies.length !== 0 ? (
    <View style={{ marginTop: 16 }}>
      {/* <View style={{ marginBottom: 8 }}>
        <Text style={[styles.txtHeader, { lineHeight: 24 }]}>
          {item.store.name}
        </Text>
      </View> */}
      <FlatList
        data={item.store.movies}
        horizontal
        keyExtractor={(item, index) => "movie-card-" + index + "-" + item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            padding: 16,
            height: 52,
            paddingBottom: 10,
            paddingTop: 10,
            borderColor: "#424242",
            backgroundColor: "#121212",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3
          },
        ]}
      >
        <View style= {{flex: 1}}>
          <Text numberOfLines={1} style={[styles.txtHeader]}>
            {item.store.name}
          </Text>
          <Text style={{fontFamily: "DMSans-Regular",
            fontSize: 10, color: "#FFFFFF"
          }}>
            {item.store.movies.length} Movies
          </Text>
        </View>
        {item.user && item.user.id != userID && (
          <TouchableOpacity
            onPress={() =>
              onAddToMyProfileClick(item.store.name, item.store, item.type)
            }
            style={styles.actionAltButtonStyle}
          >
            <Text style={[styles.txtBody]}>Save this List</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ) : (
    <View style={[styles.carouselPlaceholder]} />
  );
};

const styles = StyleSheet.create({
  carouselPlaceholder: {
    height: 200,
    width: Dimensions.get("window").width - 70,
    backgroundColor: "#CCC",
    borderRadius: 10,
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  txtBody: {
    fontFamily: "DMSans-Regular",
    fontSize: 12,
    color: "#F5D31C",
  },
  actionButtonStyle: {
    width: Dimensions.get("window").width * 0.444,
    height: 32,
    backgroundColor: "#424242",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  actionAltButtonStyle: {
    width: 113,
    height: 32,
    backgroundColor: "#121212",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 16,
  },
});

export default React.memo(SocialFeedCarousel);
