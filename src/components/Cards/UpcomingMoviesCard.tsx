import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scaledWidth, SCREEN_WIDTH } from 'utils/Dimensions';
import StringConstants from '../../utils/StringConstants';
import AppColors from '../../utils/Colors';
import guestAPI from '../../../api/guestAPI';

interface Movie {
  id: number;
  title: string;
  posterimageurl: string;
  releasedatetmdb: string;
}

const UpcomingMoviesCard: React.FC = () => {
  const navigation = useNavigation();
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    getUpcomingMoviesData();
  }, []);

  const getUpcomingMoviesData = async () => {
    try {
      setLoading(true);
      const response = await guestAPI.getUpcomingTheatreMovies();
      if (response?.status === 200 && response?.data) {
        setTopMovies(response.data.slice(0, 3));
      }
    } catch (error) {
      console.log('Error in getUpcomingMovies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewList = () => {
    navigation.navigateDeprecated('UpcomingMoviesTheatre', { fromScreen: 'ExplorationTab' });
  };

  const extractDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={AppColors.LIGHT_YELLOW} />
      </View>
    );
  }

  if (topMovies.length === 0) {
    return null;
  }

  const cardWidth = SCREEN_WIDTH - scaledWidth(32);
  const posterWidth = (cardWidth - scaledWidth(32)) / 3 - scaledWidth(8);
  const posterHeight = posterWidth * 1.5;

  return (
    <>
    <Text style={styles.title}>{StringConstants.INDIA_TOP_10}</Text>
    <TouchableOpacity onPress={handleViewList}>
    <View style={styles.container}>
      
      <View style={styles.postersContainer}>
        {topMovies.map((movie) => (
          <View key={movie.id} style={[styles.movieCard, { width: posterWidth }]}>
            <Image
              source={imageErrors[movie.id] || !movie.posterimageurl ? require('assets/defaultMovie.png') : { uri: movie.posterimageurl }}
              style={[styles.posterImage, { height: posterHeight }]}
              resizeMode="cover"
              onError={() => setImageErrors(prev => ({ ...prev, [movie.id]: true }))}
            />
            <View style={styles.dateOverlay}>
              <Text style={styles.dateText}>{extractDate(movie.releasedatetmdb)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.subtitle}>{StringConstants.EXPLORE_UPCOMING_MOVIES}</Text>
        <TouchableOpacity style={styles.viewListButton} onPress={handleViewList}>
          <Text style={styles.viewListText}>{StringConstants.VIEW_LIST}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT6,
    padding: scaledWidth(16),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.WHITE,
    marginBottom: scaledWidth(12),
  },
  postersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaledWidth(16),
  },
  movieCard: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  posterImage: {
    width: '100%',
    borderRadius: 8,
  },
  dateOverlay: {
    position: 'absolute',
    bottom: scaledWidth(-3),
    left: scaledWidth(25),
    alignItems: 'center',
    backgroundColor: AppColors.LIGHT_YELLOW,
    paddingVertical: scaledWidth(2),
    paddingHorizontal: scaledWidth(6),
    borderRadius: 3,
  },
  dateText: {
    fontSize: 9,
    fontWeight: '600',
    color: AppColors.BLACK,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: AppColors.GREY_VARIANT1,
    flex: 1,
  },
  viewListButton: {
    backgroundColor: AppColors.LIGHT_YELLOW,
    paddingHorizontal: scaledWidth(20),
    paddingVertical: scaledWidth(5),
    borderRadius: scaledWidth(20),
  },
  viewListText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.BLACK,
  },
});

export default UpcomingMoviesCard;
