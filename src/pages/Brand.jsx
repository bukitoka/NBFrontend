import { useState, useEffect } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { apiGet } from "../api/ApiService"
import { useParams } from "react-router-dom"

// components
import Navbar from "../components/Navbar"
import MobileMenu from "../components/MobileMenu"
import Footer from "../components/Footer"
import { nbDefaultImage } from "@/assets/"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Brand = () => {
  const { startWith } = useParams()
  const [open, setOpen] = useState(false)
  const [brands, setBrands] = useState([])
  const [arrproducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [count, setCount] = useState(0)
  const baseurl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    getBrand()
  }, [])

  const getBrand = async () => {
    await apiGet(
      `brand/${startWith ? "?name__istartswith=" + startWith : ""}`,
      (data) => onBrandSucces(data),
      (error) => onBrandError(error)
    )
  }

  const onBrandSucces = (data) => {
    setBrands(data.results)
  }

  const onBrandError = (error) => {
    console.log(error)
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px]">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {brands.map((brand) => (
                <a
                  href={`/brand-detail/${brand.slug}`}
                  className="group"
                  key={brand.id}
                >
                  <div>
                    <div className="relative">
                      <div className="relative h-72 w-full overflow-hidden rounded-lg">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-full w-full object-cover object-center"
                          onError={(e) => (e.target.src = nbDefaultImage)}
                        />
                      </div>
                      <div className="relative mt-4">
                        <p className="text-sm font-medium text-gray-900">
                          {brand.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 truncate">
                          {brand.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center mt-8 mb-4">
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Brand
