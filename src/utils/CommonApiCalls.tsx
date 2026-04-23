import communityAPI from "api/communityAPI";
import recommendationsAPI from "api/recommendationsAPI";
import userProfileAPI from "api/userProfileAPI";
import { LOG } from 'config';

export const setReviewImpressionApi = (pk: any, sk: any, extendedLog: any) => {
    recommendationsAPI
      .setReviewImpression(pk, sk)
      .then((response) => {
      })
      .catch((error) => {
        extendedLog.error(
          'Error executing recommendationsAPI.setReviewImpression with message:',
          error
        );
      });
  }

export const adImpressionApi = (impressionData: any) => {
    var extendedLog = LOG.extend('AdImpressionAPI');
    communityAPI.postAdImpressionsApi(impressionData?.type, impressionData?.viewCount, impressionData?.clickCount)
      .then((response) => {
      })
      .catch((error) => {
        extendedLog.error(
            'Error executing communityAPI.postAdImpressionsApi with message:',
            error
          );
      });
  }

//update user meta api, location here
export const updateUserMetaApi = async (locationData: any, extendedLogs: any) => {
  try {
    const metaResponse = await userProfileAPI.updateMetadata(
      {"sk": 'location', "value": JSON.stringify(locationData)}
    );
  }
  catch(error){
    extendedLogs.error('Error updating user meta with message:', error);
  }
}