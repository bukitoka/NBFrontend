import { Fragment, useState, useEffect } from "react"
import { Popover, Transition } from "@headlessui/react"
import { apiGet } from "../api/ApiService"

// hero icons
import {
  Bars3Icon,
  UserIcon,
  ChevronDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
// images
import { nbwhite } from "../assets"

// components
import TopBanner from "../components/TopBanner"
import Search from "@/components/Search"
import LanguageOption from "./Language"

// store
import useCategoryStore from "../store/categoryStore"
import useAuthStore from "../store/authStore"

const Navbar = ({ setOpen, classNames }) => {
  const [isShowingArray, setIsShowingArray] = useState([])

  // Brands Group Alphabet
  const alphabet = []
  for (let i = 97; i <= 122; i++) {
    // ASCII codes for 'a' to 'z'
    const letter = String.fromCharCode(i).toUpperCase()
    alphabet.push(letter)
  }

  const handlePanel = (index) => {
    setIsShowingArray((prevArray) => {
      const newArray = [...prevArray]
      newArray[index] = !newArray[index]
      return newArray
    })
  }

  const { categories, fetchCategories } = useCategoryStore()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchCategories()
    if (isLoggedIn) {
      fetchCart()
    }

  }, [])

  const fetchCart = async () => {
    if (isLoggedIn) {
      await apiGet(
        `cart/`,
        (data) => onSuccessLoadCart(data),
        (err) => onErrorLoadCart(err)
      )
    } else {
      return
    }
  }

  function onSuccessLoadCart(data) {
    setTotalItems(data.cart_items.length)
  }

  function onErrorLoadCart(error) {
    console.log(error)
  }

  return (
    <div className="bg-transparent">
      <header className="w-full z-40 top-0 fixed">
        {/* Top Banner */}
        <TopBanner />

        <nav aria-label="Top">
          {/* main navigation */}
          <div className="backdrop-blur-[14px] bg-black/90 border-b border-b-zinc-800">
            <div className="bg-transparent lg:border-b border-gray-800 border-b-0">
              <div className="flex h-16 items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Logo (lg+) */}
                <a
                  href="/"
                  className="hidden lg:flex lg:flex-1 lg:items-center"
                >
                  <span className="sr-only">NanoBeepa</span>
                  <img className="h-8 w-auto" src={nbwhite} alt="NanoBeepa" />
                  <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-t from-yellow-500 to-yellow-50 pt-2 ml-3">
                    NanoBeepa
                  </h1>
                </a>

                {/* Wide search field */}
                <div className="hidden h-full lg:flex mr-20">
                  <Search />
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-lg bg-white/10 p-2 text-gray-300"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <a href="#" className="ml-6 flex">
                    <span className="sr-only">NanoBeepa</span>
                    <img src={nbwhite} alt="NanoBeepa" className="h-8 w-auto" />
                    <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-t from-yellow-500 to-yellow-50 pt-2 ml-3">
                      NanoBeepa
                    </h1>
                  </a>
                </div>

                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    <a
                      href="#"
                      className="hidden p-2 lg:flex text-gray-200 hover:text-yellow-500"
                    >
                      <span className="sr-only">Feedback</span>
                      <HeartIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-medium ml-2">Feedback</span>
                    </a>

                    {/* Language */}
                    <LanguageOption />

                    {/* Login */}
                    <a
                      href={isLoggedIn ? "/account/" : "/signin/"}
                      className="hidden lg:flex lg:ml-6 text-gray-400 lg:text-gray-200 hover:text-yellow-500"
                    >
                      <span className="sr-only">
                        {" "}
                        {isLoggedIn ? "Account" : "Login"}{" "}
                      </span>
                      <UserIcon
                        className="h-6 w-6 lg:h-5 lg:w-5"
                        aria-hidden="true"
                      />

                      {/* Show profile if user logged in */}
                      <span className="hidden lg:block text-sm font-medium ml-2">
                        {" "}
                        {isLoggedIn ? "Account" : "Login"}{" "}
                      </span>
                    </a>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <a
                        href="/cart"
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          className="h-7 w-7 flex-shrink-0 text-yellow-500 group-hover:text-yellow-600"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-yellow-500 group-hover:text-yellow-600">
                          {totalItems}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden h-full lg:flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex w-full h-full">
                <div className="flex space-x-5">
                  <a
                    href="/new-arrival"
                    className="flex py-3 items-center text-sm font-medium  text-gray-200 hover:text-yellow-500"
                  >
                    NEW ARRIVALS
                  </a>

                  {categories.map((category, index) => (
                    <Popover key={category.id} className="flex">
                      <div>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              isShowingArray[index]
                                ? "border-b-yellow-600 text-yellow-600"
                                : "border-b-transparent text-gray-200 hover:text-yellow-500",
                              "relative z-10 py-3 flex items-center border-b-2 focus:outline-0 text-sm font-medium transition-colors duration-200 ease-out"
                            )}
                            onMouseEnter={() => handlePanel(index)}
                            onMouseLeave={() => handlePanel(index)}
                          >
                            {category.name}{" "}
                            <ChevronDownIcon
                              className={classNames(
                                isShowingArray[index]
                                  ? "rotate-180 transform"
                                  : "",
                                "ml-1 w-4 h-4"
                              )}
                            />
                          </Popover.Button>
                        </div>

                        <Transition
                          show={isShowingArray[index]}
                          onMouseEnter={() => handlePanel(index)}
                          onMouseLeave={() => handlePanel(index)}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-5 gap-x-4  gap-y-5 py-16">
                                  {category.subcategory.map((section) => (
                                    <div key={section.name}>
                                      <p
                                        id={`${section.name}-heading`}
                                        className="font-medium text-gray-900"
                                      >
                                        {section.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${section.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {section.subsubcategory.map((item) => (
                                          <li key={item.name} className="flex">
                                            <a
                                              href={`/category/${item.slug}`}
                                              className="hover:text-gray-800"
                                            >
                                              {item.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </div>
                    </Popover>
                  ))}

                  <Popover key={`newkey`} className="flex">
                    <div>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            isShowingArray[categories.length + 1]
                              ? "border-b-yellow-600 text-yellow-600"
                              : "border-b-transparent text-gray-200 hover:text-yellow-500",
                            "relative z-10 py-3 flex items-center border-b-2 focus:outline-0 text-sm font-medium transition-colors duration-200 ease-out"
                          )}
                          onMouseEnter={() =>
                            handlePanel(categories.length + 1)
                          }
                          onMouseLeave={() =>
                            handlePanel(categories.length + 1)
                          }
                        >
                          {`BRANDS`}{" "}
                          <ChevronDownIcon
                            className={classNames(
                              isShowingArray[categories.length + 1]
                                ? "rotate-180 transform"
                                : "",
                              "ml-1 w-4 h-4"
                            )}
                          />
                        </Popover.Button>
                      </div>

                      <Transition
                        show={isShowingArray[categories.length + 1]}
                        onMouseEnter={() => handlePanel(categories.length + 1)}
                        onMouseLeave={() => handlePanel(categories.length + 1)}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />

                          <div className="relative bg-white">
                            <div className="flex gap-4 mx-auto max-w-7xl px-8 py-16">
                              {/* maaping alphabet as link */}
                              <div className="overflow-x-scroll flex gap-x-4 rounded-md">
                                {alphabet.map((item) => (
                                  <a
                                    href={`/brand/${item}`}
                                    className="text-gray-500 hover:text-gray-900 font-bold py-2 px-4 bg-zinc-100 hover:bg-zinc-200 rounded-md"
                                    key={item}
                                  >
                                    {item}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </div>
                  </Popover>

                  <a
                    href="#"
                    className="flex py-3 items-center text-sm font-medium text-gray-200 hover:text-yellow-500"
                  >
                    BEAUTY STORIES
                  </a>
                  <a
                    href="#"
                    className="flex py-3 items-center text-sm font-medium text-gray-200 hover:text-yellow-500"
                  >
                    SALE & PROMO
                  </a>
                </div>
              </div>
            </Popover.Group>
            {/* End flyout menu */}

            {/* Search Mobile Version */}
            <div className="d-flex h-full border-t border-t-zinc-800 lg:border-t-0 w-full lg:hidden px-4">
              <Search />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
