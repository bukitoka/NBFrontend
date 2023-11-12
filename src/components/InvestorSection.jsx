import { useTranslation } from "react-i18next"
import { useEffect, useState, useRef } from "react"
import { apiGet } from "@/api/ApiService"
import { register } from "swiper/element/bundle"

register()

const InvestorSection = () => {
  const [invertors, setInvertors] = useState([])
  const swiperElRef = useRef(null)

  const swiperParams = {
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 300,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  }

  useEffect(() => {
    fetchInvertors()

    const swiper = swiperElRef.current
    Object.assign(swiper, swiperParams)
    swiper.initialize()
  }, [])

  const fetchInvertors = async () => {
    await apiGet(
      "investor/",
      (response) => onSuccessfulFetch(response),
      (error) => onFailedFetch(error)
    )
  }

  const onSuccessfulFetch = (response) => {
    // console.log("invertors", response)
    setInvertors(response.results)
  }

  const onFailedFetch = (error) => {
    // console.log(error)
  }

  const { t } = useTranslation()

  return (
    <div className="bg-white pb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {t("investorSection_Title")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {t("investorSection_Description")}
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-7xl px-6 lg:px-8">
        <swiper-container ref={swiperElRef} init="false">
          {invertors.map((invertor) => (
            <swiper-slide key={invertor.id}>
              <div className="p-6 bg-slate-100 rounded-lg">
                <img
                  className="col-span-2 max-h-12 w-full object-contain"
                  src={invertor?.logo}
                  alt="Transistor"
                  width={158}
                  height={48}
                />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  )
}

export default InvestorSection
