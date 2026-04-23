import React from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import Chip from "components/Common/Chip";
import AppColors from "utils/Colors";
export default function ListHeader({
  filterChipArr,
  filterState,
  verticalGap = 16,
  filterClicked = (f) => f,
}) {
  return (
    <View
      style={[{
        padding: verticalGap,
      },styles.container]}
    >
      <FlatList
        horizontal
        data={filterChipArr}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => {
          return (
            <Chip
              item={item}
              onClick={filterClicked}
              state={filterState}
            ></Chip>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 4,
    paddingTop: 4,
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    height: 20,
    color: AppColors.WHITE,
  },
  container:{
    marginTop:-10,
    marginLeft:16,
    flexDirection: "row",
  },
});
