import React from 'react';
import { View } from 'react-native';
import StringConstants from './StringConstants';
import SeenStarter from 'assets/images/icon/seen_starter_badge';
import SeenBronze from 'assets/images/icon/seen_bronze_badge';
import SeenSilver from 'assets/images/icon/seen_silver_badge';
import SeenPlatinum from 'assets/images/icon/seen_platinum_badge';
import SeenGold from 'assets/images/icon/seen_gold_badge';
import SeenDiamond from 'assets/images/icon/seen_diamond_badge';
import ReviewStarter from 'assets/images/icon/reviews_starter_badge';
import ReviewBronze from 'assets/images/icon/reviews_bronze_badge';
import ReviewSilver from 'assets/images/icon/reviews_silver_badge';
import ReviewPlatinum from 'assets/images/icon/reviews_platinum_badge';
import ReviewGold from 'assets/images/icon/reviews_gold_badge';
import ReviewDiamond from 'assets/images/icon/reviews_diamond_badge';
import ActionBee from 'assets/images/icon/action_bee';
import SportsBee from 'assets/images/icon/sports_bee';
import HorrorBee from 'assets/images/icon/horror_bee';
import ComedyBee from 'assets/images/icon/comedy_bee';
import ThrillerBee from 'assets/images/icon/thriller_bee';
import RomanceBee from 'assets/images/icon/romance_bee';
import AnimationBee from 'assets/images/icon/animation_bee';
import DramaBee from 'assets/images/icon/drama_bee';
const RenderBadgeImage = ({ condition, tier, width = 188.14, height = 180, genre }) => {
  // Leaderboard badges by genre
  if (genre) {
    const genreLower = genre.toLowerCase();
    switch (genreLower) {
      case 'action':
        return <ActionBee width={width} height={height} />;
      case 'sports':
        return <SportsBee width={width} height={height} />;
      case 'horror':
        return <HorrorBee width={width} height={height} />;
      case 'comedy':
        return <ComedyBee width={width} height={height} />;
        case 'thriller':
        return <ThrillerBee width={width} height={height} />;
      case 'romance':
        return <RomanceBee width={width} height={height} />;
      case 'animation':
        return <AnimationBee width={width} height={height} />;
        case 'drama':
        return <DramaBee width={width} height={height} />;
      default:
        return null;
    }
  }
  
  switch (tier) {
    case 'Starter':
      return condition ? (
        <SeenStarter width={width} height={height} />
      ) : (
        <ReviewStarter width={width} height={height} />
      );
    case 'Bronze':
      return condition? (
        <SeenBronze width={width} height={height} />
      ) : (
        <ReviewBronze width={width} height={height} />
      );
    case 'Silver':
      return condition ? (
        <SeenSilver width={width} height={height} />
      ) : (
        <ReviewSilver width={width} height={height} />
      );
    case 'Gold':
      return condition? (
        <SeenGold width={width} height={height} />
      ) : (
        <ReviewGold width={width} height={height} />
      );
    case 'Platinum':
      return condition ? (
        <SeenPlatinum width={width} height={height} />
      ) : (
        <ReviewPlatinum width={width} height={height} />
      );
    case 'Diamond':
      return condition? (
        <SeenDiamond width={width} height={height} />
      ) : (
        <ReviewDiamond width={width} height={height} />
      );
    default:
      return null;
  }
};

export default RenderBadgeImage;
