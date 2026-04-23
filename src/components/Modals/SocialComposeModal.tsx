import React, { useState } from "react";
import { Component } from "react";
import _ from "lodash";
import {
  Alert,
  StyleSheet,
  Image,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
  Image as RNImage,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
//import MyWatchlistScreen from './../../StackScreens/Profile/Watchlist/MyWatchlistScreen';
import { AppConsumer } from "context";
import ImageList from "../List/ImageList";
import MoviesListSkeleton from "../Skeletons/MoviesListSkeleton";
import searchAPI from "api/searchAPI";
import ArrowDown from "svg/arrow-down";
import Close from "../../icons/Cross";
import Search from "../../icons/Search";

export default class SocialComposeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchTerm: "",
      searchResults: [],
      selected: null,
      postType: "movie",
      movieName: "",
      hasSearchInputFocus: false,
      isModalContentVisible: false,
    };
  }
  setSearchTerm(val) {
    this.setState({ searchTerm: val });
  }
  setSearchResults(results) {
    this.setState({ searchResults: results });
  }
  setSelected(type, val, name) {
    if (this.state.selected === val) {
      val = null;
      type = "movie";
      name = "";
    }

    this.setState({ selected: val, postType: type, movieName: name });
  }
  setSearchInputFocus(val) {
    this.setState({ hasSearchInputFocus: val });
  }
  clearSelection() {
    const val = null;
    const type = "movie";
    const name = "";
    this.setState({ selected: val, postType: type, movieName: name });
  }
  setModalVisible() {
    if (this.props.toggleModal) {
      this.clearSelection();
    }
    this.props.changeToggle(!this.props.toggleModal);
  }
  handleInputFocus() {
    this.setSearchInputFocus(true);
  }
  handleInputBlur() {
    this.setSearchInputFocus(false);
  }
  loadSearchResults = (searchStr) => {
    if (searchStr != "") {
      this.setState({ loading: true });
      const filteredInput = searchStr.replace(/[^a-zA-Z0-9- ]/g, "");

      searchAPI
        .getMovieSearchResults(filteredInput.trim())
        .then((response) => {
          this.setState({
            loading: false,
            searchResults: response.data || [],
          });
        })
        .catch((error) => {
          extendedLog.error(
            "Error executing searchAPI.getMovieSearchResults with message:",
            error
          );
          this.setState({ loading: false, source: "" });
        });
    }
  };
  onPostClick() {
    this.props.onPost(
      this.state.selected,
      this.state.movieName,
      this.state.postType
    );
    this.setModalVisible();
  }
  componentDidMount() {
    this._loadSearchResults = _.debounce(this.loadSearchResults, 0.2 * 1000);
    if (this.props.toggleModal) {
      this.setState({ isModalContentVisible: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      // this._loadSearchResults(this.state.searchTerm);
    }
    if (this.props.toggleModal !== prevProps.toggleModal) {
      if (this.props.toggleModal) {
        this.setState({ isModalContentVisible: true });
      } else {
        setTimeout(() => this.setState({ isModalContentVisible: false }), 300);
      }
    }
  }
  render() {
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
          <Modal
            animationType="slide"
            statusBarTranslucent={true}
            visible={this.props.toggleModal}
            animationInTiming={200}
            animationOutTiming={200}
            onRequestClose={() => this.setModalVisible()}
            onBackButtonPress={() => this.setModalVisible()}
            onBackdropPress={() => this.setModalVisible()}
            onSwipeComplete={() => this.setModalVisible()}
            style={styles.containerStyle}
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
                onPress={() => this.setModalVisible()}
              >
                <ArrowDown height={25} width={25} />
              </TouchableOpacity>
              <View style={[styles.shareTitleContainer]}>
                <Text style={[styles.shareTitleText]}>Share Public Reco</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[
                    styles.searchContainer,
                    {
                      flex: 1,
                      borderColor: appConsumer.theme.colors.text,
                      backgroundColor: appConsumer.theme.colors.grey9alt,
                      borderWidth: this.state.hasSearchInputFocus ? 1 : 0,
                    },
                  ]}
                >
                  <View style={{ paddingRight: 12 }}>
                    <Search width={24} height={24} />
                  </View>
                  <TextInput
                    style={[
                      styles.inputStyle,
                      {
                        color: appConsumer.theme.colors.text,
                        fontFamily: "DMSans-Regular",
                        fontSize: 14,
                        paddingTop: Platform.OS == "ios" ? 0 : 2,
                      },
                    ]}
                    value={this.state.searchTerm}
                    onFocus={() => this.handleInputFocus()}
                    onBlur={() => this.handleInputBlur()}
                    onChangeText={(text) => this.setSearchTerm(text)}
                    onEndEditing={() =>
                      this._loadSearchResults(this.state.searchTerm)
                    }
                    autoCapitalize="none"
                    placeholder="Search anything, for e.g. ‘Money Heist’"
                    underlineColorAndroid="transparent"
                    keyboardAppearance="dark"
                    returnKeyType="search"
                    placeholderTextColor={appConsumer.theme.colors.placeholder}
                  />
                  {this.state.searchTerm == "" ? null : (
                    <TouchableOpacity onPress={() => this.setSearchTerm("")}>
                      <View style={{ paddingRight: 0 }}>
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
              {
                this.state.searchTerm !== "" && this.state.loading && (
                  <MoviesListSkeleton rows="3" columns="4" />
                )
                // <Text style={{ color: "#FFF" }}>Loading...</Text>
              }
              {/* {this.state.searchTerm === "" ?
                <>
                  <Text style={[
                    styles.shareListsTitleTxt,
                    {
                      color: appConsumer.theme.colors.white,
                      opacity: appConsumer.theme.opacities.subHeadingOpacity
                    }
                  ]}>SHARE FROM YOUR LISTS</Text>
                  <MyWatchlistScreen
                    navigation={this.props.navigation}
                    route={{}}
                    viewMode="selection"
                    selected={this.state.selected}
                    onSelectionChange={(type, id, name) => this.setSelected(type, id, name)}
                    closeModal={() => this.props.changeToggle(false)} /></>
                : <View style={{ paddingLeft: 16, flex: 1, paddingTop: 14 }}><ImageList
                  listData={this.state.searchResults}
                  numColumns={3}
                  bgColor={appConsumer.theme.colors.bottomsheet}
                  selectionMode="single"
                  onSelectionChange={(item) => this.setSelected("movie", item.id, item.title)}
                /></View>
              } */}

              <Pressable
                disabled={!this.state.selected}
                onPress={() => this.onPostClick()}
                style={[
                  styles.postBtnContainer,
                  !this.state.selected && styles.postBtnDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.postBtnText,
                    !this.state.selected && styles.postBtnDisabledTxt,
                  ]}
                >
                  Post
                </Text>
              </Pressable>
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
  containerStyle: {
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
    height: Dimensions.get("window").width * 1.6833,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  closeModal: {
    position: "absolute",
    left: (Dimensions.get("window").width - 48) / 2,
    top: 0,
  },

  shareTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  shareTitleText: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
    color: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: 50,
    margin: 10,
    marginTop: 10,
    padding: 10,
  },
  inputStyle: {
    width: "80%",
  },
  shareListsTitleTxt: {
    marginLeft: 20,
    fontSize: 12,
    fontFamily: "DMSans-Regular",
  },
  postBtnContainer: {
    position: "absolute",
    bottom: 10,
    width: Dimensions.get("window").width - 24,
    backgroundColor: "#E9C638",
    alignItems: "center",
    padding: 12,
    margin: 12,
    borderRadius: 8,
  },
  postBtnDisabled: {
    backgroundColor: "#424242",
  },
  postBtnText: {
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    color: "#121212",
  },
  postBtnDisabledTxt: {
    color: "#BDBDBD",
  },
});
