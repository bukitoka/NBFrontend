import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { NotFound } from "@/assets"

const PageNotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <img className="mx-auto h-96 w-auto" src={NotFound} alt="Not Found" />
        <p className="text-lg font-semibold leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md flex bg-zinc-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go back home
          </a>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound
