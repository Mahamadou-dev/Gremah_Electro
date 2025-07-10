import React from 'react';
import Slider from "react-slick";
import Image1 from '../../assets/hero/headphone.png';
import Image2 from '../../assets/category/vr.png';
import Image3 from '../../assets/category/macbook.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from '../Shared/Button';

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  const HeroData = [
    {
      id: 1,
      img: Image1,
      subtitle: "Beats Solo",
      title1: "Wireless",
      title2: "Headphones",
      description: "Profitez de la liberté sans fil avec les écouteurs Beats Solo, offrant un son puissant et une autonomie prolongée.",
    },
    {
      id: 2,
      img: Image2,
      subtitle: "Beats Solo",
      title1: "Wireless",
      title2: "Virtual Reality",
      description: "Découvrez une nouvelle dimension de divertissement avec les casques Beats Solo, alliant confort et technologie avancée.",
    },
    {
      id: 3,
      img: Image3,
      subtitle: "Beats Solo",
      title1: "Wireless",
      title2: "Laptops",
      description: "Plongez dans un son de qualité supérieure avec les écouteurs Beats Solo, conçus pour les audiophiles en déplacement.",
    }
  ];

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center hero-bg-color shadow-xl'>
        <Slider {...settings} className='w-full'>
          {HeroData.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-1 sm:grid-cols-2 items-center gap-12 p-6 sm:p-12'
            >
              {/* Text Content */}
              <div className='text-center sm:text-left space-y-6'>
                <h2
                  data-aos='fade-down'
                  data-aos-duration="800"
                  data-aos-delay="100"
                  data-aos-once='true'
                  className='text-xl sm:text-2xl text-primary font-semibold uppercase tracking-widest'
                >
                  {item.subtitle}
                </h2>

                <h1
                  data-aos='fade-right'
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  data-aos-once='true'
                  className='text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-gray-200 leading-tight'
                >
                  {item.title1} <br />
                  <span className='text-primary'>{item.title2}</span>
                </h1>

                <p
                  data-aos='fade-up'
                  data-aos-duration="900"
                  data-aos-delay="300"
                  data-aos-once='true'
                  className='text-lg sm:text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-xl mx-auto sm:mx-0'
                >
                  {item.description}
                </p>

                <div
                  data-aos='zoom-in'
                  data-aos-duration="600"
                  data-aos-delay="500"
                  data-aos-once='true'
                  className='flex justify-center sm:justify-start mt-6'
                >
                  <Button text='Acheter Maintenant' bgColor='bg-primary' textColor='text-white' />
                </div>
              </div>

              {/* Image Section */}
              <div
                data-aos='fade-left'
                data-aos-duration="1200"
                data-aos-delay="300"
                data-aos-once='true'
                className='flex justify-center sm:justify-end relative z-10'
              >
                <img
                  src={item.img}
                  alt={item.title2}
                  className='w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105'
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
