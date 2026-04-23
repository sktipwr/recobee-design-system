import Toast from "react-native-toast-message";
import mixpanel from 'mixpanel';
import watchlistAPI from "api/watchlistAPI";

export const removeFromWatchlistApi = async(movieID, source, screenName) => {
    mixpanel.track('Remove_Watchlist', {
        screen: screenName,
        movieID: movieID,
        source: source,
      });
      watchlistAPI.removeItemFromWatchlist(movieID);
      Toast.show({
        text1: 'Removed from your watchlist',
        type: 'beeToast',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });
}

export const addToWatchlistApi = async(movieID, source, screenName) => {
    mixpanel.track('Add_Watchlist', {
        screen: screenName,
        movieID: movieID,
        source: source,
    });
    watchlistAPI.addItemToWatchlist(movieID, '1', 'Reco');
    Toast.show({
        text1: 'Added to your watchlist',
        type: 'beeToast',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
    });
}