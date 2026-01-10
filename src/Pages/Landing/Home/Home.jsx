import React from "react";
import Banner from "../../Banner/Banner";
import Brands from "../../Brands/Brands";
import Reviews from "../../Reviews/Reviews";
import AboutUs from "../../AboutUs/AboutUs";
import WhyChooseAndContact from "../../WhyChooseUs/WhyChooseAndContact";
import Contact from "../../Contact/Contact";
import TopCard from "../../Services Page/TopCard";
import TopDecorator from "../../Top Decorators/TopDecorator";
import Coverage from "../Map/Coverage";
import TopSellerBurgers from "../../Top Decorators/TopBurder";
import FloatingContact from "../../FloatingContact/FloatingContact";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());
const coveragePromise = fetch("/serviceCenter.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-24">
      <Banner />

      <section className="container mx-auto bg-gray-50">
        <TopCard />
      </section>
      <section className="container mx-auto">
        <Coverage coveragePromise={coveragePromise} />
      </section>

      <section className="container mx-auto">
        <TopDecorator />
      </section>

      <section className="container mx-auto">
        <TopSellerBurgers></TopSellerBurgers>
      </section>

      <section className="bg-gray-50 ">
        <AboutUs />
      </section>

      <section className="">
        <WhyChooseAndContact />
      </section>

      <section className="container mx-auto">
        <Reviews reviewPromise={reviewPromise} />
      </section>

      <section className="container mx-auto">
        <Brands />
      </section>

      <section className="">
        <Contact />
      </section>

      <FloatingContact></FloatingContact>
    </div>
  );
};

export default Home;
