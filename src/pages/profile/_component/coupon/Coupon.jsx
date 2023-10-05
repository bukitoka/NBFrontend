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
      {
        coupons.map((coupon) => {
          return (
            <>
              <div className={`flex flex-row text-zinc-800 my-1`}>
                <ReceiptPercentIcon className={` max-h-8`} />
                <div>
                  <p className='flex items-center justify-center ms-1 text-center'>{coupon.name} </p>
                  <p className='flex items-center justify-center ms-1 text-center'>{coupon.discount_value}</p>
                  <p className='flex items-center justify-center ms-1 text-center'>{coupon.prefix_code} {coupon.private_code}</p>
                </div>
              </div>

            </>
          )
        })
      }
    </>
  );
}

export default Coupon

