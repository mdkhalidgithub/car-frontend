import React from 'react'

const testimonialData = [
  {
    name:" Md Khalid",
    image:"",
    description: "“Booking a car was so easy and the pickup process was smooth. Loved the clean vehicle and polite service!”",
    aosDelay: "0",
  },
  {
    name:"Guddu Kumar",
    image:"",
    description: "“I needed a last-minute rental for a road trip — Clarity came through with the best price and service!”",
    aosDelay: "300",
  },
  {
    name:"Sahil Ansari",
    image:"",
    description: "“Great experience! The car was in top condition and the support team was very responsive throughout.”",
    aosDelay: "1000",
  },
]

const  Testimonial = () => {
  return (
    <div className='dark:bg-black dark:text-white 
    py-14 sm:pb-24'>
      <div className="container">
        {/* header */}
        <div data-aos="fade-up" className='space-y-4 pb-12'>
          <p className='text-3xl font-semibold
          text-center sm:text-4xl font-serif'>What Our Clients Say About Us</p>
          <p className='text-center 
          sm:px-44'>Lorem ipsum dolor sit amet consectetur adipisicing elit.{""} 
           </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2  gap-8 text-black
        dark:text-white md:grid-cols-3 '>
          {
            testimonialData.map((data)=>{
              return (
               <div 
               data-aos="fade-up"
               data-aos-delay={data.aosDelay}
                key={data.name}
                className='card text-center group space-y-3 sm:space-y-6 p-4
                bg-grey-100 dark:bg-white/20 sm:py-12 duration-300 rounded-lg
                bg-gray-100'>
                <div className='grid place-items-center'>
                  <img src="https://picsum.photos/200" alt=""
                  className='h-20 w-20 rounded-full' />
                </div>
                <div className='text-2xl'>⭐⭐⭐⭐⭐</div>
                <p>{data.description}</p>
                <p className='
                font-semibold text-center'>{data.name}</p>
              </div>

              )

            })
          }
        </div>
      </div>
    </div>
  )
}

export default Testimonial