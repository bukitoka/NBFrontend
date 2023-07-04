import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    XMarkIcon,
    UserIcon,
    LanguageIcon,
    MicrophoneIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import nanobeepa from '../assets/nanobeepa.png'

import TopBanner from "../components/TopBanner"

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
    categories: [
        {
            name: 'Categories',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
                    imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
                },
                {
                    name: 'Carry',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
                    imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
                },
            ],
        },
        {
            name: 'Brands',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
                    imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
                    imageAlt: 'Model wearing light heather gray t-shirt.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
                    imageAlt:
                        'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
                },
                {
                    name: 'Carry',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
                    imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
                },
            ],
        },
    ],
    pages: [
        { name: 'New', href: '#' },
        { name: 'Promotions', href: '#' },
        { name: 'Articles', href: '#' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white">

            {/* Mobile menu */}
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
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
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-12 px-4 py-6">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name} className="group relative">
                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                            </div>
                                                            <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create an account
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {/* Currency selector */}
                                    <form>
                                        <div className="inline-block">
                                            <label htmlFor="mobile-currency" className="sr-only">
                                                Currency
                                            </label>
                                            <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                                <select
                                                    id="mobile-currency"
                                                    name="currency"
                                                    className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                                                >
                                                    {currencies.map((currency) => (
                                                        <option key={currency}>{currency}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="w-full z-40 top-0 fixed">

                {/* Top Banner */}
                <TopBanner />

                <nav aria-label="Top">
                    {/* main navigation */}
                    <div className="bg-white border-b border-b-gray-200">
                        <div className="bg-white lg:border-b border-gray-200 border-b-0">
                            <div className="flex h-16 items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                {/* Logo (lg+) */}
                                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                    <a href="#">
                                        <span className="sr-only">NanoBeepa</span>
                                        <img
                                            className="h-8 w-auto"
                                            src={nanobeepa}
                                            alt="NanoBeepa"
                                        />
                                    </a>
                                    <h1 className='text-xl pt-2 ml-3'>NanoBeepa</h1>
                                </div>

                                <div className="hidden h-full lg:flex mr-20">
                                    <div className="flex items-center py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-sm xl:px-0">
                                        <a href="#" className="hidden lg:block lg:mr-4 p-2 rounded-full bg-gray-100 text-gray-600 hover:text-gray-800">
                                            <span className="sr-only">Speech</span>
                                            <MicrophoneIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        <label htmlFor="search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-[400px] rounded-full border-0 bg-gray-100 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:bg-white sm:text-sm sm:leading-6"
                                                placeholder="Search anything"
                                                type="search"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile menu and search (lg-) */}
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Search */}
                                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Logo (lg-) */}
                                <a href="#" className="lg:hidden">
                                    <span className="sr-only">NanoBeepa</span>
                                    <img
                                        src={nanobeepa}
                                        alt="NanoBeepa"
                                        className="h-8 w-auto"
                                    />
                                </a>

                                <div className="flex flex-1 items-center justify-end">
                                    <div className="flex items-center lg:ml-8">
                                        {/* Help */}
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Help</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                            Help
                                        </a>

                                        {/* Language */}
                                        <a href="#" className="hidden lg:block lg:ml-6 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">login</span>
                                            <LanguageIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        <a href="#" className="hidden lg:ml-2 text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                            EN
                                        </a>

                                        {/* Login */}
                                        <a href="#" className="hidden lg:block lg:ml-6 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">login</span>
                                            <UserIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        <a href="#" className="hidden lg:ml-2 text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                            Login
                                        </a>

                                        {/* Cart */}
                                        <div className="ml-4 flow-root lg:ml-8">
                                            <a href="#" className="group -m-2 flex items-center p-2">
                                                <ShoppingBagIcon
                                                    className="h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                                <span className="sr-only">items in cart, view bag</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second menu */}
                        <div className="hidden h-full lg:flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-full justify-center space-x-8">
                                {navigation.categories.map((category) => (
                                    <div key={category.name} className="relative flex">
                                        <div
                                            className={classNames(
                                                open ? 'border-b-indigo-600 text-indigo-600' : 'border-b-transparent text-gray-700 hover:text-gray-800',
                                                'relative z-10 py-3 flex items-center border-b-2  text-sm font-medium transition-colors duration-200 ease-out'
                                            )}
                                        >
                                            {category.name}
                                        </div>
                                    </div>
                                ))}

                                {navigation.pages.map((page) => (
                                    <a
                                        key={page.name}
                                        href={page.href}
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        {page.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
