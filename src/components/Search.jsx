import { useEffect, useState } from "react"
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  ReceiptPercentIcon,
  HeartIcon,
  TagIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
  XMarkIcon,
  FireIcon,
} from "@heroicons/react/20/solid"
import { nodata } from "@/assets"
import { Combobox } from "@headlessui/react"
import { useDebounce } from "use-debounce"
import { apiGet } from "@/api/ApiService"
import { useTranslation } from "react-i18next"

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
      const response = await apiGet(
        `search/trending/`,
        (data) => onTrendingSuccess(data),
        (error) => onTrendingError(error)
      )
    }

    const onTrendingSuccess = (response) => {
      console.log(response)
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

      const response = await apiGet(
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
      // console.log(error)
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
          <li key="searching" className="text-gray-400 text-sm px-4 py-2">
            Searching...
          </li>
        )
      }

      if (isEmpty) {
        return (
          <li key="noresult" className="text-gray-400 text-sm px-4 py-2">
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
            <p className="text-gray-400 text-sm px-4 py-2">Search Results</p>
          </li>
        )
      }
    }

    return (
      <li key="start-typing">
        <p className="text-gray-400 text-sm px-4 py-2">
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
              onKeyUp={(event) => setShowXMark(true)}
              id="search"
              name="search"
              className="block w-full lg:w-[400px] rounded-full border-0 ring-1 ring-zinc-700 bg-white/10 py-2 pl-10 pr-3 text-gray-100 placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-zinc-400 focus:bg-white/20 sm:text-sm sm:leading-6 hover:bg-white/20 hover:ring-1 hover:ring-inset hover:ring-zinc-500"
              placeholder={t("navbarSearch")}
              type="text"
            />
            <div
              onClick={(event) => {
                setSearchQuery("")
                setShowXMark(false)
              }}
              className={`cursor-pointer absolute inset-y-0 right-4 lg:right-0 flex items-center ${showXMark ? "block" : "hidden"
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
              <p className="text-gray-400 text-sm px-4 mb-2">Trending search</p>
            </li>
            <li key="trending" className="mb-4 px-4 py-2 text-sm text-gray-700">
              <div className="flex items-center overflow-x-scroll">
                {trendingSearch.trending_searches &&
                  trendingSearch.trending_searches.map((trend) => (
                    <div
                      key={trend.query}
                      onClick={() => handleClickOnTrendingSearch(trend.query)}
                      className="cursor-pointer flex items-center px-4 py-2 mr-2 rounded-md bg-zinc-100 hover:bg-zinc-200 hover:text-gray-800"
                    >
                      <FireIcon className="h-4 w-4 text-gray-400 mr-2" />
                      {trend.query}
                    </div>
                  ))}
              </div>
            </li>

            {getSearchResults()}

            {searchResults.coupons &&
              searchResults.coupons.map((coupon) => (
                <li key={coupon.id}>
                  <a
                    href={`/coupons/${coupon.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <ReceiptPercentIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {coupon.name}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.products &&
              searchResults.products.map((product) => (
                <li key={product.id}>
                  <a
                    href={`/products/${product.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <ShoppingBagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {product.name}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.brands &&
              searchResults.brands.map((brand) => (
                <li key={brand.id}>
                  <a
                    href={`/brands/${brand.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <HeartIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {brand.name}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.categories &&
              searchResults.categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/categories/${category.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <TagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {category.name}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.subcategories &&
              searchResults.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <a
                    href={`/subcategories/${subcategory.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <TagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {subcategory.name}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.subsubcategories &&
              searchResults.subsubcategories.map((subsubcategory) => (
                <li key={subsubcategory.id}>
                  <a
                    href={`/subsubcategories/${subsubcategory.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <TagIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {subsubcategory.name}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.faqs &&
              searchResults.faqs.map((faq) => (
                <li key={faq.id}>
                  <a
                    href={`/faqs/${faq.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <QuestionMarkCircleIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {faq.question}
                    <ArrowRightIcon
                      className="h-5 w-5 text-gray-400 ml-auto"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

            {searchResults.blogs &&
              searchResults.blogs.map((blog) => (
                <li key={blog.id}>
                  <a
                    href={`/blogs/${blog.id}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center"
                  >
                    <BookmarkIcon
                      className="h-4 w-4 text-gray-400 mr-2"
                      aria-hidden="true"
                    />
                    {blog.title}
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
