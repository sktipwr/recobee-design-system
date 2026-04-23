import React, { useState } from "react";
import { AppConsumer } from "context";
import { Rating } from "react-native-ratings";
import Green from "svg/green-ellipsis";
import Red from "svg/red-ellipsis";
import MovieSearchCard from "./MovieSearchCard";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

export default function DraftCard({
  item,
  onEditClick = (f) => f,
  onDeleteClick = (f) => f,
  hideCTAs = false,
}) {
  const windowWidth = Dimensions.get("window").width;
  return (
    <AppConsumer>
      {(appConsumer) => (
        <TouchableOpacity onPress={onEditClick} style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.txtHeader]}>{item.reviewtitle}</Text>
            </View>
            {!hideCTAs && (
              <TouchableOpacity
                style={{ alignItems: "flex-end" }}
                onPress={onDeleteClick}
              >
                <Text
                  style={[
                    styles.txtBody,
                    {
                      color: appConsumer.theme.colors.clientPrimary,
                      fontFamily: "DMSans-Bold",
                    },
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            )}
            {!hideCTAs && (
              <TouchableOpacity
                style={{ alignItems: "flex-end", marginLeft: 24 }}
                onPress={onEditClick}
              >
                <Text
                  style={[
                    styles.txtBody,
                    {
                      color: appConsumer.theme.colors.clientPrimary,
                      fontFamily: "DMSans-Bold",
                    },
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginBottom: 16 }}>
            <MovieSearchCard
              item={item}
              hasNoStyle={true}
              onMovieClick={() => {}}
            />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View style={{ flex: 1 }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  {item.familyfriendly == "true" && (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Green />
                      <Text
                        style={[
                          {
                            fontFamily: "DMSans-Regular",
                            color: "#388E3C",
                            paddingLeft: 4,
                            fontSize: 10,
                            marginRight: 8,
                          },
                        ]}
                      >
                        FAMILY FRIENDLY
                      </Text>
                    </View>
                  )}
                  {item.hasspoilers == "true" && (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Red />
                      <Text
                        style={[
                          {
                            fontFamily: "DMSans-Regular",
                            color: "#E53935",
                            paddingLeft: 4,
                            fontSize: 10,
                          },
                        ]}
                      >
                        HAS SPOILERS
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {item.reviewrating && item.reviewrating != "0" ? (
                <View style={{ alignItems: "flex-start", paddingTop: 2 }}>
                  <Rating
                    ratingCount={5}
                    imageSize={15}
                    fractions={1}
                    startingValue={parseFloat(item.reviewrating)}
                    jumpValue={0.5}
                    ratingColor="#e9c46a"
                    tintColor={appConsumer.theme.colors.primary}
                    readonly={true}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View>
            <Text
              style={[styles.txtBody, { color: appConsumer.theme.colors.text }]}
            >
              {item.reviewcomment.substring(0, windowWidth * 0.3733).trim()}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 0,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#424242",
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: "#E0E0E0",
  },
  txtHeader: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
    color: "#F5F5F5",
  },
});
