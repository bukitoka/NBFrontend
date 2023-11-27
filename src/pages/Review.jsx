import { TrashIcon } from "@heroicons/react/20/solid"
import { StarIcon } from "@heroicons/react/20/solid"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useAuthStore from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { fetchCartItems } from "../api/CartApi"
import { useTranslation } from "react-i18next"
import { nbDefaultImage } from "@/assets"
import { priceFormatter } from "@/tools/reformat"
import { apiGet, apiPost } from "@/api/ApiService"

// components
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Review() {
  const [rating, setStarRating] = useState(0)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [video, setVideo] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [comment, setComment] = useState("")
  const { productSlug } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const { t } = useTranslation()

  const baseurl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    await apiGet(
      `product/${productSlug}/`,
      (data) => onProductSuccess(data),
      (error) => onProductError(error)
    )
  }

  const onProductSuccess = (data) => {
    console.log("product detail", data)
  }

  const onProductError = (error) => {
    console.log("CheckPoint", error)
  }

  const handleImageInputChange = async (event) => {
    const file = event.target.files[0]
    //   maximun file was 5 MB
    if (file.size > 5 * 1000 * 1024) {
      console.log("File with maximum size of 1MB is allowed")
      return false
    }
    console.log("checkpoint", file)
    setImagePreview(URL.createObjectURL(file))
    setImage(file)
  }

  /**
   * Updates the star rating and triggers a re-render of the component.
   *
   * @param {number} newRating - The new star rating.
   */
  const handleStarClick = (newRating) => {
    setStarRating(newRating)
  }

  const onSubmit = async (data) => {}

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px]">
          <div className="mx-auto max-w-2xl px-4 pt-16  sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
            <ul className=" bg-red-600">
              <li className="p-4 sm:p-6">
                <div className="flex items-center sm:items-start">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                    <img
                      src={``}
                      alt=""
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = nbDefaultImage
                      }}
                    />
                  </div>
                  <div className="ml-6 flex-1 text-sm">
                    <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                      <h5>Order test</h5>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            {/* review form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                                className={`${
                                  rating >= value
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                } h-7 w-7 flex-shrink-0`}
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
                            onChange={(e) => setComment(e.target.value)}
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
                                    onClick={() => setImagePreview(null)}
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
                                      onChange={handleImageInputChange}
                                    />
                                  </label>
                                  <p className="pl-1"></p>
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
                                    // onClick={() => setVideoPreview(null)}
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
                                      //   onChange={handleVideoInputChange}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
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
                    type="submit"
                    className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
