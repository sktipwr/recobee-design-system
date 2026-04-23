import React from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SCREEN_WIDTH, scaledHeight } from "utils/Dimensions";
import AppColors from "utils/Colors";

const ListCoverPicSkeleton = ({}) => {

    return (
    <SkeletonPlaceholder highlightColor={AppColors.GREY}  backgroundColor={AppColors.GREY_VARIANT6} borderRadius={4} speed={800} >
        <SkeletonPlaceholder.Item
          width={SCREEN_WIDTH}
          height={scaledHeight(115)}
          borderRadius={2}
          alignSelf="center"
          position="relative"
        />
        
      </SkeletonPlaceholder>);

};
export default ListCoverPicSkeleton;

