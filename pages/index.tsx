import { Box } from '@mui/material';
import type { NextPage } from 'next';

import HomePageFeatures from '@/components/HomePage/Features';
import HomePageIssues from '@/components/HomePage/Issues';
import HomePageNavBar from '@/components/HomePage/NavBar';
import HomePageBanner from '@/components/HomePage/Banner';
import HomePagePaperContent from '@/components/HomePage/PagePaperContent';
import HomePageStatsSection from '@/components/HomePage/StatsSection';

const Home: NextPage = () => {
  return (
    <Box>
      <HomePageNavBar />
      <HomePageBanner />
      <HomePagePaperContent>
        <HomePageStatsSection />
        <HomePageFeatures />
        <HomePageIssues />
      </HomePagePaperContent>
    </Box>
  );
};

export default Home;
