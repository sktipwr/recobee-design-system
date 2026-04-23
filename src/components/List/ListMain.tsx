import React, { useRef } from "react";
import { AppConsumer } from "context";
import Carousel from "react-native-snap-carousel";
import MovieList from "components/List/MovieList";
import EmptyState from "components/Common/EmptyState";
import Tick from "../../icons/Tick";
import MoreVertical from "icons/MoreVertical";
import RecoOutline from "../../icons/RecoOutline";
import { Tabs } from "react-native-collapsible-tab-view";

import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Animated,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommonStyles from "../../../Styles";

export default function ListMain({
  userlists,
  onMovieClick,
  onAddClick,
  loadMoreItems,
  onShareClick,
  onMoreClick,
  isPublic,
  userName,
  filterState,
  filterChipArr,
  filterClicked = () => {},
  routeKey,
  selectable,
  selected,
}) {
  const emptyStateItem = {
    title: "Oh Snap!",
    icon: isPublic ? "thinking" : null,
    width: Dimensions.get("window").width * 0.233,
    height: Dimensions.get("window").width * 0.208,
    message: isPublic
      ? `Looks like ` +
        userName +
        ` is not much of a sharer. Come back later, maybe?`
      : `No lists yet. Create lists from your watchlist items and share with friends.`,
  };

  const renderCarouselItem = ({ item, i }) => {
    return (
      <MovieList
        key={i}
        item={item}
        onMovieClick={onMovieClick}
        width={61}
        aspectRatio={1.44}
      />
    );
  };

  const renderItem = ({ item, i }) => {
    const isSelected = selected === item[0].id;
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#424242",
              padding: 16,
              marginBottom: 16,
            }}
          >
            {selectable && (
              <TouchableOpacity
                onPress={() => onMovieClick(null, item[0])}
                style={[
                  styles.overlay,
                  isSelected && styles.selectedItemOverlay,
                ]}
              >
                {isSelected ? (
                  <View
                    style={[
                      styles.radioCheck,
                      {
                        backgroundColor: appConsumer.theme.colors.clientPrimary,
                      },
                    ]}
                  >
                    <Tick height={15} width={15} strokeWidth={"2"} />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.radio,
                      {
                        borderWidth: 1,
                        borderColor: appConsumer.theme.colors.clientPrimary,
                      },
                    ]}
                  ></View>
                )}
              </TouchableOpacity>
            )}
            <View style={{}}>
              <Carousel
                data={item}
                loop={true}
                renderItem={renderCarouselItem}
                sliderWidth={120}
                itemWidth={52}
                autoplay={false}
                firstItem={0}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.9}
              ></Carousel>
            </View>
            <View
              style={{
                paddingLeft: 16,
                paddingTop: 5,
                paddingRight: 0,
                flex: 1,
              }}
            >
              {isPublic ? null : (
                <View style={{ paddingBottom: 5, flexDirection: "row" }}>
                  {item[0]?.access == "G" ? (
                    <View style={styles.access}>
                      <Text
                        style={[
                          styles.txtAccess,
                          { color: appConsumer.theme.colors.text },
                        ]}
                      >
                        Public
                      </Text>
                    </View>
                  ) : null}
                  {item[0]?.access == "F" ? (
                    <View style={styles.access}>
                      <Text
                        style={[
                          styles.txtAccess,
                          { color: appConsumer.theme.colors.text },
                        ]}
                      >
                        Friends
                      </Text>
                    </View>
                  ) : null}
                  {item[0]?.access == "P" ? (
                    <View style={styles.access}>
                      <Text
                        style={[
                          styles.txtAccess,
                          { color: appConsumer.theme.colors.text },
                        ]}
                      >
                        Private
                      </Text>
                    </View>
                  ) : null}
                  {!selectable && (
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                      <TouchableOpacity
                        style={{
                          paddingBottom: 2,
                          width: 50,
                          alignItems: "flex-end",
                          paddingRight: 8,
                        }}
                        onPress={() => onMoreClick(item)}
                      >
                        <MoreVertical height={15} width={15} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              <Text
                style={[
                  styles.txtHeader,
                  { color: appConsumer.theme.colors.text, paddingBottom: 0 },
                ]}
              >
                {item[0].name}
              </Text>
              <Text
                style={{ fontSize: 10, fontStyle: "italic", color: "#BDBDBD" }}
              >
                {item.length} movies
              </Text>
              {!selectable && (
                <>
                  {isPublic ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => onAddClick(item)}
                      >
                        <Text
                          style={{
                            fontFamily: "DMSans-Regular",
                            fontSize: 12,
                            color: "#FFFFFF",
                            opacity: 0.6,
                          }}
                        >
                          + Add to Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      {hasFriends && (
                        <TouchableOpacity
                          style={[
                            styles.addBtn,
                            { flexDirection: "row", alignItems: "center" },
                          ]}
                          onPress={() => onShareClick(item)}
                        >
                          <RecoOutline
                            width={19}
                            height={16}
                            color="rgba(255, 255, 255, 0.6)"
                            strokeWidth={"2"}
                          />
                          <Text
                            style={{
                              fontFamily: "DMSans-Regular",
                              fontSize: 12,
                              color: appConsumer.theme.colors.text,
                              opacity: 0.6,
                              paddingLeft: 4,
                              paddingTop: 1,
                            }}
                          >
                            Reco
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        )}
      </AppConsumer>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <AppConsumer>
          {(appConsumer) => (
            <Tabs.FlatList
              data={userlists}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 16 }}
              keyExtractor={(item) => item[0].id}
              onEndReached={loadMoreItems}
              ListEmptyComponent={() => (
                <View>
                  <EmptyState item={emptyStateItem} />
                </View>
              )}
              onEndReachedThreshold={0.5}
              renderItem={renderItem}
            />
          )}
        </AppConsumer>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    paddingTop: 0,
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 13,
  },
  txtAccess: {
    fontFamily: "DMSans-Bold",
    fontSize: 12,
  },
  addBtn: {},
  access: {
    backgroundColor: "#424242",
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 100, 0.0)", //'rgba(246,206,61, 0.8)',
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 5,
    paddingBottom: 30,
    paddingRight: 10,
  },
  selectedItemOverlay: {
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    borderWidth: 1,
    borderColor: "#F6CE3D",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
    bottom: 9,
    right: 9,
  },
  radioCheck: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
    bottom: 9,
    right: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});
