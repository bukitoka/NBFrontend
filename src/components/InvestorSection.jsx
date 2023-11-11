import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from 'react'
import { apiGet } from '@/api/ApiService';
import { nbDefaultImage } from "@/assets"

const InvestorSection = () => {
  const [invertors, setInvertors] = useState([])

  useEffect(() => {
    fetchInvertors()
  }, [])

  const fetchInvertors = async () => {
    await apiGet('investor/', (response) => onSuccessfulFetch(response), (error) => onFailedFetch(error))
  }

  const onSuccessfulFetch = (response) => {
    console.log("invertors", response)
    setInvertors(response.results)
  }

  const onFailedFetch = (error) => {
    console.log(error)
  }

  const { t } = useTranslation()
  const animation = { duration: 50000, easing: (t) => t }
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    breakpoints: {
      "(min-width: 300px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 15 },
      },
    },
    created(s) {
      s.moveToIdx(8, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 8, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 8, true, animation)
    },
  })

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
        <div ref={sliderRef} className="keen-slider rounded-lg">
          {invertors.map((invertor) => (
            <div key={invertor.id} className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
              <img
                className="col-span-2 max-h-12 w-full object-contain"
                src={invertor?.logo}
                alt="Transistor"
                width={158}
                height={48}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestorSection
