import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { apiGet } from "../api/ApiService";
import { useParams } from 'react-router-dom';

// simple icons
import {
  SiWhatsapp,
  SiInstagram,
  SiFacebook,
  SiTiktok,
} from "@icons-pack/react-simple-icons";

// components
import Navbar from "../components/Navbar";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import { fetchProducts } from "../api/ProductApi";
import { getParamValue } from "../tools/urlParams";
import { nbDefaultImage } from "@/assets/";
import api from "../tools/api";

const navigation = {
  categories: [
    {
      id: "categories",
      name: "Shop by category",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt: "New arrivals on display.",
        },
        {
          name: "Top Sales",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt: "Top sale items on display.",
        },
      ],
      sections: [
        {
          id: "skin_care",
          name: "Skin Care",
          items: [
            {
              name: "Cleanser",
              href: "#",
              subItems: [
                { name: "Cleanser", href: "#" },
                { name: "Exfoliator", href: "#" },
                { name: "Face Wash", href: "#" },
                { name: "Face Wipes", href: "#" },
                { name: "Makeup Remover", href: "#" },
                { name: "Toner", href: "#" },
              ],
            },
            {
              name: "Eye Care",
              href: "#",
              subItems: [
                { name: "Eye Cream", href: "#" },
                { name: "Eye Serum", href: "#" },
                { name: "Eye Lash Serum", href: "#" },
                { name: "Eye Mask", href: "#" },
              ],
            },
            {
              name: "Lip Care",
              href: "#",
              subItems: [
                { name: "Lip Balm", href: "#" },
                { name: "Lip Mask", href: "#" },
                { name: "Lip Scrub", href: "#" },
              ],
            },
            {
              name: "Moisturizer",
              href: "#",
              subItems: [
                { name: "Day Cream", href: "#" },
                { name: "Face Oil", href: "#" },
                { name: "Face Mist", href: "#" },
                { name: "Night Cream", href: "#" },
                { name: "Neck Cream", href: "#" },
              ],
            },
            {
              name: "Sun Care",
              href: "#",
              subItems: [
                { name: "After-Sun Care", href: "#" },
                { name: "Body Sunscreen", href: "#" },
                { name: "Face Sunscreen", href: "#" },
              ],
            },
            {
              name: "Treatment & Mask",
              href: "#",
              subItems: [
                { name: "Acne & Blemish", href: "#" },
                { name: "Face Serum", href: "#" },
                { name: "Mask", href: "#" },
                { name: "Peel", href: "#" },
              ],
            },
          ],
        },
        {
          id: "makeup",
          name: "Makeup",
          items: [
            {
              name: "Face",
              href: "#",
              subItems: [
                { name: "Bb & Cc Cream", href: "#" },
                { name: "Blush", href: "#" },
                { name: "Contour & Bronzer", href: "#" },
                { name: "Concealer & Corrector", href: "#" },
                { name: "Face Sets & Palettes", href: "#" },
                { name: "Foundation", href: "#" },
                { name: "Highlighter", href: "#" },
                { name: "Powder", href: "#" },
                { name: "Setting Spray", href: "#" },
                { name: "Tinted Moisturizer", href: "#" },
              ],
            },
            {
              name: "Eyes",
              href: "#",
              subItems: [
                { name: "Eye Brow", href: "#" },
                { name: "Eye Liner", href: "#" },
                { name: "Eyelashes & Brow Serum", href: "#" },
                { name: "Eye Shadow", href: "#" },
                { name: "Eye Sets", href: "#" },
                { name: "Mascara", href: "#" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "brands",
      name: "Brands",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt: "New arrivals on display.",
        },
        {
          name: "Top Brands",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt: "Top brands in display.",
        },
      ],
      sections: [
        {
          id: "abc",
          name: "A - C",
          items: [
            {
              name: "A",
              href: "#",
              subItems: [
                { name: "Aesop", href: "#" },
                { name: "All Birds", href: "#" },
                { name: "Arq", href: "#" },
              ],
            },
            {
              name: "B",
              href: "#",
              subItems: [
                { name: "Baggu", href: "#" },
                { name: "Berg & Betts", href: "#" },
                { name: "Blume", href: "#" },
                { name: "Briogeo", href: "#" },
                { name: "By Humankind", href: "#" },
              ],
            },
            {
              name: "C",
              href: "#",
              subItems: [
                { name: "Carmen", href: "#" },
                { name: "Champion", href: "#" },
                { name: "Common Goods", href: "#" },
                { name: "Craighill", href: "#" },
              ],
            },
          ],
        },
        {
          id: "def",
          name: "D - F",
          items: [
            {
              name: "D",
              href: "#",
              subItems: [
                { name: "Danner", href: "#" },
                { name: "Darn Tough", href: "#" },
                { name: "Dr Martens", href: "#" },
                { name: "Driftime", href: "#" },
              ],
            },
            {
              name: "E",
              href: "#",
              subItems: [],
            },
            {
              name: "F",
              href: "#",
              subItems: [],
            },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Beauty Story", href: "#" },
    { name: "Promo", href: "#" },
  ],
};

const socials = [
  {
    name: "Whatsapp",
    href: "#",
    icon: (
      <SiWhatsapp className="h-[18px] w-[18px] text-gray-100 hover:text-green-600" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <SiInstagram className="h-[18px] w-[18px] text-gray-100 hover:text-red-400" />
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <SiFacebook className="h-[18px] w-[18px] text-gray-100 hover:text-blue-500" />
    ),
  },
  {
    name: "Tiktok",
    href: "#",
    icon: (
      <SiTiktok className="h-[18px] w-[18px] text-gray-100 hover:text-gray-800" />
    ),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Brand = () => {
  const { startWith } = useParams();
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [arrproducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    getBrand();
  }, []);

  const getBrand = async () => {
    await apiGet(`brand/${startWith ? '?name__istartswith=' + startWith : ''}`, (data) => onBrandSucces(data), (error) => onBrandError(error))
  }

  const onBrandSucces = (data) => {
    setBrands(data.results);
  }

  const onBrandError = (error) => {
    console.log(error);
  }

  return (
    <div className="bg-white">
      {/* Mobile Navigation */}
      <MobileMenu
        open={open}
        setOpen={setOpen}
        classNames={classNames}
        navigation={navigation}
        socials={socials}
      />

      {/* Navbar */}
      <Navbar
        open={open}
        setOpen={setOpen}
        classNames={classNames}
        navigation={navigation}
        socials={socials}
      />
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px]  bg-red-400">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {
                (brands.map((brand) => (
                  < a href={`/brand-detail/${brand.slug}`} className="group" key={brand.id}>
                    <div>
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                          <img
                            src={brand.cover}
                            alt={brand.name}
                            className="h-full w-full object-cover object-center"
                            onError={(e) => (e.target.src = nbDefaultImage)}
                          />
                        </div>
                        <div className="relative mt-4">
                          <p className="text-sm font-medium text-gray-900 font-bold">
                            {brand.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{brand.description}</p>

                        </div>
                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                )))
              }
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Brand;
