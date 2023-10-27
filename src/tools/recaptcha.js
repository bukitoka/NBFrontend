const verifyRecaptcha = async () => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  if (!siteKey) {
    throw new Error("Missing RECAPTCHA_SITE_KEY")
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(siteKey, { action: "submit" })
        .then(function (token) {
          resolve(token) // Resolve the Promise with the token
        })
        .catch(function (error) {
          reject(error) // Reject the Promise with the error
        })
    })
  })
}

export default verifyRecaptcha
