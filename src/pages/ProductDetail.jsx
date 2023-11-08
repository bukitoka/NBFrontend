import { useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';

import { apiPost } from '../api/ApiService';
import ProductReviews from '../components/ProductReviews';
import { nbDefaultImage } from '@/assets';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '@/constant/constant'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { priceFormatter } from '@/tools/reformat'
const baseurl = import.meta.env.VITE_API_BASE_URL;

import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"
import toast from "react-hot-toast"
import useCartStore from "@/store/cartStore"

// components
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import { fetchProduct } from '../api/ProductApi'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [newProduct, setProduct] = useState({});
  const [stocks, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [totalRating, setTotalRating] = useState([]);
  const [totalRatingCount, setTotalRatingCount] = useState(0);
  const { t, i18n } = useTranslation();
  const [selectedStock, setSelectedStock] = useState(null);

  const [isShowColor, setShowColor] = useState(false);
  const [isShowSize, setShowSize] = useState(true);
  const [isShowSecondColor, setShowSecondColor] = useState(false)
  const [latestRating, setLatestRating] = useState([]);
  const { fetchCarts } = useCartStore()



  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    getProductdetail(slug);
  }, [])

  const doesShowColor = (stocks) => {
    if (stocks == null) {
      setShowColor(false);
      return;
    }

    // foreach stocks and check if there is color set to true
    stocks.forEach((stock) => {
      if (stock.color_code != null) {
        setShowColor(true);
        return;
      }
    })
  }

  const doesShowSize = (stocks) => {
    if (stocks == null) {
      setShowSecondColor(false)
      setShowSize(false);
      return;
    }

    // foreach stocks and check if there is color set to true
    stocks.forEach((stock) => {
      if (stock.color != null) {
        setShowSecondColor(true)
        setShowSize(false);
        return;
      } else {
        setShowSize(true)
        setShowSecondColor(false)
        return;
      }
    })
  }

  const getProductdetail = async (slug) => {
    // console.log("Check update data")
    try {
      const productsData = await fetchProduct(slug);
      setProduct(productsData.product);
      setStock(productsData.stock);
      setFirstStock(productsData.stock);
      setProductImages(productsData.images);
      setRating(productsData.total_rating);
      doesShowColor(productsData.stock);
      doesShowSize(productsData.stock)
      setLatestRating(productsData.latest_rating);
      setTotalRatingCount(productsData.total_rating);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const setFirstStock = (stocks) => {
    if (stocks == null) {
      return;
    }
    setSelectedStock(stocks[0] ?? null);
  }


  // function for set rating
  const setRating = (rating) => {
    let ratingArray = [];
    for (let i = 0; i < rating; i++) {
      ratingArray.push(i);
    }

    setTotalRating(ratingArray);
  }


  // function for handle size selection
  const handleStockSelected = (stock) => {
    setSelectedStock(stock);
  }

  // function for adding to cart
  const addToCart = async (productId, stcockId) => {
    if (!isLoggedIn) {
      const status = "Whoops!"
      const message = "Please login to add to cart"
      toast.custom((t) => <Error t={t} status={status} message={message} />)
    } else {
      await handleAddToCart(productId, stcockId);
    }
  }

  const handleAddToCart = async (productId, stcockId) => {
    await apiPost('cart-item/', {
      product: productId,
      stock: stcockId,
      quantity: 1
    }, (response) => onSucceessAddToCart(response), (error) => onErrorAddToCart(error));

  }

  const onSucceessAddToCart = (response) => {
    //  show toast
    const status = "Success!"
    const message = "Product added to cart"
    toast.custom((t) => <Success t={t} status={status} message={message} />)
    fetchCarts();
  }

  const onErrorAddToCart = (error) => {
    const status = "Error!"
    const message = "Error adding to cart"
    toast.custom((t) => <Error t={t} status={status} message={message} />)
  }

  const addWishList = async (productId) => {
    await apiPost('wishlist/', {
      product: productId,
    }, (respone) => onSucessAddWishList(respone), (error) => onErrorAddWishList(error));
  }

  const onSucessAddWishList = (response) => {
    //  show toast
    const status = "Success!"
    const message = "Product added to wishlist"
    toast.custom((t) => <Success t={t} status={status} message={message} />)
  }

  const onErrorAddWishList = (error) => {
    //  show toast
    const status = "Error!"
    const message = "Error adding to wishlist"
    toast.custom((t) => <Error t={t} status={status} message={message} />)
  }


  // open and close mobile menu
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white  pt-[130px] lg:pt-[86px] ">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {productImages.map((productImage) => (
                      <Tab
                        key={productImage.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{productImage.id}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img src={`${baseurl}${productImage.image} `} alt="" className="h-full w-full object-cover object-center" onError={(e) => (e.target.src = nbDefaultImage)} />
                            </span>
                            <span
                              className={classNames(
                                selected ? 'ring-yellow-500' : 'ring-transparent',
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
                  {productImages.map((productImage) => (
                    <Tab.Panel key={productImage.id}>
                      <img
                        src={`${baseurl}${productImage.image}`}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                        onError={(e) => (e.target.src = nbDefaultImage)}
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
                  <p className="text-3xl tracking-tight text-gray-900">Rp. {priceFormatter(selectedStock?.price ?? 0)}</p>
                </div>

                {/* Reviews */}
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {totalRating.map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            'text-yellow-500',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{totalRating.length} out of 5 stars</p>
                  </div>
                </div>

                <form className="mt-6">
                  {/* Colors */}
                  {
                    isShowColor && (
                      <div>
                        <h3 className="text-sm text-gray-600">Color</h3>
                        <RadioGroup className="mt-2">
                          <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                          <span className="flex items-center space-x-3">
                            {stocks.map((stock) => (
                              stock.color_code &&
                              (<RadioGroup.Option
                                key={stock.id}
                                value={stock.color_code}
                                className={({ active, checked }) =>
                                  classNames(
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {stock.id}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  style={{ backgroundColor: stock.color_code }}
                                  className={classNames('h-8 w-8 rounded-full border border-black border-opacity-10'
                                  )}
                                />
                              </RadioGroup.Option>
                              )))}
                          </span>
                        </RadioGroup>
                      </div>
                    )
                  }


                  {
                    isShowSecondColor && (
                      <div className="mt-8">
                        <h3 className="text-sm text-gray-600">Color</h3>
                        <RadioGroup className="mt-2">
                          <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                            {stocks.map((stock) => (
                              <RadioGroup.Option
                                key={stock.id}
                                value={stock.color}
                                onClick={() => handleStockSelected(stock)}
                                selected={selectedStock?.id == stock.id}
                                className={`cursor-pointer focus:outline-none ${selectedStock?.id == stock.id ? 'ring-2 ring-yellow-500 ring-offset-2 border-transparent bg-yellow-500 text-white hover:bg-yellow-500' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'} flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 `}
                              >
                                <RadioGroup.Label as="span">{stock.color}</RadioGroup.Label>
                              </RadioGroup.Option>
                            ))}

                          </div>
                        </RadioGroup>
                      </div>)
                  }


                  {/* Sizes */}
                  {
                    isShowSize && (
                      <div className="mt-8">
                        <h3 className="text-sm text-gray-600">Size</h3>
                        <RadioGroup className="mt-2">
                          <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                            {stocks.map((stock) => (
                              <RadioGroup.Option
                                key={stock.id}
                                value={stock.size}
                                onClick={() => handleStockSelected(stock)}
                                selected={selectedStock?.id == stock.id}
                                className={`cursor-pointer focus:outline-none ${selectedStock?.id == stock.id ? 'ring-2 ring-yellow-500 ring-offset-2 border-transparent bg-yellow-500 text-white hover:bg-yellow-500' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'} flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 `}
                              >
                                <RadioGroup.Label as="span">{stock.size}</RadioGroup.Label>
                              </RadioGroup.Option>
                            ))}

                          </div>
                        </RadioGroup>
                      </div>
                    )
                  }

                  <div className="mt-10 flex">
                    <button
                      type="button"
                      onClick={() => addToCart(newProduct.id, selectedStock?.id ?? null)}
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-zinc-800 px-8 py-3 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      {t('productDetail_Add_to_Cart')}
                    </button>

                    <button
                      type="button"
                      onClick={() => addWishList(newProduct.id)}
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
                    {newProduct.description && (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <h3>
                              <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                <span
                                  className={classNames(open ? 'text-yellow-500' : 'text-gray-900', 'text-sm font-medium')}
                                >
                                  {t('productDetail_Description')}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <FaChevronUp className='block h-4 w-4 text-yellow-500 text-sm' aria-hidden="true" />
                                  ) : (
                                    <FaChevronDown className='block h-4 w-4 text-gray-400 text-sm' aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                              <ul role="list">
                                <p>
                                  {i18n.language == languageOptions.english ? newProduct.description : newProduct.description_id}
                                </p>
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Product reviews */}
      <ProductReviews data={{ reviews: latestRating, productId: newProduct.id, totalRatingCount: totalRatingCount }} />
      {/* Footer */}
      <Footer />
    </div>
  )
}
