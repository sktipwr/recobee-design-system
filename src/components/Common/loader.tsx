//Import React and Hook we needed
import React from "react";

//Import all required component
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import { AppConsumer } from "context";

const Loader = props => {
  const { loading, ...attributes } = props;

  return (
    <View>
    <Modal
      transparent={true}
      animationType={"none"}
      statusBarTranslucent={true}
      visible={loading}
      onRequestClose={() => {
      }}
    >
      <AppConsumer>
        {appConsumer => (
          <View style={[styles.modalBackground]}>
            <View
              style={[
                styles.activityIndicatorWrapper,
                { backgroundColor: 'Transparent' },
              ]}
            >
              <ActivityIndicator animating={loading} color={appConsumer.theme.colors.text} size="large"/>
            </View>
          </View>
        )}
      </AppConsumer>
    </Modal>
    </View>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
