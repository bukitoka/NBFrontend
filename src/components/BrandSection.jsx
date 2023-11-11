import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from 'react'
import { apiGet } from '@/api/ApiService';
import { nbDefaultImage } from "@/assets"

const BrandSection = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchTopBrands()
  }, [])

  const fetchTopBrands = async () => {
    await apiGet('top-brands/', (response) => onSuccessfulFetch(response), (error) => onFailedFetch(error))
  }

  const onSuccessfulFetch = (response) => {
    setBrands(response)
  }

  const onFailedFetch = (error) => {
    console.log(error)
  }

  const { t } = useTranslation()
  return (
    <section
      aria-labelledby="category-heading"
      className="pt-24 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2
          id="category-heading"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          {t("brandSection_Title")}
        </h2>
        <a
          href="#"
          className="hidden lg:flex group py-2 px-6 rounded-full text-sm bg-gray-100 font-semibold text-gray-800 hover:text-yellow-600"
        >
          {t("brandSection_browseAll")}
          <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="mx-auto max-w-2xl lg:max-w-none w-full">
          <div className="mt-8 flex flex-row space-x-4 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0 overflow-x-auto no-scrollbar rounded-lg">
            {brands.map((brand) => (
              <div
                key={brand.brand_id}
                className="group shrink-0 relative rounded-lg bg-white"
              >
                <div>
                  <div
                    aria-hidden="true"
                    className="overflow-hidden rounded-lg"
                  >
                    <div className="overflow-hidden group-hover:opacity-75">
                      <img
                        src={brand?.brand_cover_homepage}
                        alt=""
                        className="h-80 w-56 object-cover object-center group-hover:scale-110 ease-in duration-150"
                        onError={(e) => (e.target.src = nbDefaultImage)}
                      />
                    </div>
                    <div className="absolute rounded-lg h-full mt-auto inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div className="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
                      <h3 className="font-semibold text-white">
                        <a href="">
                          <span className="absolute inset-0" />
                          {brand?.brand_name}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex lg:hidden justify-center mt-8 w-full">
        <a
          href="#"
          className="bg-black hover:bg-yellow-600 flex py-2 px-6 text-sm text-white rounded-full group"
        >
          Browse all brands{" "}
          <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
        </a>
      </div>
    </section>
  )
}

export default BrandSection
