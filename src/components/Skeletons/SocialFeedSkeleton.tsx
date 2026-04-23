import React from 'react';
import { View, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const calculatedHeight = Dimensions.get('window').width * 0.613;

const range = (end, start = 1, step = 1) => {
	return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
}

const SocialFeedSkeleton = ({ rows }) => {

	return (range(rows).map((item) => {
		return (<View style={{  }} key={item}>
			<SkeletonPlaceholder backgroundColor='#212121' speed={0} >
				<View style={{padding: 16}}>
					<View style={{ flexDirection: "row", }}>
						<View style={{ height: 36, width: 36, margin: 8, borderRadius: 30 }} />
						<View style={{ height: 32, width: Dimensions.get('window').width * 0.533, margin: 10, borderRadius: 5 }} />
					</View>
					<View style={{ flexDirection: "column" }} >
						<View style={{ height: calculatedHeight, width: Dimensions.get('window').width  - 40, borderRadius: 5, marginLeft: 10, marginRight: 5 }} />
						<View style={{ flexDirection: "row" }}>
							<View style={{ height: 32, width: Dimensions.get('window').width * 0.533 * 0.5, margin: 8, borderRadius: 16 }} />
							<View style={{ height: 32, width: Dimensions.get('window').width * 0.533 * 0.5, margin: 8, borderRadius: 16 }} />
							<View style={{ height: 32, width: Dimensions.get('window').width * 0.533 * 0.5, margin: 8, borderRadius: 16 }} />
						</View>
					</View>
				</View>
			</SkeletonPlaceholder>
		</View>);
	}));

};
export default SocialFeedSkeleton;