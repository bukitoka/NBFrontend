import { useState, useEffect } from "react";
import { apiGet } from "@/api/ApiService";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { priceFormatter } from "@/tools/reformat"

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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

const OrderHistoryDetail = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState(null);
  const [arrproducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getBrandDetail();
  }, []);

  const getBrandDetail = async () => {
    await apiGet(`brand/${slug}/`, (data) => onBrandSucces(data), (error) => onBrandError(error))
  }

  const onBrandSucces = (data) => {
    setBrand(data);
    getProducts(data.slug);
    console.log(data.id);

  }

  const onBrandError = (error) => {
    console.log(error);
  }


  // get products by brand
  const getProducts = async (productid) => {
    await apiGet(`product/?brand__slug=${productid}`, (data) => onProductSucces(data), (error) => onProductError(error))
  }

  const onProductSucces = (data) => {
    console.log(data);
    setProducts(data.results);
    // setProducts(data.results);
    // setNextPage(data.next);
    // setPrevPage(data.previous);
    // setCount(data.count);
    // setLoading(false);
  }

  const onProductError = (error) => {
    console.log(error);
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
        <div className="bg-white">
          <div className="py-1">
            <div className="mt-2">
              <h2 className="sr-only">Recent orders</h2>
              <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                <div className=" space-y-8 sm:px-4 lg:px-0">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:p-4">
                        <div className='flex flex-row '>
                          <ShoppingBagIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <time dateTime={order.created_at} className="text-gray-500 ml-2">{dayjs(order.created_at).format('DD/MM/YYYY')}</time>
                        </div>
                        <div className='flex flex-row'>
                          <CircleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p className='text-gray-500 ml-2'>Order Status: {order.status}</p>
                        </div>
                      </div>

                      {/* Products */}
                      <h4 className="sr-only">Items</h4>
                      <ul role="list" className="divide-y divide-gray-200">

                        {
                          order.order_items.length >= 1 && (
                            <li key={order.order_items[0].id} className="p-4 sm:p-6">
                              <div className="flex items-center sm:items-start">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                  <img
                                    src={`${baseurl}/media/${order.order_items[0].stock_image}`}
                                    alt={altImage}
                                    className="h-full w-full object-cover object-center"
                                    onError={(e) => { e.target.onerror = null; e.target.src = nbDefaultImage }}
                                  />
                                </div>
                                <div className="ml-6 flex-1 text-sm">
                                  <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                    <h5>{order.order_items[0].product_name}</h5>
                                    {order.order_items.length > 1 && (<p className="block text-gray-500 sm:hidden">+{order.order_items.length - 1} products </p>)}
                                    <p className='mt-2 sm:mt-0'>Total Amount | Rp. {priceFormatter(order.total_amount)}</p>
                                  </div>
                                  <p className="hidden text-gray-500 sm:mt-2 sm:block">total items : {order.order_items[0].quantity} pcs </p>
                                  <p className="hidden text-gray-500 sm:mt-2 sm:block">price/item : Rp. {priceFormatter(order.order_items[0].stock_price)}</p>
                                  <p className="hidden text-gray-500 sm:mt-2 sm:block">size : {order.order_items[0].stock_size}</p>
                                  {order.order_items.length > 1 && (<p className="hidden text-gray-500 sm:mt-2 sm:block">+{order.order_items.length - 1} products </p>)}
                                </div>

                              </div>
                              <div className="mt-2 sm:flex sm:justify-end">
                                <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                  <div className="flex flex-1 justify-center">
                                    <a
                                      href={"/order-history"}
                                      className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                    >
                                      View details
                                    </a>
                                  </div>
                                  {
                                    order.status == 'pending' && (
                                      <div className="flex flex-1 justify-center pl-4">
                                        <button type="button"
                                          onClick={() => handlePayOrder(order.id)}
                                          className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                          Pay
                                        </button>
                                      </div>
                                    )
                                  }
                                </div>
                              </div>
                            </li>

                          )
                        }
                      </ul>
                    </div>
                  ))}

                  { /* if order is empty */
                    orders.length == 0 &&
                    <div className="flex flex-col justify-center items-center">
                      <FiShoppingBag className="text-6xl text-gray-400" />
                      <p className='mt-2'>you don't have an order record please visit the product page</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderHistoryDetail;
