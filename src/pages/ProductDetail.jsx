import { useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
import { fetchProduct } from '../api/ProductApi'

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
}


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

export default function ProductDetail() {
    const { slug } = useParams();
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [newProduct, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // const alluserdata = useAuthStore((state) => state.alluserdata);



   const allUserData = useAuthStore((state) => state.allUserData);

    // console.log(allUserData);
  console.log("isLoggedIn")
  console.log(isLoggedIn);
  console.log(allUserData)

  const cookie = Cookies.get('access_token');
  console.log(cookie);


    useEffect(() => {
        getProductdetail(slug);
    }, [])

     const getProductdetail = async (slug) => {
        try {
            const productsData = await fetchProduct(slug);
            setProduct(productsData.product);
            setLoading(false);
      } catch (error) {
            setError(error);
            setLoading(false);
      }

    }
  // function for adding to cart
  const addToCart = async (e) => {
    if (!isLoggedIn) {
    toast.error("Please login to add to cart");
    } else {

    }
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
            <div className="bg-white  pt-[130px] lg:pt-[86px] ">
              <ToastContainer
                    toastClassName="rounded-lg"
                    bodyClassName="text-sm font-semibold"
                    position="top-center"
                />
             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
               <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                 {/* Image gallery */}
                 <Tab.Group as="div" className="flex flex-col-reverse">
                   {/* Image selector */}
                   <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                     <Tab.List className="grid grid-cols-4 gap-6">
                       {product.images.map((image) => (
                         <Tab
                           key={image.id}
                           className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                         >
                           {({ selected }) => (
                             <>
                               <span className="sr-only">{image.name}</span>
                               <span className="absolute inset-0 overflow-hidden rounded-md">
                                 <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                               </span>
                               <span
                                 className={classNames(
                                   selected ? 'ring-indigo-500' : 'ring-transparent',
                                   'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                 )}
                                 aria-hidden="true"
                               />
                             </>
                           )}
                         </Tab>
                       ))}
                     </Tab.List>
                   </div>

                   <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                     {product.images.map((image) => (
                       <Tab.Panel key={image.id}>
                         <img
                           src={image.src}
                           alt={image.alt}
                           className="h-full w-full object-cover object-center sm:rounded-lg"
                         />
                       </Tab.Panel>
                     ))}
                   </Tab.Panels>
                 </Tab.Group>

                 {/* Product info */}
                 <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                   <h1 className="text-3xl font-bold tracking-tight text-gray-900">{newProduct.name}</h1>

                   <div className="mt-3">
                     <h2 className="sr-only">Product information</h2>
                     <p className="text-3xl tracking-tight text-gray-900">{newProduct.price}</p>
                   </div>

                   {/* Reviews */}
                   <div className="mt-3">
                     <h3 className="sr-only">Reviews</h3>
                     <div className="flex items-center">
                       <div className="flex items-center">
                         {[0, 1, 2, 3, 4].map((rating) => (
                           <StarIcon
                             key={rating}
                             className={classNames(
                               product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                               'h-5 w-5 flex-shrink-0'
                             )}
                             aria-hidden="true"
                           />
                         ))}
                       </div>
                       <p className="sr-only">{product.rating} out of 5 stars</p>
                     </div>
                   </div>

                   <div className="mt-6">
                     <h3 className="sr-only">Description</h3>

                     <div
                       className="space-y-6 text-base text-gray-700"
                       dangerouslySetInnerHTML={{ __html: product.description }}
                     />
                   </div>

                   <form className="mt-6">
                     {/* Colors */}
                     <div>
                       <h3 className="text-sm text-gray-600">Color</h3>

                       <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                         <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                         <span className="flex items-center space-x-3">
                           {product.colors.map((color) => (
                             <RadioGroup.Option
                               key={color.name}
                               value={color}
                               className={({ active, checked }) =>
                                 classNames(
                                   color.selectedColor,
                                   active && checked ? 'ring ring-offset-1' : '',
                                   !active && checked ? 'ring-2' : '',
                                   'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                 )
                               }
                             >
                               <RadioGroup.Label as="span" className="sr-only">
                                 {color.name}
                               </RadioGroup.Label>
                               <span
                                 aria-hidden="true"
                                 className={classNames(
                                   color.bgColor,
                                   'h-8 w-8 rounded-full border border-black border-opacity-10'
                                 )}
                               />
                             </RadioGroup.Option>
                           ))}
                         </span>
                       </RadioGroup>
                     </div>

                     <div className="mt-10 flex">
                       <button
                        type="button"
                        onClick={addToCart}
                         className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                       >
                         Add to cart
                       </button>

                       <button
                        type="button"
                         className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                       >
                         <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                         <span className="sr-only">Add to favorites</span>
                       </button>
                     </div>
                   </form>

                   <section aria-labelledby="details-heading" className="mt-12">
                     <h2 id="details-heading" className="sr-only">
                       Additional details
                     </h2>

                     <div className="divide-y divide-gray-200 border-t">
                       {product.details.map((detail) => (
                         <Disclosure as="div" key={detail.name}>
                           {({ open }) => (
                             <>
                               <h3>
                                 <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                   <span
                                     className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                                   >
                                     {detail.name}
                                   </span>
                                   <span className="ml-6 flex items-center">
                                     {open ? (
                                       <MinusIcon
                                         className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                         aria-hidden="true"
                                       />
                                     ) : (
                                       <PlusIcon
                                         className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                         aria-hidden="true"
                                       />
                                     )}
                                   </span>
                                 </Disclosure.Button>
                               </h3>
                               <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                 <ul role="list">
                                   {detail.items.map((item) => (
                                     <li key={item}>{item}</li>
                                   ))}
                                 </ul>
                               </Disclosure.Panel>
                             </>
                           )}
                         </Disclosure>
                       ))}
                     </div>
                   </section>
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
