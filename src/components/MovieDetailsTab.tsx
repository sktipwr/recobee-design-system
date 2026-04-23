import React, { PureComponent } from "react";

import { AppConsumer } from "context";
import MovieDetailsTab from "screens/MovieDetails/DetailScreens/MovieDetailsTab";
import { View, StyleSheet } from "react-native";

const state = {
  fromWatchlist: false,
  selectedTab: 0,
};

export default class MovieDetailsTabsWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = state;
  }

  render() {
    return (
      <AppConsumer>
        {(appConsumer) => (
          <>
            <View style={styles.container}>
              <View>
                <MovieDetailsTab
                  key={`MovieDetailsTab_${this.props.item.id}`}
                  title={this.props.item.title}
                  item={this.props.item}
                  setItemProp={this.props.setItemProp}
                  fromWatchlist={this.props.fromWatchlist}
                  isSeen={this.props.isSeen}
                  navigation={this.props.navigation}
                  recoNamesArr={
                    this.props.item.recoNamesArr
                      ? this.props.item.recoNamesArr
                      : []
                  }
                />
              </View>
            </View>
          </>
        )}
      </AppConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
