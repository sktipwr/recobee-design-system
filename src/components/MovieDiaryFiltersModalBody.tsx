import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity} from 'react-native';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import CommonStyles from '../../Styles';
import StringConstants from 'utils/StringConstants';
import mixpanel from 'mixpanel'
import { RoundedBtn } from './Common/RoundedBtn';
import { AdvanceFiltersView } from './Common/AdvanceFiltersView';

export const MovieDiaryFiltersModalBody: React.FC = ({filtersData, updateFilters}) => 
    {
    
    const [filterValues, setFilterValues] = useState([])

    const filterValuesRef = useRef(filterValues)

    useEffect(() => {
      setFilterValues(filtersData?.slice())
    },[filtersData])

    useEffect(()=> {
        filterValuesRef.current = filterValues;
    }, [filterValues])

    // on select filter
    const chipClicked = (item, category) => {
        mixpanel.track('FilterClicked', {
          screen: 'MovieDiaryScreen',
          source: 'chip',
        });
        let flag = false;
        let ds = filterValues.map((itm) => {
          if (itm.category === category) {
            itm.items = itm.items.map((el) => {
              if (el.name == item) {
                el.selected = !el.selected;
              }
              else {
                el.selected = false
              }
              return  el;
            });
          }
          itm.items.filter((el) => el.selected).length && (flag = true);
          return itm;
        });
        setFilterValues(ds);
    };
    
    //reset filters data
    const resetFilter = () => {
        updateFilters(filterValues?.slice(), true)
    }

    // filters applied
    const applyFilters = () => {
      updateFilters(filterValues?.slice(), false)
    }

    return (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
          <TouchableOpacity activeOpacity={1}>
            {filterValues?.length > 0 ?
                <AdvanceFiltersView filterValues={filterValues} showSeenToggle={false} chipClicked={chipClicked}  />
              : null
            }
            </TouchableOpacity>
          </ScrollView>
          <View
                style={[CommonStyles.rowSpaceBetween, {marginTop: 10, marginBottom: 20}]}
              >
                    <RoundedBtn
                        text={StringConstants.RESET} 
                        textColor={AppColors.LIGHT_YELLOW}
                        onClick={() => resetFilter()} 
                        borderRadius={8} 
                        width={SCREEN_WIDTH * 0.45}
                        borderColor={AppColors.LIGHT_YELLOW}
                        bgColor={AppColors.TRANSPARENT}
                    />
                  <RoundedBtn
                        text={StringConstants.APPLY_FILTER} 
                        textColor={AppColors.BLACK}
                        onClick={() => applyFilters()} 
                        borderRadius={8} 
                        width={SCREEN_WIDTH * 0.45}
                        borderColor={AppColors.LIGHT_YELLOW}
                        bgColor={AppColors.LIGHT_YELLOW}
                    />
                </View>

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    paddingHorizontal: 16
  },
  scrollView: {
    width: '100%', 
    paddingBottom: 20
  },
  text: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
    marginTop: 21
  },
  header: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.GREY_VARIANT2
  }
  
});
