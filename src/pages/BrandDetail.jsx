import { useState, useEffect } from "react"
import { apiGet } from "@/api/ApiService"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { priceFormatter } from "@/tools/reformat"
import { languageOptions } from '@/constant/constant'


// components
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {
  nbDefaultImage
} from "@/assets/"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"


function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const BrandDetail = () => {
  const { slug } = useParams()
  const [open, setOpen] = useState(false)
  const [brand, setBrand] = useState(null)
  const [arrproducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [count, setCount] = useState(0)
  const baseurl = import.meta.env.VITE_API_BASE_URL

  const { t, i18n } = useTranslation()

  useEffect(() => {
    getBrandDetail()
  }, [])

  const getBrandDetail = async () => {
    await apiGet(
      `brand/${slug}/`,
      (data) => onBrandSucces(data),
      (error) => onBrandError(error)
    )
  }

  const onBrandSucces = (data) => {
    setBrand(data)
    getProducts(data.slug)
    console.log(data.id)
  }

  const onBrandError = (error) => {
    console.log(error)
  }

  // get products by brand
  const getProducts = async (productid) => {
    await apiGet(
      `product/?brand__slug=${productid}`,
      (data) => onProductSucces(data),
      (error) => onProductError(error)
    )
  }

  const onProductSucces = (data) => {
    console.log(data)
    setProducts(data.results)
    // setProducts(data.results);
    // setNextPage(data.next);
    // setPrevPage(data.previous);
    // setCount(data.count);
    // setLoading(false);
  }

  const onProductError = (error) => {
    console.log(error)
    // setError(error);
    // setLoading(false);
  }

  return (
    <div className="bg-white">

      {/* Navbar */}
      <Navbar />

      <main>
        <div className="bg-white pt-[160px] lg:pt-[150px]">
          <div className="h-32 lg:h-60  w-full py-2 px-6 mt-4">
            <img
              className="object-cover w-full h-full rounded-lg hidden lg:block"
              src={brand?.cover}
              onError={(e) => (e.target.src = nbDefaultImage)}
            />
            <img
              className="object-cover w-full h-full rounded-lg block lg:hidden "
              src={brand?.cover_mobile}
              onError={(e) => (e.target.src = nbDefaultImage)}
            />

          </div>

          <div className="grid gap-2 lg:flex mt-2 px-6 py-2 lg:gap-4 ">
            <div className="w-full lg:w-1/5 h-full">
              <div className="w-full h-full flex flex-col">
                <h3 className=" pl-3 font-bold ">
                  {t("brandDetail_AboutBrand")}
                </h3>
                {brand != null ? (
                  <div className="mt-2 p-3 flex flex-col rounded-lg">
                    <div className="flex flex-row">
                      <img
                        className="h-28 w-28 rounded-lg"
                        src={brand.logo}
                        alt="error"
                        onError={(e) => (e.target.src = nbDefaultImage)}
                      />
                      <div className="flex flex-col pl-3">
                        <h3 className="font-bold text-lg">{brand.name}</h3>
                        <p className="text-sm">{brand.origin}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">   {i18n.language == languageOptions.english ? brand.description : brand.description_id}</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="w-full h-full bg-white lg:w-4/5">
              <div className="w-full h-full flex flex-col">
                <h3 className="font-bold">Products </h3>
                <div className="mt-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                  {arrproducts.map((product) => (
                    <div key={product.id}>
                      <Link to={`/products/${product.slug}`}>
                        <div className="relative">
                          <div className="relative h-72 w-full overflow-hidden rounded-lg">
                            <img
                              src={`${product.cover}`}
                              alt={nbDefaultImage}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => (e.target.src = nbDefaultImage)}
                            />
                          </div>
                          <div className="relative mt-4">
                            <p className="text-sm font-medium text-gray-900">
                              {product.name}
                            </p>
                            {/* <p className="mt-1 text-sm text-gray-500">
                              Discount: {product.discount}
                            </p> */}
                            {product.min_price == product.max_price ? (
                              <h4 className=" text-sm">
                                Rp.{priceFormatter(product.min_price)}
                              </h4>
                            ) : (
                              <h4 className="text-sm">
                                Rp.{priceFormatter(product.min_price)} - Rp.
                                {priceFormatter(product.max_price)}{" "}
                              </h4>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {/*  */}
                <div className="flex items-center justify-center mt-8 mb-4">
                  <ul className="flex items-center -mx-[6px]">
                    <li className="px-[6px]">
                      <a
                        href="#"
                        className="w-9 h-9 flex items-center justify-center rounded-md text-lg border border-[#EDEFF1]text-[#838995] hover:text-xl "
                        onClick={() => getProducts(prevPage)}
                      >
                        <span>
                          <FaChevronLeft className="h-15 w-8" />
                        </span>
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a
                        href="#"
                        className=" w-9 h-9 flex items-center text-lg justify-center rounded-md border  border-[#EDEFF1]text-[#838995] hover:text-xl"
                        onClick={() => getProducts(nextPage)}
                      >
                        <span>
                          <FaChevronRight className="h-15 w-8" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
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

export default BrandDetail
