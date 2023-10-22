import { useEffect } from "react"
import dayjs from "dayjs"
import {
  nbwhite,
  bank1,
  bank2,
  bank3,
  bank4,
  bank5,
  bank6,
  bank7,
  bank8,
  bank9,
  bank10,
  bank11,
  bank12,
  bank13,
  bank14,
  bank15,
  bank16,
  bank17,
  bank18,
  bank19,
  bank20,
  bank21,
  bank22,
  bank23,
  bank24,
  bank25,
  bank26,
} from "@/assets"

import {
  SiFacebook,
  SiInstagram,
  SiYoutube,
  SiTiktok,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons"
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid"
import { useTranslation } from "react-i18next"

const navigation = {
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Product Return", href: "/return" },
    { name: "Product Request", href: "/product-request" },
    { name: "Bug Report", href: "/bug-report" },
    { name: "How to Order", href: "/how-to-order" },
    { name: "How to Pay", href: "/how-to-pay" },
    { name: "Track Order", href: "/track-order" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Jobs", href: "/jobs" },
    { name: "Investors", href: "/investor" },
    { name: "Business Partners", href: "/business-partners" },
  ],
  legal: [
    { name: "Return Policy", href: "/claim" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Credits", href: "/credits" },
  ],
  customerCare: [
    {
      name: "Contact Us",
      href: "/contact-us",
      icon: (props) => <ChatBubbleLeftRightIcon {...props} />,
    },
    {
      name: "081234567890",
      href: "#",
      icon: (props) => <SiWhatsapp {...props} />,
    },
    {
      name: "cs@nanobeepa.com",
      href: "#",
      icon: (props) => <EnvelopeIcon {...props} />,
    },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/nanobeepa",
      icon: (props) => <SiFacebook {...props} />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/nanobeepa",
      icon: (props) => <SiInstagram {...props} />,
    },
    {
      name: "X",
      href: "https://www.x.com/nanobeepa",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/nanobeepa",
      icon: (props) => <SiYoutube {...props} />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/nanobeepa",
      icon: (props) => <SiTiktok {...props} />,
    },
  ],
}

const Footer = () => {
  const { t } = useTranslation()
  useEffect(() => {
    // get current year using day js
    const year = dayjs().format("YYYY")
    // set current year to footer
    document.getElementById("year").innerHTML = year
  }, [])

  return (
    <footer
      className="bg-zinc-900  border-t border-b-zinc-800"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex flex-1 items-center">
              <img className="h-7 w-auto" src={nbwhite} alt="NanoBeepa" />
              <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-t from-yellow-500 to-yellow-50 pt-2 ml-3">
                NanoBeepa
              </h1>
            </div>
            <p className="leading-6 text-gray-300">
              {t('footer_Description')}
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Customer Care
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.customerCare.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-1 items-center text-gray-300 hover:text-white"
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <a href={item.href} className="text-sm leading-6 ml-3">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex items-center max-w-7xl px-6 lg:px-8 py-8 text-sm leading-6 text-gray-300">
        <div className="pr-2 hidden lg:block">Payment Method:</div>
        <div className="pr-2 block lg:hidden">Payment:</div>
        <div className="flex flex-1 gap-x-2 overflow-x-scroll rounded-sm">
          {[
            bank1,
            bank2,
            bank3,
            bank4,
            bank5,
            bank6,
            bank7,
            bank8,
            bank9,
            bank10,
            bank11,
            bank12,
            bank13,
            bank14,
            bank15,
            bank16,
            bank17,
            bank18,
            bank19,
            bank20,
            bank21,
            bank22,
            bank23,
            bank24,
            bank25,
            bank26,
          ].map((item, index) => (
            <img
              key={index}
              className="h-8 w-auto"
              src={item}
              alt="Payment Method"
            />
          ))}
        </div>
      </div>
      <hr className="border-white/10" />
      <div className="mx-auto text-center max-w-7xl px-6 lg:px-8 py-6">
        <p className="text-sm leading-6 text-gray-400">
          &copy; <span id="year"></span> PT. Inayat Bunga Perdana. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
