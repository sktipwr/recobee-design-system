import userProfileAPI from 'api/userProfileAPI';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import { LOG } from 'config';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import { CLOUD_BASEURL } from 'utils/HelperFunctions';
import FastImage from "react-native-fast-image";


const MeasureElement = ({ onLayout, children }) => (
  <Animated.ScrollView
    horizontal
    style={marqueeStyles.hidden}
    pointerEvents="box-none">
    <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
      {children}
    </View>
  </Animated.ScrollView>
);

const TranslatedElement = ({ index, children, offset, childrenWidth }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [
        {
          translateX: -offset.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const getIndicesArray = (length) => Array.from({ length }, (_, i) => i);

const Cloner = ({ count, renderChild }) => (
  <>{getIndicesArray(count).map(renderChild)}</>
);

const ChildrenScroller = ({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  children,
}) => {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  React.useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse]);

  useFrameCallback((i) => {
    var _a;
    // prettier-ignore
    offset.value += (coeff.value * (((_a = i.timeSincePreviousFrame) !== null && _a !== void 0 ? _a : 1) * childrenWidth)) / duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;
  const renderChild = (index) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}>
      {children}
    </TranslatedElement>
  );

  return <Cloner count={count} renderChild={renderChild} />;
};

const Marquee = ({ duration = 32000, reverse = false, children, style }) => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [childrenWidth, setChildrenWidth] = React.useState(0);

  return (
    <View
      style={style}
      onLayout={(ev) => {
        setParentWidth(ev.nativeEvent.layout.width);
      }}
      pointerEvents="box-none">
      <View style={marqueeStyles.row} pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>
        {childrenWidth > 0 && parentWidth > 0 && (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}>
            {children}
          </ChildrenScroller>
        )}
      </View>
    </View>
  );
};

const marqueeStyles = StyleSheet.create({
  hidden: { opacity: 0, zIndex: -1 },
  row: { flexDirection: 'row', overflow: 'hidden' },
});

export const MarqueeComponent = ({onListClick, data, url, sectionType, movieClicked, userId, watchingNow, moviesTitle, duration, wathingNowFlow = true}) => {

  const durationAlt = !wathingNowFlow ? data?.length * 3000 : duration;
  return (
    <View style={styles.container}>
      <View style={[CommonStyles.rowAlignCenter, styles.spacing]}>
        {wathingNowFlow && <Text style={styles.watchingNow}>{StringConstants.IS_WATCHING_NOW}</Text>}
        <View style={styles.safeArea}>
          <Marquee reverse={true} duration={durationAlt}>
          {wathingNowFlow 
            ?
              <View style={[CommonStyles.flexDirRow, {minWidth: SCREEN_WIDTH * 0.62}]}>
                {
                  moviesTitle?.map((value, index) => {

                    return (
                      <View style={[CommonStyles.rowAlignCenter]}>
                        <Text style={styles.title} onPress={() => movieClicked(watchingNow[index])}>{ `${value}` }{(index + 1) == moviesTitle?.length ? '    ' : ''}</Text>
                        {moviesTitle?.length > 1 && ((index + 1) != moviesTitle?.length) && <View style={styles.separator} />}
                      </View>
                    )
                  })
                }
              </View>
              :
              <View style={[CommonStyles.flexDirRow, {minWidth: SCREEN_WIDTH - 32}]}>
                {data?.map((item, index) => {
                  return (
                    <TouchableOpacity style={[styles.card, styles.borderStyle]} onPress={()=> {onListClick(item, null, null, url, sectionType)}}>
                      <FastImage source={{uri: CLOUD_BASEURL + (item == 'Amazon Prime Video' ? 'Amazon Prime' : item) + '-Home' + '.png'}} resizeMode='cover' style={[styles.image]} />
                    </TouchableOpacity>
                  )
                })
                }
              </View>
          }
          </Marquee>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animatedStyle: {
    position: 'absolute',
  },
  title: {
    fontSize: 12,
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansRegular,
  },
  watchingNow: {
    fontSize: 14,
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansBold,
    marginRight: 10
  },
  spacing: {
    marginRight: 16,
    marginBottom: 16,
    marginTop: 8
  },
  separator: {
    height: 18, 
    width: 1, 
    backgroundColor: AppColors.GREY, 
    marginHorizontal: 8
  },
  card: {
    width: scaledWidth(103),
    height: scaledWidth(75),
    borderRadius: 3, 
    marginRight: scaledWidth(7),
  },
  image: {
    width: scaledWidth(103),
    height: scaledWidth(75),
    borderRadius: 3,
    overflow: 'hidden'
  },
  borderStyle: {
    borderColor: AppColors.GREY,
  }
});

