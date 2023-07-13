import { useState } from 'react'

// simple icons
import {
    SiWhatsapp,
    SiInstagram,
    SiFacebook,
    SiTiktok,
} from '@icons-pack/react-simple-icons'

import Navbar from "../components/Navbar"
import Carousel from "../components/Carousel"
import Stats from "../components/Stats"
import TopPromo from "../components/TopPromo"
import MobileMenu from "../components/MobileMenu"
import CategorySection from '../components/CategorySection'

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
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
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
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Collections', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Promo', href: '#' },
    ],
}

const socials = [
    {
        name: 'Whatsapp',
        href: '#',
        icon: <SiWhatsapp className='h-[18px] w-[18px] text-gray-500 hover:text-green-600' />,
    },
    {
        name: 'Instagram',
        href: '#',
        icon: <SiInstagram className='h-[18px] w-[18px] text-gray-500 hover:text-red-400' />,
    },
    {
        name: 'Facebook',
        href: '#',
        icon: <SiFacebook className='h-[18px] w-[18px] text-gray-500 hover:text-blue-500' />,
    },
    {
        name: 'Tiktok',
        href: '#',
        icon: <SiTiktok className='h-[18px] w-[18px] text-gray-500 hover:text-black' />,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const categories = [
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

const collections = [
    {
        name: 'Handcrafted Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
        imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
        description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
    },
    {
        name: 'Organized Desk Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
        imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
        description: 'The rest of the house will still be a mess, but your desk will look great.',
    },
    {
        name: 'Focus Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
        imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
        description: 'Be more productive than enterprise project managers with a single piece of paper.',
    },
]
const footerNavigation = {
    shop: [
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
    account: [
        { name: 'Manage Account', href: '#' },
        { name: 'Returns & Exchanges', href: '#' },
        { name: 'Redeem a Gift Card', href: '#' },
    ],
    connect: [
        { name: 'Contact Us', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'Pinterest', href: '#' },
    ],
}

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
                <CategorySection categories={categories} />

                {/* Featured section */}
                <section
                    aria-labelledby="social-impact-heading"
                    className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
                >
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                                <h2 id="social-impact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    <span className="block sm:inline">Level up</span>
                                    <span className="block sm:inline">your desk</span>
                                </h2>
                                <p className="mt-3 text-xl text-white">
                                    Make your desk beautiful and organized. Post a picture to social media and watch it get more likes
                                    than life-changing announcements. Reflect on the shallow nature of existence. At least you have a
                                    really nice desk setup.
                                </p>
                                <a
                                    href="#"
                                    className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                                >
                                    Shop Workspace
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Collection section */}
                <section
                    aria-labelledby="collection-heading"
                    className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
                >
                    <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Shop by Collection
                    </h2>
                    <p className="mt-4 text-base text-gray-500">
                        Each season, we collaborate with world-class designers to create a collection inspired by the natural world.
                    </p>

                    <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                        {collections.map((collection) => (
                            <a key={collection.name} href={collection.href} className="group block">
                                <div
                                    aria-hidden="true"
                                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                                >
                                    <img
                                        src={collection.imageSrc}
                                        alt={collection.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{collection.description}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Featured section */}
                <section aria-labelledby="comfort-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg"
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                                <h2 id="comfort-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Simple productivity
                                </h2>
                                <p className="mt-3 text-xl text-white">
                                    Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best
                                    here. No kanban boards, burndown charts, or tangled flowcharts with our Focus system. Just the
                                    undeniable urge to fill empty circles.
                                </p>
                                <a
                                    href="#"
                                    className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                                >
                                    Shop Focus
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <Stats />

            </main>

            <footer aria-labelledby="footer-heading" className="bg-gray-900">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                <div>
                                    <h3 className="text-sm font-medium text-white">Shop</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.shop.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white">Company</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                <div>
                                    <h3 className="text-sm font-medium text-white">Account</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.account.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white">Connect</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.connect.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-300 hover:text-white">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 md:mt-16 xl:mt-0">
                            <h3 className="text-sm font-medium text-white">Sign up for our newsletter</h3>
                            <p className="mt-6 text-sm text-gray-300">The latest deals and savings, sent to your inbox weekly.</p>
                            <form className="mt-2 flex sm:max-w-md">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="w-full min-w-0 appearance-none rounded-md border border-white bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                                />
                                <div className="ml-4 flex-shrink-0">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 py-10">
                        <p className="text-sm text-gray-400">Copyright &copy; 2021 Your Company, Inc.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
