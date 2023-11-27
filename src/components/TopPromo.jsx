import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { apiGet } from "@/api/ApiService"
import { nbDefaultImage } from "@/assets"
import { useClipboard } from "use-clipboard-copy"
import Success from "@/components/messages/Success"
import toast from "react-hot-toast"

const TopPromo = () => {
  const clipboard = useClipboard()
  const [coupons, setCoupons] = useState([])

  const fetchCoupons = async () => {
    await apiGet(
      "coupons/?ordering=-created_at",
      (data) => onGetCouponsSuccess(data),
      (err) => onGetCouponsError(err)
    )
  }

  const onGetCouponsSuccess = (response) => {
    setCoupons(response.results)
  }

  const onGetCouponsError = (error) => {
    // console.log(error)
  }

  const copyCoupon = (code) => {
    clipboard.copy(code)
    const status = "Copied!"
    const message = "Coupon code has been copied to your clipboard."
    toast.custom((t) => <Success t={t} status={status} message={message} />)
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const { t, i18n } = useTranslation()
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t("topPromo_Title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t("topPromo_Description")}
            </p>
          </div>
          <div className="mt-12 flex flex-row space-x-4 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0 overflow-x-auto   rounded-lg">
            {coupons.map((coupon) => (
              <span
                key={coupon.id}
                className="flex flex-shrink-0 overflow-hidden rounded-xl"
                onClick={() =>
                  copyCoupon(`${coupon?.prefix_code}${coupon?.private_code}`)
                }
              >
                <img
                  src={coupon.cover ? coupon.cover : nbDefaultImage}
                  className="h-60 w-80 lg:w-96 object-cover rounded-xl hover:scale-110 ease-in duration-150"
                  onError={(e) => (e.target.src = nbDefaultImage)}
                />
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 w-full">
          <a
            href="/promo"
            className="bg-black group hover:bg-yellow-600 flex py-2 px-6 text-sm text-white rounded-full"
          >
            {t("topPromo_browseAll")}
            <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopPromo
