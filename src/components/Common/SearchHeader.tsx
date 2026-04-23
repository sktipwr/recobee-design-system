import React, { } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Menu from 'svg/menu';
import Back from "svg/back";
import CommonStyles from '../../../Styles';
import SearchInput from "./SearchInput";
import AppColors from "../../utils/Colors";
const SearchHeader = ({ onLeftIconPress, navigation, onSearchKeyPress, loadSearch, setSuggestionsValue, suggestions, isBackHeader, initialValue, placeHolder }) => {
  
  const leftIconClick = () => {
          if (isBackHeader) {
            onLeftIconPress();
          } else {
            navigation.toggleDrawer();
          }
        }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerContainer}
        onPress={leftIconClick}
      >
        <View style={[CommonStyles.headerRightBtn, styles.drawer]}>
          {isBackHeader ? (
            <Back width={26} height={26} />
          ) : (
            <Menu width={18} height={12} />
          )}
        </View>
      </TouchableOpacity>
      <SearchInput suggestions={suggestions} onSearchKeyPress={onSearchKeyPress} loadSearch={loadSearch} setSuggestionsValue={setSuggestionsValue} initialValue={initialValue} placeHolder={placeHolder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  drawerContainer: {
    marginRight: 8,
  },
  drawer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchHeader;
