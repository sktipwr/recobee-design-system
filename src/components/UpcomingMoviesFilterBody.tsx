import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import CommonStyles from '../../Styles';
import StringConstants from 'utils/StringConstants';
import mixpanel from 'mixpanel'
import { RoundedBtn } from './Common/RoundedBtn';
import { AdvanceFiltersView } from './Common/AdvanceFiltersView';

export const UpcomingMoviesFilterBody: React.FC = ({filtersData, setFiltersData, applyFilterPressed}) => 
    {
    
    const [filterValues, setFilterValues] = useState([])

    const filterValuesRef = useRef(filterValues)
    useEffect(() => {
        let data = filtersData.map(item => item);
        setFilterValues(data.slice())
    },[])

    useEffect(()=> {
        filterValuesRef.current = filterValues;
    }, [filterValues])

    const chipClicked = (item, category) => {
        mixpanel.track('FilterClicked', {
          screen: 'AdvanceFiltersModal',
          source: 'chip',
        });
        let flag = false;
        let ds = filterValues.map((itm) => {
          if (itm.category === category) {
            itm.items = itm.items.map((el) => {
              if (el.name == item) {
                el.selected = !el.selected;
              }
              else if(category == 'release_year' || category == 'ratings' || category == 'title'){
                el.selected = false
              }
              return  el;
            });
          }
          itm.items.filter((el) => el.selected).length && (flag = true);
          return itm;
        });
        //setDirty(flag);
        setFilterValues(ds);
    };
    
    const resetFilter = () => {
        let resetData = [];
        // Add elements of array b into array a
        resetData = filterValues.map(obj => {
            return {
                ...obj,
                items: obj?.items?.map((value) => {
                    return {
                        ...value,
                        selected: false
                    }
                })
            }
        });

        setFiltersData(resetData?.slice(), true)
        setFilterValues(resetData?.slice())
    }

    const applyFilters = () => {
      setFiltersData(filterValues?.slice(), false)
      applyFilterPressed(filterValues?.slice())
    }

   

    return (
        <View style={styles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
          <TouchableOpacity activeOpacity={1}>
            {filterValues?.length > 0 ?
               <AdvanceFiltersView showSeenToggle={false} filterValues={filterValues} showUnseen={false} toggleSeen={() => {}} chipClicked={chipClicked}  />
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
                        width={SCREEN_WIDTH * 0.35}
                        borderColor={AppColors.LIGHT_YELLOW}
                        bgColor={AppColors.TRANSPARENT}
                    />
                  <RoundedBtn
                        text={StringConstants.APPLY_FILTER} 
                        textColor={AppColors.BLACK}
                        onClick={() => applyFilters()} 
                        borderRadius={8} 
                        width={SCREEN_WIDTH * 0.35}
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
  label: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.WHITE,
    padding: 4,
  },
  txtBody: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.GREY_VARIANT2
  },
  
});
