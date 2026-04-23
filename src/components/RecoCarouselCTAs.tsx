import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../Styles';
import { scaledWidth } from 'utils/Dimensions';
import LikeFilled from 'icons/LikeFilled'
import Eyes from "icons/Eyes";
import Like from "icons/Like";
import Dislike from "icons/Dislike";

interface RecoCarouselCTAParams {
    likeClicked: (id: any, status: any) => any,
    showReportModal: Function,
    onFeedbackClick: Function,
    item: any
}

export const RecoCarouselCTAs: React.FC<RecoCarouselCTAParams> = ({
    likeClicked,
    showReportModal,
    onFeedbackClick,
    item
    }) => 
    {

    
    return (
      <View style={[styles.feedbackContainer]}>
          <TouchableOpacity
            onPress={() => {
              let isLiked = item?.is_liked ?? false;
              likeClicked(item?.id || item?.movieid, !isLiked)
            }}
            style={[CommonStyles.rowAlignCenter, styles.bottomCTAContainer, item?.is_liked && {backgroundColor: AppColors.GREY}, {marginRight: 20}]}
          >
            <View >
              {item?.is_liked ? <LikeFilled height={12} width={12} /> : <Like height={12} width={12} />}
            </View>
            <Text style={[styles.feedbackBtn]}>{item?.is_liked ? StringConstants.LIKED : StringConstants.LIKE}</Text>
          </TouchableOpacity>
          {/* not using now */}
          {/* <TouchableOpacity
            onPress={() => {
              showReportModal()
            }}
            style={[CommonStyles.rowAlignCenter, styles.bottomCTAContainer, {width: scaledWidth(104)}]}
          >
            <View >
              <Dislike height={12} width={12} />
            </View>
            <Text style={[styles.feedbackBtn]}>
              {StringConstants.DISLIKE}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              onFeedbackClick("S", item);
            }}
            style={[CommonStyles.rowAlignCenter, styles.bottomCTAContainer]}
          >
            <View>
              <Eyes color={AppColors.GREY_VARIANT10} height={12} width={12} />
            </View>
            <Text style={[styles.feedbackBtn]}>
              {StringConstants.MARK_SEEN}
            </Text>
          </TouchableOpacity>      
    </View>
    );
};

const styles = StyleSheet.create({
  bottomCTAContainer: {
    width: 90,
    height: 24,
    borderRadius: 22,
    backgroundColor: AppColors.GREY_VARIANT2,
    justifyContent: 'center',
    paddingHorizontal: 4,
    alignItems: 'center'
  },
  feedbackContainer: {
    alignItems: "center",
    justifyContent: 'flex-start',
    flexDirection: "row",
    marginTop: 14,
  },
  feedbackBtn: {
    fontSize: 12,
    color: AppColors.GREY_VARIANT10,
    fontFamily: FontFamily.DMSansRegular,
    marginLeft: 6
  },
});
