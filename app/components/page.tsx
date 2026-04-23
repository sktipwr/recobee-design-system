const componentCategories = {
  'Buttons & Actions': [
    { name: 'GradientBtn', desc: 'Primary CTA with yellow gradient', file: 'Common/GradientBtn.tsx' },
    { name: 'RoundedBtn', desc: 'Configurable bordered button', file: 'Common/RoundedBtn.tsx' },
    { name: 'BottomButton', desc: 'Fixed bottom bar with actions', file: 'Common/BottomButton.tsx' },
    { name: 'BottomPositionedBtn', desc: 'Floating bottom CTA', file: 'Common/BottomPositionedBtn.tsx' },
    { name: 'FAB', desc: 'Floating action button', file: 'Common/FAB.tsx' },
    { name: 'AddFriendButton', desc: 'Add friend CTA', file: 'Common/AddFriendButton.tsx' },
    { name: 'AddItemsButton', desc: 'Add items to list', file: 'Common/AddItemsButton.tsx' },
    { name: 'AdvanceFilterBtn', desc: 'Filter toggle button', file: 'Common/AdvanceFilterBtn.tsx' },
    { name: 'IdpButton', desc: 'Identity provider login', file: 'Common/IdpButton.tsx' },
    { name: 'YearWrapCardButton', desc: 'Year wrap action', file: 'Common/YearWrapCardButton.tsx' },
  ],
  'Inputs & Selection': [
    { name: 'SearchInput', desc: 'Search field with clear', file: 'Common/SearchInput.tsx' },
    { name: 'SearchHeader', desc: 'Header with search', file: 'Common/SearchHeader.tsx' },
    { name: 'Chip', desc: 'Filter/tag selector', file: 'Common/Chip.tsx' },
    { name: 'ChipWrapper', desc: 'Chip group container', file: 'Common/ChipWrapper.tsx' },
    { name: 'DropdownComponent', desc: 'Dropdown select', file: 'Common/DropdownComponent.tsx' },
    { name: 'AgeAndGenderInput', desc: 'Profile input fields', file: 'Common/AgeAndGenderInput.tsx' },
  ],
  'Headers & Navigation': [
    { name: 'Header', desc: 'Screen header with icons', file: 'Common/Header.tsx' },
    { name: 'GoBackHeader', desc: 'Back button header', file: 'Common/GoBackHeader.tsx' },
    { name: 'HeaderBackArrow', desc: 'Back arrow component', file: 'Common/HeaderBackArrow.tsx' },
    { name: 'ListHeader', desc: 'List section header', file: 'Common/ListHeader.tsx' },
    { name: 'TimelineHeader', desc: 'Timeline/diary header', file: 'Common/TimelineHeader.tsx' },
    { name: 'TopSectionNavigation', desc: 'Top nav tabs', file: 'Common/TopSectionNavigation.tsx' },
  ],
  'Feedback & States': [
    { name: 'EmptyState', desc: 'Empty state with emoji', file: 'Common/EmptyState.tsx' },
    { name: 'ErrorText', desc: 'Error message', file: 'Common/ErrorText.tsx' },
    { name: 'Alert', desc: 'Alert dialog', file: 'Common/Alert.tsx' },
    { name: 'DoneView', desc: 'Success confirmation', file: 'Common/DoneView.tsx' },
    { name: 'EndOfFeedMsg', desc: 'End of list message', file: 'Common/EndOfFeedMsg.tsx' },
    { name: 'FeedbackComponent', desc: 'Feedback prompt', file: 'Common/FeedbackComponent.tsx' },
    { name: 'loader', desc: 'Full-screen spinner', file: 'Common/loader.tsx' },
    { name: 'FooterLoading', desc: 'List footer loader', file: 'Common/FooterLoading.tsx' },
  ],
  'Progress & Indicators': [
    { name: 'CustomProgress', desc: 'Custom progress bar', file: 'Common/CustomProgress.tsx' },
    { name: 'CustomProgressBar', desc: 'Styled progress bar', file: 'Common/CustomProgressBar.tsx' },
    { name: 'HorizontalProgressBar', desc: 'Horizontal bar', file: 'Common/HorizontalProgressBar.tsx' },
    { name: 'ProgressCircle', desc: 'Circular progress', file: 'Common/ProgressCircle.tsx' },
    { name: 'TopChartsProgress', desc: 'Chart progress bar', file: 'Common/TopChartsProgress.tsx' },
  ],
  'Movie Cards': [
    { name: 'HomeMovieCard', desc: 'Main movie card', file: 'Cards/HomeMovieCard.tsx' },
    { name: 'MovieSearchCard', desc: 'Search result card', file: 'Cards/MovieSearchCard.tsx' },
    { name: 'MovieReviewCard', desc: 'Review display card', file: 'Cards/MovieReviewCard.tsx' },
    { name: 'PosterAndTitleCard', desc: 'Poster + title', file: 'Cards/PosterAndTitleCard.tsx' },
    { name: 'TimelineMovieCard', desc: 'Diary timeline card', file: 'Cards/TimelineMovieCard.tsx' },
    { name: 'UpcomingMoviesCard', desc: 'Upcoming release card', file: 'Cards/UpcomingMoviesCard.tsx' },
  ],
  'Social & Content Cards': [
    { name: 'SocialFeedCard', desc: 'Social feed post', file: 'Cards/SocialFeedCard.tsx' },
    { name: 'ReviewCard', desc: 'User review card', file: 'Cards/ReviewCard.tsx' },
    { name: 'CommentCard', desc: 'Comment thread', file: 'Cards/CommentCard.tsx' },
    { name: 'PostActivityCard', desc: 'Activity update', file: 'Cards/PostActivityCard.tsx' },
    { name: 'TriviaCard', desc: 'Trivia question', file: 'Cards/TriviaCard.tsx' },
    { name: 'CarouselCard', desc: 'Carousel item', file: 'Cards/CarouselCard.tsx' },
  ],
  'User & Profile': [
    { name: 'UserRow', desc: 'User list row', file: 'Cards/UserRow.tsx' },
    { name: 'UserProfile', desc: 'Profile card', file: 'Cards/UserProfile.tsx' },
    { name: 'Badge', desc: 'Stat badge counter', file: 'Cards/Badge.tsx' },
    { name: 'StatsCard', desc: 'Statistics display', file: 'Cards/StatsCard.tsx' },
    { name: 'StreakCard', desc: 'Daily streak card', file: 'Cards/StreakCard.tsx' },
  ],
  'Modals': [
    { name: 'ConfirmModal', desc: 'Yes/No dialog', file: 'Modals/ConfirmModal.tsx' },
    { name: 'RatingModal', desc: 'Star rating input', file: 'Modals/RatingModal.tsx' },
    { name: 'ReviewModal', desc: 'Write review', file: 'Modals/ReviewModal.tsx' },
    { name: 'SendRecoModal', desc: 'Send recommendation', file: 'Modals/SendRecoModal.tsx' },
    { name: 'GenericModal', desc: 'General modal', file: 'Modals/GenericModal.tsx' },
    { name: 'MoreOptionsModal', desc: 'Context menu', file: 'Modals/MoreOptionsModal.tsx' },
  ],
  'Lists & Carousels': [
    { name: 'HomeSectionList', desc: 'Home page sections', file: 'List/HomeSectionList.tsx' },
    { name: 'MoviesListRail', desc: 'Horizontal poster rail', file: 'List/MoviesListRail.tsx' },
    { name: 'HomeCarousel', desc: 'Hero carousel', file: 'Carousels/HomeCarousel.tsx' },
    { name: 'ReviewCarousel', desc: 'Review slider', file: 'Carousels/ReviewCarousel.tsx' },
    { name: 'VideoCarousel', desc: 'Video content slider', file: 'Carousels/VideoCarousel.tsx' },
  ],
  'Skeletons': [
    { name: 'WatchlistSkeleton', desc: 'Watchlist loader', file: 'Skeletons/WatchlistSkeleton.tsx' },
    { name: 'ReviewSkeleton', desc: 'Review loader', file: 'Skeletons/ReviewSkeleton.tsx' },
    { name: 'SearchSkeleton', desc: 'Search loader', file: 'Skeletons/SearchSkeleton.tsx' },
    { name: 'CarouselSkeleton', desc: 'Carousel loader', file: 'Skeletons/CarouselSkeleton.tsx' },
    { name: 'SocialFeedSkeleton', desc: 'Feed loader', file: 'Skeletons/SocialFeedSkeleton.tsx' },
    { name: 'MoviesListSkeleton', desc: 'Movie list loader', file: 'Skeletons/MoviesListSkeleton.tsx' },
  ],
};

function ComponentCard({ name, desc, file }: { name: string; desc: string; file: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3 hover:border-amber-500/20 transition-colors">
      <div className="h-14 rounded-lg bg-[#1a1a1a] border border-white/[0.04] flex items-center justify-center mb-2">
        <span className="text-[10px] text-zinc-600 font-mono">&lt;{name} /&gt;</span>
      </div>
      <p className="text-[12px] text-white font-semibold">{name}</p>
      <p className="text-[10px] text-zinc-500">{desc}</p>
      <p className="text-[9px] text-zinc-700 font-mono mt-1">src/components/{file}</p>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <main className="pl-[220px] px-10 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-[24px] font-bold text-white">Components</h1>
        <p className="text-[13px] text-zinc-400 mt-1">
          React Native components from the RecoBee mobile app. All components use the dark theme with DM Sans typography and gold accent colors.
        </p>
        <p className="text-[12px] text-zinc-600 mt-2">
          {Object.values(componentCategories).flat().length} components catalogued &middot; View live previews in{" "}
          <a href="http://localhost:6006" target="_blank" className="text-amber-400 hover:underline">Storybook</a>
        </p>
      </div>

      {Object.entries(componentCategories).map(([category, components]) => (
        <section key={category} id={category.toLowerCase().replace(/[^a-z]/g, '-')}>
          <h2 className="text-[14px] font-semibold text-amber-400 mb-3 pb-2 border-b border-white/[0.06]">
            {category} ({components.length})
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {components.map((c) => (
              <ComponentCard key={c.name} {...c} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
