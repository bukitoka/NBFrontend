
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import { useLocation } from 'react-router-dom'
import { fetchCartItems } from '../api/CartApi'
import { apiGet, apiPost } from '../api/ApiService'
import Modal from '../components/modal'
import NewAddressModal from './confirmOrder/component/addNewAddress'
import ConfirmOrder from '../components/ConfirmOrder'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
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


const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)
  const [openModalNewAdress, setModalNewAddress] = useState(false)
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const [selectedCartItems, setCartItems] = useState([])
  const location = useLocation()
  const listId = location.state?.listid || [];
  const [shippingList, setShippingList] = useState([]);
  const [selectectShipping, setSelectedShping] = useState(null);
  const [openConfirmOrder, setOpenConfirmOrder] = useState(false);
  const [tariffList, setTariffList] = useState([])
  const baseurl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    // getCartItems((data) => onSuccess(data), (error) => onError(error))
    getShippingData((data) => onShippingSuccess(data), (error) => onShippingError(error))
    chekTariff()
    getSelectedCartItems()
  }, [])

  const getShippingData = async (onSucces, onError) => {
    await apiGet('shipping/', onSucces, onError);
  }

  const getSelectedCartItems = async () => {
    await apiGet(`selected-item/`, (data) => onSuccessGetData(data), (error) => onErrorGetData(error))
  }

  function onSuccessGetData(data) {
    setCartItems(data);
    console.log('selected Data');
    console.log(data);
    // setCartItems(data);
  }


  function onErrorGetData(error) {
    console.log(error);
  }

  function onShippingSuccess(data) {
    // return when is default is true
    const shippingList = data.results.filter((shipping) => shipping.is_default === true);
    setShippingList(shippingList);
  }

  function onShippingError(error) {
    // console.log(error);
  }

  const getCartItems = async (onsucces, onError) => {
    await fetchCartItems(onsucces, onError);
  }

  // handle when get cart items success
  function onSuccess(data) {
    const allCartItems = data.cart_items;
    const cartItems = allCartItems.filter((cartItem) => listId.includes(cartItem.id));
    setCartItems(cartItems);
    console.log(cartItems);
  }

  // handle when get cart items error
  function onError(error) {
    console.log(error);
  }

  const handleOpenModalNewAddress = () => {
    setOpen(false);
    setModalNewAddress(true);
  }


  const chekTariff = () => {
    apiGet(`tariff/`, (res) => onSuccessTariff(res), (res) => onErrorTariff(res))
  }

  function onSuccessTariff(data) {
    setTariffList(data);
  }

  function onErrorTariff(error) {
    console.log(error);
  }

  const createOrder = async () => {
    console.log(shippingList[0].id);
    setOpenConfirmOrder(true);

    // await apiPost(`order/create/`, {
    //   shipping: shippingList[0].id,
    //   shipping_type: "REGPACK"
    // }, (res) => onSuccessCreateOrder(res), (res) => onErrorCreateOrder(res))
  }

  function onSuccessCreateOrder(data) {
    console.log(data);
  }

  function onErrorCreateOrder(error) {
    console.log(error);
  }


  // open and close mobile menu
  const [openMobile, setOpenMobile] = useState(false)

  return (
    <div>
      {/* Mobile Navigation */}
      <MobileMenu open={openMobile} setOpen={setOpenMobile} classNames={classNames} navigation={navigation} socials={socials} />

      {/* Navbar */}
      <Navbar open={openMobile} setOpen={setOpenMobile} classNames={classNames} navigation={navigation} socials={socials} />
      <main>

        <div className=" bg-zinc-100 pt-[140px] lg:pt-[96px]">

          <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h1 className="sr-only">Checkout</h1>

              <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>

                  <div className="mt-10 lg:mt-0">
                    <h2 className="text-lg font-medium text-gray-900">Shipping</h2>

                    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                      <h3 className="sr-only">Items in your cart</h3>

                      <dl className="space-y-3 border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className=" flex-col">
                          <dt className="text-sm">Receiver</dt>
                          {/* show when is_dedault is true */}
                          {shippingList.length > 0 && (
                            <dd className="text-sm font-medium text-gray-900">{shippingList[0].receiver_name}</dd>
                          )}
                        </div>
                        <div className=" flex-col">
                          <dt className="text-sm">Phone Number</dt>
                          {shippingList.length > 0 && (
                            <dd className="text-sm font-medium text-gray-900">{shippingList[0].receiver_phone}</dd>
                          )}
                        </div>
                        <div className="flex-col">
                          <dt className="text-sm">Address</dt>
                          {shippingList.length > 0 && (
                            <dd className="text-sm font-medium text-gray-900">{shippingList[0].receiver_address}</dd>
                          )}

                        </div>
                        <div className="flex-col">
                          <dt className="text-sm">Kec/Kab</dt>
                          {shippingList.length > 0 && (
                            <dd className="text-sm font-medium text-gray-900">{shippingList[0].destination.route}</dd>
                          )}
                        </div>
                      </dl>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <button
                          type="button"
                          onClick={() => setOpen(true)}
                          className="w-full rounded-md border border-transparent bg-zinc-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                          Select another address
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                      <RadioGroup.Label className="text-lg font-medium text-gray-900">Delivery method</RadioGroup.Label>

                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {tariffList.map((tariff, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={tariff.shipping_type}
                            className={({ checked, active }) =>
                              classNames(
                                checked ? 'border-transparent' : 'border-gray-300',
                                active ? 'ring-2 ring-yellow-500' : '',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                              )
                            }
                          >
                            {({ checked, active }) => (
                              <>
                                <span className="flex flex-1">
                                  <span className="flex flex-col">
                                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                      {tariff.shipping_type}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-1 flex items-center text-sm text-gray-500"
                                    >
                                      {tariff.shipping_type}
                                    </RadioGroup.Description>
                                    <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                      {tariff.total_traif}
                                    </RadioGroup.Description>
                                  </span>
                                </span>
                                {checked ? (
                                  <CheckCircleIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                                ) : null}
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-yellow-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Payment */}
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                    <fieldset className="mt-4">
                      <legend className="sr-only">Payment type</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                          <div key={paymentMethod.id} className="flex items-center">
                            {paymentMethodIdx === 0 ? (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                type="radio"
                                defaultChecked
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                            ) : (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                            )}

                            <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                              {paymentMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                      <div className="col-span-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                          Card number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="col-span-4">
                        <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                          Name on card
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="name-on-card"
                            name="name-on-card"
                            autoComplete="cc-name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                          Expiration date (MM/YY)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0">
                  <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                  <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <h3 className="sr-only">Items in your cart</h3>
                    <ul role="list" className="divide-y divide-gray-200">
                      {selectedCartItems.map((cartItem) => (
                        console.log(cartItem),
                        <li key={cartItem.id} className="flex px-4 py-6 sm:px-6">
                          <div className="flex-shrink-0">
                            <img src={`${baseurl}${cartItem.product_data.image}`} alt={`${baseurl}${cartItem.product_data.image}`} className="w-20 rounded-md" />
                          </div>

                          <div className="ml-6 flex flex-1 flex-col">
                            <div className="flex">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                  <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                    {cartItem.product_data.name}
                                  </a>
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">Size: {cartItem.product_data.size} gr</p>
                                <p className="mt-1 text-sm text-gray-500">{cartItem.quantity} pcs</p>
                              </div>
                            </div>

                            <div className="flex flex-1 items-end justify-between pt-2">
                              <p className="mt-1 text-sm font-medium text-gray-900">Rp.{cartItem.total_price}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                      </div>
                      {/* <div className="flex items-center justify-between">
                        <dt className="text-sm">Taxes</dt>
                        <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                      </div> */}
                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">$75.52</dd>
                      </div>
                    </dl>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <button
                        onClick={() => createOrder()}
                        type="button"
                        className="w-full rounded-md border border-transparent bg-zinc-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Confirm order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </main>

          {/* Modal */}
          <Modal open={open} setOpen={setOpen} openModalNewAddress={handleOpenModalNewAddress} />
          <NewAddressModal open={openModalNewAdress} setOpen={setModalNewAddress} />
          <ConfirmOrder open={openConfirmOrder} setOpen={setOpenConfirmOrder} />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
