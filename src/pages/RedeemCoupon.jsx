import { Fragment, useEffect, useState } from "react"
import { Dialog, Popover, RadioGroup, Tab, Transition } from "@headlessui/react"
import { useLocation } from "react-router-dom"
import { fetchCartItems } from "../api/CartApi"
import { apiGet, apiPost } from "../api/ApiService"
import Modal from "@/components/Modal"
import NewAddressModal from "@/components/AddNewAddress"
import ConfirmOrder from "../components/ConfirmOrder"
import { nbDefaultImage } from "@/assets"
import { priceFormatter } from "@/tools/reformat"
import { CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/20/solid"
import { lineWobble } from "ldrs"
import { ping } from "ldrs"
import { useClipboard } from "use-clipboard-copy"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

// components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Success from "@/components/messages/Success"
import toast from "react-hot-toast"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function RedeemCoupon() {
  const location = useLocation()

  const [coupons, setCoupons] = useState([])

  const fetchCoupons = async () => {
    await apiGet(
      "coupons/?ordering=-created_at",
      (data) => onGetCouponsSuccess(data),
      (err) => onGetCouponsError(err)
    )
  }

  const onGetCouponsSuccess = (response) => {
    console.log("Coupon Response on the Top Coupon", response)
    setCoupons(response.results)
  }

  const onGetCouponsError = (error) => {
    console.log(error)
  }

  const copyCoupon = (code) => {
    clipboard.copy(code)
    const status = "Success!"
    const message =
      "Coupon code has been copied to your clipboard. please paste it on the checkout page."
    toast.custom((t) => <Success t={t} status={status} message={message} />)
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <main>
        <div className=" bg-zinc-100 pt-[140px] lg:pt-[96px]">
          <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none ">
              <div className="mt-6 rounded-xl border bg-white py-6 px-6 flex flex-col lg:flex-row">
                {/* add title */}
                <div className="bg-zinc-300 grid grid-cols-5">
                  <div className=" bg-red-600">
                    <p>Add Vouche</p>
                  </div>
                  <div className="col-span-3">
                    <p>form input</p>
                  </div>
                  <div className="col-span-1 bg-yellow-400">
                    <p>button Search</p>
                  </div>
                </div>
                {/* list of the Voucher */}
                <div>
                  <div>
                    {coupons.map((item) => (
                      <div key={item.id}>
                        <div key={item.id} className="flex gap-x-4 py-5">
                          <img
                            src={item?.cover}
                            alt=""
                            className="h-12 w-12 flex-none rounded-lg bg-gray-50"
                            onError={(e) => (e.target.src = nbDefaultImage)}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {item?.name}
                            </p>
                            <div className=" flex flex-row">
                              <p className="mt-1 truncate text-sm leading-5 text-gray-500">{`${item?.prefix_code}${item?.private_code}`}</p>
                              <button
                                type="button"
                                onClick={() =>
                                  copyCoupon(
                                    `${item?.prefix_code}${item?.private_code}`
                                  )
                                }
                              >
                                <span className="sr-only">Close menu</span>
                                <DocumentDuplicateIcon
                                  className=" ms-3 h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* save page */}
                  <div className="flex justify-end">
                    <button className="mr-4">Cancel</button>
                    <button>Ok</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
