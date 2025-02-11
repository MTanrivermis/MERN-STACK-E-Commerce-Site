import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Campaigns from "../components/Campaigns/Campaigns";
import Products from "../components/Products/Products";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </>
  );
};

export default HomePage;
