import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CommonStyles from "../../Styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { BlogPostCard } from "./BlogPostCard";
import { ViewMore } from "./ViewMore";
import Back from "svg/back.svg";

export type BlogPostsProps = {
  onBlogClick: Function,
  data: any,
  onClickViewMore: Function,
  hideViewMore: boolean,
  navigation: any
};

export const BlogPosts: FC<BlogPostsProps> = ({
  onBlogClick,
  data,
  onClickViewMore,
  hideViewMore = false,
  navigation
}) => {

  const header = () => {
    return (
      <View style={[CommonStyles.rowSpaceBetween, {marginTop: 20}]}>
        <View style={[CommonStyles.rowAlignCenter, { marginBottom: 16}]}>
          {hideViewMore && <TouchableOpacity
            style={[CommonStyles.headerBackStyle, {marginRight: 10, marginLeft: 0}]}
            onPress={() => navigation.goBack()}
          >
              <Back width={24} height={24} />
          </TouchableOpacity>
          }
          <Text
            style={[
              styles.title,
            ]}
          >
            {StringConstants.BLOG_POSTS}
          </Text>
        </View>
        {!hideViewMore && <ViewMore onClickViewMore={onClickViewMore} />}
      </View>
    )
  }

  const footer = () => {
    if(!hideViewMore)
      return null;
    else
      return (
        <View style={styles.gap} />
      )
  }

  return (
    <>
      <View style={styles.container}>
          <FlatList
            data={data}
            ListHeaderComponent={header}
            ListFooterComponent={footer}
            keyExtractor={(item, index) =>
              'movie-card-' + index + '-' + item.id
            }
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            renderItem={({ item, index }) => {
              return (
                <BlogPostCard item={item} onBlogClick={onBlogClick} />
              )
            }}
          />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 16, 
    marginBottom: 26, 
  },
  title: {
    color: AppColors.WHITE_VARIANT,
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
  },
  gap: {
    height: 100, 
    width: '100%'
  }
});