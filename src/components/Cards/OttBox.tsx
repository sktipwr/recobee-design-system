import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ArrowOpenNew from "svg/arrow-open-new.svg";
//import { CF_DOMAIN } from "env";
import Config from "react-native-config";
import CommonStyles from "styles";
import { OTTIcon } from "../Atoms/OTTIcon";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import TiltedArrow from "icons/TiltedArrow";


export default function OttBox({ name, code, style, onOpenOTT, hideName = false, isExpanded = false, }) {
  return (
    <TouchableOpacity
      onPress={() => onOpenOTT(code, name.toLowerCase())}
      style={[(style && style.ott) || (isExpanded ? styles.newOTTStyle : styles.ott), { marginRight: 4 }]}
    >
      <OTTIcon iconName={name} style={(style && style.ottImage && { ottImage: style.ottImage }) || (isExpanded ? { ottImage: styles.ottImage } : { ottImage: styles.ottIcon })} />
      {!hideName && <Text
        style={[
          (style && style.txtBody) || CommonStyles.txtBodyLarge || styles.name,
          { paddingLeft: isExpanded ? 4 : 4, paddingRight: isExpanded ? 4 : 0 },
          !style && !isExpanded && {marginRight: 0}
        ]}
      >
        {name}
      </Text>}
      {(!style || isExpanded) && (
        <View >
          {isExpanded ? <ArrowOpenNew height={12} width={12} /> : <TiltedArrow strokeWidth="2" height={20} width={20} />}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ott: {
    width: 100,
    height: 32,
    padding:3,
    backgroundColor: "#1D1D1D",
    alignItems: "center",
    borderRadius: 2,
    flexDirection: "row"
  },
  name: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE
  },
  newOTTStyle: {
    backgroundColor: AppColors.GREY_VARIANT25,
    height: 32,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ottIcon: {
    height: 16,
    width: 16,
    borderRadius: 8
  },
  ottImage: {
    width: 24,
    height: 24,
    borderRadius: 0,
  },
});
