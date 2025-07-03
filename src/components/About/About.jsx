import React from "react";
import carPng from "../../assets/car/jeep.png";

function About() {
  return (
    <div
      className="dark:bg-black bg-slate-100 dark:text-white duration-300
    sm:min-h-[600px] sm:grid sm:place-items-center"
    >
      <div
        className="grid grid-cols-1
        sm:grid-cols-2 place-items-center"
      >
        <div
        data-aos="slide-right"
        data-aos-duration="1500"
        data-aos-once="false"
        >
          <img src={carPng} alt="" 
          className="sm:scale-105 sm:-translate-x-11 max-h-[300px]
          drop-shadow-[]"/>
        </div>
        <div>
          <div className="space-y-5 sm:p-16
          pb-6">
            <h1 data-aos='fade-up'
              className="text-3xl sm:text-4xl
                    font-bold font-serif"
            >
              About Us
            </h1>
            <p 
             data-aos='fade-up'
            >At Effortless Car Rental, we believe renting a car should be as easy and enjoyable as the journey itself.
Founded with the goal of simplifying mobility, our mission is to provide fast, reliable, and affordable car rental services to everyone
 — whether you're planning a road trip,
 attending a business meeting, or just need a car for the day.
                 </p>
            <p
             data-aos='fade-up'
            >With a growing fleet of well-maintained vehicles and a commitment 
            to top-notch customer support, we ensure that every ride with us is 
            smooth, safe, and stress-free.
From compact cars to premium SUVs, 
we’ve got something for every need and budget.
                 </p>

                 <button
                  data-aos='slide-up'
                  className="button-outline">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
