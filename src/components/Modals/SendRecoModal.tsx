import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import StringConstants from "../../../src/utils/StringConstants";
import EncryptedStorage from 'react-native-encrypted-storage';
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import EmptyState from "../Common/EmptyState";
import ArrowDown from "svg/arrow-down";
import ArrayList from "../List/ArrayList";
import ChatCard from "components/InboxFlow/ChatCard"
import inboxFlowAPI from "../../../api/inboxFlowAPIs";
import friendlistAPI from "../../../api/friendlistAPI";
export default class SendRecoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableBtn: false,
      selectedFriends: new Set(),
      allFriends: [],
      userid: null,
      fname: null,
      isModalContentVisible: false,
    };
  }

  async componentDidMount() {
    if (!this.props.chatRooms || this.props.chatRooms.length === 0) {
        this.fetchFriends();
    }
      const userid = await EncryptedStorage.getItem('user_id');
      const fname = await EncryptedStorage.getItem('user_fname');
      this.setState({ userid, fname });
    if (this.props.modalVisible) {
      this.setState({ isModalContentVisible: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalVisible !== prevProps.modalVisible) {
      if (this.props.modalVisible) {
        this.setState({ isModalContentVisible: true });
      } else {
        setTimeout(() => this.setState({ isModalContentVisible: false }), 300);
      }
    }
  }

  fetchFriends = () => {
    friendlistAPI
      .getFriendListNew()
      .then((response) => {
        if (response.data) {
          this.setState({
            allFriends: response.data,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching friends:', error);
      });
  };

  toggleSelection = (friend) => {
    this.setState((prev) => {
      const newSelected = new Set(prev.selectedFriends);
      if (newSelected.has(friend)) {
        newSelected.delete(friend);
      } else {
        newSelected.add(friend);
      }
      return {
        selectedFriends: newSelected,
        enableBtn: newSelected.size > 0,
      };
    });
  };

  handleSendReco =  () => {
    // 1. Close modal immediately
    this.props.cancelClick();
    this.props.nextClicked();
    // 2. Get current user info
    const userid = this.state.userid;
    const senderName = this.state.fname;
    const { movie } = this.props;

    // 3. Fire off create→post for each friend object
    this.state.selectedFriends.forEach((friend) => {
      const chatUserId = friend.frienduserid;
      const sortedIds = [userid, chatUserId].sort();
      const chatroomId = `${sortedIds[0]}@${sortedIds[1]}`;

      const chatroomData = {
        chatType: 'personal',
        senderName: senderName,
        userIds: [userid, chatUserId],
        chatName: friend.fname,
        chatImage: friend.thumbnail || '',
      };

      inboxFlowAPI
        .createChatroom(chatroomData)
        .then(() =>
          inboxFlowAPI.postMessage({
            chatroomId,
            senderId: userid,
            content: '',
            messageType: 'movie',
            movieId: movie.id,
            title: movie.title,
            releasedate: movie.releasedate,
            genre: movie.genre,
            arrating: movie.arrating,
            senderName: senderName,
          })
        )
        .then(() => {
          console.log(`Reco sent to ${friend.fname}`);
        })
        .catch((err) => {
          console.error(`Failed for ${friend.fname}:`, err);
        });
    });
    this.setState({
      selectedFriends: new Set(),
    });
  };

  renderFriendList = ({ item }) => (
    <ChatCard
      userImage={item.thumbnail || null}
      userName={item.fname}
      isCircle={!this.state.selectedFriends.has(item)}
      isTick={this.state.selectedFriends.has(item)}
      onPress={() => this.toggleSelection(item)}
    />
  );

  render() {
    const emptyStateItem = {
      title: "",
      icon: "smile",
      width: Dimensions.get("window").width * 0.233,
      height: Dimensions.get("window").width * 0.208,
      message:
        `Oops! You need to add friends before sending a Reco. Invite friends to RecoBee and while that happens, you can definitely write a public Review.\n\n Go ahead and write one for ` +
        this.props.movieName,
    };

    const rowPressed = () => {
      if (this.props.selectedItems.length > 0) {
        this.setState({ enableBtn: true });
      } else {
        this.setState({ enableBtn: false });
      }
    };
    const renderChatrooms = ({ item }) => {
      if( item.users.length < 2)
        return null; // Skip invalid chatrooms
      let friendId = ""
    // Default values for group chats (or if friend lookup fails)
    let userName = item.chatName || "no friend of yours ";
    let userImage = item.chatImage || null;
    if (item.chatType == "personal") {
      // Determine which user in the chat is the friend
      friendId = item.users[1].id;
      userName = item.users[1].fname;
      userImage = item.users[1].thumbnail
      if (friendId == this.state.userid) {
        userName = item.users[0].fname;
        userImage = item.users[0].thumbnail
      }
    }
      return (
        <ChatCard
          chattype={item.chatType}
          userImage={userImage}
          userName={userName}
          onPress={()=> {
            const messageData = {
              chatroomId: item.PK,
              senderId: this.state.userid,
              content: '',
              messageType: 'movie',
              movieId: this.props.movie.id,
              title: this.props.movie.title,
              releasedate: this.props.movie.releasedate,
              genre: this.props.movie.genre,
              arrating: this.props.movie.arrating,
              senderName: this.state.fname,
            };
            inboxFlowAPI
              .postMessage(messageData)
              .then((response) => {
                console.log('response.data');
              })
              .catch((err) => {
                console.error('Error sending message:', err);
              })
              .finally(() => {
                this.props.cancelClick();
                this.props.nextClicked();
              });
          }}
        />
      );
    };
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
            <Modal
              isVisible={this.props.modalVisible}
              propagateSwipe={true}
              animationIn='slideInUp'
              animationOut='slideOutDown'
              statusBarTranslucent={true}
              animationInTiming={200}
              animationOutTiming={200}
              avoidKeyboard={false}
              onBackButtonPress={this.props.cancelClick}
              onBackdropPress={this.props.cancelClick}
              onSwipeComplete={this.props.cancelClick}
              swipeDirection='down'
              style={styles.modalView}
            >
              {this.state.isModalContentVisible && (
              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: appConsumer.theme.colors.bottomsheet,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.closeModal}
                  onPress={this.props.cancelClick}
                >
                  <ArrowDown height={25} width={25} />
                </TouchableOpacity>
                {this.props.chatRooms.length>0 ? (
                  <>
                    {/* Show chatrooms */}
                    <View
                      style={styles.header}
                    >
                      <Text style={[styles.txtTitle]}>
                        {StringConstants.YOUR_CHATROOMS}
                      </Text>
                    </View>
                    <FlatList
                      data={this.props.chatRooms}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item) => item.PK}
                      renderItem={renderChatrooms}
                    />
                  </>
                ) : (
                  <>
                    {this.state.allFriends.length > 0 ? (
                      <>
                        <View
                          style={styles.header}
                        >
                          <Text style={[styles.txtTitle]}>
                            {StringConstants.YOUR_CONTACTS}
                          </Text>
                        </View>
                        <FlatList
                          data={this.state.allFriends}
                          keyExtractor={(item) => item.frienduserid}
                          renderItem={this.renderFriendList}
                          showsVerticalScrollIndicator={false}
                        />

                        <View style={[styles.bottomButton]}>
                          <TouchableOpacity
                            style={[
                              styles.actionButtonStyle,
                              {
                                backgroundColor: this.state.enableBtn
                                  ? appConsumer.theme.colors.clientPrimary
                                  : appConsumer.theme.colors.grey9,
                                flex: 1,
                                padding: 10,
                              },
                            ]}
                            disabled={!this.state.enableBtn}
                            onPress={this.handleSendReco}
                          >
                            <Text
                              style={[
                                styles.txtHeader,
                                {
                                  color: this.state.enableBtn
                                    ? appConsumer.theme.colors.grey10
                                    : appConsumer.theme.colors.grey5,
                                },
                              ]}
                            >
                              {StringConstants.SEND_RECO}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <View
                        style={styles.emptyView}
                      >
                        <EmptyState item={emptyStateItem} />
                        <View style={styles.emptyButton}>
                          <TouchableOpacity
                            style={[
                              styles.bottomBtnStyle,
                              {
                                backgroundColor:
                                appConsumer.theme.colors.clientPrimary,
                              }
                            ]}
                            onPress={() => this.props.inviteClicked()}
                          >
                            <Text
                              style={[
                                styles.txtHeader,
                                { color: appConsumer.theme.colors.grey10 },
                              ]}
                            >
                              {StringConstants.REVIEW_NOW}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </>
                )}
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
  emptyButton:{
    flex: 1,
    marginTop: 50,
  },
  emptyView:{
    flex: 1,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    paddingLeft: 18,
    paddingTop: 10,
    paddingBottom: 16,
  },
  modalView: {
    flex: 1,
    margin: 0,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  content: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 1.59,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    //overflow: 'hidden',
  },
  actionButtonStyle: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
  },
  bottomBtnStyle: {
    borderRadius: 8,
    padding: 12,
    width: 0.4 * Dimensions.get('window').width,
    height: Dimensions.get("window").width * 0.122,
    alignItems: "center",
    justifyContent: "center",
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 14,
  },
  txtTitle: {
    fontFamily: "DMSans-Bold",
    fontSize: 16,
     color: '#F5F5F5'
  },
  closeModal: {
    alignItems: "center",
    paddingBottom: 5,
  },
  bottomButton :{
    padding: 16,
    flexDirection: 'row'
  }
});
