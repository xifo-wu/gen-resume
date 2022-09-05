import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import BrandBanner from '@/components/BrandBanner';
import BlankFullScreen from '@/components/BlankFullScreen';
import HomePageFeatures from '@/components/HomePage/Features';
import HomePageIssues from '@/components/HomePage/Issues';
import NavBar from '@/components/NavBar';

const Home: NextPage = () => {
  return (
    <Box>
      <NavBar />
      <BrandBanner />
      <BlankFullScreen />
      <HomePageFeatures />
      <HomePageIssues />
    </Box>
  );
};

export default Home;
