import { useForm } from "react-hook-form"
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

import verifyRecaptcha from "@/tools/recaptcha"
import { apiPost } from "@/api/ApiService"
import Success from "./messages/Success"
import Error from "./messages/Error"

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  // Handle form submission
  const onSubmit = async (data) => {
    const token = await verifyRecaptcha()
      .then((token) => token)
      .catch((err) => console.log(err))

    if (!token) {
      return
    }

    const payload = {
      email: data.email,
      recaptcha: token,
    }

    await updateNewsletter(payload)
  }

  const updateNewsletter = async (data) => {
    await apiPost("subscription/", data, onNewsletterSuccess, onNewsletterError)
  }

  const onNewsletterSuccess = (data) => {
    const status = "Subscribed!"
    const message = "You have successfully subscribed to our newsletter."

    toast.custom((t) => <Success t={t} status={status} message={message} />)
  }

  const onNewsletterError = (err) => {
    const status = "Whoops!"
    const message =
      "We were unable to subscribe you to our newsletter. " +
      err.response.data.email

    toast.custom((t) => <Error t={t} status={status} message={message} />)
  }

  return (
    <section
      aria-labelledby="comfort-heading"
      className="mx-auto max-w-7xl px-4 lg:px-8 py-16"
    >
      <div className="relative isolate rounded-xl overflow-hidden bg-zinc-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Subscribe to our newsletter.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Get the latest articles to your inbox every week.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Please enter your email address.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address.",
                      },
                    })}
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    Subscribe
                  </button>
                </div>
                {errors.email && (
                  <small className="mt-2 text-sm text-red-300">
                    {errors.email.message}
                  </small>
                )}
              </form>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-white">
                  Weekly articles
                </dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  We will send you weekly articles about the latest products and
                  trends.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-white">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  We will never send you spam emails. We hate them too.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#f5c939] to-[#f78248] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Newsletter
