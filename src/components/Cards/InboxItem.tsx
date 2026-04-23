import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { AppConsumer } from "context";
import Chip from "../Common/Chip";
import DefaultUser from "svg/user";
import ListHeader from "../Common/ListHeader";
import EmptyState from "components/Common/EmptyState";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "utils/Dimensions";

export default function InboxItem({
  friendRecoArray,
  filterState,
  routeKey,
  onClick = (f) => f,
  filterClicked = (f) => f,
}) {
  const filterChipArr = [
    { text: "All", value: "A" },
    { text: "Favorites", value: "F" },
  ];
  const emptyStateMsg = `Looks like you don't have any Recos yet. Share your fav movies/shows with friends to get your Inbox rolling`;

  const emptyStateItem = {
    title: "You have no Mails!",
    message: emptyStateMsg,
    icon: "sad",
    width: Dimensions.get("window").width * 0.233,
    height: Dimensions.get("window").width * 0.208,
  };
  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={[styles.container]}>
          <Animated.FlatList
            keyExtractor={(item) => item.fromfriendid}
            showsVerticalScrollIndicator={false}
            data={friendRecoArray}
            ListEmptyComponent={() => <View style={styles.emptyView}><EmptyState item={emptyStateItem} /></View>}
            ListHeaderComponent={() => (
              <ListHeader
                filterState={filterState}
                filterChipArr={filterChipArr}
                filterClicked={filterClicked}
              />
            )}
            renderItem={({ item }) => {
              let recoDate = item.datetime;
              let recoText = "";
              let createdDate = new Date(item.datetime);
              if (item.type == "RECO-S") {
                recoText = "You recommended";
              } else {
                recoText = "Recommended you";
              }
              let todayDate = new Date();
              //let unread = item.filter(d => d.state == null && d.type == 'RECO-R').length;

              var diffInSeconds =
                (todayDate.getTime() - createdDate.getTime()) / 1000;
              var timeDifference = Math.abs(Math.round(diffInSeconds / 3600));
              if (
                timeDifference > 24 ||
                todayDate.getDate() != createdDate.getDate()
              ) {
                let month = createdDate.getMonth() + 1;
                recoDate =
                  createdDate.getDate() +
                  "/" +
                  month +
                  "/" +
                  createdDate.getFullYear();
              } else {
                recoDate =
                  ("0" + createdDate.getHours().toString()).slice(-2) +
                  ":" +
                  ("0" + createdDate.getMinutes().toString()).slice(-2);
              }
              return (
                <TouchableOpacity
                  style={styles.txtContainer}
                  onPress={() => onClick(item)}
                >
                  <View style={{ paddingRight: 16, paddingTop: 3 }}>
                    <>
                      {item.thumbnail != null && item.thumbnail != "" ? (
                        <Image
                          source={{ uri: item.thumbnail }}
                          style={styles.dp}
                        />
                      ) : (
                        <DefaultUser height={32} width={32} />
                      )}
                    </>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.txtMainBody,
                        { color: appConsumer.theme.colors.text },
                      ]}
                    >
                      {item.senderfname}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.txtBody,
                          {
                            opacity:
                              !item.checked && item.type == "RECO-R" ? 1 : 0.8,
                            color:
                              !item.checked && item.type == "RECO-R"
                                ? appConsumer.theme.colors.clientPrimary
                                : "#FFFFFF",
                          },
                        ]}
                      >
                        {recoText} {item.moviename}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.txtBody,
                        { color: "#FFFFFF", opacity: 0.6 },
                      ]}
                    >
                      {recoDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
  },
  chip: {
    borderRadius: 32,
    borderColor: "#FCD604",
    borderWidth: 1,
    width: 89.8,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderStyle: "solid",
  },
  txtContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 30,
    padding: 15,
    paddingTop: 0,
    paddingLeft: Platform.OS === "ios" ? 10 : 15,
  },
  txtMainBody: {
    fontFamily: "DMSans-Regular",
    fontSize: Platform.OS === "ios" ? 15 : 15,
    paddingRight: 5,
  },
  txtBody: {
    fontFamily: "DMSans-Regular",
    fontSize: 12,
  },
  dp: {
    width: 32,
    height: 32,
    borderRadius: 30,
  },
  emptyView: {
    marginTop: SCREEN_WIDTH * 0.13
  }
});
