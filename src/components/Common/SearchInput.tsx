import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import Search from 'icons/Search';
import Close from 'icons/Cross';

import { AppConsumer } from 'context';
import AppColors from '../../utils/Colors';
const SearchInput = ({
  onSearchKeyPress,
  loadSearch,
  setSuggestionsValue,
  suggestions,
  placeHolder,
  initialValue,
  width,
  backgroundColor,
}) => {
  const input = useRef();
  const [inputValue, setValue] = useState(
    initialValue == undefined ? '' : initialValue
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <AppConsumer>
      {(appConsumer) => {
        return (
          <View style={styles.container}>
            <View
              style={[
                styles.searchContainer,
                {
                  width: width ? width : Dimensions.get('window').width * 0.68,
                  borderColor: appConsumer.theme.colors.grey9alt,
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : appConsumer.theme.colors.grey9alt,
                },
              ]}
            >
              <View style={styles.ImageStyle}>
                <Search width={18} height={18} />
              </View>
              <TextInput
                ref={input}
                style={[styles.inputStyle, { color: AppColors.GREY_VARIANT4 }]}
                value={inputValue}
                autoFocus={false}
                autoCapitalize='none'
                placeholder={placeHolder}
                keyboardAppearance='dark'
                underlineColorAndroid='transparent'
                placeholderTextColor={AppColors.GREY_VARIANT3}
                returnKeyType='search'
                onSubmitEditing={onSearchKeyPress}
                onChangeText={(s) => {
                  setValue(s);
                  if (s.length >= 2) {
                    loadSearch(s);
                  }
                  if (s.length == 0) {
                    setSuggestionsValue([]);
                  }
                }}
              />
              {inputValue == '' || inputValue == undefined ? null : (
                <TouchableOpacity
                  onPress={() => {
                    setSuggestionsValue([]);
                    setValue('');
                  }}
                  style={styles.closeButton}
                >
                  <Close
                    color={AppColors.WHITE_VARIANT}
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2B2930',
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 8,
    flex: 1,
    height: 48,
  },
  container: { flexDirection: 'row', flex: 1 },
  inputStyle: {
    height: 40,
    flex: 1,
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    paddingVertical: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageStyle: {
    justifyContent: 'center',
    height: 24,
    width: 24,
    marginRight: 8,
    flexShrink: 0,
  },
  closeButton: {
    padding: 8,
    flexShrink: 0,
  },
});

export default SearchInput;
