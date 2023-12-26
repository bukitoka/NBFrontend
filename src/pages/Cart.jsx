import { TrashIcon } from "@heroicons/react/20/solid"
import { useState, useEffect } from "react"
import useAuthStore from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { fetchCartItems } from "../api/CartApi"
import { apiPatch, apiDelete } from "@/api/ApiService"
import { useTranslation } from "react-i18next"
import { nbDefaultImage } from "@/assets"
import { priceFormatter } from "@/tools/reformat"

// components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Success from "@/components/messages/Success"
import toast from "react-hot-toast"

export default function Cart() {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [cartItems, setCartItems] = useState([])
  const [listid, setListid] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [loading, setLoading] = useState(true)
  const [allCartId, setAllCartId] = useState([])
  const [listSelectedId, setListSelectedId] = useState([])
  let testAllCartId = []
  let testListSelectedId = []

  const { t } = useTranslation()

  const baseurl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/")
    }
    getCartItems()
  }, [])

  useEffect(() => {
    updateSummaryCart()
  }, [listSelectedId])

  const getCartItems = async () => {
    await fetchCartItems(
      (data) => onSuccess(data),
      (error) => onError(error)
    )
  }

  // handle when get cart items success
  function onSuccess(data) {
    setCartItems(data.cart_items)
    setLoading(false)

    // set all cart id
    const ids = data.cart_items.map((item) => item.id)
    setAllCartId(ids)
    testAllCartId = ids

    // set list selected id
    const selectedIds = data.cart_items
      .filter((item) => item.is_selected)
      .map((item) => item.id)
    setListSelectedId(selectedIds)
    testListSelectedId = selectedIds

    const checkAll = compareArrays(testListSelectedId, testAllCartId)
    const selectAll = document.getElementById("select-all")
    selectAll.checked = checkAll

    updateSummaryCart()
  }

  // handle when get cart items error
  function onError(error) {
    console.log(error)
    setLoading(false)
  }

  function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false
    }

    return array1.every((element1) => array2.includes(element1))
  }

  function handleChangeCheckbox(event, cartid) {
    if (event.target.checked) {
      setAsSelected(cartid, true)
    } else {
      setAsSelected(cartid, false)
    }
  }

  function handleSelectAll(event) {
    if (event.target.checked) {
      allCartId.forEach((id) => {
        setAsSelected(id, true)
      })
    } else {
      allCartId.forEach((id) => {
        setAsSelected(id, false)
      })
    }
  }

  function showCheckout() {
    if (listSelectedId.length === 0) {
      const status = "Whoops!"
      const message = "Please select item before continue to checkout."

      toast.custom((t) => <Success t={t} status={status} message={message} />)
      return
    }
    navigate("/checkout", { state: { listid: listid } })
  }

  // update summary cart
  function updateSummaryCart() {
    let subTotal = 0

    // calculate subtotal
    cartItems.forEach((cartItem) => {
      if (listSelectedId.includes(cartItem.id)) {
        subTotal = subTotal + cartItem.total_price
      }
    })

    // update subtotal
    setSubTotal(subTotal)

    // TODO: calculate total payment
    // add if need to calculate total payment

    // update total payment
    setTotalPayment(subTotal)
  }

  // incrase quantity
  const increaseQuantity = async (id) => {
    await apiPatch(
      `cart-item/${id}/`,
      {
        increase_quantity: true,
      },
      (data) => {
        getCartItems()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  // decrease quantity
  const decreaseQuantity = async (id) => {
    await apiPatch(
      `cart-item/${id}/`,
      {
        decrease_quantity: true,
      },
      (data) => {
        getCartItems()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const setAsSelected = async (id, isSelected) => {
    await apiPatch(
      `cart-item/${id}/`,
      {
        set_as_selected: isSelected,
      },
      (data) => {
        getCartItems()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const deleteCart = async (id) => {
    await apiDelete(
      `cart-item/${id}/`,
      {},
      (data) => {
        getCartItems()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <main>
        {/* shopping cart */}
        <div className=" bg-zinc-100 pt-[130px] lg:pt-[86px] ">
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 ">
              <section
                aria-labelledby="cart-heading"
                className="lg:col-span-7 bg-white p-4 rounded-lg"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="select-all"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-zinc-800 ring-1 ring-zinc-800 focus:ring-white"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      {t("cartPageSelectAll")}
                    </label>
                  </div>
                </div>

                <ul
                  role="list"
                  className="divide-y divide-gray-200  border-t border-gray-200"
                >
                  {cartItems.map((cart) => (
                    <li key={cart.id} className="flex py-6 sm:py-10 ">
                      <div className="flex-shrink-0 ">
                        <div className="flex">
                          <input
                            key={cart.id}
                            aria-describedby="comments-description"
                            name="cart-item"
                            type="checkbox"
                            onChange={(e) => handleChangeCheckbox(e, cart.id)}
                            checked={cart.is_selected}
                            className="h-4 w-4 rounded border-gray-300 ring-1 ring-zinc-800 text-zinc-800 mr-2 focus:ring-white"
                          />
                          <img
                            src={`${baseurl}${cart.product_data.image}`}
                            alt=""
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                            onError={(e) => (e.target.src = nbDefaultImage)}
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 ">
                        <div className="relative  sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {cart.product_data.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">
                                Size: {cart.product_data.size} gr{" "}
                              </p>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Rp. {priceFormatter(cart.product_data.price)}
                            </p>
                          </div>

                          <div className="mt-4 flex w-full ">
                            <div className="flex items-center justify-center border-gray-100 w-full ">
                              <span
                                className="cursor-pointer w-12 rounded-l-lg bg-zinc-800 py-1 px-3.5 duration-100 hover:bg-yellow-500 hover:text-white text-white align-middle"
                                onClick={() => decreaseQuantity(cart.id)}
                              >
                                -
                              </span>

                              <span className="w-12 border-gray-100 bg-transparent text-center text-xs appearance-none focus:outline-none ">
                                {cart.quantity}
                              </span>

                              <span
                                className="cursor-pointer w-12 rounded-r-lg bg-zinc-800 py-1 px-3 duration-100 hover:bg-yellow-500 hover:text-white text-white align-middle"
                                onClick={() => increaseQuantity(cart.id)}
                              >
                                +
                              </span>
                            </div>

                            <div className="absolute right-0 top-0 ">
                              <button
                                type="button"
                                className="-m-2 inline-flex p-2 text-zinc-800 hover:text-yellow-500"
                                onClick={() => deleteCart(cart.id)}
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-white px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  {t("cartPageOrderSummary")}
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      RP. {priceFormatter(subTotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      RP. {priceFormatter(totalPayment)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={showCheckout}
                    className={`w-full rounded-md border border-transparent ${
                      listSelectedId.length === 0
                        ? "bg-gray-300"
                        : "bg-zinc-800 "
                    } px-4 py-3 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-white hover:${
                      listSelectedId.length === 0
                        ? "bg-gray-300"
                        : "bg-yellow-500"
                    }`}
                  >
                    {t("cartPageCheckout")}
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
