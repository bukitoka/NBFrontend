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

const popularCategories = [
  {
    name: "New Arrivals",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1701&q=80",
  },
  {
    name: "Skin Care",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpbiUyMGNhcmV8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Make Up",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1614006659838-d4ca51cbd117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Body Care",
    href: "#",
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1663040561508-33c57a05059c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Hair Care",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1556229165-8aa0ceaa93a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1787&q=80",
  },
]

const brands = [
  {
    name: "Loreal",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1602037299890-c593f4c81d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Maybelline",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1627384113817-b0180ad643c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Revlon",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1599022484226-2cd40d53a027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1755&q=80",
  },
  {
    name: "NYX",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1605204376600-72ed73f1f9ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
  },
  {
    name: "Wet n Wild",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1588514899099-e2df6951dde6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
  },
]

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
        <CategorySection categories={popularCategories} />

        {/* Brand section */}
        <BrandSection brands={brands} />

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
