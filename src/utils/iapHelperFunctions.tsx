import { Platform } from "react-native";
import Config from "react-native-config";
import Purchases from "react-native-purchases";

  
  // add custom user id for revenue cat user identification
  export const purchasesLogin = async (userId: string) => {
    if(Platform.OS == 'ios'){
        try {
            await Purchases.logIn(userId);
          } catch (e) {
            console.log({e})
            //Alert.alert('Error identifying user', e.message);
          }
    }
  };


  // add user attributes for iap
  export const setUserAttributes = (data: any, userId: any, phoneNumber: any) => {
    if(Platform.OS == 'ios'){
        try {
            Purchases.setAttributes({
                "userId": userId,
                "displayName" : data?.fname ?? '', 
                "email" : data?.email ?? '',
                "phoneNumber": phoneNumber
            });
        }
        catch(e){
        console.log({e})
        }
    }
  }

  // return all offers
  export const getIAPOffers = async() => {
    try {
      const offerings = await Purchases.getOfferings();
      let bothPackages = [];
      if(Config.ENV == 'Dev'){
        if(offerings?.all?.rbp_299_q !== null && offerings?.all?.rbp_299_q?.availablePackages?.length !== 0){
          bothPackages[0] = offerings?.all?.rbp_299_q?.availablePackages[0];
        }
        if(offerings?.all?.rbp_999_y !== null && offerings?.all?.rbp_999_y?.availablePackages?.length !== 0){
          bothPackages.push(offerings?.all?.rbp_999_y?.availablePackages[0])
        }
      }
      else {
        if(offerings?.all?.rb_299_q !== null && offerings?.all?.rb_299_q?.availablePackages?.length !== 0){
          bothPackages[0] = offerings?.all?.rb_299_q?.availablePackages[0];
        }
        if(offerings?.all?.rb_999_y !== null && offerings?.all?.rb_999_y?.availablePackages?.length !== 0){
          bothPackages.push(offerings?.all?.rb_999_y?.availablePackages[0])
        }
      }
      return bothPackages?.slice();
      
    } catch (e) {
        console.log({e})
    }
    
  }