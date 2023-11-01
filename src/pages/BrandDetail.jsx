import { useState, useEffect } from "react"
import { apiGet } from "@/api/ApiService"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { priceFormatter } from "@/tools/reformat"

// simple icons
import {
  SiWhatsapp,
  SiInstagram,
  SiFacebook,
  SiTiktok,
} from "@icons-pack/react-simple-icons"

// components
import Navbar from "../components/Navbar"
import MobileMenu from "../components/MobileMenu"
import Footer from "../components/Footer"
import { fetchProducts } from "../api/ProductApi"
import { getParamValue } from "../tools/urlParams"
import { nbDefaultImage } from "@/assets/"
import api from "../tools/api"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

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
}

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
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const BrandDetail = () => {
  const { slug } = useParams()
  const [open, setOpen] = useState(false)
  const [brand, setBrand] = useState(null)
  const [arrproducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [count, setCount] = useState(0)
  const baseurl = import.meta.env.VITE_API_BASE_URL

  const { t, i18n } = useTranslation()

  useEffect(() => {
    getBrandDetail()
  }, [])

  const getBrandDetail = async () => {
    await apiGet(
      `brand/${slug}/`,
      (data) => onBrandSucces(data),
      (error) => onBrandError(error)
    )
  }

  const onBrandSucces = (data) => {
    setBrand(data)
    getProducts(data.slug)
    console.log(data.id)
  }

  const onBrandError = (error) => {
    console.log(error)
  }

  // get products by brand
  const getProducts = async (productid) => {
    await apiGet(
      `product/?brand__slug=${productid}`,
      (data) => onProductSucces(data),
      (error) => onProductError(error)
    )
  }

  const onProductSucces = (data) => {
    console.log(data)
    setProducts(data.results)
    // setProducts(data.results);
    // setNextPage(data.next);
    // setPrevPage(data.previous);
    // setCount(data.count);
    // setLoading(false);
  }

  const onProductError = (error) => {
    console.log(error)
    // setError(error);
    // setLoading(false);
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
        <div className="bg-white pt-[160px] lg:pt-[150px]">
          <div className="h-32 lg:h-60 w-full py-2 px-6 mt-4">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={`${brand != null ? brand.cover : nbDefaultImage}`}
              onError={(e) => (e.target.src = nbDefaultImage)}
            />
          </div>

          <div className="grid gap-2 lg:flex mt-2 px-6 py-2 lg:gap-4 ">
            <div className="w-full lg:w-1/5 h-full">
              <div className="w-full h-full flex flex-col">
                <h3 className=" pl-3 font-bold ">
                  {t("brandDetail_AboutBrand")}
                </h3>
                {brand != null ? (
                  <div className="mt-2 p-3 flex flex-col rounded-lg">
                    <div className="flex flex-row">
                      <img
                        className="h-28 w-28 rounded-lg"
                        src={brand.logo}
                        alt="error"
                        onError={(e) => (e.target.src = nbDefaultImage)}
                      />
                      <div className="flex flex-col pl-3">
                        <h3 className="font-bold text-lg">{brand.name}</h3>
                        <p className="text-sm">{brand.origin}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{brand.description}</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="w-full h-full bg-white lg:w-4/5">
              <div className="w-full h-full flex flex-col">
                <h3 className="font-bold">Products </h3>
                <div className="mt-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                  {arrproducts.map((product) => (
                    <div key={product.id}>
                      <Link to={`/products/${product.slug}`}>
                        <div className="relative">
                          <div className="relative h-72 w-full overflow-hidden rounded-lg">
                            <img
                              src={`${product.cover}`}
                              alt={nbDefaultImage}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => (e.target.src = nbDefaultImage)}
                            />
                          </div>
                          <div className="relative mt-4">
                            <p className="text-sm font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Discount: {product.discount}
                            </p>
                            {product.min_price == product.max_price ? (
                              <h4 className=" text-sm">
                                Rp.{priceFormatter(product.min_price)}
                              </h4>
                            ) : (
                              <h4 className="text-sm">
                                Rp.{priceFormatter(product.min_price)} - Rp.
                                {priceFormatter(product.max_price)}{" "}
                              </h4>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {/*  */}
                <div className="flex items-center justify-center mt-8 mb-4">
                  <ul className="flex items-center -mx-[6px]">
                    <li className="px-[6px]">
                      <a
                        href="#"
                        className="w-9 h-9 flex items-center justify-center rounded-md text-lg border border-[#EDEFF1]text-[#838995] hover:text-xl "
                        onClick={() => getProducts(prevPage)}
                      >
                        <span>
                          <FaChevronLeft className="h-15 w-8" />
                        </span>
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="#"
                        className=" w-9 h-9 flex items-center text-lg justify-center rounded-md border  border-[#EDEFF1]text-[#838995] hover:text-xl"
                        onClick={() => getProducts(nextPage)}
                      >
                        <span>
                          <FaChevronRight className="h-15 w-8" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default BrandDetail
