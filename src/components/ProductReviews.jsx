import { StarIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "react-i18next"
import { nbDefaultImage } from "@/assets"
const baseurl = import.meta.env.VITE_API_BASE_URL

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ProductReviews(props) {
  const { reviews, totalRatingCount } = props.data
  console.log("test review", reviews)

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
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {reviews.length ?? 0} reviews
            </p>
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
                      src={`${baseurl}${review.image}`}
                      alt={``}
                      onError={(e) => (e.target.src = nbDefaultImage)}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">
                        {review.author}
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.star >= rating
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
