import { useTranslation } from "react-i18next"

// components
import Navbar from "@/components/Navbar"
import Carousel from "@/components/Carousel"
import Stats from "@/components/Stats"
import TopPromo from "@/components/TopPromo"
import CategorySection from "@/components/CategorySection"
import BrandSection from "@/components/BrandSection"
import StorySection from "@/components/StorySection"
import OtherPromo from "@/components/OtherPromo"
import InvestorSection from "@/components/InvestorSection"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"

const Home = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Carousel */}
      <Carousel />

      {/* Top Promo */}
      <TopPromo />

      <main>
        {/* Category section */}
        <CategorySection />

        {/* Brand section */}
        <BrandSection />

        {/* Collection section */}
        <StorySection />

        {/* Other promo section */}
        <OtherPromo />

        {/* Stats */}
        <Stats />

        {/* Investor section */}
        <InvestorSection />

        {/* Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
