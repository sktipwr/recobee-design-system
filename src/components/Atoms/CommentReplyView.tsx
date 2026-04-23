import CommonStyles from '../../../Styles';
import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import StringConstants from 'utils/StringConstants';
import Comment from "svg/comment";
export const CommentReplyView: React.FC = ({comments, onReplyPress, textColor}) => {
  return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onReplyPress()}
      >
        <Comment height={17} width={17} />
        <Text style={[CommonStyles.txtBodyReply,styles.replyTextStyle]}>{StringConstants.REPLY}</Text>
        {comments > 0 ? (
          <Text
            style={[
              CommonStyles.txtBodyReply,
              {color: textColor,}
            ]}
          >
            {comments}
          </Text>
        ) : null}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    padding: 5,
    paddingBottom: 0,
  },
  replyTextStyle: {marginLeft: 8, fontSize: 14},
  commentsText: {
    opacity: 0.6,
    fontSize: 10,
    paddingLeft: 8,
  },

})
