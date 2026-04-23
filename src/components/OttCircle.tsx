import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import CommonStyles from "../../Styles";
import AppColors from "utils/Colors";
import { CLOUD_BASEURL } from "utils/HelperFunctions";
import FontFamily from "utils/FontFamily";
import Theatre from 'svg/theatreNew.svg';
import Tick from '../icons/Tick';

export type OttCircleProps = {
  ottClicked: any,
  otts: any,
  showNames: any
};

export const OttCircle: FC<OttCircleProps> = ({
  ottClicked,
  otts,
  showNames = true
}) => {

  return (
    <>
    {
      otts?.map((item: any) => {
        return (
          <TouchableOpacity style={styles.ottView} onPress={() => ottClicked(
            item?.name,
            item?.category
          )}>
              <View style={CommonStyles.alignCenter}>
                <View style={styles.iconWrapper}>
                  {item.selected && (
                    <View style={styles.tickWrapper}>
                      <View style={styles.tickBadge}>
                        <Tick height={9} width={9} color={AppColors.BLACK} strokeWidth="2.5" />
                      </View>
                    </View>
                  )}
                  {item?.code === 'theatre' ? (
                    <View style={[styles.icon, styles.theatreIcon,
                      item.selected && {borderColor: AppColors.LIGHT_YELLOW, borderWidth: 2}
                    ]}>
                      <Theatre height={30} width={30} />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: CLOUD_BASEURL + item.logoName}}
                      fadeDuration={0}
                      style={[styles.icon,
                      item.selected && {borderColor: AppColors.LIGHT_YELLOW, borderWidth: 2}
                    ]}
                    />
                  )}
                </View>
                {showNames && <Text numberOfLines={1} style={styles.ottName}>{item.name == "Amazon Prime Video"? "Amazon":item.name}</Text>}
              </View>
          </TouchableOpacity>
      )
    })
    }
  </>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginBottom: 2
  },
  tickWrapper: {
    position: 'absolute',
    top: 0,
    left: -2,
    zIndex: 2,
  },
  tickBadge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: AppColors.LIGHT_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theatreIcon: {
    backgroundColor: AppColors.BLACK_VARIANT3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ottView: {
    marginRight: 24,
    marginBottom: 22,
  },
  ottName: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE,
    maxWidth: 55,
    textAlign: 'center'
  }
});