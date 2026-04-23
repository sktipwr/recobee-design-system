import Config from "react-native-config";
import mixpanel from "mixpanel";
import Toast from 'react-native-toast-message';
import {
    Share as Shared,
    Platform,

} from 'react-native';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import { socialShareLink } from "./HelperFunctions";

export const shareClicked = async (selectedMovie: any) => {
   
    let shareContent = null;
    let shareOptions = null;

    let url =
      `https://` +
      Config.ROOT_URL +
      `/movie/` +extractYear(selectedMovie.releasedate) + `/`+ formatTitleForUrl(selectedMovie.title)+ `/review/` +
      selectedMovie?.postid.substring(6);
    let reviewLength = selectedMovie?.reviewcomment?.length;
    let trimLength = 0;
    let shareMessage = '';
    if (reviewLength % 2 == 0) {
      trimLength = reviewLength / 2;
    } else {
      trimLength = (reviewLength + 1) / 2;
    }

    if (reviewLength < 280) {
      trimLength = reviewLength;
      shareMessage =
        `Checkout Review of '` +
        selectedMovie?.moviename +
        `'` +
        ` on RecoBee\n\n` +
        selectedMovie?.reviewcomment?.substring(0, trimLength) +
        `\n\n\Continue Reading it on RecoBee, open the App now: ` +
        url;
    } else {
      shareMessage =
        `Checkout Review of '` +
        selectedMovie?.moviename +
        `'` +
        ` on RecoBee\n\n` +
        selectedMovie?.reviewcomment?.substring(0, trimLength) +
        `..\n\n\To Finish reading the Review, Click: ` +
        url;
    }

    if (Platform.OS == 'ios') {
      shareContent = {
        message: shareMessage,
      };
      shareOptions = {
        subject: selectedMovie?.moviename + ' Review',
      };
    } else {
      shareContent = {
        message: shareMessage,
      };

      shareOptions = {
        dialogTitle: 'Check the Review on RecoBee App',
      };
    }
    //setSharingModalVisibility(true);
    Shared.share(shareContent, shareOptions);
  };
  // function to format the title to lower-case and - separated 
  const formatTitleForUrl = title =>
    title.toLowerCase().replace(/\s+/g, '-');
    // to extract only the year out of the releasdate string 
  const   extractYear = str => {
      const match = str.match(/\d{4}/);
      return match ? match[0] : '';
    };
  export const shareToInstaChats = async (selectedMovie: any, isWhatsApp : any) => {
    let url =
      `https://` +
      Config.ROOT_URL +
      `/movie/` +extractYear(selectedMovie.releasedate) + `/`+ formatTitleForUrl(selectedMovie.title)+ `/review/` +
      selectedMovie?.postid.substring(6);
    let reviewLength = selectedMovie?.reviewcomment?.length;
    let trimLength = 0;
    let shareMessage = '';
    if (reviewLength % 2 == 0) {
      trimLength = reviewLength / 2;
    } else {
      trimLength = (reviewLength + 1) / 2;
    }

    if (reviewLength < 280) {
      trimLength = reviewLength;
      shareMessage =
        `Checkout Review of '` +
        selectedMovie?.moviename +
        `'` +
        ` on RecoBee\n\n` +
        selectedMovie?.reviewcomment.substring(0, trimLength) +
        `\n\n\Continue Reading it on RecoBee, open the App now: ` +
        url;
    } else {
      shareMessage =
        `Checkout Review of '` +
        selectedMovie?.moviename +
        `'` +
        ` on RecoBee\n\n` +
        selectedMovie?.reviewcomment.substring(0, trimLength) +
        `..\n\n\To Finish reading the Review, Click: ` +
        url;
    }
    socialShareLink(isWhatsApp, shareMessage)

  };

  export const copyLinkClicked = (selectedMovie:any) => {
    Clipboard.setString(
      `https://` +
      Config.ROOT_URL +
      `/movie/` +extractYear(selectedMovie.releasedate) + `/`+ formatTitleForUrl(selectedMovie.title)+ `/review/` +
      selectedMovie?.postid?.substring(6)
    );
    linkCopiedToast();
  };

  export const linkCopiedToast = () => {
    Toast.show({
      type: 'beeToast',
      text1: 'Link copied to clipboard',
      visibilityTime: 2000,
      position: 'top',
      autoHide: true,
    });
  }