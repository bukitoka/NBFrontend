import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { apiGet } from "@/api/ApiService"
import { nbDefaultImage } from "@/assets"
import { languageOptions } from "@/tools/constants"

const StorySection = () => {
  const [blogs, setBlogs] = useState([])

  const getTopBlogs = async () => {
    await apiGet(
      "blogs/",
      (reponse) => onGetTopBlogsSuccess(reponse),
      () => onGetTopBlogsError()
    )
  }

  const onGetTopBlogsSuccess = (data) => {
    setBlogs(data.results)
  }

  const onGetTopBlogsError = (error) => {
    // console.log(error)
  }

  useEffect(() => {
    getTopBlogs()
  }, [])

  const { t, i18n } = useTranslation()
  return (
    <>
      {blogs && (
        <section aria-labelledby="category-heading" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2
                id="category-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                {t("storySection_Title")}
              </h2>
              <a
                href="/blogs"
                className="hidden lg:flex group py-2 px-6 rounded-full text-sm bg-gray-100 font-semibold text-gray-800 hover:text-yellow-600"
              >
                {t("storySection_BrowseAll")}
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 ">
              {/* headline blogs*/}
              {blogs.map(
                (blog) =>
                  blog.is_headline &&
                  blog.is_featured &&
                  blog.is_published && (
                    <div
                      key={blog.id}
                      className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-xl sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2"
                    >
                      <img
                        src={
                          blog.cover_homepage_headline
                            ? blog.cover_homepage_headline
                            : nbDefaultImage
                        }
                        className="object-cover object-center group-hover:opacity-75"
                        onError={(e) => (e.target.src = nbDefaultImage)}
                      />
                      <div
                        aria-hidden="true"
                        className="bg-gradient-to-b from-transparent to-black opacity-50"
                      />
                      <div className="flex items-end p-6">
                        <div>
                          <h3 className="font-semibold text-white">
                            <a href={`/blogs/${blog?.slug}`}>
                              <span className="absolute inset-0" />
                              {i18n.language == languageOptions.english
                                ? blog?.title
                                : blog?.title_id}
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  )
              )}

              {/* other featured blogs */}
              {blogs.map(
                (blog) =>
                  !blog.is_headline &&
                  blog.is_featured &&
                  blog.is_published && (
                    <div
                      key={blog.id}
                      className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
                    >
                      <img
                        src={
                          blog.cover_homepage_mobile
                            ? blog.cover_homepage_mobile
                            : nbDefaultImage
                        }
                        className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full block lg:hidden"
                        onError={(e) => (e.target.src = nbDefaultImage)}
                      />
                      <img
                        src={
                          blog.cover_homepage
                            ? blog.cover_homepage
                            : nbDefaultImage
                        }
                        className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full hidden lg:block"
                        onError={(e) => (e.target.src = nbDefaultImage)}
                      />
                      <div
                        aria-hidden="true"
                        className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                      />
                      <div className="flex items-end p-6 sm:absolute sm:inset-0">
                        <div>
                          <h3 className="font-semibold text-white">
                            <a href={`/blogs/${blog?.slug}`}>
                              <span className="absolute inset-0" />
                              {i18n.language == languageOptions.english
                                ? blog?.title
                                : blog?.title_id}
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>

            <div className="flex lg:hidden justify-center mt-8 w-full">
              <a
                href="/blogs"
                className="bg-black hover:bg-yellow-600 flex py-2 px-6 text-sm text-white rounded-full group"
              >
                Browse all stories{" "}
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default StorySection
