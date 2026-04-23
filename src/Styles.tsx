import { Dimensions, Platform, StyleSheet } from "react-native";
import { Dark } from "./Themes.js";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { SCREEN_WIDTH, scaledHeight, scaledWidth,SCREEN_HEIGHT } from "utils/Dimensions";

const Colors = Dark.colors;

const CommonStyles = StyleSheet.create({
  containerWithFlex: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  tabBarStyle: {
    display: 'flex',
    backgroundColor: AppColors.BLACK_VARIANT6,
    borderTopWidth: 0,
  },
  alignCenter: {
    alignItems: 'center'
  },
  flexOneCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexOne: {flex: 1},
  absolute: {
    position: 'absolute'
  },
  relativeCenterAlign: {
    position: 'relative', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  container: {
    backgroundColor: Colors.primary,
  },
  headerRightStyle: {
    height: 48,
    width: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.GREY_VARIANT2,
  },
  suggestionsContainer: { maxHeight: 300, position: 'relative' },
  searchHeaderStyle: {
    backgroundColor: AppColors.BLACK,
    elevation: 0,
    height: Platform.OS == 'ios' ? Dimensions.get("window").width * 0.29 : 75,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  cancelText: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    color: AppColors.WHITE
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRowAlignCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userBadge: { 
    marginLeft: 1, 
    padding: 3 
  },
  alignCentre: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  flexDirRow: {
    flexDirection: "row",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  txtBodySmall: {
    fontSize: 10,
    fontFamily: "DMSans-Regular",
    color: Colors.text,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowJustifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtBodyMedium: {
    fontSize: 12,
    fontFamily: "DMSans-Regular",
    color: Colors.text,
  },
  fullWidth: {width: '100%'},
  txtBodyLarge: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: Colors.text,
  },
  txtBodyXL: {
    fontSize: 16,
    fontFamily: "DMSans-Regular",
    color: Colors.text,
  },
  txtBodyXXL: {
    fontSize: 24,
    fontFamily: "DMSans-Regular",
    color: Colors.text,
  },
  txtCentre: {
    textAlign: "center",
  },
  txtHeaderSmall: {
    fontSize: 10,
    fontFamily: "DMSans-Bold",
    color: Colors.text,
  },
  txtHeaderMedium: {
    fontSize: 12,
    fontFamily: "DMSans-Bold",
    color: Colors.text,
  },
  txtHeaderMediumLink: {
    fontSize: 12,
    fontFamily: "DMSans-Bold",
    color: Colors.clientPrimary,
  },
  txtHeaderSmallLink: {
    fontSize: 10,
    fontFamily: "DMSans-Bold",
    color: Colors.clientPrimary,
  },
  txtHeaderLarge: {
    fontSize: 14,
    fontFamily: "DMSans-Bold",
    color: Colors.text,
  },
  txtHeader: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
    color: Colors.text,
  },
  videoPlayer: {
    top: 0,
    height: 70,
    width: "100%",
    position: "absolute",
  },
  movieOTT: {
    width: 18,
    height: 18,
  },
  imgDimensions: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemTitle: {
    fontFamily: "DMSans-Bold",
    fontSize: 12,
    paddingRight: 5,
    color: Dark.colors.white,
  },
  socialCard: {
    fontSize: 10,
    opacity: 0.6,
    marginLeft: 6,
  },
  alignJustifyCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  paddingMedium: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  boldTxt: {
    fontSize: 14,
    fontFamily: "DMSans-Bold",
  },
  padRight12: {
    paddingRight: 12,
  },
  txtColor: {
    color: Dark.colors.text,
  },
  primaryColor: {
    color: Dark.colors.primary,
  },
  grey5: {
    color: Dark.colors.grey5,
  },
  flexWrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  maxWidth: {
    maxWidth: 220,
  },
  marginRight5: {
    marginRight: 5,
  },
  containerColor: {
    backgroundColor: Dark.colors.primary,
    borderBottomColor: Dark.colors.placeholder,
  },
  alignFlex: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  clientText13: {
    fontFamily: "DMSans-Bold",
    fontSize: 13,
    color: Dark.colors.clientPrimary,
  },
  flexEnd: {
    flex: 1,
    alignItems: "flex-end",
  },
  padTop3: {
    paddingTop: 3,
  },
  dp: {
    width: 36,
    height: 36,
    borderRadius: 30,
  },
  profileDP: {
    width: SCREEN_WIDTH* 0.232,
    height: SCREEN_WIDTH * 0.232,
    borderRadius: 70,
  },
  opacity6: {
    opacity: 0.6,
  },
  grey9: {
    color: Colors.grey9,
  },
  grey9BG: {
    backgroundColor: Colors.grey9,
  },
  feedSeparator: {
    marginVertical: 18
  },
  txtBodyReply: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansRegular,
    opacity: 0.8,
    color: AppColors.GREY_VARIANT10,
    marginLeft: 6
  },
  modalHoldBar: {
    width: 48,
    height: 4,
    marginBottom: scaledHeight(12),
    marginTop: scaledHeight(14),
    borderRadius: 8,
    backgroundColor: AppColors.GREY_VARIANT11,
    alignSelf: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FontFamily.DMSansBold,
    marginBottom: scaledHeight(12),
  },
  pointersText: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular
  },
  headerBackStyle: {
    height: 32,
    width: 32,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 16,
    justifyContent: 'center',
    backgroundColor: AppColors.GREY_VARIANT6
  },
  circularImageContainer: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 56,
    borderColor: AppColors.LIGHT_YELLOW,
    overflow: "hidden",
  },
  mediumCircularImageContainer: {
    marginTop: 20,
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  mediumCircularImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  leaderTag: {
    color: AppColors.GREY_VARIANT4, // Font color for leader tag
    fontSize: 10,
    fontFamily: FontFamily.DMSansRegular,
  },
  followButton: {
    marginTop: 8,
    padding: 8,
    borderRadius: 5,
    marginLeft: "auto",
  },
  followButtonTop: {
    marginTop: 8,
    padding: 8,
    borderRadius: 5,
  },
  followButtonText: {
    color: AppColors.LIGHT_YELLOW,
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
  },
  followingButtonText: {
    color: AppColors.GREY_VARIANT9,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
  },
  rankPillTop: {
    backgroundColor: AppColors.GREY_VARIANT15,
    color: AppColors.BLACK, // Font color for rank pill
    overflow: "hidden",
    fontFamily: FontFamily.DMSansRegular,
    textAlign: "center",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT15,
    borderRadius: 10, // Adjust the value to shape the pill as desired
    position: "absolute",
    height: 20,
    top: 70,
    marginRight: "auto",
    marginLeft: "auto",
  },
  leaderName: {
    color: AppColors.WHITE_VARIANT, // Font color for leader name
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
  },
  listView: {
    color: AppColors.LIGHT_YELLOW, // Font color for leader name
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
  },
  timelineBar: {
    width: 0.4, 
    height: '100%',
    backgroundColor: AppColors.GREY_VARIANT4, 
    
  },
  timelineMovieContainer: { 
    paddingLeft: 16, 
    paddingBottom: 16, 
    paddingRight: 16, 
    paddingTop: 8 
  },
  whiteBold20: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 20
  },
  timelineHeader: {
    color: AppColors.GREY_VARIANT10,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 10
  },
  timelineCollapseArrow: {
    transform: [{ rotate: '180deg'}]
  },
  timelineDate: {
    color: AppColors.GREY_VARIANT10,
    fontSize: 10, 
    fontFamily: FontFamily.DMSansRegular
  },
  timelineMonth: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 14, 
    fontFamily: FontFamily.DMSansRegular
  },
  paddingHorizontal16: {
    paddingHorizontal: 16
  },
  marginHorizontal16: {
    marginHorizontal: 16
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: AppColors.GREY_VARIANT6,
    borderColor: AppColors.GREY_VARIANT1
  },
  radioCheck: {
    height: 20,
    width: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.LIGHT_YELLOW
  },
  screenHeading: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginLeft: 16
  },
  backHeaderStyle: {
    backgroundColor: AppColors.GREY_VARIANT12,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 22,
  },
  footerFeedOverMsgTxt: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14,
  },
  footerLoaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loaderText: {
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14,
  },
  rowFlexEnd: {
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  verticalBar: {
    width: 1, 
    marginHorizontal: 12, 
    marginTop: 1 ,
    marginBottom: 5
  },
  subTitleView: {
    width: SCREEN_WIDTH * 0.82, 
    marginBottom: 12
  },
  descriptionTxt: {
    color: AppColors.GREY_VARIANT4, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 12,
    width: SCREEN_WIDTH * 0.72,
  },
  subTitle: {
    color: AppColors.WHITE_VARIANT, 
    width: SCREEN_WIDTH * 0.72,
    fontFamily: FontFamily.DMSansBold, 
    fontSize: 16,
  },
  offerImage: {
    height: 78, 
    borderRadius: 3, 
    marginTop: 8
  },
  offerCardStyle: {
    backgroundColor: AppColors.GREY_VARIANT8, 
    borderRadius: 8, 
    paddingHorizontal: 13, 
    paddingVertical: 16,
    width: '100%',
    marginLeft: 10
  },
  rewardTitle: {
    color: AppColors.LIGHT_YELLOW, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14,
    marginLeft: 9
  },
  margin7: {
    margin: 7
  },
  horizontalLine: {
    width: '100%', 
    backgroundColor: AppColors.GREY_VARIANT5, 
    height: 0.5
  },
  modalTopRadius: {
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
  flexRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerRightBtn: {
    height: 48,
    width: 48,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: AppColors.BLACK_VARIANT3
  },
  bottomAdView: {
    paddingHorizontal: 16, 
    width: '100%', 
    marginBottom: 20, 
    alignItems: 'center'
  },
  rowAlignBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buySubscription: {
    color: AppColors.WHITE_VARIANT3, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14,
  },
  planDescription: {
    color: AppColors.LIGHT_YELLOW_VARIANT3, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14,
  },
  graphTopLabel: {
    color: AppColors.GREY_VARIANT9, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 10
  },
  paymentModalContainer: {
    alignItems: 'center', 
    marginTop: 10,
  },
  paymentStatus: {
    color: AppColors.ERROR_RED, 
    fontFamily: FontFamily.DMSansBold, 
    fontSize: 16,
    marginBottom: 6, 
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold
  },
  premiumListContainer: { 
    borderTopWidth: 0, 
    borderTopColor: AppColors.GREY_VARIANT1,
  },
  benefitsContainer: {
    width: '100%',
    borderRadius: 8, 
    padding: 16, 
    backgroundColor: AppColors.THEME_BG_COLOR,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  benefits: {
    color: AppColors.WHITE_VARIANT3,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    marginBottom: 20
  },
  premiumAmount: {
    color: AppColors.WHITE_VARIANT2, 
    fontFamily: FontFamily.DMSansBold, 
    fontSize: 20,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 40, 
    right: 16, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: AppColors.LIGHT_YELLOW, 
    height: 56, 
    width: 56 
  },
  ottImgContainer: {
    height: 18,
    width: 18,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  ottImg: {
    width: 18,
    height: 18,
  },
  txtImage: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE
  },
  status: {
    color: AppColors.GREY_VARIANT15,
    fontSize: 10,
    fontFamily: FontFamily.DMSansRegular
  },
  inputSectionStyle: {
    height: 40,
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 18,
  },
  streakCardContainer: {
    width: SCREEN_WIDTH - 32, 
    height: scaledWidth(128),
    overflow: 'hidden',
    borderRadius: 7,
    backgroundColor: AppColors.THEME_BG_COLOR
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
  },
  successTick: {
    height: 26,
    width: 26,
    borderRadius: 26,
    backgroundColor: AppColors.GREEN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ottContainer: {
    width: 22,
    height: 22,
    borderRadius: 4.5,
    backgroundColor: AppColors.GREY_VARIANT6,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  shadowStyle: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: AppColors.BLACK,
    shadowOpacity: 0.4,
    elevation: 3
  },  
  errorText: {
    fontSize: 12,
    color: AppColors.ERROR_RED,
    fontFamily: FontFamily.DMSansRegular,
  },
  errorBorder: {
    borderColor: AppColors.ERROR_RED, 
    borderWidth: 1
  },
  graphBottomLabel: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4, 
    marginLeft: 3
  },
  alignSelfCentre: {
    alignSelf: 'center'
  }
});

export default CommonStyles;
