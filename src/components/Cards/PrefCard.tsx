//Returns a flat list of Clickable items passed in an array

import React, { useEffect, useState } from "react";
import { AppConsumer } from "context";

import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import Arabic from "../../icons/Arabic";
import English from "../../icons/English";
import French from "../../icons/French";
import German from "../../icons/German";
import Hindi from "../../icons/Hindi";
import Kannada from "../../icons/Kannada";
import Malayalam from "../../icons/Malayalam";
import Marathi from "../../icons/Marathi";
import Spanish from "../../icons/Spanish";
import Tamil from "../../icons/Tamil";
import Telugu from "../../icons/Telugu";
import Korean from "../../icons/Korean";
import Gradient from "assets/images/language/gradient.svg";
//import { CF_DOMAIN } from "env";
import Config from "react-native-config";
import Tick from "../../icons/Tick";
import FastImage from "react-native-fast-image";
import CommonStyles from "styles";
import { CLOUD_BASEURL } from "utils/HelperFunctions";

export default function PrefCard({ item, type, onItemCheck = (f) => f }) {
  const [isSelected, setIsSelected] = useState(false);
  const langSource = (langName, color) => {
    switch (langName) {
      case "Arabic":
        return <Arabic color={color} />;
      case "English":
        return <English color={color} />;
      case "Hindi":
        return <Hindi color={color} />;
      case "Korean":
        return <Korean color={color} />;
      case "Kannada":
        return <Kannada color={color} />;
      case "Tamil":
        return <Tamil color={color} />;
      case "Telugu":
        return <Telugu color={color} />;
      case "Spanish":
        return <Spanish color={color} />;
      case "Marathi":
        return <Marathi color={color} />;
      case "Malayalam":
        return <Malayalam color={color} />;
      case "German":
        return <German color={color} />;
      case "French":
        return <French color={color} />;
    }
  };

  useEffect(() => {
    setIsSelected(item.check)
  },[item])

  const renderView = () => {
    switch (type) {
      case "genre":
        return (
          <View>
            <ImageBackground
              style={[styles.movieLogo]}
              source={{ uri: CLOUD_BASEURL + item.name + ".png" }}
            >
              <Text style={CommonStyles.txtHeader}>{item.name}</Text>
            </ImageBackground>
          </View>
        );
      case "ott":
        return (
          <View style={[styles.ott, { backgroundColor: "#424242" }]}>
            <FastImage
              style={{
                height: 98,
                width: 98,
                marginBottom: 4,
                borderRadius: 50,
              }}
              source={{ uri: CLOUD_BASEURL + item.logoName }}
            ></FastImage>
            <Text style={CommonStyles.txtHeader}>{item.name}</Text>
          </View>
        );
      case "lang":
        return (
          <>
            {item.check ? (
              <View style={[styles.movieLogo]}>
                <View style={{ position: "absolute", top: 0 }}>
                  <Gradient
                    height={Dimensions.get("window").width * 0.244}
                    width={Dimensions.get("window").width * 0.433}
                  ></Gradient>
                </View>
                <View>
                  {langSource(item.name, "#121212")}
                  {item.name != "English" ? (
                    <Text
                      style={[
                        CommonStyles.txtHeader,
                        { fontSize: 10, paddingTop: 2, color: "#121212" },
                      ]}
                    >
                      {item.name}
                    </Text>
                  ) : null}
                </View>
              </View>
            ) : (
              <View style={[styles.movieLogo, { backgroundColor: "#424242" }]}>
                <View>
                  {langSource(item.name)}
                  {item.name != "English" ? (
                    <Text
                      style={[
                        CommonStyles.txtHeader,
                        { fontSize: 10, paddingTop: 2 },
                      ]}
                    >
                      {item.name}
                    </Text>
                  ) : null}
                </View>
              </View>
            )}
          </>
        );
    }
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={[styles.container]}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
            onPress={() => {
              setIsSelected(!isSelected);
              onItemCheck(item, !isSelected);
            }}
          >
            {renderView()}
            {item.check ? (
              <View
                style={[
                  styles.radioCheck,
                  {
                    backgroundColor:
                      type == "lang"
                        ? appConsumer.theme.colors.primary
                        : appConsumer.theme.colors.clientPrimary,
                  },
                ]}
              >
                {type == "lang" ? (
                  <Tick
                    height={15}
                    width={15}
                    strokeWidth={"2"}
                    color={appConsumer.theme.colors.clientPrimary}
                  />
                ) : (
                  <Tick height={15} width={15} strokeWidth={"2"} />
                )}
              </View>
            ) : (
              <View style={[styles.radio]}></View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    paddingBottom: 9,
    paddingLeft: 16,
    alignItems: "flex-start",
    backgroundColor: "#121212",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  movieLogo: {
    width: Dimensions.get("window").width * 0.433,
    height: Dimensions.get("window").width * 0.244,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  ott: {
    height: Dimensions.get("window").width * 0.433,
    width: Dimensions.get("window").width * 0.433,
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
    top: 10,
    right: 15,
    borderWidth: 1,
    borderColor: "#E9C638",
  },
  radioCheck: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
    top: 10,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
