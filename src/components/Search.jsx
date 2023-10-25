import { useEffect, useState } from "react"
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  ArrowRightIcon,
  HeartIcon,
  TagIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
  XMarkIcon,
  FireIcon,
} from "@heroicons/react/20/solid"
import { nodata, nbDefaultImage } from "@/assets"
import { Combobox } from "@headlessui/react"
import { useDebounce } from "use-debounce"
import { apiGet } from "@/api/ApiService"
import { useTranslation } from "react-i18next"
import NanoClamp from "nanoclamp"

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [trendingSearch, setTrendingSearch] = useState([])
  const [showXMark, setShowXMark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const { t, i18n } = useTranslation()

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  useEffect(() => {
    // trending
    const fetchTrendingSearch = async () => {
      await apiGet(
        `search/trending/`,
        (data) => onTrendingSuccess(data),
        (error) => onTrendingError(error)
      )
    }

    const onTrendingSuccess = (response) => {
      // console.log(response)
      setTrendingSearch(response)
    }

    const onTrendingError = (error) => {
      console.log(error)
    }

    fetchTrendingSearch()

    // search
    const fetchSearchResults = async () => {
      setIsLoading(true)
      setIsEmpty(false)

      await apiGet(
        `search/?q=${debouncedSearchQuery}`,
        (data) => onSearchSuccess(data),
        (error) => onSearchError(error)
      )
    }

    const onSearchSuccess = (response) => {
      setIsLoading(false)

      if (
        response.products.length === 0 &&
        response.categories.length === 0 &&
        response.subcategories.length === 0 &&
        response.subsubcategories.length === 0 &&
        response.brands.length === 0 &&
        response.faqs.length === 0 &&
        response.blogs.length === 0 &&
        response.coupons.length === 0
      ) {
        setIsEmpty(true)
      }

      setSearchResults(response)
    }

    const onSearchError = (error) => {
      console.log(error)
      setIsLoading(false)
    }

    if (debouncedSearchQuery) {
      fetchSearchResults()
    } else {
      setSearchResults([])
      setIsEmpty(true)
    }
  }, [debouncedSearchQuery])

  const getSearchResults = () => {
    if (debouncedSearchQuery.length > 0) {
      if (isLoading) {
        return (
          <li key="searching" className="text-gray-400 text-sm px-2 py-2">
            Searching...
          </li>
        )
      }

      if (isEmpty) {
        return (
          <li key="noresult" className="text-gray-400 text-sm px-2 py-2">
            No results found for "{debouncedSearchQuery}"
            <img src={nodata} className="w-52 mx-auto mt-2" />
          </li>
        )
      }

      if (
        searchResults.products.length > 0 ||
        searchResults.categories.length > 0 ||
        searchResults.subcategories.length > 0 ||
        searchResults.subsubcategories.length > 0 ||
        searchResults.brands.length > 0 ||
        searchResults.faqs.length > 0 ||
        searchResults.blogs.length > 0 ||
        searchResults.coupons.length > 0
      ) {
        return (
          <li key="result-header">
            <p className="text-gray-400 text-sm px-2 py-2">Search Results</p>
          </li>
        )
      }
    }

    return (
      <li key="start-typing">
        <p className="text-gray-400 text-sm px-2 py-2">
          Start typing to search
        </p>
      </li>
    )
  }

  const handleClickOnTrendingSearch = (trend) => {
    setSearchQuery(trend)
  }

  return (
    <div className="flex relative items-center py-4 md:mx-auto md:max-w-2xl lg:mx-0 lg:max-w-sm xl:px-0">
      <a
        href="#"
        className="hidden lg:block lg:mr-4 p-2 ring-1 ring-zinc-700 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-gray-100 hover:ring-1 hover:ring-inset hover:ring-zinc-500"
      >
        <span className="sr-only">Speech</span>
        <MicrophoneIcon className="h-5 w-5" aria-hidden="true" />
      </a>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Combobox value={searchQuery}>
        <div className="w-full">
          <div className="relative">
            <div className="pointer-events-none overflow-hidden absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            </div>
            <Combobox.Input
              onClick={(event) => setSearchQuery(event.target.value)}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyUp={() => setShowXMark(true)}
              id="search"
              name="search"
              className="block w-full lg:w-[400px] rounded-full border-0 ring-1 ring-zinc-700 bg-white/10 py-2 pl-10 pr-3 text-gray-100 placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-zinc-400 focus:bg-white/20 sm:text-sm sm:leading-6 hover:bg-white/20 hover:ring-1 hover:ring-inset hover:ring-zinc-500"
              placeholder={t("navbarSearch")}
              type="text"
            />
            <div
              onClick={() => {
                setSearchQuery("")
                setShowXMark(false)
              }}
              className={`cursor-pointer absolute inset-y-0 right-4 lg:right-0 flex items-center ${
                showXMark ? "block" : "hidden"
              }`}
            >
              <XMarkIcon
                className="h-5 w-5 text-gray-300 hover:bg-zinc-600 rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <Combobox.Options className="bg-white rounded-xl lg:-ml-24 p-4 absolute z-40 mt-2 w-full lg:w-[600px] border border-zinc-100 shadow-sm max-h-[600px] overflow-y-scroll">
            {/* trending search */}
            <li key="trending-header">
              <p className="text-gray-400 text-sm px-2 mb-2">Trending search</p>
            </li>
            <li key="trending" className="mb-4 px-2 py-2 text-sm text-gray-700">
              <div className="flex items-center overflow-x-scroll">
                {trendingSearch.trending_searches &&
                  trendingSearch.trending_searches.map((trend) => (
                    <div
                      key={trend.query}
                      onClick={() => handleClickOnTrendingSearch(trend.query)}
                      className="cursor-pointer flex items-center px-4 py-2 mr-2 rounded-md bg-zinc-100 hover:bg-zinc-200 hover:text-gray-800"
                    >
                      <FireIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <NanoClamp
                        is="p"
                        className="text-gray-700 font-medium hover:text-gray-900"
                        lines={1}
                        text={trend.query}
                      />
                    </div>
                  ))}
              </div>
            </li>

            {getSearchResults()}

            {searchResults.coupons && searchResults.coupons.length > 0 && (
              <li key="coupon-header">
                <p className="text-gray-400 text-sm px-2 mt-4 mb-2">Coupons</p>
              </li>
            )}

            {searchResults.coupons &&
              searchResults.coupons.map((coupon) => (
                <li key={coupon.id}>
                  <a
                    href={`/coupons/${coupon.id}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <img
                      src={
                        coupon.cover != "/media/coupon_covers/default.jpg"
                          ? import.meta.env.VITE_API_BASE_URL + coupon.cover
                          : nbDefaultImage
                      }
                      className="h-8 w-8 object-cover mr-2 rounded-md"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={coupon.name}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.products && searchResults.products.length > 0 && (
              <li key="product-header">
                <p className="text-gray-400 text-sm px-2 mt-4 mb-2">Products</p>
              </li>
            )}

            {searchResults.products &&
              searchResults.products.map((product) => (
                <li key={product.id}>
                  <a
                    href={`/products/${product.slug}`}
                    className="px-2 py-2 text-sm hover:bg-gray-100 rounded-lg flex items-center"
                  >
                    <img
                      src={
                        product.cover != "/media/products/default.jpg"
                          ? import.meta.env.VITE_API_BASE_URL + product.cover
                          : nbDefaultImage
                      }
                      className="h-8 w-8 object-cover mr-2 rounded-md"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={product.name}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.brands && searchResults.brands.length > 0 && (
              <li key="brand-header">
                <p className="text-gray-400 text-sm px-2 mt-4 mb-2">Brands</p>
              </li>
            )}

            {searchResults.brands &&
              searchResults.brands.map((brand) => (
                <li key={brand.id}>
                  <a
                    href={`/brands/${brand.slug}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <img
                      src={
                        brand.logo != "/media/brand_logos/default.jpg"
                          ? import.meta.env.VITE_API_BASE_URL + brand.logo
                          : nbDefaultImage
                      }
                      className="h-8 w-8 object-cover mr-2 rounded-md"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={brand.name}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.categories &&
              searchResults.categories.length > 0 && (
                <li key="category-header">
                  <p className="text-gray-400 text-sm px-2 mt-4 mb-2">
                    Categories
                  </p>
                </li>
              )}

            {searchResults.categories &&
              searchResults.categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/categories/${category.slug}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <TagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={category.name}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.subcategories &&
              searchResults.subcategories.length > 0 && (
                <li key="subcategory-header">
                  <p className="text-gray-400 text-sm px-2 mt-4 mb-2">
                    Subcategories
                  </p>
                </li>
              )}

            {searchResults.subcategories &&
              searchResults.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <a
                    href={`/subcategories/${subcategory.slug}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <TagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={subcategory.name}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.subsubcategories &&
              searchResults.subsubcategories.length > 0 && (
                <li key="subsubcategory-header">
                  <p className="text-gray-400 text-sm px-2 mt-4 mb-2">
                    Subsubcategories
                  </p>
                </li>
              )}

            {searchResults.subsubcategories &&
              searchResults.subsubcategories.map((subsubcategory) => (
                <li key={subsubcategory.id}>
                  <a
                    href={`/subsubcategories/${subsubcategory.slug}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <TagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={subsubcategory.name}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.faqs && searchResults.faqs.length > 0 && (
              <li key="faq-header">
                <p className="text-gray-400 text-sm px-2 mt-4 mb-2">FAQs</p>
              </li>
            )}

            {searchResults.faqs &&
              searchResults.faqs.map((faq) => (
                <li key={faq.id}>
                  <a
                    href={`/faqs/${faq.id}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <QuestionMarkCircleIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={faq.question}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.blogs && searchResults.blogs.length > 0 && (
              <li key="blog-header">
                <p className="text-gray-400 text-sm px-2 mt-4 mb-2">Blogs</p>
              </li>
            )}

            {searchResults.blogs &&
              searchResults.blogs.map((blog) => (
                <li key={blog.id}>
                  <a
                    href={`/blogs/${blog.slug}`}
                    className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <BookmarkIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    <NanoClamp
                      is="p"
                      className="text-gray-700 font-medium hover:text-gray-900"
                      lines={1}
                      text={blog.title}
                    />
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

export default Search
