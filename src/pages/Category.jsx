import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { nbDefaultImage, staticBanner } from "@/assets"
import { apiGet } from "@/api/ApiService"
import { priceFormatter } from "@/tools/reformat"

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

// components
import Navbar from "../components/Navbar"
import MobileMenu from "../components/MobileMenu"
import Footer from "../components/Footer"
import { getParamValue } from "../tools/urlParams"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ProductByCategories = () => {
  const { slug } = useParams()
  const [open, setOpen] = useState(false)

  const [arrproducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [count, setCount] = useState(0)
  const baseurl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    getProducts(slug)
  }, [])

  const getProducts = async (slug) => {
    await apiGet(
      slug ? `product/?subsubcategory__slug=${slug}` : `product/`,
      (data) => onGetProductsSuccess(data),
      (error) => onGetProductsFailed(error)
    )
  }

  const onGetProductsSuccess = (data) => {
    setProducts(data.results)
    setNextPage(getParamValue("page", data.next))
    setPrevPage(getParamValue("page", data.previous))
    setCount(data.count)
    setLoading(false)
  }

  const onGetProductsFailed = (error) => {
    setError(error)
    setLoading(false)
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white flex flex-col pt-[130px] lg:pt-[86px] ">
          <div className="px-4 text-center sm:px-6 lg:px-8 pt-20 ">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrival</h1> */}
            <img
              src={staticBanner}
              alt="New Arrival"
              className=" h-52 w-full object-cover object-center mt-4"
            />

            {/* <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
            </p> */}
          </div>
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 ">
              {arrproducts.map((product) => (
                <div key={product.id}>
                  <Link to={`/products/${product.slug}`}>
                    <div className="relative">
                      <div className="relative h-72 w-full overflow-hidden rounded-lg">
                        <img
                          src={`${product.cover}`}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                          onError={(e) => (e.target.src = nbDefaultImage)}
                        />
                      </div>
                      <div className="relative mt-4">
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Discount: {product.discount}
                        </p>
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

            {/* <!-- component --> */}
            <div className="flex items-center justify-center mt-8 mb-8">
              <ul className="flex items-center -mx-[6px]">
                <li className="px-[6px]">
                  <a
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-md text-lg border border-[#EDEFF1]text-[#838995] hover:text-xl"
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ProductByCategories
