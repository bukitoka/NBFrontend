import { useState, useEffect } from "react";
import { nbDefaultImage } from "@/assets";
import { apiGet } from "@/api/ApiService";
import { useParams } from 'react-router-dom';
const baseurl = import.meta.env.VITE_API_BASE_URL;
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import { languageOptions } from '@/constant/constant'
import parse from 'html-react-parser';
import { useClipboard } from 'use-clipboard-copy';

import Success from "@/components/messages/Success"
import toast from "react-hot-toast"

// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

const PromoPage = () => {
  const clipboard = useClipboard();
  const [coupons, setCoupons] = useState([])
  const { t, i18n } = useTranslation()

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
    clipboard.copy(code);
    const status = "Success!"
    const message = "Coupon code has been copied to your clipboard. please paste it on the checkout page."
    toast.custom((t) => <Success t={t} status={status} message={message} />)
  }


  useEffect(() => {
    fetchCoupons()
  }, []);

  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px] mb-4">
          <div className="mx-auto max-w-2xl px-4 pt-16  sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8 ">
            <div className="mt-0 flex flex-col">
              <div role="list" className="">
                {coupons.map((item) => (
                  <div>
                    <div key={item.id} className="flex gap-x-4 py-5">
                      <img
                        src={item?.cover}
                        alt=""
                        className="h-12 w-12 flex-none rounded-lg bg-gray-50"
                        onError={(e) => (e.target.src = nbDefaultImage)} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{item?.name}</p>
                        <div className=" flex flex-row">
                          <p className="mt-1 truncate text-sm leading-5 text-gray-500">{`${item?.prefix_code}${item?.private_code}`}</p>
                          <button
                            type="button"
                            onClick={() => copyCoupon(`${item?.prefix_code}${item?.private_code}`)}
                          >
                            <span className="sr-only">Close menu</span>
                            <DocumentDuplicateIcon className=" ms-3 h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PromoPage
