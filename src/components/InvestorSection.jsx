import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { apiGet } from "@/api/ApiService"
import Marquee from "react-fast-marquee"

const InvestorSection = () => {
  const [invertors, setInvertors] = useState([])

  useEffect(() => {
    fetchInvertors()
  }, [])

  const fetchInvertors = async () => {
    await apiGet(
      "investor/",
      (response) => onSuccessfulFetch(response),
      (error) => onFailedFetch(error)
    )
  }

  const onSuccessfulFetch = (response) => {
    // console.log("invertors", response)
    setInvertors(response.results)
  }

  const onFailedFetch = (error) => {
    // console.log(error)
  }

  const { t } = useTranslation()

  return (
    <div className="bg-white pb-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {t("investorSection_Title")}
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {t("investorSection_Description")}
        </p>
      </div>
      <div className="mt-12 mx-auto max-w-7xl px-6 lg:px-8">
        <Marquee className="rounded-lg" pauseOnHover={true} autoFill={true}>
          <div className="flex gap-x-4 mr-4">
            {invertors.map((invertor) => (
              <div key={invertor.id} className="p-4 bg-slate-100 rounded-lg">
                <img
                  className="h-12 w-auto object-contain"
                  src={invertor?.logo}
                  alt="Investor Logo"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  )
}

export default InvestorSection
