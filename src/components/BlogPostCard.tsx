import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { SCREEN_WIDTH } from "utils/Dimensions";
import FastImage from "react-native-fast-image";
import { mmmmDDYYYY } from "utils/DatetimeHelperFunctions";

export type BlogPostCardProps = {
  onBlogClick: any,
  item: any,
};

export const BlogPostCard: FC<BlogPostCardProps> = ({
  onBlogClick,
  item
}) => {

  const imageUrl: string | undefined =
    item?.enclosure?.url && typeof item?.enclosure?.url === 'string'
      ? item.enclosure.url
      : typeof item?.cover_image_url === 'string' && item?.cover_image_url.startsWith('http')
      ? item.cover_image_url
      : undefined;

  const description: string =
    item?.contentSnippet ?? item?.content ?? item?.excerpt ?? '';

  const dateStr: string =
    item?.isoDate ?? item?.created_at ?? item?.created_date ?? item?.published_date ?? '';

  const linkUrl: string | null =
    typeof item?.link === 'string' && item?.link.length > 0
      ? item.link
      : typeof item?.slug === 'string' && item?.slug.length > 0
      ? `https://www.reco-bee.com/blog/${item.slug}`
      : null;

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => onBlogClick(linkUrl)}>
        <FastImage
          style={[styles.image]}
          source={imageUrl ? { uri: imageUrl } : require("assets/defaultMovie.png")}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text numberOfLines={2} style={styles.title}>{item?.title ?? ''}</Text>
        <Text numberOfLines={3} style={styles.subTitle}>{description}</Text>
        <Text style={styles.date}>{mmmmDDYYYY(dateStr)}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 10, 
    borderRadius: 12, 
    marginBottom: 14, 
    width: '100%',
    backgroundColor: AppColors.BLACK_VARIANT
  },
  image: {
    height: SCREEN_WIDTH * 0.5,
    width: '100%',
    borderRadius: 8,
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginTop: 10
  },
  date: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT5,
    textAlign: 'right',
    marginTop: 12
  }
});