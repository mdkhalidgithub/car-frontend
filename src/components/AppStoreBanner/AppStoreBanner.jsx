import React from 'react'
import pattern from "../../assets/website/pattern.jpeg"
import  AppStoreImg from "../../assets/appStore.png"
import PlayStoreImg from "../../assets/playStore.png"

const bannerImg = {
    backgroundImage: `url(${pattern})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition:"center",
    height:"100%",
    width: "100%",  
     
}

const  AppStoreBanner=()=> {
  return (
    <div className='container pb-14 dark:bg-black'>
        <div className='text-black py-10 sm:min-h-[400px]
        sm:grid sm:place-items-center rounded-xl' 
        style={bannerImg}>
            <div>
                <div className='space-y-6 max-w-xl max-auto'>
                    <h1 data-aos="fade-up" className='
                    text-2xl text-center sm:text-4xl
                    font-semibold font-serif'>Get Started with our app</h1>
                    <p data-aos="fade-up" className='
                    text-center sm:px-20'>Experience the freedom of car rental right at your fingertips.
Book, manage, and track your rides anytime, anywhere — all from one easy-to-use app.
                    </p>
                    <div data-aos="fade-up" className='flex justify-center items-center'>
                        <a href="#">
                            <img src={PlayStoreImg} alt="" 
                            className='max-w-[150px] sm:max-w-[120]
                            md:max-w-[200px]'/>
                        </a>
                        <a href="#">
                            <img src={AppStoreImg} alt="" 
                            className='max-w-[150px] sm:max-w-[120]
                            md:max-w-[200px]'/>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default AppStoreBanner