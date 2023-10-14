import { useState, useEffect } from 'react'
import { apiGet } from '../api/ApiService'

// simple icons
import {
  SiWhatsapp,
  SiInstagram,
  SiFacebook,
  SiTiktok,
} from '@icons-pack/react-simple-icons'

// components
import Navbar from "../components/Navbar"
import Carousel from "../components/Carousel"
import Stats from "../components/Stats"
import TopPromo from "../components/TopPromo"
import MobileMenu from "../components/MobileMenu"
import CategorySection from '../components/CategorySection'
import BrandSection from '../components/BrandSection'
import StorySection from '../components/StorySection'
import OtherPromo from '../components/OtherPromo'
import InvestorSection from '../components/InvestorSection'
import Footer from '../components/Footer'

const navigation = {
  categories: [
    {
      id: 'categories',
      name: 'Shop by category',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'New arrivals on display.',
        },
        {
          name: 'Top Sales',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Top sale items on display.',
        },
      ],
      sections: [
        {
          id: 'skin_care',
          name: 'Skin Care',
          items: [
            {
              name: 'Cleanser',
              href: '#',
              subItems: [
                { name: 'Cleanser', href: '#' },
                { name: 'Exfoliator', href: '#' },
                { name: 'Face Wash', href: '#' },
                { name: 'Face Wipes', href: '#' },
                { name: 'Makeup Remover', href: '#' },
                { name: 'Toner', href: '#' },
              ],
            },
            {
              name: 'Eye Care',
              href: '#',
              subItems: [
                { name: 'Eye Cream', href: '#' },
                { name: 'Eye Serum', href: '#' },
                { name: 'Eye Lash Serum', href: '#' },
                { name: 'Eye Mask', href: '#' },
              ],
            },
            {
              name: 'Lip Care',
              href: '#',
              subItems: [
                { name: 'Lip Balm', href: '#' },
                { name: 'Lip Mask', href: '#' },
                { name: 'Lip Scrub', href: '#' },
              ],
            },
            {
              name: 'Moisturizer',
              href: '#',
              subItems: [
                { name: 'Day Cream', href: '#' },
                { name: 'Face Oil', href: '#' },
                { name: 'Face Mist', href: '#' },
                { name: 'Night Cream', href: '#' },
                { name: 'Neck Cream', href: '#' },
              ],
            },
            {
              name: 'Sun Care',
              href: '#',
              subItems: [
                { name: 'After-Sun Care', href: '#' },
                { name: 'Body Sunscreen', href: '#' },
                { name: 'Face Sunscreen', href: '#' },
              ],
            },
            {
              name: 'Treatment & Mask',
              href: '#',
              subItems: [
                { name: 'Acne & Blemish', href: '#' },
                { name: 'Face Serum', href: '#' },
                { name: 'Mask', href: '#' },
                { name: 'Peel', href: '#' },
              ],
            },
          ],
        },
        {
          id: 'makeup',
          name: 'Makeup',
          items: [
            {
              name: 'Face',
              href: '#',
              subItems: [
                { name: 'Bb & Cc Cream', href: '#' },
                { name: 'Blush', href: '#' },
                { name: 'Contour & Bronzer', href: '#' },
                { name: 'Concealer & Corrector', href: '#' },
                { name: 'Face Sets & Palettes', href: '#' },
                { name: 'Foundation', href: '#' },
                { name: 'Highlighter', href: '#' },
                { name: 'Powder', href: '#' },
                { name: 'Setting Spray', href: '#' },
                { name: 'Tinted Moisturizer', href: '#' },
              ],
            },
            {
              name: 'Eyes',
              href: '#',
              subItems: [
                { name: 'Eye Brow', href: '#' },
                { name: 'Eye Liner', href: '#' },
                { name: 'Eyelashes & Brow Serum', href: '#' },
                { name: 'Eye Shadow', href: '#' },
                { name: 'Eye Sets', href: '#' },
                { name: 'Mascara', href: '#' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'brands',
      name: 'Brands',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'New arrivals on display.',
        },
        {
          name: 'Top Brands',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt: 'Top brands in display.',
        },
      ],
      sections: [
        {
          id: 'abc',
          name: 'A - C',
          items: [
            {
              name: 'A',
              href: '#',
              subItems: [
                { name: 'Aesop', href: '#' },
                { name: 'All Birds', href: '#' },
                { name: 'Arq', href: '#' },
              ]
            },
            {
              name: 'B',
              href: '#',
              subItems: [
                { name: 'Baggu', href: '#' },
                { name: 'Berg & Betts', href: '#' },
                { name: 'Blume', href: '#' },
                { name: 'Briogeo', href: '#' },
                { name: 'By Humankind', href: '#' },
              ]
            },
            {
              name: 'C',
              href: '#',
              subItems: [
                { name: 'Carmen', href: '#' },
                { name: 'Champion', href: '#' },
                { name: 'Common Goods', href: '#' },
                { name: 'Craighill', href: '#' },
              ]
            }
          ],
        },
        {
          id: 'def',
          name: 'D - F',
          items: [
            {
              name: 'D',
              href: '#',
              subItems: [
                { name: 'Danner', href: '#' },
                { name: 'Darn Tough', href: '#' },
                { name: 'Dr Martens', href: '#' },
                { name: 'Driftime', href: '#' },
              ]
            },
            {
              name: 'E',
              href: '#',
              subItems: []
            },
            {
              name: 'F',
              href: '#',
              subItems: []
            },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Beauty Story', href: '#' },
    { name: 'Promo', href: '#' },
  ],
}

const socials = [
  {
    name: 'Whatsapp',
    href: '#',
    icon: <SiWhatsapp className='h-[18px] w-[18px] text-gray-100 hover:text-green-600' />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <SiInstagram className='h-[18px] w-[18px] text-gray-100 hover:text-red-400' />,
  },
  {
    name: 'Facebook',
    href: '#',
    icon: <SiFacebook className='h-[18px] w-[18px] text-gray-100 hover:text-blue-500' />,
  },
  {
    name: 'Tiktok',
    href: '#',
    icon: <SiTiktok className='h-[18px] w-[18px] text-gray-100 hover:text-gray-800' />,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const popularCategories = [
  {
    name: 'New Arrivals',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1701&q=80',
  },
  {
    name: 'Skin Care',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpbiUyMGNhcmV8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Make Up',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1614006659838-d4ca51cbd117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Body Care',
    href: '#',
    imageSrc: 'https://plus.unsplash.com/premium_photo-1663040561508-33c57a05059c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Hair Care',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1556229165-8aa0ceaa93a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1787&q=80',
  },
]

const brands = [
  {
    name: 'Loreal',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1602037299890-c593f4c81d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Maybelline',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1627384113817-b0180ad643c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Revlon',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1599022484226-2cd40d53a027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1755&q=80',
  },
  {
    name: 'NYX',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1605204376600-72ed73f1f9ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
  },
  {
    name: 'Wet n Wild',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1588514899099-e2df6951dde6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
  },
]

const Home = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white">

      {/* Mobile Navigation */}
      <MobileMenu open={open} setOpen={setOpen} classNames={classNames} navigation={navigation} socials={socials} />

      {/* Navbar */}
      <Navbar open={open} setOpen={setOpen} classNames={classNames} navigation={navigation} socials={socials} />

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


      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default Home
