import React from 'react';
import { View, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const range = (end, start = 1, step = 1) => {
	return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
}

const MoviesListSkeleton = ({ rows, columns, height = 270, innerCardHeight = 250 }) => {

	return (range(rows).map((item) => {
		return (<View style={{ height: height}} key={item}>
			<SkeletonPlaceholder backgroundColor='#212121'  speed={0} >
				<View style={{ flexDirection: "column", height:  innerCardHeight }}>
					<View style={{ height: 20, width: 130, margin: 10, borderRadius: 10 }}></View>
					<View style={{ flexDirection: "row" }} >
						{range(columns).map((item) => (<View key={item} style={{ height: Dimensions.get("window").width * 0.52, width: Dimensions.get("window").width * 0.33, borderRadius: 10, marginLeft: 10, marginRight: 5 }} />
						))}
					</View>
				</View>
			</SkeletonPlaceholder>
		</View>);
	}));

};
export default MoviesListSkeleton;