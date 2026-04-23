import React, { Component } from "react";
import _ from "lodash";
import {
    StyleSheet,
    View,
    FlatList
} from "react-native";
import SelectableImage from "../Cards/SelectableImage";
import PrefCard from "../Cards/PrefCard";
import { AppConsumer } from "context";

export default class ImageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listItems: []
        };
    }

    press = (row, isChecked) => {
        const that = this;
        let item = that.state.listItems.find(el => el.id === row.id);
        if(item){
            item.check = isChecked;
        }
        
        if (isChecked === true) {
            if(!Array.isArray(that.props.selectedItems)){
                that.props.selectedItems = []
            }
            
            if (that.props.selectedItems) {
                const items = Array.isArray(that.props.selectedItems) ? that.props.selectedItems : [];
                items?.push(item)
                that.props.selectedItems = items?.slice();
            }
        } else if (isChecked === false) {
            if (
                this.props.selectedItems &&
                this.props.selectedItems.length > 0
            ) {
                const j = this.props.selectedItems.findIndex((element, index) => {
                    if (element.id === item.id) {
                        return true
                    }
                })
                this.props.selectedItems.splice(j, 1);
            }
        }
        this.setState({ listItems: this.state.listItems });
        this.props.onPressCallback && this.props.onPressCallback();
    };

    componentDidMount() {
        this.setState({ listItems: this.props.listData });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.listData === this.props.listData &&
            nextProps.selectedItems === this.props.selectedItems &&
            nextState.listItems === this.state.listItems
        ) {
            // Nothing has changed, so a re-render is unnecessary
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.listData, prevProps.listData)) {
            this.setState({ listItems: this.props.listData });
        }
    }

    render() {
        let listData = this.state.listItems && this.state.listItems?.length > 0 ? this.state.listItems : [];
        return (
            <AppConsumer>
                {(appConsumer) => (
                    <View
                        style={[
                            styles.container,
                            {
                                backgroundColor: this.props.bgColor ? this.props.bgColor : appConsumer.theme.colors.primary,
                                paddingTop: this.props.prefCard ? 20 : 0
                            },
                        ]}
                    >
                        {listData?.length > 0 ?
                            <>
                                <FlatList
                                    data={this.state.listItems}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={this.props.numColumns}
                                    keyExtractor={(item, index) => (item.id && item.id.toString()) || index.toString()}
                                    extraData={this.state}
                                    onEndReached={this.props.loadMoreItems}
                                    onEndReachedThreshold={0.5}
                                    keyboardShouldPersistTaps="handled"
                                    renderItem={({ item }) => {
                                        return (
                                            <>{this.props.prefCard ?
                                                <View><PrefCard
                                                    item={item}
                                                    onItemCheck={this.press}
                                                    type={this.props.prefType}
                                                ></PrefCard></View> :
                                                <View style={{ paddingRight: 7 }}><SelectableImage
                                                    item={item}
                                                    onItemCheck={this.press}
                                                    bgColor={this.props.bgColor}
                                                    showTitle={this.props.showTitle}
                                                    selectionMode={this.props.selectionMode}
                                                ></SelectableImage></View>}</>
                                        );
                                    }}
                                /></> : null}
                    </View>
                )}
            </AppConsumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 2,
        paddingRight: 7
    }
});
