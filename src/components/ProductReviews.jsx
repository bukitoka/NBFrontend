import { StarIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { nbDefaultImage } from "@/assets"
import { Disclosure, RadioGroup, Tab } from "@headlessui/react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import StarRating from "./StarRating"
import { apiPostMultipart } from "@/api/ApiService"
import { TrashIcon } from "@heroicons/react/20/solid"
import verifyRecaptcha from "@/tools/recaptcha"

const reviewss = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Love this bag! It's stylish and can fit a ton of things. I use it every time I leave my house.</p>
      `,
      author: "Lisa Marie",
      avatarSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 3,
      rating: 5,
      content: `
        <p>I love this bag so much I bought it in every color!</p>
      `,
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 4,
      rating: 5,
      content: `
        <p>So glad I purchased this bag! It's really helped me stay organized.</p>
      `,
      author: "Emma Dorsey",
      avatarSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ProductReviews(props) {
  const { reviews, productId, totalRatingCount } = props.data
  console.log("total rating", totalRatingCount)
  const [totalRating, setTotalRating] = useState([])
  const [rating, setStarRating] = useState(0)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [video, setVideo] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [comment, setComment] = useState("")

  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleStarClick = (newRating) => {
    setStarRating(newRating)
  }

  const handleImageInputChange = async (event) => {
    const file = event.target.files[0]
    setImagePreview(URL.createObjectURL(file))
    setImage(file)
  }

  const handleVideoInputChange = async (event) => {
    const file = event.target.files[0]
    setVideoPreview(URL.createObjectURL(file))
    setVideo(file)
    console.log(file)
  }

  const createReview = async () => {
    const token = await verifyRecaptcha()
      .then((token) => token)
      .catch((err) => console.log(err))

    if (!token) {
      console.log("No reCAPTCHA token!")
      return
    }

    await apiPostMultipart(
      "rating/",
      {
        product: productId,
        rating: rating,
        review: comment,
        image: image,
        video: video,
        recaptcha: token,
      },
      (respone) => onSuccessCreateReview(respone),
      (error) => onErrorCreateReview(error)
    )
  }

  const onSuccessCreateReview = (response) => {
    console.log(response)
  }

  const onErrorCreateReview = (error) => {
    console.log(error)
  }

  const { t } = useTranslation()
  return (
    <div className="bg-white border-t">
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {t("productDetail_CustomerReviews")}
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      totalRatingCount >= rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviewss.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {reviews.length ?? 0} reviews
            </p>
          </div>

          {/* <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviewss.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        className={classNames(
                          count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                            style={{ width: `calc(${count.count} / ${reviewss.totalCount} * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                    {Math.round((count.count / reviewss.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div> */}

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <section aria-labelledby="details-heading" className=" mt-2">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
              <div>
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-3 text-left">
                        <span className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">
                          Write a review
                        </span>
                      </Disclosure.Button>

                      <Disclosure.Panel
                        as="div"
                        className="prose prose-sm pb-6"
                      >
                        <form>
                          <div className="space-y-5">
                            <div className=" border-gray-900/10 pb-1">
                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className="col-span-full">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Rating
                                  </label>
                                  <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                      <a
                                        key={value}
                                        onClick={() => handleStarClick(value)}
                                      >
                                        <StarIcon
                                          className={classNames(
                                            rating >= value
                                              ? "text-yellow-400"
                                              : "text-gray-300",
                                            "h-7 w-7 flex-shrink-0"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Review
                                  </label>
                                  <div className="mt-2">
                                    <textarea
                                      id="about"
                                      name="about"
                                      value={comment}
                                      required
                                      rows={3}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Photo
                                  </label>
                                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                                    {imagePreview ? (
                                      <>
                                        <div className="w-full h-full flex flex-col">
                                          <div className="w-ful mb-1">
                                            <button
                                              className="float-right"
                                              onClick={() =>
                                                setImagePreview(null)
                                              }
                                            >
                                              {" "}
                                              <TrashIcon
                                                className="h-7 w-7 text-zinc-800 hover:text-yellow-500"
                                                aria-hidden="true"
                                              />{" "}
                                            </button>
                                          </div>
                                          <img
                                            src={imagePreview}
                                            alt=""
                                            className=" w-full h-full rounded-lg"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="text-center">
                                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                              htmlFor="file-upload"
                                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                              <span>Upload a file</span>
                                              <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={
                                                  handleImageInputChange
                                                }
                                              />
                                            </label>
                                            <p className="pl-1">
                                              or drag and drop
                                            </p>
                                          </div>
                                          <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 5MB
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Pick Video
                                  </label>
                                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                                    {videoPreview ? (
                                      <>
                                        <div className="w-full h-full flex flex-col">
                                          <div className="w-ful mb-1">
                                            <button
                                              className="float-right"
                                              onClick={() =>
                                                setVideoPreview(null)
                                              }
                                            >
                                              {" "}
                                              <TrashIcon
                                                className="h-7 w-7 text-zinc-800 hover:text-yellow-500"
                                                aria-hidden="true"
                                              />{" "}
                                            </button>
                                          </div>
                                          <video
                                            src={videoPreview}
                                            controls
                                            className=" rounded-lg"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="text-center">
                                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                              htmlFor="video-upload"
                                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                              <span>Upload a file</span>
                                              <input
                                                id="video-upload"
                                                name="video-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={
                                                  handleVideoInputChange
                                                }
                                              />
                                            </label>
                                            <p className="pl-1">
                                              or drag and drop
                                            </p>
                                          </div>
                                          <p className="text-xs leading-5 text-gray-600">
                                            Mp4 up to 10MB
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="button"
                              className="text-sm font-semibold leading-6 text-gray-900"
                              onClick={() => open(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={createReview}
                              className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <img
                      src={review.image}
                      alt={``}
                      onError={(e) => (e.target.src = nbDefaultImage)}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">
                        {review.author}
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-6 text-base italic text-gray-600">
                    <p>{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
