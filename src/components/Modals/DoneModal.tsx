import React from "react";
import { Component } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import ArrowDown from "svg/arrow-down";
import Tick from "../../icons/Tick";
import DoneView from "../Common/DoneView";

export default class DoneModal extends Component {
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
        this.setState({ isModalContentVisible: true });
      } else {
        setTimeout(() => this.setState({ isModalContentVisible: false }), 300);
      }
    }
  }

  componentDidMount() {
    if (this.props.toggleModal) {
      this.setState({ isModalContentVisible: true });
    }
  }

  render() {
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
          <Modal
            isVisible={this.props.toggleModal}
            propagateSwipe={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={200}
            animationOutTiming={200}
            onBackButtonPress={() => {
              this.setModalVisible();
            }}
            onBackdropPress={() => {
              this.setModalVisible();
            }}
            onSwipeComplete={() => {
              this.setModalVisible();
            }}
            avoidKeyboard={true}
            swipeDirection="down"
            style={[styles.modalView, { padding: 0 }]}
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
                {/* <TouchableOpacity style={styles.closeModal} onPress={() => {
                                  this.setModalVisible();
                              }}>
                                  <ArrowDown height={25} width={25} />
                              </TouchableOpacity> */}
              <DoneView bgColor={appConsumer.theme.colors.clientPrimary} tickColor={appConsumer.theme.colors.grey10} />
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
    marginTop: Platform.OS == "ios" ? Dimensions.get("window").height / 20 : 10,
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
  content: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.639,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    //overflow: 'hidden',
  },
  closeModal: {
    alignItems: "center",
    paddingBottom: 5,
    position: "absolute",
    top: 0,
  },
});
