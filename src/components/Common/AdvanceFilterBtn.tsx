

import CommonStyles from '../../../Styles';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import AppColors from 'utils/Colors';
import AdvanceFilter from 'icons/AdvanceFilter';

export const AdvanceFilterBtn: React.FC = ({isAdvanceFilterActive, onAdvanceFilterPress, bgColor = AppColors.BLACK_VARIANT3}) => {
  return (
    <TouchableOpacity style={[CommonStyles.headerRightBtn, {justifyContent: 'center', backgroundColor: bgColor}]} onPress={() => onAdvanceFilterPress()}>
        <AdvanceFilter color={isAdvanceFilterActive ? AppColors.LIGHT_YELLOW : AppColors.GREY_VARIANT4} />
    </TouchableOpacity>
  );
};

