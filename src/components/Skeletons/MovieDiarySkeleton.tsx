import React from 'react';
import { View, Dimensions, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AppColors from 'utils/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'utils/Dimensions';

const range = (end, start = 1, step = 1) => {
	return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
}

const MovieDiarySkeleton = ({ rows }) => {

	return (range(rows).map((item) => {
		return (<View style={styles.container} key={item}>
			<SkeletonPlaceholder backgroundColor={AppColors.BLACK_VARIANT3} speed={4} >
				<View style={{padding: 16}}>
						<View style={styles.month} />
						<View style={styles.date} />
						<View style={styles.item} />
						<View style={styles.item} />
				</View>
			</SkeletonPlaceholder>
		</View>);
	}));

};


const styles = StyleSheet.create({
	container: { 
		height: 350
	},
	month: { 
		height: 24, 
		width: 114,  
		borderRadius: 4 
	},
	item: { 
		height: 120, 
		marginBottom: 20, 
		width: SCREEN_WIDTH  - 54, 
		borderRadius: 5, 
		marginLeft: 20, 
		marginRight: 5 
	},
	date: { 
		height: 20, 
		width: 54, 
		marginTop: 14, 
		borderRadius: 5, 
		marginBottom: 8 
	},
})

export default MovieDiarySkeleton;