const OtherPromo = () => {
  return (
    <section
      aria-labelledby="comfort-heading"
      className="mx-auto max-w-7xl px-4 lg:px-8 py-16"
    >
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1661763212444-ff4d9650e1aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative bg-gray-900 bg-opacity-80 py-20 lg:py-24 px-12 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="comfort-heading"
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-yellow-500 to-yellow-50"
            >
              Beauty Treatment Webinar
            </h2>
            <p className="mt-3 text-xl text-white">
              45-minute online webinar where we'll cover the most common
              skincare concerns and how to address them.
            </p>
            <a
              href="#"
              className="mt-8 flex justify-center items-center w-full lg:w-auto rounded-full border 
                            border-transparent backdrop-blur-[10px] bg-black/50 px-8 py-2 font-medium text-gray-100 
                            hover:text-yellow-600 group"
            >
              Coming Soon
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtherPromo
