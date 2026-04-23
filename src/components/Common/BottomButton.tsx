import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import Delete from "svg/delete";
import Settings from "icons/Settings";
import MoreVertical1 from "icons/MoreVertical";
import Reco from "svg/reco";
import Eye from "icons/Eyes";
import Eyeo from "icons/Eyeo";
import MinusCircle from "icons/MinusCircle";
import { getShareIcon } from "utils/HelperFunctions";
import AddCircle from "icons/AddCircle";
import AppColors from "utils/Colors";

export default function BottomButton({
  item,
  onClickPrimary,
  onClickSecondary,
  onClickSec1,
  onClickSec2,
  onClickSec3,
  disabled = false,
  secondBtnDisabled = false,
  bottom=0,
  disableText = ""
}) {
  const iconSource = (iconName) => {
    switch (iconName) {
      case "delete":
        return <Delete width={24} height={24} />;
      case "setting":
        return <Settings height={20} width={20} />;
      case "more-vertical":
        return <MoreVertical1 color={AppColors.WHITE} height={20} width={20} strokeWidth="1.5" />;
      case "share":
        return getShareIcon(20);
      case "seen":
        return <Eye height={20} width={20} />;
      case "unseen":
        return <Eyeo height={20} width={20} strokeWidth={"2"} />;
      case "reco":
        return <Reco width={24} height={24} />;
      case "add":
        return <AddCircle width={24} height={24} color={AppColors.WHITE} strokeWidth={"1.2"} />;
      case "minus":
        return <MinusCircle width={24} strokeWidth={'1.5'} color={AppColors.WHITE} height={24} />;

    }
  };

  return (
    <View style={[styles.bottomBtnContainer, {bottom: bottom}]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onClickPrimary}
        style={disabled ? styles.disabledBtnStyle : styles.primaryBtn}
      >
        <Text style={disabled ? styles.disabledTxtStyle : styles.btnStyle}>
          {item.primaryText}
        </Text>
        {disabled && disableText && (
          <Text style={styles.disableTextStyle}>
            {disableText}
          </Text>
        )}
      </TouchableOpacity>
      {item.secText && (
        <TouchableOpacity disabled={secondBtnDisabled} onPress={onClickSecondary} style={[styles.secBtn, !secondBtnDisabled && {borderColor: AppColors.LIGHT_YELLOW}]}>
          <Text style={[styles.secBtnTxt, !secondBtnDisabled && {color: AppColors.LIGHT_YELLOW}]}>{item.secText}</Text>
        </TouchableOpacity>
      )}
      {item.sec1Icon && (
        <TouchableOpacity onPress={onClickSec1} style={styles.secIcon}>
          {iconSource(item.sec1Icon)}
        </TouchableOpacity>
      )}
      {item.sec2Icon && (
        <TouchableOpacity onPress={onClickSec2} style={styles.secIcon}>
          {iconSource(item.sec2Icon)}
        </TouchableOpacity>
      )}
      {item.sec3Icon && (
        <TouchableOpacity onPress={onClickSec3} style={styles.secIcon}>
          {iconSource(item.sec3Icon)}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    color: "#E9C638",
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    textAlign: "center",
  },
  secBtnTxt: {
    color: "#BDBDBD",
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    textAlign: "center",
  },
  disabledTxtStyle: {
    color: "#9e9e9e",
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    textAlign: "center",
  },
  btnSecStyle: {
    color: "#FFF",
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    textAlign: "center",
  },
  primaryBtn: {
    borderColor: "#E9C638",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flex: 1,
    marginRight: 12,
  },
  disabledBtnStyle: {
    borderColor: "#9e9e9e",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flex: 1,
    marginRight: 12,
  },
  secBtn: {
    width: Dimensions.get("window").width / 3,
    borderColor: "#BDBDBD",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 12,
  },
  secIcon: {
    borderColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3,
    width: 48,
    marginRight: 12,
  },
  bottomBtnContainer: {
    width: Dimensions.get("window").width,
    height: 80,
    backgroundColor: "#212121",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 16,
    paddingRight: 4,
  },
  disableTextStyle: {
    color: AppColors.GREY_VARIANT1,
    fontFamily: "DMSans-Regular",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
});
