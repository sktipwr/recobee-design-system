import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Import all icons
import Add from '../src/icons/Add';
import AddCircle from '../src/icons/AddCircle';
import AddFriend from '../src/icons/AddFriend';
import AddIcon from '../src/icons/AddIcon';
import AddMedia from '../src/icons/AddMedia';
import AddVideo from '../src/icons/AddVideo';
import AdvanceFilter from '../src/icons/AdvanceFilter';
import Arrow from '../src/icons/Arrow';
import ArrowFilled from '../src/icons/ArrowFilled';
import Bell from '../src/icons/Bell';
import Calendar from '../src/icons/Calendar';
import CalendarFire from '../src/icons/CalendarFire';
import Camera from '../src/icons/Camera';
import ChatIcon from '../src/icons/ChatIcon';
import CircularCrossIcon from '../src/icons/CircularCrossIcon';
import Clock from '../src/icons/Clock';
import Communities from '../src/icons/Communities';
import Create from '../src/icons/Create';
import Cross from '../src/icons/Cross';
import Dislike from '../src/icons/Dislike';
import DislikeFilled from '../src/icons/DislikeFilled';
import Edit from '../src/icons/Edit';
import Explore from '../src/icons/Explore';
import ExploreIcon from '../src/icons/ExploreIcon';
import Eyeo from '../src/icons/Eyeo';
import Eyes from '../src/icons/Eyes';
import Filter from '../src/icons/Filter';
import Heart from '../src/icons/Heart';
import Home from '../src/icons/Home';
import Inbox from '../src/icons/Inbox';
import Insta from '../src/icons/Insta';
import LeftLeaf from '../src/icons/LeftLeaf';
import Like from '../src/icons/Like';
import LikeFilled from '../src/icons/LikeFilled';
import ListViewIcon from '../src/icons/ListViewIcon';
import MenuIcon from '../src/icons/MenuIcon';
import MinusCircle from '../src/icons/MinusCircle';
import MoreVertical from '../src/icons/MoreVertical';
import MovieDiary from '../src/icons/MovieDiary';
import Next from '../src/icons/Next';
import Pencil from '../src/icons/Pencil';
import Pin from '../src/icons/Pin';
import PlayIcon from '../src/icons/PlayIcon';
import Post from '../src/icons/Post';
import Rate from '../src/icons/Rate';
import RateFilled from '../src/icons/RateFilled';
import RecoOutline from '../src/icons/RecoOutline';
import Retry from '../src/icons/Retry';
import Review from '../src/icons/Review';
import RightArrow from '../src/icons/RightArrow';
import RightLeaf from '../src/icons/RightLeaf';
import Sad from '../src/icons/Sad';
import Search from '../src/icons/Search';
import SearchIcon from '../src/icons/SearchIcon';
import Settings from '../src/icons/Settings';
import ShareAndroid from '../src/icons/ShareAndroid';
import ShareIOS from '../src/icons/ShareIOS';
import Shorts from '../src/icons/Shorts';
import Social from '../src/icons/Social';
import StarFilled from '../src/icons/StarFilled';
import Tick from '../src/icons/Tick';
import TiltedArrow from '../src/icons/TiltedArrow';
import Trailer from '../src/icons/Trailer';
import User from '../src/icons/User';
import Users from '../src/icons/Users';
import Watching from '../src/icons/Watching';
import Watchlist from '../src/icons/Watchlist';
import Watchparty from '../src/icons/Watchparty';

// Mood/Genre icons
import Adventurous from '../src/icons/Adventurous';
import Bored from '../src/icons/Bored';
import Classics from '../src/icons/Classics';
import FamilyFriendly from '../src/icons/FamilyFriendly';
import Happy from '../src/icons/Happy';
import Inspiring from '../src/icons/Inspiring';
import Kids from '../src/icons/Kids';
import Nostalgic from '../src/icons/Nostalgic';
import Reflective from '../src/icons/Reflective';
import Scary from '../src/icons/Scary';
import Suspense from '../src/icons/Suspense';

// Language icons
import Arabic from '../src/icons/Arabic';
import English from '../src/icons/English';
import French from '../src/icons/French';
import German from '../src/icons/German';
import Hindi from '../src/icons/Hindi';
import Kannada from '../src/icons/Kannada';
import Korean from '../src/icons/Korean';
import Malayalam from '../src/icons/Malayalam';
import Marathi from '../src/icons/Marathi';
import Spanish from '../src/icons/Spanish';
import Tamil from '../src/icons/Tamil';
import Telugu from '../src/icons/Telugu';

const iconGroups = {
  'Navigation': { Home, Explore, ExploreIcon, Search, SearchIcon, MenuIcon, Inbox, Shorts, Social, Settings, Communities, MovieDiary },
  'Actions': { Add, AddCircle, AddIcon, AddFriend, AddMedia, AddVideo, Create, Edit, Pencil, Cross, CircularCrossIcon, MinusCircle, Filter, AdvanceFilter, Pin, Retry, Tick },
  'Media': { PlayIcon, Camera, Trailer, Watching, Watchlist, Watchparty },
  'Social': { Like, LikeFilled, Dislike, DislikeFilled, Heart, Rate, RateFilled, StarFilled, Review, RecoOutline, Post, ChatIcon, ShareAndroid, ShareIOS, Insta },
  'Navigation Arrows': { Arrow, ArrowFilled, Next, RightArrow, LeftLeaf, RightLeaf, TiltedArrow, ListViewIcon },
  'Info': { Bell, Calendar, CalendarFire, Clock, Eyes, Eyeo, MoreVertical, User, Users, Sad },
  'Moods': { Happy, Bored, Adventurous, Classics, FamilyFriendly, Inspiring, Kids, Nostalgic, Reflective, Scary, Suspense },
  'Languages': { Arabic, English, French, German, Hindi, Kannada, Korean, Malayalam, Marathi, Spanish, Tamil, Telugu },
};

const IconCell = ({ name, IconComponent }: { name: string; IconComponent: any }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 12, borderRadius: 8, width: 80 }}>
    <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IconComponent color="#E9C638" width={24} height={24} />
    </div>
    <span style={{ fontSize: 9, color: '#9E9E9E', textAlign: 'center', fontFamily: 'monospace', wordBreak: 'break-all' }}>{name}</span>
  </div>
);

const IconGallery = () => (
  <div style={{ padding: 24, backgroundColor: '#121212', minHeight: '100vh' }}>
    <h1 style={{ color: '#F8F8F9', fontSize: 24, fontFamily: 'DM Sans, sans-serif', marginBottom: 4 }}>Icon Library</h1>
    <p style={{ color: '#9E9E9E', fontSize: 13, fontFamily: 'DM Sans, sans-serif', marginBottom: 32 }}>
      {Object.values(iconGroups).reduce((sum, g) => sum + Object.keys(g).length, 0)} icons from the RecoBee mobile app
    </p>
    {Object.entries(iconGroups).map(([group, icons]) => (
      <div key={group} style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#E9C638', fontSize: 14, fontFamily: 'DM Sans, sans-serif', marginBottom: 12, borderBottom: '1px solid #333', paddingBottom: 8 }}>
          {group} ({Object.keys(icons).length})
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Object.entries(icons).map(([name, Icon]) => (
            <IconCell key={name} name={name} IconComponent={Icon} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: 'Icons/Gallery',
  component: IconGallery,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
};
export default meta;

type Story = StoryObj;
export const AllIcons: Story = {};
