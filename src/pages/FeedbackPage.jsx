import { Popover, Transition, Tab } from "@headlessui/react"
import { Fragment, useState } from "react"
import { apiPost } from "@/api/ApiService"
import verifyRecaptcha from "@/tools/recaptcha"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"
import toast from "react-hot-toast"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


export default function FeedbackPage() {
  const [selected, setSelected] = useState("feature")
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")

  const handleFeedback = async () => {
    const token = await verifyRecaptcha()
      .then((token) => token)
      .catch((err) => console.log(err))

    if (!token) {
      console.log("No reCAPTCHA token!")
      return
    }

    await apiPost(
      `${selected == "feature" ? "feature-request" : "product-request"}/`,
      {
        recaptcha: token,
        title: title,
        detail: details,
      },
      (response) => onSuccessfulFeedback(response),
      (error) => onFailedFeedback(error)
    )
  }

  const onSuccessfulFeedback = (data) => {
    const status = "Success!"
    const message = "You have successfully submitted your feedback."
    toast.custom((t) => <Success t={t} status={status} message={message} />)
    resetForm()
  }

  const onFailedFeedback = (error) => {
    const status = "Whoops!"
    const message =
      "Something went wrong. Please try again or contact us if the problem persists."
    toast.custom((t) => <Error t={t} status={status} message={message} />)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDetails("")
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="mt-[200px] block lg:hidden p-2 text-gray-200 hover:text-yellow-500 z-50 mx-8">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 ">
            <div className="flex bg-white py-8 justify-center">
              <form>
                <div className="space-y-6 ">
                  <div className=" pb-3 ">
                    <Tab.Group>
                      <Tab.List className="flex space-x-1 rounded-xl bg-zinc-200 p-1">
                        <Tab
                          key={"feature"}
                          onClick={() => setSelected("feature")}
                          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-yellow-500  ring-white/60 ring-offset-1 ring-offset-yellow-500 focus:outline-none focus:ring-1 ${selected === "feature"
                            ? "bg-white shadow"
                            : " text-zinc-800 hover:bg-zinc-400 hover:text-white"
                            }`}
                        >
                          Feature
                        </Tab>
                        <Tab
                          key={"product"}
                          onClick={() => setSelected("product")}
                          className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-yellow-500  ring-white/60 ring-offset-2 ring-offset-yellow-500 focus:outline-none focus:ring-2 ${selected === "product"
                            ? "bg-white shadow"
                            : " text-zinc-800 hover:bg-zinc-400 hover:text-white"
                            }`}
                        >
                          product
                        </Tab>
                      </Tab.List>
                    </Tab.Group>

                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-500 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              required
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              autoComplete="title"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Details
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            required
                            rows={3}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => {
                      close()
                      handleFeedback()
                    }}
                    className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </>
  )
}
