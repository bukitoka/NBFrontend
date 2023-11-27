export const API_PREFIX = import.meta.env.VITE_API_PREFIX
export const API_VERSION = import.meta.env.VITE_API_VERSION
export const API_MIDDLE_URL = `${API_PREFIX}${API_VERSION}`
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// constant for language
export const languageOptions = {
  english: "en",
  indonesian: "idn",
}

// payment status
export const paymentStatus = {
  pending: "pending",
  capture: "capture",
  settlement: "settlement",
  cancel: "cancel",
  expired: "expired",
  deny: "deny",
  failure: "failure",
  refund: "refund",
  partialRefund: "partial refund",
}

// order status
export const orderStatus = {
  pending: "pending",
  confirmed: "confirmed",
  shipping: "shipping",
  returned: "returned",
  refunded: "refunded",
  complete: "complete",
}
