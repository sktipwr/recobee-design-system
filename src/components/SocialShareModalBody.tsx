import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AppConsumer } from 'context';
import { scaledHeight, scaledWidth } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import Instagram from 'svg/insta_coloured';
import FB from 'svg/fb_coloured';
import X from 'svg/x';
import CopyLink from 'svg/link_copy';
import MoreItems from 'svg/more_items';
import WhatsApp from 'svg/whatsappicon';
import CommonStyles from '../../Styles';

const Data = [
  {
    icon: <WhatsApp height={scaledWidth(33)} width={scaledWidth(33)} />,
    title: 'WhatsApp',
    type: 'whatsapp',
  },
  {
    icon: <Instagram height={scaledWidth(33)} width={scaledWidth(33)} />,
    title: 'Story',
    type: 'insta_story',
  },
  {
    icon: <Instagram height={scaledWidth(33)} width={scaledWidth(33)} />,
    title: 'Instagram',
    type: 'insta',
  },
  //   {
  //     icon: <X height={scaledWidth(33)} width={scaledWidth(33)} />,
  //     title: 'Twitter',
  //     type: 'twitter',
  //   },
  {
    icon: <FB height={scaledWidth(33)} width={scaledWidth(33)} />,
    title: 'Facebook',
    type: 'facebook_story',
  },
  // {
  //   icon: <WhatsApp height={scaledWidth(33)} width={scaledWidth(33)} />,
  //   title: 'WhatsApp',
  //   type: 'whatsapp',
  // },
  {
    icon: <CopyLink height={scaledWidth(33)} width={scaledWidth(33)} />,
    title: 'Copy Link',
    type: 'copy_link',
  },
  {
    icon: <MoreItems height={scaledWidth(33)} width={scaledWidth(33)} />,
    title: 'More',
    type: 'more',
  },
];

export const SocialShareModalBody: React.FC = ({
  onIconPress,
  isShortsShare,
}) => {
  const renderItem = ({ item }) => {
    if (
      isShortsShare == true &&
      (item.type == 'copy_link' || item.type == 'insta')
    ) {
      return null;
    }
    return (
      <>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            onIconPress(item.type);
          }}
        >
          {item.icon}
          <Text style={styles.itemTitle}>{item.title}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <>
          <View style={CommonStyles.modalHoldBar} />
          <Text
            style={[
              CommonStyles.modalTitle,
              { color: AppColors.WHITE_VARIANT },
            ]}
          >
            {'Share'}
          </Text>
          <FlatList
            key={2}
            data={Data}
            numColumns={isShortsShare ? 5 : 4}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
          />
        </>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginTop: scaledHeight(15),
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginTop: scaledHeight(5),
  },

  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 17,
    width: scaledWidth(65),
  },
});
