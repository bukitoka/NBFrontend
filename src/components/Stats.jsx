import { useTranslation } from "react-i18next"
const Stats = () => {
  const stats = [
    {
      id: 1,
      name: "Best quality products",
      value: "1,000+",
      more: "Carefully selected products",
    },
    {
      id: 2,
      name: "Top brands",
      value: "50+",
      more: "Brand from all over the world",
    },
    {
      id: 3,
      name: "Support assistent",
      value: "24/7",
      more: "We always here to help you",
    },
    {
      id: 4,
      name: "Free voucher",
      value: "100+",
      more: "Get free voucher every month",
    },
  ]

  const { t } = useTranslation()
  return (
    <div className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t("statSection_Title")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t("statSection_Description")}
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-slate-100 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-800">
                  {stat.name}
                </dt>
                <small className="mt-3 italic text-gray-700 hover:text-gray-900">
                  <a href={stat.url}>{stat.more} &rarr;</a>
                </small>
                <div className="order-first bg-clip-text text-transparent bg-gradient-to-t from-yellow-700 to-yellow-200">
                  <dd className="text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Stats
