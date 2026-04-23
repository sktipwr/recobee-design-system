import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";
import ClickableListItem from "./ClickableListItem";
import UserContact from "components/Cards/UserContact";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppConsumer } from "context";
import Search from "../../icons/Search";
import Close from "../../icons/Cross";
import Add from "../../icons/Add";
import { CLOUD_BASEURL } from "utils/HelperFunctions";

import { LOG } from "config";
var extendedLog = LOG.extend("ArrayList");

export default class ArrayList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listItems: [],
      topListItems: [],
      selectedListItems: [],
      reviewArray: [],
      ottList: [],
      ott: "",
      searchText: "",
      showCommentBox: false,
    };

    this.arrayholder = [];
    this.topArrayholder = [];
    this.press = this.press.bind(this);
  }

  press = (row) => {
    this.state.listItems.map((item) => {
      if (item.id === row.id) {
        item.check = !item.check;
        if (this.state.topListItems) {
          this.state.topListItems.map((item1) => {
            if (item1.dbid === row.dbid) {
              item1.check = !item1.check;
            }
          });
        }
        if (item.check === true) {
          this.state.selectedListItems.push(item);
          if (this.props.selectedItems) {
            this.props.selectedItems.push(item);
          }
        } else if (item.check === false) {
          const i = this.state.selectedListItems.findIndex((element, index) => {
            if (element.name === item.name) {
              return true;
            }
          });
          if (1 != -1) {
            this.state.selectedListItems.splice(i, 1);
            if (
              this.props.selectedItems &&
              this.props.selectedItems.length > 0
            ) {
              const j = this.props.selectedItems.findIndex((element, index) => {
                if (element.name === item.name) {
                  return true;
                }
              });
              this.props.selectedItems.splice(j, 1);
            }
            return this.state.selectedListItems;
          }
        }
      }
    });
    if (this.state.topListItems) {
      this.state.topListItems.map((item1) => {
        if (item1.id === row.id) {
          item1.check = !item1.check;
          var listItem = this.state.listItems.filter(
            (el) => el.dbid == item1.dbid
          );
          listItem.check = !listItem.check;
          this.state.listItems.map((item) => {
            if (item.dbid === row.dbid) {
              item.check = !item.check;
              if (item.check === true) {
                this.state.selectedListItems.push(item);
                if (this.props.selectedItems) {
                  this.props.selectedItems.push(item);
                }
              } else if (item.check === false) {
                const i = this.state.selectedListItems.findIndex(
                  (element, index) => {
                    if (element.name === item.name) {
                      return true;
                    }
                  }
                );
                if (1 != -1) {
                  this.state.selectedListItems.splice(i, 1);
                  if (
                    this.props.selectedItems &&
                    this.props.selectedItems.length > 0
                  ) {
                    const j = this.props.selectedItems.findIndex(
                      (element, index) => {
                        if (element.name === item.name) {
                          return true;
                        }
                      }
                    );
                    this.props.selectedItems.splice(j, 1);
                  }
                  return this.state.selectedListItems;
                }
              }
            }
          });
        }
      });
    }
    this.props.onPressCallback && this.props.onPressCallback();
    this.setState({ listItems: this.state.listItems });
    this.setState({ showCommentBox: true });
  };

  selectOTT = async (ottSelected) => {
    await this.setState({ ott: ottSelected });
  };

  writeComment = async () => {
    await this.setState({ showCommentBox: true });
  };

  getUserPrefs = async() => {
    const response = await fetch(CLOUD_BASEURL + "MyPreferences.json");
    let prefsData = await response.json();
    this.setState({ ottList: prefsData.ott });

  }

  componentDidMount() {
    this.setState({ listItems: this.props.listData });
    this.arrayholder = this.props.listData;
    this.props.listData.map((item) => {
      if (item.check === true) {
        this.state.selectedListItems.push(item);
      }
    });
    this.setState({ topListItems: this.props.topListData });
    this.topArrayholder = this.props.topListData;
    this.setState({
      reviewArray: ["Terrible", "Bad", "Average", "Good", "Must Watch !"],
    });
  }

  FlatListItemSeparator = () => (
    <Text
      style={{
        color: "#000",
        paddingTop: 6,
        fontFamily: "DMSans-Bold",
      }}
    >
      ,
    </Text>
  );

  searchEntered(text) {
    const newData = this.arrayholder.filter((item) => {
      if (item.name != null) {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    });

    let newTopData = [];

    if (this.topArrayholder && this.topArrayholder.length > 0) {
      newTopData = this.topArrayholder.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    }

    this.setState({
      listItems: newData,
      topListItems: newTopData,
      searchText: text,
    });
  }

  renderHeader = () => {
    return (
      <Header
        showSearch={this.props.showSearch}
        title={this.props.headerTitle}
        searchValue={this.props.searchValue}
        onCancelClick={this.props.onCancelClick}
      />
    );
  };

  render() {
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View style={[styles.container]}>
            {this.props.showSelectedImages ? (
              <>
                {this.state.selectedListItems.length > 0 ? (
                  <View style={{ padding: 15, paddingRight: 0 }}>
                    <FlatList
                      data={this.state.selectedListItems}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => {
                        return (
                          <UserContact
                            item={item}
                            removeClicked={this.press}
                          ></UserContact>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ padding: 29, paddingRight: 0 }}>
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 40,
                        borderWidth: 1,
                        borderColor: "#9E9E9E",
                        borderStyle: "dashed",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Add height={15} width={15} color="#9E9E9E" />
                    </View>
                  </View>
                )}
              </>
            ) : null}
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.storyContainer}
              keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
              extraScrollHeight={60}
            >
              {this.props.showSearch ? (
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: this.props.hideCancel ? 8 : 0,
                    paddingRight: this.props.hideCancel ? 8 : 0,
                  }}
                >
                  <View
                    style={[
                      styles.searchContainer,
                      {
                        backgroundColor: appConsumer.theme.colors.grey9alt,
                      },
                    ]}
                  >
                    <View style={{ paddingRight: 18 }}>
                      <Search width={24} height={24} />
                    </View>
                    <TextInput
                      style={[
                        styles.inputStyle,
                        { color: appConsumer.theme.colors.text },
                      ]}
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      value={this.state.searchText}
                      onChangeText={(text) => this.searchEntered(text)}
                      placeholder={
                        this.props.hideCancel
                          ? "Search for a Friend..."
                          : "Search for a Friend or Group..."
                      }
                      placeholderTextColor={
                        appConsumer.theme.colors.placeholder
                      }
                    />
                    {this.state.searchText == "" ? null : (
                      <TouchableOpacity onPress={() => this.searchEntered("")}>
                        <View style={{ paddingRight: 12 }}>
                          <Close
                            color={appConsumer.theme.colors.text}
                            width={24}
                            height={24}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ) : null}
              {this.state.topListItems && this.state.topListItems.length > 0 ? (
                <View style={{ paddingBottom: 10 }}>
                  <Text
                    style={{
                      color: appConsumer.theme.colors.grey6,
                      fontFamily: "DMSans-Regular",
                      fontSize: 14,
                      padding: 16,
                      paddingBottom: 8,
                    }}
                  >
                    Friends who have watched it
                  </Text>
                  <FlatList
                    data={this.state.topListItems}
                    showsVerticalScrollIndicator={false}
                    numColumns={this.props.numColumns}
                    style={{ maxHeight: Dimensions.get("window").width / 2.5 }}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={this.state}
                    renderItem={({ item }) => {
                      return (
                        <ClickableListItem
                          item={item}
                          onItemCheck={this.press}
                        ></ClickableListItem>
                      );
                    }}
                  />
                </View>
              ) : null}
              {this.state.listItems.length > 0 ? (
                <>
                  {this.props.askReco ? (
                    <Text
                      style={{
                        color: appConsumer.theme.colors.grey6,
                        fontFamily: "DMSans-Regular",
                        fontSize: 14,
                        padding: 16,
                        paddingBottom: 8,
                      }}
                    >
                      All friends
                    </Text>
                  ) : null}
                  <FlatList
                    data={this.state.listItems}
                    showsVerticalScrollIndicator={false}
                    style={[
                      styles.list,
                      {
                        minHeight:
                          this.props.showSearch && !this.props.askReco
                            ? Platform.OS == "ios"
                              ? Dimensions.get("window").height / 2
                              : this.state.showCommentBox
                              ? Dimensions.get("window").height / 10
                              : Dimensions.get("window").height / 2 - 50
                            : null,
                      },
                    ]}
                    numColumns={this.props.numColumns}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={this.state}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) => {
                      return (
                        <ClickableListItem
                          item={item}
                          onItemCheck={this.press}
                        ></ClickableListItem>
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  {this.props.showSearch ? (
                    <>
                      {this.state.searchText == "" ? null : (
                        <View
                          style={{
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingLeft: 10,
                            width: Dimensions.get("window").width,
                          }}
                        >
                          <Text
                            style={[
                              styles.cancelText,
                              {
                                color: appConsumer.theme.colors.text,
                                paddingLeft: 5,
                                paddingTop: 5,
                                paddingBottom: 10,
                              },
                            ]}
                          >
                            No match found !!
                          </Text>
                        </View>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </KeyboardAwareScrollView>
          </View>
        )}
      </AppConsumer>
    );
  }
}

const Header = (props) => (
  <AppConsumer>
    {(appConsumer) => (
      <View>
        {props.showSearch ? null : (
          <>
            {props.title ? (
              <View
                style={[
                  styles.headerContainer,
                  { backgroundColor: appConsumer.theme.colors.homeCard },
                ]}
              >
                <Text
                  style={[
                    styles.txtHeaderBody,
                    { color: appConsumer.theme.colors.text },
                  ]}
                >
                  {props.title}
                </Text>
              </View>
            ) : null}
          </>
        )}
      </View>
    )}
  </AppConsumer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyContainer: {
    flex: 1,
  },
  recoContainer: {
    paddingTop: 0,
    flexDirection: "row",
  },
  containerFooter: {
    height: 200,
    padding: 5,
  },
  searchContainer: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 4,
    paddingLeft: 20,
    width: Dimensions.get("window").width - 32,
    height: (Dimensions.get("window").width - 32) * 0.134,
  },
  cancelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: (Dimensions.get("window").width - 32) * 0.134,
    marginRight: 10,
    marginTop: 10,
  },
  cancelText: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
  },
  headerContainer: {
    flex: 1,
    padding: 5,
    paddingLeft: Platform.OS === "ios" ? 5 : 10,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  ImageStyle: {
    padding: 4,
    margin: 5,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 150,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonTextStyle: {
    paddingVertical: 7,
    fontSize: 14,
    fontFamily: "DMSans-Regular",
  },
  inputStyle: {
    flex: 5,
    fontFamily: "DMSans-Regular",
    fontSize: 14,
  },
  txtHeaderBody: {
    padding: 3,
    fontFamily: "DMSans-Regular",
    fontSize: Platform.OS === "ios" ? 13.5 : 12,
    flex: 10,
  },
  list: {
    flex: 2,
  },
  inputCommentStyle: {
    fontFamily: "DMSans-Regular",
    borderWidth: 1,
    height: 65,
    paddingLeft: 5,
    paddingRight: 5,
  },
  newGrpContainer: {
    borderWidth: 0,
    borderRadius: 35,
    width: 65,
    height: 65,
    backgroundColor: "#F6CE3D",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 5,
  },
  newGrpTxtBody: {
    backgroundColor: "#F6CE3D",
    color: "#2F5151",
  },
});
