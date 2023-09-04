import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../api/CartApi'
// simple icons
import {
  SiWhatsapp,
  SiInstagram,
  SiFacebook,
  SiTiktok,
} from '@icons-pack/react-simple-icons'

// components
import Navbar from "../components/Navbar"
import MobileMenu from "../components/MobileMenu"
import Footer from '../components/Footer'

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


export default function Cart() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [cartItems, setCartItems] = useState([]);
  const [listid, setListid] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const altImage = import.meta.env.VITE_API_NO_IMAGE_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
    getCartItems((data) => onSuccess(data), (error) => onError(error))
  }, [])

  // use effect when listid change
  useEffect(() => {
    updateSummaryCart();
  }, [listid])

  const getCartItems = async (onsucces, onError) => {
    await fetchCartItems(onsucces, onError);
  }

  // handle when get cart items success
  function onSuccess(data) {
    setCartItems(data.cart_items);
  }

  // handle when get cart items error
  function onError(error) {
    console.log(error);
  }

  function handleChangeCheckbox(event, cartid) {
    if (!event.target.checked) {
      const selectAll = document.getElementById('select-all');
      selectAll.checked = false;
    }

    if (event.target.checked) {
      setListid([...listid, cartid]);
    } else {
      const index = listid.indexOf(cartid);
      if (index > -1) {
        listid.splice(index, 1);
      }
      setListid(listid);
      // call update summary cart
      updateSummaryCart();
    }

  }

  function handleSelectAll(event) {
    const checkboxes = document.querySelectorAll('input[name="cart-item"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = event.target.checked;
    });

    if (event.target.checked) {
      const ids = cartItems.map(item => item.id);
      setListid(ids);
    } else {
      setListid([]);
    }
  }

  function showCheckout() {
    navigate('/checkout', { state: { listid: listid } });
  }

  // update summary cart
  function updateSummaryCart() {
    let subTotal = 0;

    // calculate subtotal
    cartItems.forEach((cartItem) => {
      if (listid.includes(cartItem.id)) {
        subTotal = subTotal + cartItem.total_price;
      }
    })

    // update subtotal
    setSubTotal(subTotal);

    // TODO: calculate total payment
    // add if need to calculate total payment

    // update total payment
    setTotalPayment(subTotal);
  }

  // open and close mobile menu
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Mobile Navigation */}
      <MobileMenu open={open} setOpen={setOpen} classNames={classNames} navigation={navigation} socials={socials} />

      {/* Navbar */}
      <Navbar open={open} setOpen={setOpen} classNames={classNames} navigation={navigation} socials={socials} />
      <main>


        {/* shopping cart */}
        <div className="bg-white  pt-[130px] lg:pt-[86px] ">
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 ">

              <section aria-labelledby="cart-heading" className="lg:col-span-7 ">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="select-all"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      All
                    </label>
                  </div>
                </div>


                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {cartItems.map((cart, cartidx) => (
                    <li key={cart.id} className="flex py-6 sm:py-10 ">

                      <div className="flex-shrink-0 ">
                        <div className='flex'>
                          <input
                            key={cart.id}
                            aria-describedby="comments-description"
                            name="cart-item"
                            type="checkbox"
                            onChange={(e) => handleChangeCheckbox(e, cart.id)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                          />
                          <img
                            src={`${baseurl}${cart.product_data.image}`}
                            alt={altImage}
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 ">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                  {cart.product_data.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500"></p>
                              {true ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">product size</p>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">{cart.product_data.price}</p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">

                            <div className="flex items-center border-gray-100">
                              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                              <input className="h-8 w-12 border-gray-100 bg-transparent text-center text-xs appearance-none focus:outline-none" type="number" value={cart.quantity} min="1" />
                              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                            </div>

                            <div className="absolute right-0 top-0">
                              <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {false ? (
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                          ) : (
                            <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                          )}

                          <span>{false ? 'In stock' : `Ships in 3 week`}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">RP. {subTotal}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping estimate</span>
                      <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how shipping is calculated</span>
                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">Rp 5.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Tax estimate</span>
                      <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Learn more about how tax is calculated</span>
                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">RP. 8.32</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 ">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">RP. {totalPayment}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={showCheckout}
                    disabled={listid.length === 0}
                    className={`w-full rounded-md border border-transparent ${listid.length === 0 ? 'bg-gray-300' : 'bg-indigo-600 '} px-4 py-3 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 ${listid.length === 0 ? 'focus:ring-gray-300' : 'focus:ring-indigo-500 '}  focus:ring-offset-2 focus:ring-offset-gray-50`}
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
