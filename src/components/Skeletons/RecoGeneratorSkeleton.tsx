import CommonStyles from '../../../Styles';
import React from 'react';
import { View, Dimensions, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AppColors from 'utils/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';

const RecoGeneratorSkeleton = ({ rows }) => {

	return (
		<View style={styles.container}>
			<SkeletonPlaceholder backgroundColor={AppColors.BLACK_VARIANT3} speed={4} >
				<View style={{paddingHorizontal: 16}}>
					<View style={[CommonStyles.rowAlignCenter]}>
						{Array.from({ length: 4 }, (_, index) => (
							<View style={styles.topSection} />
						))}
					</View>
					<View style={styles.mainCard} />
					<View style={styles.title} />
					<View style={styles.bar} />
					<View style={styles.bar} />
					<View style={styles.bar} />
					<View style={styles.reviewsTitle} />
					<View style={styles.reviews} />
				</View>
				<View style={styles.bottomBtn} />
			</SkeletonPlaceholder>
		</View>
	);
};


const styles = StyleSheet.create({
	container: { 
		height: SCREEN_HEIGHT,
		alignItems: 'center',
		width: SCREEN_WIDTH,
		flex: 1
	},
	topSection: { 
		height: scaledWidth(74), 
		width: scaledWidth(74),
		marginHorizontal: 3,
		borderRadius: 4 
	},
	mainCard: {
	 height: SCREEN_HEIGHT * 0.23,
	 width: SCREEN_WIDTH - 32,
	 marginTop: 26,
	 borderRadius: 10,
	 borderWidth: 0.6,
	 borderColor: AppColors.GREY,
	 backgroundColor: AppColors.TRANSPARENT,
	},
	bottomBtn: { 
		height: 40, 
		marginBottom: 20, 
		width: SCREEN_WIDTH  - 32, 
		marginTop: 26,
		alignSelf: 'center',
		borderRadius: 10,
	},
	hiddenCard: { 
		height: SCREEN_HEIGHT * 0.4, 
		width: 24, 
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10
	},
	hiddenCardRight: {
		height: SCREEN_HEIGHT * 0.4, 
		width: 24, 
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10
	},
	title: {
		width: SCREEN_WIDTH * 0.3,
		height: 30,
		marginVertical: 10,
		borderRadius: 4
	},
	bar: {
		width: SCREEN_WIDTH - 32,
		height: 30,
		marginVertical: 4,
		borderRadius: 4
	},
	reviewsTitle: {
		width: SCREEN_WIDTH * 0.3,
		marginVertical: 10,
		height: 30,
	},
	reviews: {
		height: SCREEN_HEIGHT * 0.13,
		width: SCREEN_WIDTH - 32
	}
})

export default RecoGeneratorSkeleton;