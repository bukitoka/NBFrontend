import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { apiGet } from '@/api/ApiService'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';



const baseurl = import.meta.env.VITE_API_BASE_URL;
const altImage = import.meta.env.VITE_API_NO_IMAGE_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WishList() {

  const [wishList, setWishList] = useState([])

  const fetchWishList = async () => {
    await apiGet('wishlist/', (data) => onGetWishListSuccess(data), (err) => onGetWishListError(err))
  }

  const onGetWishListSuccess = (response) => {
    console.log(response)
    setWishList(response.results)
  }

  const onGetWishListError = (error) => {
    console.log(error)
  }

  useEffect(() => {
    fetchWishList()
  }, [])

  return (
    <>
      <div className="bg-white">
        <ul role="list" className="">
          {wishList.map((item) => (
            <Link to={`/products/${item.product_details.slug}`}>
              <li key={item.id} className="flex gap-x-4 py-5">

                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`${baseurl}${item.product_details.cover}`} alt="" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item.product_details.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">Out of stock</p>
                </div>

              </li>
            </Link>
          ))}
        </ul>

      </div>
    </>
  )
}


