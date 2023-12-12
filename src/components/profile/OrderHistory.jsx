import {
  ShoppingBagIcon,
  CircleStackIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

import { apiGet, apiPost } from "@/api/ApiService"
import { useEffect, useState } from "react"
import { FiShoppingBag } from "react-icons/fi"
import dayjs from "dayjs"
import { nbDefaultImage } from "@/assets"
import { priceFormatter } from "@/tools/reformat"
import { paymentStatus, orderStatus } from "@/tools/constants"
import { Link } from "react-router-dom"
import { Tab } from "@headlessui/react"
import { languageOptions } from "@/tools/constants"
import { useTranslation } from "react-i18next"
import { getParamValue } from "@/tools/urlParams"

const baseurl = import.meta.env.VITE_API_BASE_URL
const altImage = import.meta.env.VITE_API_NO_IMAGE_URL

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [orderStatusSelected, setOrderStatusSelected] = useState(1) // default order status
  const [orderParams, setOrderParams] = useState("")
  const { i18n } = useTranslation()

  // pagination for order list
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [totalItem, setTotalItem] = useState(0)

  // order status
  const OrderStatuses = [
    {
      id: 1,
      title: "All",
      title_id: "Semua",
    },
    {
      id: 2,
      title: "In Progress",
      title_id: "Berlangsung",
    },
    {
      id: 3,
      title: "Successful",
      title_id: "Berhasil",
    },
    {
      id: 4,
      title: "Unsuccessful",
      title_id: "Tidak Berhasil",
    },
  ]

  const handleSelectOrderStatus = (id) => {
    setOrderStatusSelected(id)
    switch (id) {
      case 1:
        setOrderParams("")
        break
      case 2:
        setOrderParams(`?status=pending`)
        break
      case 3:
        setOrderParams(`?status=complete`)
        break
      case 4:
        setOrderParams(`?status=refunded`)
        break
      default:
        setOrderParams("")
        break
    }
  }

  const getOrders = async () => {
    await apiGet(
      `order/${orderParams}`,
      (data) => onGetOrdersSuccess(data),
      (err) => onGetOrdersError(err)
    )
  }

  function onGetOrdersSuccess(response) {
    setTotalItem(response.count)
    setNavigationParam(response.next, response.previous)
    setOrders(response.results)
  }

  function onGetOrdersError(error) {
    console.log(error)
  }

  const handlePayOrder = async (ref_code) => {
    await requestToken(ref_code)
  }

  // get orders if order params is changed
  useEffect(() => {
    getOrders()
  }, [orderParams])

  // fetch orders when first time page is loaded
  useEffect(() => {
    getOrders()

    // append midtrans script
    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    )
    document.body.appendChild(script)
  }, [])

  const requestToken = async (ref_code) => {
    await apiPost(
      `payment/`,
      {
        ref_code: ref_code,
      },
      (data) => onSuccessRequestToken(data),
      (err) => onErrorRequestToken(err)
    )
  }

  function onSuccessRequestToken(data) {
    const token = data.data.token

    window.snap.pay(token, {
      onSuccess: function (result) {
        console.log("success")
        console.log(result)
      },
      onPending: function (result) {
        console.log("pending")
        console.log(result)
      },
      onError: function (result) {
        console.log("error")
        console.log(result)
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment")
      },
    })
  }

  // function for setNavigations
  const setNavigationParam = (fullNext, fullPrev) => {
    if (fullNext == null) {
      setNextPage(null)
    }

    if (fullPrev == null) {
      setPrevPage(null)
    }

    if (fullNext != null) {
      let page = getParamValue("page", fullNext)
      let status = getParamValue("status", fullNext)
      let nextParams = null
      // set page for next page
      if (page != null) {
        nextParams = "?page=" + page
      }

      // set status for next page
      if (status != null) {
        nextParams = nextParams + "&status=" + status
      }

      setNextPage(nextParams)
    }

    if (fullPrev != null) {
      let page = getParamValue("page", fullPrev)
      let status = getParamValue("status", fullPrev)

      // initial value
      let prevParams = ""
      if (page != null && status != null) {
        prevParams = "?page=" + page + "&status=" + status
      } else {
        if (page != null) {
          prevParams = "?page=" + page
        }
        if (status != null) {
          prevParams = "?status=" + status
        }
      }
      setPrevPage(prevParams)
    }
  }

  /**
   * Generate a function comment for the given function body.
   *
   * @return {undefined} No return value
   */
  const goNextPage = () => {
    if (nextPage != null) {
      setOrderParams(nextPage)
    }
  }

  /**
   * Generates the function comment for the given function body.
   *
   * @return {void} This function does not return any value.
   */
  const goPrevPage = () => {
    if (prevPage != null) {
      setOrderParams(prevPage)
    }
  }
  function onErrorRequestToken(error) {
    console.log(error)
  }

  return (
    <div className="bg-white">
      <div className="py-1">
        {/* Add tabs for order status */}
        <div className="sm:mx-6 lg:mx-8 flex flex-row">
          <div className="flex items-center pr-3">
            <p className="align-middle text-md font-semibold">Status</p>
          </div>
          <div className="w-full">
            <Tab.Group>
              <Tab.List className="flex space-x-2 rounded-xl">
                {OrderStatuses.map((OrderStatus) => (
                  <Tab
                    key={OrderStatus.id}
                    onClick={() => handleSelectOrderStatus(OrderStatus.id)}
                    className={`w-full rounded-lg py-2 text-sm font-medium leading-5 text-yellow-500  ring-white/60 ring-offset-1 ring-offset-yellow-500 focus:outline-none focus:ring-1 ${
                      orderStatusSelected === OrderStatus.id
                        ? " bg-yellow-50 text-yellow-500 shadow"
                        : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-800"
                    }`}
                  >
                    {i18n.language == languageOptions.english
                      ? OrderStatus.title
                      : OrderStatus.title_id}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="space-y-8 sm:px-4 lg:px-0">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-4">
                    <div className="flex flex-row ">
                      <ShoppingBagIcon
                        className="h-5 w-5 text-yellow-500"
                        aria-hidden="true"
                      />
                      <time
                        dateTime={order.created_at}
                        className="text-gray-500 ml-2 text-md"
                      >
                        {dayjs(order.created_at).format("DD/MM/YYYY")}
                      </time>
                    </div>
                    <div className="flex flex-row">
                      <CircleStackIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="text-gray-500 ml-2 text-md">
                        Order Status: {order.status}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <CreditCardIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="text-gray-500 ml-2 text-md">
                        Payment Status: {order.payment_status}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                    {order.order_items.length >= 1 && (
                      <li key={order.order_items[0].id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              src={`${baseurl}/media/${order.order_items[0].stock_image}`}
                              alt={altImage}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = nbDefaultImage
                              }}
                            />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{order.order_items[0].product_name}</h5>
                              {order.order_items.length > 1 && (
                                <p className="block text-gray-500 sm:hidden">
                                  +{order.order_items.length - 1} products{" "}
                                </p>
                              )}
                              <p className="mt-2 sm:mt-0">
                                Total Amount | Rp.{" "}
                                {priceFormatter(order.total_amount)}
                              </p>
                            </div>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">
                              total items : {order.order_items[0].quantity} pcs{" "}
                            </p>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">
                              price/item : Rp.{" "}
                              {priceFormatter(order.order_items[0].stock_price)}
                            </p>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">
                              size : {order.order_items[0].stock_size}
                            </p>
                            {order.order_items.length > 1 && (
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                +{order.order_items.length - 1} products{" "}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-end">
                          <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                            <div className="flex flex-1 justify-center">
                              <a
                                href={"/order-history/" + order.id}
                                className="whitespace-nowrap text-zinc-500 hover:text-zinc-900"
                              >
                                View details
                              </a>
                            </div>
                            {order.payment_status == paymentStatus.pending && (
                              <div className="flex flex-1 justify-center pl-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePayOrder(order.order_item)
                                  }
                                  className="whitespace-nowrap text-zinc-500 hover:text-zinc-900"
                                >
                                  Pay
                                </button>
                              </div>
                            )}

                            {order.payment_status == paymentStatus.settlement &&
                              order.status == orderStatus.complete &&
                              !order.order_items[0].is_rated && (
                                <div className="flex flex-1 justify-center pl-4">
                                  <Link
                                    to={`/review/${order.order_items[0].product_slug}`}
                                  >
                                    <button
                                      type="button"
                                      className="whitespace-nowrap text-zinc-500 hover:text-zinc-900"
                                    >
                                      Review
                                    </button>
                                  </Link>
                                </div>
                              )}
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              ))}

              {
                /* if order is empty */
                orders.length == 0 && (
                  <div className="flex flex-col justify-center items-center mt-3">
                    <FiShoppingBag className="text-6xl text-gray-400" />
                    <p className="mt-2">
                      you don't have an order record please visit the product
                      page
                    </p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/* pagination  */}
        <div className="flex items-center justify-center mt-4 mb-4 ">
          <ul className="flex items-center -mx-[6px]">
            <li className="px-[6px]">
              <button
                disabled={prevPage == null}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-lg border border-[#EDEFF1]text-[#838995] ${
                  prevPage == null ? "opacity-25" : "hover:text-xl "
                } `}
                onClick={() => goPrevPage()}
              >
                <span>
                  <FaChevronLeft className="h-15 w-8" />
                </span>
              </button>
            </li>
            <li className="px-[6px]">
              <button
                disabled={nextPage == null}
                className={`w-9 h-9  flex items-center text-lg justify-center rounded-md border  border-[#EDEFF1]text-[#838995] ${
                  nextPage == null ? "opacity-25" : "hover:text-xl"
                } `}
                onClick={() => goNextPage()}
              >
                <span>
                  <FaChevronRight className="h-15 w-8 " />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
