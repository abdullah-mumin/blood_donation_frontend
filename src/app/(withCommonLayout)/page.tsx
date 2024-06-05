import AboutPage from "@/components/UI/HomePage/About/About";
import Banner from "@/components/UI/HomePage/Banner/Banner";
import Benefit from "@/components/UI/HomePage/Benefit/Benefit";
import Covarage from "@/components/UI/HomePage/Covarage/Covarage";
import DonorsSearch from "@/components/UI/HomePage/Donors/Donors";

const Home = () => {
  return (
    <>
      <Banner />
      <AboutPage />
      <DonorsSearch />
      <Covarage />
      <Benefit />
    </>
  );
};

export default Home;
