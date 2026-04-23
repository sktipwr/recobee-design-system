import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import Close from "../../icons/Cross";
import CommonStyles from "../../../Styles";
import StringConstants from "utils/StringConstants";
import { SCREEN_WIDTH } from "utils/Dimensions";

export default class Alert extends Component {
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

  //dismiss modal
  onClose = () => {
    if(this.props.item.btnText == StringConstants.OPEN_APP_SETTINGS){
      this.props.secBtnClicked()
    }
    else {
      this.props.btnClicked()
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
            statusBarTranslucent={true}
            animationInTiming={200}
            animationOutTiming={200}
            avoidKeyboard={true}
            swipeDirection="right"
            style={[styles.modalView, { padding: 0 }]}
          >
            
            {this.state.isModalContentVisible && (
            <View style={CommonStyles.modalContainer}>
              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: appConsumer.theme.colors.searchBackground,
                  },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.msgContainer, CommonStyles.txtHeader]}>
                    {this.props.item.msgTitle}
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 16,
                    maxHeight: Dimensions.get("window").width / 4.4,
                  }}
                >
                  <Text numberOfLines={4} style={[CommonStyles.txtBodyLarge, {textAlign: 'center'}]}>
                    {this.props.item.msgText}
                  </Text>
                </View>
                <View style={[CommonStyles.rowAlignCenter, styles.btnRow]}>
                      <TouchableOpacity
                        style={[styles.doneBtn, this.props.item.btnText == StringConstants.OPEN_APP_SETTINGS && {width: SCREEN_WIDTH * 0.3}]}
                        onPress={() => this.props.btnClicked()}
                      >
                        <Text
                          style={[
                            CommonStyles.txtHeaderLarge,
                            { color: appConsumer.theme.colors.grey10 },
                          ]}
                        >
                          {this.props.item.btnText}
                        </Text>
                      </TouchableOpacity>
                      {
                        this.props.showSecondaryBtn &&
                      <TouchableOpacity
                        style={[styles.doneBtn, {marginLeft: 20}]}
                        onPress={() => this.props.secBtnClicked()}
                      >
                        <Text
                          style={[
                            CommonStyles.txtHeaderLarge,
                            { color: appConsumer.theme.colors.grey10 },
                          ]}
                        >
                          {this.props.secBtnText}
                        </Text>
                      </TouchableOpacity>
                  }
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => this.onClose()}
                >
                  <Close height={25} width={25} />
                </TouchableOpacity>
              </View>
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
    alignItems: "center",
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
    width: Dimensions.get("window").width * 0.8389,
    maxHeight: Dimensions.get("window").width * 0.555,
    borderRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: "center",
  },
  msgContainer: {
    paddingBottom: 8,
    lineHeight: 20,
    textAlign: 'center'
  },
  closeBtn: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  doneBtn: {
    backgroundColor: "#E9C638",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.2822,
    height: 36,
  },
  txtBody: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
  },
  btnRow: {
    justifyContent: 'center', 
    marginBottom: 10
  }
});
