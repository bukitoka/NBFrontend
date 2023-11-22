import { register } from "swiper/element/bundle"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { apiGet } from "@/api/ApiService"
import { nbDefaultImage } from "@/assets"

const Carousel = () => {
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    getPromotions()
  }, [])

  const getPromotions = async () => {
    await apiGet(
      "promotions/",
      (response) => onSuccessfulPromotions(response),
      (error) => onFailedPromotions(error)
    )
  }

  const onSuccessfulPromotions = (response) => {
    // console.log(response)
    setPromotions(response?.results)
  }

  const onFailedPromotions = (error) => {
    setPromotions([])
  }

  // Register Swiper Element
  register()

  return (
    <div className="relative bg-zinc-100 pt-[130px] lg:pt-[86px] border-b border-b-gray-200">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-24 lg:px-8">
        <swiper-container
          rewind="true"
          effect="fade"
          autoplay="true"
          autoplay-delay="5000"
          navigation-next-el=".swiper-button-next"
          navigation-prev-el=".swiper-button-prev"
        >
          {promotions.map((promotion, index) => (
            <swiper-slide key={index}>
              <img
                src={promotion.cover ? promotion.cover : nbDefaultImage}
                className="h-[450px] w-full object-cover object-center rounded-xl hidden lg:block"
                onError={(e) => (e.target.src = nbDefaultImage)}
              />

              <img
                src={
                  promotion.cover_mobile
                    ? promotion.cover_mobile
                    : nbDefaultImage
                }
                className="h-[450px] w-full object-cover object-center rounded-xl block lg:hidden"
                onError={(e) => (e.target.src = nbDefaultImage)}
              />
            </swiper-slide>
          ))}
          <ChevronLeftIcon
            aria-hidden="true"
            className="swiper-button-prev h-10 w-10 text-lg bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-black"
          />
          <ChevronRightIcon
            aria-hidden="true"
            className="swiper-button-next h-10 w-10 text-lg bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-black"
          />
        </swiper-container>
      </div>
    </div>
  )
}

export default Carousel
