import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Like from 'icons/Like';
import Dislike from 'icons/Dislike';
import EncryptedStorage from 'react-native-encrypted-storage';
import mixpanel from 'mixpanel';
import Toast from 'react-native-toast-message';
import userProfileAPI from 'api/userProfileAPI';
import StringConstants from 'utils/StringConstants';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';

interface FeedbackComponentProps {
  // Core props
  isVisible: boolean;
  onFeedbackSubmit: (isLiked: boolean) => void;
  onHide: () => void;
  
  // Content props
  question: string;
  screen: string;
  userid?: string;
  username?: string;
  
  // Additional content (optional)
  additionalContent?: React.ReactNode;
  
  // Feedback type for different behaviors
  feedbackType: 'weekly_list' | 'search_results';
  
  // For search results - search term
  searchTerm?: string;
  
  // For weekly list - list ID
  listId?: string;
}

export const FeedbackComponent: React.FC<FeedbackComponentProps> = ({
  isVisible,
  onFeedbackSubmit,
  onHide,
  question,
  screen,
  userid,
  username,
  additionalContent,
  feedbackType,
  searchTerm,
  listId,
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showFeedbackView, setShowFeedbackView] = useState(false);
  const [isCheckingFeedback, setIsCheckingFeedback] = useState(true);

  // Helper function to get the start of the week (Friday)
  const getWeekStart = useCallback((date: Date) => {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    const daysToSubtract = (dayOfWeek + 2) % 7; // Calculate days to subtract to get to Friday
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - daysToSubtract);
    weekStart.setHours(0, 0, 0, 0); // Set to start of day
    return weekStart;
  }, []);

  // Check if feedback should be shown based on type
  const shouldShowFeedback = useCallback(async () => {
    if (!isVisible) return false;

    try {
      if (feedbackType === 'weekly_list') {
        // For weekly list, check if feedback was given this week (Friday to Thursday)
        const lastFeedbackDate = await EncryptedStorage.getItem('weekly_list_feedback_date');
        const currentDate = new Date();
        
        if (lastFeedbackDate) {
          const lastDate = new Date(lastFeedbackDate);
          
          // Get the start of the current week (Friday)
          const currentWeekStart = getWeekStart(currentDate);
          const lastWeekStart = getWeekStart(lastDate);
          
          // If feedback was given in the current week, don't show
          if (currentWeekStart.getTime() === lastWeekStart.getTime()) {
            return false;
          }
        }
        
        // Show feedback if no previous feedback or if it's a new week
        return true;
      } else if (feedbackType === 'search_results') {
        // For search results, check if feedback was given for this specific search
        const lastSearchFeedback = await EncryptedStorage.getItem('search_feedback_given');
        return !lastSearchFeedback || lastSearchFeedback !== searchTerm;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking feedback status:', error);
      return true;
    }
  }, [isVisible, feedbackType, searchTerm, getWeekStart]);

  useEffect(() => {
    const checkFeedbackStatus = async () => {
      const shouldShow = await shouldShowFeedback();
      setShowFeedbackView(shouldShow);
      setIsCheckingFeedback(false);
    };
    
    checkFeedbackStatus();
  }, [shouldShowFeedback]);

  const handleFeedbackSubmit = useCallback(async (isLiked: boolean) => {
    try {
      // Track feedback in Mixpanel
      const eventName = feedbackType === 'weekly_list' 
        ? (isLiked ? StringConstants.USER_LIKED_THE_LIST : StringConstants.USER_DONT_LIKED_THE_WEEKLY_LIST)
        : 'Search_Results_Feedback';
        
      mixpanel.track(eventName, {
        screen: screen,
        userid: userid,
        username: username,
        feedback: isLiked ? 'liked' : 'disliked',
        ...(feedbackType === 'search_results' && { searchTerm }),
        ...(feedbackType === 'weekly_list' && { listId }),
      });

      // Call appropriate API based on feedback type
      if (feedbackType === 'weekly_list') {
        await userProfileAPI.insertUserFeedback(
          StringConstants.USER_LIKED_THE_WEEKLY_LIST_FEEDBACK,
          new Date().toISOString()
        );
        
        // Store feedback date for weekly list
        await EncryptedStorage.setItem('weekly_list_feedback_date', new Date().toISOString());
      } else if (feedbackType === 'search_results') {
        await userProfileAPI.insertUserFeedback(
          searchTerm + ' -- ' + (isLiked ? 'Yes' : 'No'),
          new Date().toISOString()
        );
        
        // Store that feedback was given for this search
        await EncryptedStorage.setItem('search_feedback_given', searchTerm || '');
      }

      // Show thank you message
      Toast.show({
        type: 'beeToast',
        text1: StringConstants.THANK_YOU_FOR_FEEDBACK,
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });

      // Update state
      setFeedbackSubmitted(true);
      setShowFeedbackView(false);
      
      // Call parent callback
      onFeedbackSubmit(isLiked);
      onHide();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  }, [feedbackType, screen, userid, username, searchTerm, listId, onFeedbackSubmit, onHide]);

  // Don't render if not visible, still checking, feedback already submitted, or shouldn't show
  if (!isVisible || isCheckingFeedback || !showFeedbackView || feedbackSubmitted) {
    return null;
  }

  return (
    <View style={styles.feedbackContainer}>
      <View style={styles.feedbackLeftContainer}>
        <Text style={styles.feedbackText}>
          {question}
        </Text>
        {additionalContent}
      </View>
      <View style={styles.feedbackRightCont}>
        <TouchableOpacity
          onPress={() => handleFeedbackSubmit(true)}
          style={styles.feedbackOptionsTxt}
        >
          <Like />
          <Text style={[styles.feedbackText, styles.feedbackOptionText]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeedbackSubmit(false)}
          style={styles.feedbackOptionsTxt}
        >
          <Dislike />
          <Text style={[styles.feedbackText, styles.feedbackOptionText]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackContainer: {
    flexDirection: 'row',
    padding: 9,
    borderTopWidth: 1,
    borderTopColor: '#393939',
  },
  feedbackLeftContainer: {
    flex: 1,
    paddingRight: 16,
  },
  feedbackText: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 13,
    alignItems: 'flex-end',
    lineHeight: 20,
    color: '#E0E0E0',
  },
  feedbackRightCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 4,
  },
  feedbackOptionsTxt: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  feedbackOptionText: {
    fontSize: 9,
  },
});

export default FeedbackComponent;
