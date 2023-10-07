import { logout } from '../../../../tools/auth'
import useAuthStore from "../../../../store/authStore";
import { useState, useEffect } from 'react';
import { apiGet } from '../../../../api/ApiService'

import {
  ReceiptPercentIcon,
} from '@heroicons/react/24/solid'

const Coupon = () => {
  const allUserData = useAuthStore((state) => state.allUserData);
  const [coupons, setCoupons] = useState([]);


  // fetch user detailsz
  const fetchCoupons = async () => {
    await apiGet('coupons/', (data) => onGetCouponsSuccess(data), (err) => onGetCouponsError(err))
  };

  const onGetCouponsSuccess = (response) => {
    setCoupons(response.results)
  }

  const onGetCouponsError = (error) => {
    // console.log(error)
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <>

      <ul role="list" className="">
        {coupons.map((coupon) => (

          <li key={coupon.id} className="flex gap-x-4 py-5">
            <ReceiptPercentIcon className={` max-h-8`} />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-6 text-gray-900">{coupon.name}</p>
              <p className="text-sm font-semibold leading-6 text-gray-900">{coupon.discount_value}% | {coupon.prefix_code} {coupon.private_code}</p>
            </div>

          </li>
        ))}
      </ul>
    </>
  );
}

export default Coupon

