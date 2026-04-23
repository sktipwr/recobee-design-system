import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import Delete from "svg/delete";
import ReportCommunity from "svg/report_community";
import Leave from "svg/leave";
import Members from "svg/members";
import Edit from "../../icons/Pencil";
import Eye from "../../icons/Eyes";
import Eyeo from "../../icons/Eyeo";
import RecoOutline from "icons/RecoOutline";
import Plus from "../../icons/Add";
import Block from "svg/block";
import RemoveUser from "svg/remove_user";
import ViewUser from "svg/sample_user";
import FlagWhite from "svg/flag_white";
import Forward from "svg/forward";
import Unblock from "svg/unblock";
import Camera from "svg/camera";
import Gallery from "svg/gallery";
import Setting from "icons/Settings";
import AddBox from "svg/addBox";
import Flag from "svg/flag";
import MinusCircle from "icons/MinusCircle";
import Star from "svg/star-filled";
import StarFill from "svg/star-main";
import Review from "icons/Review";
import Ask from "svg/ask-review";
import Post from "svg/create-post";
import List from "svg/clist";
import Insta from "svg/insta";
import Rating from "svg/rating";
import AddIcon from 'svg/add_icon'
import Filter from '../../icons/Filter'
import { getShareIcon } from "utils/HelperFunctions";
import UpdateItems from 'svg/update_items';
import Unpin from 'svg/unpin';
import CommonStyles from "../../../Styles";
import CircularAddIcon from "icons/AddCircle";
import AppColors from "utils/Colors";
import Notification from "svg/notification.svg";
import PinIcon from "icons/Pin";
import CalendarIcon from 'svg/calendar_bold.svg'
import Like from "icons/Like";
import LikeFilled from "icons/LikeFilled";
import Dislike from "icons/Dislike";
import DislikeFilled from "icons/DislikeFilled";
export default class MoreOptionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalContentVisible: false
    };
  }
  setModalVisible() {
    this.props.changeToggle(!this.props.toggleModal);
  }

  componentDidUpdate(prevProps) {
    if (this.props.toggleModal !== prevProps.toggleModal) {
      if (this.props.toggleModal) {
        // Set content visible immediately without delay
        this.setState({ isModalContentVisible: true });
      } else {
        setTimeout(() => this.setState({ isModalContentVisible: false }), 300);
      }
    }
  }

  componentDidMount() {
    // If modal is already visible on mount, show content immediately
    if (this.props.toggleModal) {
      this.setState({ isModalContentVisible: true });
    }
  }

  render() {
    const iconSource = (iconName) => {
      switch (iconName) {
        case "eye":
          return <Eye height={20} width={20} />;
        case "update_items":
          return <UpdateItems height={20} width={20} />;
        case "delete":
          return <Delete height={20} width={20} />;
        case "plus":
          return <Plus height={20} width={20} />;
        case "plusbox":
          return <AddBox height={20} width={20} />;
        case "plus_with_circle":
          return <CircularAddIcon height={20} width={20} color={AppColors.WHITE} strokeWidth={"1.2"} />;
        case "minussquareo":
          return <MinusCircle height={20} width={20} strokeWidth={'1.8'} />;
        case "eyeo":
          return <Eyeo height={20} width={20} strokeWidth={"1.8"} />;
        case "block":
          return <Block height={20} width={20} />;
        case "unblock":
          return <Unblock height={20} width={20} />;
        case "reco":
          return <RecoOutline height={20} width={20} strokeWidth={"2"} />;
        case "flag":
          return <Flag />;
        case "list":
          return <List height={20} width={20} />;
        case "edit":
          return <Edit height={20} width={20} strokeWidth="1.6" />;
        case "setting":
          return <Setting height={20} width={20} />;
        case "gallery":
          return <Gallery height={20} width={20} />;
        case "camera":
          return <Camera height={20} width={20} />;
        case "star":
          return <Star height={20} width={20} />;
        case "starfill":
          return <StarFill height={20} width={20} />;
        case "ask":
          return <Ask height={20} width={20} />;
        case "post":
          return <Post height={20} width={20} />;
        case "share":
          return getShareIcon(20);
        case "insta":
          return <Insta height={20} width={20} />;
        case "rating":
          return <Rating height={20} width={20} />;
        case "leave":
          return <Leave height={20} width={20} />;
        case "members":
          return <Members height={20} width={20} />;
        case "reportCommunity":
          return <ReportCommunity height={20} width={20} />;
        case "review":
          return <Review height={20} width={20} color="#FFFFFF" strokeWidth="1.8" />;
        case "forward":
          return <Forward height={20} width={20} />;
        case "remove_user":
          return <RemoveUser height={20} width={20} />;
        case "view_user":
          return <ViewUser height={20} width={20} />;
        case "flag_bold":
          return <FlagWhite height={20} width={20} />;
        case "filter":
          return <Filter height={20} width={20} color="#FFFFFF" strokeWidth="1.33" />;
        case "bell":
          return <Notification height={20} width={20} />;
        case "add_icon":
          return <AddIcon height={20} width={20} />;
        case "pin":
          return <PinIcon height={20} width={20} strokeWidth="1.6" />;
        case "unpin":
          return <Unpin height={20} width={20} />;
        case 're_schedule_event':
          return <CalendarIcon height={20} width={20} />;
        case 'remove_event':
          return <MinusCircle height={20} width={20} />
        case 'like':
          return <Like height={20} width={20} color="#FFFFFF" />;
        case 'like_filled':
          return <LikeFilled height={20} width={20} color="#FFFFFF" />;
        case 'dislike':
          return <Dislike height={20} width={20} color="#FFFFFF" />;
        case 'dislike_filled':
          return <DislikeFilled height={20} width={20} color="#FFFFFF" />;
        case 'not_taste':
          return <Dislike height={20} width={20} color="#FFFFFF" />;

      }
    };

    const getModalHeight = (length) => {
      switch (length) {
        case 1:
          return (this.props.title ? Dimensions.get("window").width * 0.556 : Dimensions.get("window").width * 0.4);
        case 2:
          return (this.props.title ? Dimensions.get("window").width * 0.7 : Dimensions.get("window").width * 0.5);
        case 3:
          return (this.props.title ? Dimensions.get("window").width * 0.88 : Dimensions.get("window").width * 0.65);
        case 4:
          return (this.props.title ? Dimensions.get("window").width * 1.0778 : Dimensions.get("window").width * 0.8);
        case 5:
          return (this.props.title ? Dimensions.get("window").width * 1.2667 : Dimensions.get("window").width * 0.9);
        case 6:
          return (this.props.title ? Dimensions.get("window").width * 1.2667 : Dimensions.get("window").height * 0.5);
        default:
          return (this.props.title ? Dimensions.get("window").width * 0.88 : Dimensions.get("window").width * 0.6);
      }
    }

    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
          <Modal
            isVisible={this.props.toggleModal}
            propagateSwipe={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            statusBarTranslucent={true}
            animationInTiming={200}
            animationOutTiming={200}
            avoidKeyboard={true}
            onBackButtonPress={this.props.cancelClick}
            onBackdropPress={this.props.cancelClick}
            onSwipeComplete={this.props.cancelClick}
            swipeDirection="down"
            style={[styles.modalView, { padding: 0 }]}
          >
            {this.state.isModalContentVisible && (
            <View
              style={[
                styles.content,
                {
                  backgroundColor: appConsumer.theme.colors.searchBackground,
                  height: getModalHeight(this.props.actions.length),
                  paddingTop: this.props.actions.length > 2 ? 28 : 20,
                },
                CommonStyles.modalTopRadius
              ]}
            >
              <TouchableOpacity
                style={styles.closeModal}
                onPress={this.props.cancelClick}
              >
                {/* <ArrowDown height={25} width={25} /> */}
                <View style={{ width: 48, height: 4, marginTop: 16, borderRadius: 8, backgroundColor: "#757575" }}>
                </View>
              </TouchableOpacity>
              {this.props.title && (
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.txtMainBody,
                      { color: appConsumer.theme.colors.text, paddingLeft: 0 },
                    ]}
                  >
                    {this.props.title}
                  </Text>
                </View>
              )}
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginTop: 36 }}
                data={this.props.actions}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.txtContainer}
                      onPress={() => this.props.onClick(this.props.item, item)}
                    >
                      {iconSource(item.actionIcon)}
                      <View
                        style={styles.marginLeft10}
                      >
                        <Text
                          style={[
                            styles.txtMainBody,
                            { color: appConsumer.theme.colors.text },
                          ]}
                        >
                          {item.actionName}
                        </Text>
                        {item.actionDesc && (
                          <Text style={styles.txtDesc}>
                            {item.actionDesc}
                          </Text>
                        )}
                      </View>

                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            )}
          </Modal>
          </View>
        )}
      </AppConsumer>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 0,
    borderRadius: 5,
    paddingTop: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  marginLeft10: {
    marginLeft: 10
  },
  content: {
    width: Dimensions.get("window").width
  },
  txtContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtMainBody: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "DMSans-Bold",
  },
  txtDesc: {
    fontSize: 14,
    lineHeight: 16,
    color: "#9E9E9E",
    fontFamily: "DMSans-Regular",
  },
  closeModal: {
    position: "absolute",
    left: (Dimensions.get("window").width - 48) / 2,
    top: 0,
  },
});
