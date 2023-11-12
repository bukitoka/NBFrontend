
import { ShoppingBagIcon, CircleStackIcon, CreditCardIcon } from '@heroicons/react/20/solid'
import { apiGet, apiPost } from '@/api/ApiService'
import { useEffect, useState } from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import dayjs from 'dayjs';
import { nbDefaultImage } from '@/assets'
import { priceFormatter } from "@/tools/reformat"


const baseurl = import.meta.env.VITE_API_BASE_URL;
const altImage = import.meta.env.VITE_API_NO_IMAGE_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function OrderHistory() {

  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    await apiGet('order/', (data) => onGetOrdersSuccess(data), (err) => onGetOrdersError(err))
  }

  function onGetOrdersSuccess(response) {
    setOrders(response.results)
  }

  function onGetOrdersError(error) {
    console.log(error)
  }

  const handlePayOrder = async (order_id) => {
    await requestToken(order_id)
  }

  useEffect(() => {
    getOrders()

    // append midtrans script
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.async = true;
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    document.body.appendChild(script);
  }, [])

  const requestToken = async (order_id) => {
    await apiPost(`payment/`, {
      order_id: order_id
    }, (data) => onSuccessRequestToken(data), (err) => onErrorRequestToken(err))
  }

  function onSuccessRequestToken(data) {
    const token = data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log('success');
        console.log(result);
      },
      onPending: function (result) {
        console.log('pending');
        console.log(result);
      },
      onError: function (result) {
        console.log('error');
        console.log(result);
      },
      onClose: function () {
        console.log('customer closed the popup without finishing the payment');
      }
    });
  }

  function onErrorRequestToken(error) {
    console.log(error);
  }

  return (
    <div className="bg-white">
      <div className="py-1">
        <div className="mt-2">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className=" space-y-8 sm:px-4 lg:px-0">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-4">
                    <div className='flex flex-row '>
                      <ShoppingBagIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <time dateTime={order.created_at} className="text-gray-500 ml-2">{dayjs(order.created_at).format('DD/MM/YYYY')}</time>
                    </div>
                    <div className='flex flex-row'>
                      <CircleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <p className='text-gray-500 ml-2'>Order Status: {order.status}</p>
                    </div>
                    <div className='flex flex-row'>
                      <CreditCardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <p className='text-gray-500 ml-2'>Payment Status: {order.payment_status}</p>
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">

                    {
                      order.order_items.length >= 1 && (
                        <li key={order.order_items[0].id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                              <img
                                src={`${baseurl}/media/${order.order_items[0].stock_image}`}
                                alt={altImage}
                                className="h-full w-full object-cover object-center"
                                onError={(e) => { e.target.onerror = null; e.target.src = nbDefaultImage }}
                              />
                            </div>
                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{order.order_items[0].product_name}</h5>
                                {order.order_items.length > 1 && (<p className="block text-gray-500 sm:hidden">+{order.order_items.length - 1} products </p>)}
                                <p className='mt-2 sm:mt-0'>Total Amount | Rp. {priceFormatter(order.total_amount)}</p>
                              </div>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">total items : {order.order_items[0].quantity} pcs </p>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">price/item : Rp. {priceFormatter(order.order_items[0].stock_price)}</p>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">size : {order.order_items[0].stock_size}</p>
                              {order.order_items.length > 1 && (<p className="hidden text-gray-500 sm:mt-2 sm:block">+{order.order_items.length - 1} products </p>)}
                            </div>

                          </div>
                          <div className="mt-2 sm:flex sm:justify-end">
                            <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                              <div className="flex flex-1 justify-center">
                                <a
                                  href={"/order-history/" + order.id}
                                  className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                >
                                  View details
                                </a>
                              </div>
                              {
                                order.payment_status == 'pending' && (
                                  <div className="flex flex-1 justify-center pl-4">
                                    <button type="button"
                                      onClick={() => handlePayOrder(order.id)}
                                      className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                      Pay
                                    </button>
                                  </div>
                                )
                              }
                            </div>
                          </div>
                        </li>

                      )
                    }
                  </ul>
                </div>
              ))}

              { /* if order is empty */
                orders.length == 0 &&
                <div className="flex flex-col justify-center items-center">
                  <FiShoppingBag className="text-6xl text-gray-400" />
                  <p className='mt-2'>you don't have an order record please visit the product page</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


