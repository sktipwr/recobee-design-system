

import AppColors from "utils/Colors";

import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { removeInitialSpaces } from "utils/DataFormattingHelperFunction";

export type TagsAndGenresProps = {
    data: any,
    onGenreClick: Function,
    onTagsClick: Function
  };

  export const TagsAndGenresCard: FC<TagsAndGenresProps> = ({
    data,
    onTagsClick,
    onGenreClick,
  }) => {
    return (
      <View>
        <View
          style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}
        ></View>
        {data?.tags?.length > 0 && (
          <>
            <Text style={styles.title}>
              {StringConstants.TAGS}
            </Text>
            <View style={[CommonStyles.flexRowWrap, { marginBottom: 4 }]}>
              {data?.tags?.split(',')?.map((value) => {
                return (
                  <Text
                    onPress={() => onTagsClick(removeInitialSpaces(value))}
                    style={styles.tags}
                  >
                    {'#' + removeInitialSpaces(value) + '  '}
                  </Text>
                );
              })}
            </View>
          </>
        )}
        {data?.nanogenres?.length > 0 && (
          <>
            <Text style={styles.title}>{StringConstants.MICRO_GENRE}</Text>
            <View style={[CommonStyles.flexRowWrap]}>
              {data?.nanogenres?.split(',')?.map((value) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      onGenreClick(removeInitialSpaces(value), 'MICRO_GENRES')
                    }
                    style={styles.genreContainer}
                  >
                    <Text
                      style={[
                        styles.tags,
                        { fontFamily: FontFamily.DMSansRegular },
                      ]}
                    >
                      {removeInitialSpaces(value)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: AppColors.WHITE,
        fontFamily: FontFamily.DMSansBold,
        marginBottom: 12,
        marginTop:12
    },
    tags: {
        fontSize: 14,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansBold
    },
    genreContainer: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.GREY_VARIANT6,
        marginRight: 8,
        marginTop: 8
    },
});
