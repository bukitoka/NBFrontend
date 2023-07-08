import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

// hero icons
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    UserIcon,
    LanguageIcon,
    MicrophoneIcon,
} from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'

// images
import nanobeepa from '../assets/nanobeepa.png'

import TopBanner from "../components/TopBanner"


const Navbar = ({ open, setOpen, classNames, navigation, socials }) => {

    return (
        <div className="bg-white">

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

                                {/* Wide search field */}
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
                                                className="block w-[400px] rounded-full border-0 bg-gray-100 py-1.5 pl-10 pr-3 text-gray-900
                                                 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:bg-white
                                                  sm:text-sm sm:leading-6 hover:bg-white hover:ring-1 hover:ring-inset hover:ring-gray-400"
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
                                        <a href="#" className="p-2 flex text-gray-700 hover:text-yellow-600">
                                            <span className="sr-only">Help</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            <span className="text-sm font-medium ml-2"> Help </span>
                                        </a>

                                        {/* Language */}
                                        <a href="#" className="hidden lg:flex lg:ml-6 text-gray-700 hover:text-yellow-600">
                                            <span className="sr-only">Language</span>
                                            <LanguageIcon className="h-5 w-5" aria-hidden="true" />
                                            <span className="text-sm font-medium ml-2"> EN </span>
                                        </a>

                                        {/* Login */}
                                        <a href="#" className="hidden lg:flex lg:ml-6 text-gray-700 hover:text-yellow-600">
                                            <span className="sr-only">Login</span>
                                            <UserIcon className="h-5 w-5" aria-hidden="true" />
                                            <span className="text-sm font-medium ml-2"> Login </span>
                                        </a>

                                        {/* Cart */}
                                        <div className="ml-4 flow-root lg:ml-8">
                                            <a href="#" className="group -m-2 flex items-center p-2">
                                                <ShoppingBagIcon
                                                    className="h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-yellow-600"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-yellow-600">0</span>
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
                                <div className="flex space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open ? 'border-b-indigo-600 text-indigo-600' : 'border-b-transparent text-gray-700 hover:text-yellow-600',
                                                                'relative z-10 py-3 flex items-center border-b-2  text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
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
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
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
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-yellow-600"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="flex space-x-6 ml-4">
                                    <div className="my-2.5 ml-6 mr-8 border-l"></div>
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-yellow-600"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>

                            </div>
                        </Popover.Group>
                        {/* End flyout menu */}
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
