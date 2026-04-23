import React, {  } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import DoneView from './Common/DoneView';
import { RoundedBtn } from './Common/RoundedBtn';
import { scaledWidth } from 'utils/Dimensions';

interface WatchlistModalBodyParams {
    scheduleMovie: () => any,
}

export const WatchlistModalBody: React.FC<WatchlistModalBodyParams> = ({
    scheduleMovie
    }) => 
    {

    return (
        <AppConsumer>
        {(appConsumer) => (
            <View style={styles.container}>
                <DoneView bgColor={AppColors.LIGHT_YELLOW} />
                <Text style={styles.added}>{StringConstants.MOVIE_ADDED_TO_WATCHLIST}</Text>
                <Text style={styles.scheduleDesc}>{StringConstants.SCHEDULE_WATCHLIST_DESCRIPTION}</Text>
                <RoundedBtn
                    text={StringConstants.SCHEDULE_WHEN_TO_WATCH}
                    textColor={AppColors.LIGHT_YELLOW}
                    onClick={() => scheduleMovie()} 
                    borderRadius={8} 
                    borderColor={AppColors.GREY_VARIANT6}
                    width={scaledWidth(214)}
                    bgColor={AppColors.GREY_VARIANT6}
                />
            </View>
        )}
        </AppConsumer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 20
    },
    added: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE_VARIANT3,
        marginTop: 12,
    },
    scheduleDesc: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
        marginTop: 2,
        textAlign: 'center',
        marginBottom: 20
    }
    
});
