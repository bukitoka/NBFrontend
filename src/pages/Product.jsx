import { useState, useEffect } from 'react'

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
import { fetchProducts } from '../api/ProductApi'

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
                    imageAlt: 'New arrivals on display.',
                },
                {
                    name: 'Top Sales',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Top sale items on display.',
                },
            ],
            sections: [
                {
                    id: 'skin_care',
                    name: 'Skin Care',
                    items: [
                        {
                            name: 'Cleanser',
                            href: '#',
                            subItems: [
                                { name: 'Cleanser', href: '#' },
                                { name: 'Exfoliator', href: '#' },
                                { name: 'Face Wash', href: '#' },
                                { name: 'Face Wipes', href: '#' },
                                { name: 'Makeup Remover', href: '#' },
                                { name: 'Toner', href: '#' },
                            ],
                        },
                        {
                            name: 'Eye Care',
                            href: '#',
                            subItems: [
                                { name: 'Eye Cream', href: '#' },
                                { name: 'Eye Serum', href: '#' },
                                { name: 'Eye Lash Serum', href: '#' },
                                { name: 'Eye Mask', href: '#' },
                            ],
                        },
                        {
                            name: 'Lip Care',
                            href: '#',
                            subItems: [
                                { name: 'Lip Balm', href: '#' },
                                { name: 'Lip Mask', href: '#' },
                                { name: 'Lip Scrub', href: '#' },
                            ],
                        },
                        {
                            name: 'Moisturizer',
                            href: '#',
                            subItems: [
                                { name: 'Day Cream', href: '#' },
                                { name: 'Face Oil', href: '#' },
                                { name: 'Face Mist', href: '#' },
                                { name: 'Night Cream', href: '#' },
                                { name: 'Neck Cream', href: '#' },
                            ],
                        },
                        {
                            name: 'Sun Care',
                            href: '#',
                            subItems: [
                                { name: 'After-Sun Care', href: '#' },
                                { name: 'Body Sunscreen', href: '#' },
                                { name: 'Face Sunscreen', href: '#' },
                            ],
                        },
                        {
                            name: 'Treatment & Mask',
                            href: '#',
                            subItems: [
                                { name: 'Acne & Blemish', href: '#' },
                                { name: 'Face Serum', href: '#' },
                                { name: 'Mask', href: '#' },
                                { name: 'Peel', href: '#' },
                            ],
                        },
                    ],
                },
                {
                    id: 'makeup',
                    name: 'Makeup',
                    items: [
                        {
                            name: 'Face',
                            href: '#',
                            subItems: [
                                { name: 'Bb & Cc Cream', href: '#' },
                                { name: 'Blush', href: '#' },
                                { name: 'Contour & Bronzer', href: '#' },
                                { name: 'Concealer & Corrector', href: '#' },
                                { name: 'Face Sets & Palettes', href: '#' },
                                { name: 'Foundation', href: '#' },
                                { name: 'Highlighter', href: '#' },
                                { name: 'Powder', href: '#' },
                                { name: 'Setting Spray', href: '#' },
                                { name: 'Tinted Moisturizer', href: '#' },
                            ],
                        },
                        {
                            name: 'Eyes',
                            href: '#',
                            subItems: [
                                { name: 'Eye Brow', href: '#' },
                                { name: 'Eye Liner', href: '#' },
                                { name: 'Eyelashes & Brow Serum', href: '#' },
                                { name: 'Eye Shadow', href: '#' },
                                { name: 'Eye Sets', href: '#' },
                                { name: 'Mascara', href: '#' },
                            ],
                        },
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
                    imageAlt: 'New arrivals on display.',
                },
                {
                    name: 'Top Brands',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt: 'Top brands in display.',
                },
            ],
            sections: [
                {
                    id: 'abc',
                    name: 'A - C',
                    items: [
                        {
                            name: 'A',
                            href: '#',
                            subItems: [
                                { name: 'Aesop', href: '#' },
                                { name: 'All Birds', href: '#' },
                                { name: 'Arq', href: '#' },
                            ]
                        },
                        {
                            name: 'B',
                            href: '#',
                            subItems: [
                                { name: 'Baggu', href: '#' },
                                { name: 'Berg & Betts', href: '#' },
                                { name: 'Blume', href: '#' },
                                { name: 'Briogeo', href: '#' },
                                { name: 'By Humankind', href: '#' },
                            ]
                        },
                        {
                            name: 'C',
                            href: '#',
                            subItems: [
                                { name: 'Carmen', href: '#' },
                                { name: 'Champion', href: '#' },
                                { name: 'Common Goods', href: '#' },
                                { name: 'Craighill', href: '#' },
                            ]
                        }
                    ],
                },
                {
                    id: 'def',
                    name: 'D - F',
                    items: [
                        {
                            name: 'D',
                            href: '#',
                            subItems: [
                                { name: 'Danner', href: '#' },
                                { name: 'Darn Tough', href: '#' },
                                { name: 'Dr Martens', href: '#' },
                                { name: 'Driftime', href: '#' },
                            ]
                        },
                        {
                            name: 'E',
                            href: '#',
                            subItems: []
                        },
                        {
                            name: 'F',
                            href: '#',
                            subItems: []
                        },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Beauty Story', href: '#' },
        { name: 'Promo', href: '#' },
    ],
}

const socials = [
    {
        name: 'Whatsapp',
        href: '#',
        icon: <SiWhatsapp className='h-[18px] w-[18px] text-gray-100 hover:text-green-600' />,
    },
    {
        name: 'Instagram',
        href: '#',
        icon: <SiInstagram className='h-[18px] w-[18px] text-gray-100 hover:text-red-400' />,
    },
    {
        name: 'Facebook',
        href: '#',
        icon: <SiFacebook className='h-[18px] w-[18px] text-gray-100 hover:text-blue-500' />,
    },
    {
        name: 'Tiktok',
        href: '#',
        icon: <SiTiktok className='h-[18px] w-[18px] text-gray-100 hover:text-gray-800' />,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




const Products = () => {
    const [open, setOpen] = useState(false)

    const [arrproducts, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => { 
        getProducts();
    }, [])

    const getProducts = async () => { 
        try {
            const productsData = await fetchProducts();
            setProducts(productsData.results);  
            setNextPage(productsData.next);
            setPrevPage(productsData.previous);
            setCount(productsData.count);
            setLoading(false);
      } catch (error) {
            setError(error);
            setLoading(false);
      }
    
    }

    const handleItemClick = (id) => {

        console.log(id);
    }
    
    return (
        <div className="bg-white">
            {/* Mobile Navigation */}
            <MobileMenu open={open} setOpen={setOpen} classNames={classNames} navigation={navigation} socials={socials} />

            {/* Navbar */}
            <Navbar open={open} setOpen={setOpen} classNames={classNames} navigation={navigation} socials={socials} />
            <main>
                <div className="bg-white pt-[130px] lg:pt-[86px] ">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">Top Selling</h2>

                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                      {arrproducts.map((product) => (
                        <div key={product.id}> 
                              <div className="relative">
                            <div className="relative h-72 w-full overflow-hidden rounded-lg">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg"
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="relative mt-4">
                              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                              {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                            </div>
                            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                              <div
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                              />
                              <p className="relative text-lg font-semibold text-white">${product.max_price}</p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <a
                              href={'/products/'+product.slug}
                                      className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                            >
                              Add to bag<span className="sr-only">, {product.name}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                        
                    {/* <div class="flex">
                     <a href="#" class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                       <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                       </svg>
                       Previous
                     </a>
                     <a href="#" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                       Next
                       <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                       </svg>
                     </a>
                    </div>   */}
                  </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />

        </div>
    )
}

export default Products
