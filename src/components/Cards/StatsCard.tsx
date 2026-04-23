import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import MovieDiary from 'icons/MovieDiary';
import List from 'svg/list';
import StarEmpty from 'assets/images/icon/star_empty.svg';
import TrophyGrey from 'assets/images/icon/trophy_grey.svg';

interface StatItemProps {
  icon: React.ReactNode;
  count: string | number;
  label: string;
}

const StatItem = ({ icon, count, label }: StatItemProps) => {
  return (
    <View style={styles.statItem}>
      <View style={styles.countRow}>
        {icon}
        <Text style={styles.statCount}>{count}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

interface StatsCardProps {
  items: Array<{
    icon: React.ReactNode;
    count: string | number;
    label: string;
  }>;
}

export default function StatsCard({ items }: StatsCardProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <StatItem key={index} icon={item.icon} count={item.count || 0} label={item.label} />
      ))}
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    paddingLeft: 24,
    padding:4,
    borderColor:AppColors.GREY_VARIANT6,
    borderWidth:1,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statCount: {
    fontSize: 20,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginLeft: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginTop: 4,
    marginBottom: 8,
  },
});
