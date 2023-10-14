import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

const InvestorSection = () => {
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
    <div className="bg-white pb-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our Investor
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          We are backed by top-class investors with deep experience in the
          industry.
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={sliderRef} className="keen-slider rounded-lg">
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="keen-slider__slide p-6 bg-slate-100 rounded-lg">
            <img
              className="col-span-2 max-h-12 w-full object-contain"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorSection
