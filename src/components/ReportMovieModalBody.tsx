import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Checkbox } from "react-native-paper";

interface ReportMovieModalBodyParams {
    reportClicked: () => any,
    otherSelected: (value: any) => any,
    reportReasons: any,
    subTitle: string
}

export const ReportMovieModalBody: React.FC<ReportMovieModalBodyParams> = ({
    reportClicked,
    otherSelected,
    reportReasons,
    subTitle = StringConstants.SELECT_REASON_FOR_REPORTING
    }) => 
    {
        
        const [reasons, setReasons] = useState(reportReasons);
        const [otherReason, setOtherReason] = useState('');

        const reportPressed = () => {
            let reasonFinal = '';
            let isOtherSelected = false;
            reasons.forEach((item) => {
                if (item.selected) {
                    reasonFinal += item.reason + ', ';
                }
                if (item.selected && item.reason == 'Other') {
                    isOtherSelected = true;
                }
            }
            );
            
            if(isOtherSelected){
                reasonFinal += otherReason;
            }
            reportClicked(reasonFinal)

        }

        useEffect(() => {
            const needToReset = reportReasons.some(obj => obj.selected);
            if(needToReset){
                let reasons = reportReasons?.map((value) => {
                    return {
                        ...value,
                        selected: false
                    }
                })
                setReasons(reasons?.slice())
            }
        },[])
        
        const isOtherSelected = () => {
            let isOtherSelected = false;
            reasons.forEach((item) => {
                if (item.selected && item.reason == 'Other') {
                    isOtherSelected = true;
                }
            })
            return isOtherSelected;
        }

    return (
        <AppConsumer>
        {(appConsumer) => (
            <KeyboardAwareScrollView
            style={[
                styles.container,
                
            ]}
            keyboardShouldPersistTaps={'handled'}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            scrollEnabled={true}
            extraScrollHeight={Platform.OS === 'ios' ? 30 : 40}
            showsVerticalScrollIndicator={false}
        >
       
            <Text style={styles.txtHeader}>
                {subTitle}
            </Text>
            
            <FlatList
                data={reasons}
                contentContainerStyle={styles.bottomGap}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Checkbox.Android
                            color={AppColors.LIGHT_YELLOW}
                            uncheckedColor={AppColors.GREY_VARIANT5}
                            status={item.selected ? 'checked' : 'unchecked'}
                            onPress={() => {
                                item.selected = !item.selected;
                                otherSelected(isOtherSelected())
                                setReasons([...reasons]);
                            }}
                        />
                        <Text style={[styles.txtBody, { marginLeft: 8 }]}>{item.reason}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            {isOtherSelected() && 
                <TextInput
                    style={styles.textinput}
                    onChangeText={text => setOtherReason(text)}
                    value={otherReason}
                    multiline={true}
                    placeholderTextColor={AppColors.GREY_VARIANT4}
                    placeholder={StringConstants.FEEL_FREE_TO_DROP_YOUR_REASON_HERE}
                />
            }
            <View style={styles.justifyCenter}>
                <TouchableOpacity style={styles.btnprimary} onPress={() => reportPressed()}>
                    <Text style={[styles.txtBody, styles.btnText]}>
                        {StringConstants.REPORT}
                    </Text>
                </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        )}
        </AppConsumer>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        marginTop: 10,
        paddingHorizontal: 16,
        backgroundColor: AppColors.GREY_VARIANT8, 
        flex: 1 
    },
    bottomGap: {  marginBottom: 8 },
    justifyCenter: { justifyContent: 'center' },
    textinput: { 
        height: 150, 
        color: AppColors.WHITE, 
        borderRadius: 8, 
        padding: 16, 
        paddingTop: 12, 
        marginBottom: 24, 
        textAlignVertical: 'top', 
        backgroundColor: AppColors.BLACK_VARIANT4 
    },
    btnText: { 
        color: AppColors.BLACK, 
        fontFamily: FontFamily.DMSansBold
    },
    btnprimary: {
        backgroundColor: AppColors.LIGHT_YELLOW,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: '100%'
    },
    txtHeader: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color:  AppColors.WHITE_VARIANT3,
        marginBottom: 16
    },
    txtBody: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.WHITE
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8
    }
});
