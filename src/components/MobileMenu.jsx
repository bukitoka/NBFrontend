import { Fragment, useState } from "react"
import { Dialog, Tab, Transition } from "@headlessui/react"
import useAuthStore from "@/store/authStore"
import {
  XMarkIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid"
import useCategoryStore from "@/store/categoryStore"
import SubMenuPanel from "@/components/mobileSidebar/subMenuPanel"

const MobileMenu = ({ open, setOpen }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const { categories, fetchCategories } = useCategoryStore()

  // Define state to keep track of which subcategories and subsubcategories are open
  const [openSubcategories, setOpenSubcategories] = useState({})
  const [openSubsubcategories, setOpenSubsubcategories] = useState({})

  // Function to toggle the visibility of subcategories
  const toggleSubcategory = (subcategoryId) => {
    setOpenSubcategories((prevState) => ({
      ...prevState,
      [subcategoryId]: !prevState[subcategoryId],
    }))
  }

  // Function to toggle the visibility of subsubcategories
  const toggleSubsubcategory = (subsubcategoryId) => {
    setOpenSubsubcategories((prevState) => ({
      ...prevState,
      [subsubcategoryId]: !prevState[subsubcategoryId],
    }))
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  // Brands Group Alphabet
  const alphabet = []
  for (let i = 97; i <= 122; i++) {
    // ASCII codes for 'a' to 'z'
    const letter = String.fromCharCode(i).toUpperCase()
    alphabet.push(letter)
  }

  const staticLinks = [
    {
      name: "New Arrivals",
      href: "/new-arrival/",
    },
    {
      name: "Beauty Stories",
      href: "/blogs",
    },
    {
      name: "Sale & Promo",
      href: "/promo",
    },
    {
      name: "Feedback",
      href: "/feedback/",
    },
  ]

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-[14px] bg-black/90" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex overflow-y-hidden">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white">
              <div className="flex px-4 pb-2 pt-3">
                <button
                  type="button"
                  className="-ml-2 inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    <Tab
                      key="Shop by Category"
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-yellow-600 text-yellow-600"
                            : "border-transparent text-gray-900",
                          "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                        )
                      }
                    >
                      Shop by Category
                    </Tab>
                    <Tab
                      key="Shop by Brand"
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-yellow-600 text-yellow-600"
                            : "border-transparent text-gray-900",
                          "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                        )
                      }
                    >
                      Shop by Brand
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel key="Shop by Category" className="px-4">
                    <div className="space-y-1 h-screen pb-[420px] overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category.id}>
                          {/* Category */}
                          <div className="flow-root">
                            <a
                              onClick={() => toggleSubcategory(category.id)}
                              className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                            >
                              {category.name}
                              <ChevronRightIcon
                                className="float-right h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </a>

                            {/* Render the SubmenuPanel when a category or subcategory is selected */}
                            {openSubcategories[category.id] && (
                              <SubMenuPanel
                                open={openSubcategories[category.id]}
                                onClose={() => toggleSubcategory(category.id)}
                                title={category.name}
                              >
                                {category.subcategory.map((subcategory) => (
                                  <div key={subcategory.id}>
                                    {/* Subcategory */}
                                    <div className="flow-root">
                                      <a
                                        onClick={() =>
                                          toggleSubsubcategory(subcategory.id)
                                        }
                                        className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                                      >
                                        {subcategory.name}
                                        <ChevronRightIcon
                                          className="float-right h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </a>
                                      {/* Render the SubmenuPanel when a subcategory or subsubcategory is clicked */}
                                      {openSubsubcategories[subcategory.id] && (
                                        <SubMenuPanel
                                          open={
                                            openSubsubcategories[subcategory.id]
                                          }
                                          onClose={() =>
                                            toggleSubsubcategory(subcategory.id)
                                          }
                                          title={subcategory.name}
                                        >
                                          {subcategory.subsubcategory.map(
                                            (subsubcategory) => (
                                              <div
                                                key={subsubcategory.id}
                                                className="flow-root"
                                              >
                                                <a
                                                  href={
                                                    "/category/" +
                                                    subsubcategory.slug +
                                                    "/"
                                                  }
                                                  className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                                                >
                                                  {subsubcategory.name}
                                                  <ArrowRightIcon
                                                    className="float-right h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                </a>
                                              </div>
                                            )
                                          )}
                                        </SubMenuPanel>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </SubMenuPanel>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel key="Shop by Brand" className="px-4">
                    <div className="space-y-1 h-screen pb-[420px] overflow-y-auto">
                      {alphabet.map((letter) => (
                        <div key={letter}>
                          {/* Brands Group Alphabet */}
                          <div className="flow-root">
                            <a
                              href={"/brand/" + letter + "/"}
                              className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                            >
                              {letter}
                              <ArrowRightIcon
                                className="float-right h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              <div className="bottom-0 w-full bg-white fixed">
                <div className="border-t border-slate-200 px-4 py-2">
                  <div className="flow-root">
                    {staticLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* languages & account */}
                <div className="px-4 py-2 border-t border-t-slate-200">
                  <a
                    href="#"
                    className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    English
                  </a>

                  <a
                    href={isLoggedIn ? "/account/" : "/signin/"}
                    className="-ml-2 hover:ml-0 px-3 py-2 block font-medium rounded-lg hover:bg-zinc-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    {isLoggedIn ? "My Account" : "Sign In"}
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
