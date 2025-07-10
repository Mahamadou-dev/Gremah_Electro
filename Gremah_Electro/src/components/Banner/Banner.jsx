import React from 'react';

const Banner = ({ BannerData }) => {
  return (
    <div
      data-aos="fade-in"
      data-aos-duration="700"
      data-aos-once="true"
      className="min-h-[450px] flex justify-center items-center py-14"
    >
      <div className="container px-4">
        <div
          data-aos="fade-right"
          data-aos-duration="800"
          style={{ backgroundColor: BannerData.bgColor }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center rounded-3xl overflow-visible shadow-2xl p-6 md:p-8"
        >
          {/* Texte principal */}
          <div
            data-aos="fade-right"
            data-aos-duration="900"
            data-aos-delay="100"
            className="space-y-4"
          >
            <p className="text-sm font-semibold tracking-widest text-white/90">
              {BannerData.discount}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {BannerData.mainTitle}
            </h1>

            <p className="text-white text-sm opacity-90">
              {BannerData.description}
            </p>

            <ul className="space-y-2 mt-4">
              {BannerData.features.map((feature, index) => (
                <li
                  key={index}
                  data-aos="fade-left"
                  data-aos-duration="800"
                  data-aos-delay={300 + index * 100}
                  className="flex items-center text-sm text-white/90"
                >
                  <span className="mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Image centrale */}
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="false"
            className="flex justify-center items-center relative h-full"
          >
            <img
              src={BannerData.image}
              alt={BannerData.mainTitle}
              className="w-[200px] md:w-[280px] lg:w-[320px] -translate-y-10 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Validité et CTA */}
          <div
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="400"
            className="space-y-6 text-white"
          >
            <div>
              <p className="text-xs uppercase tracking-wider mb-1 opacity-90">
                Offre limitée
              </p>
              <p className="text-xl font-bold">{BannerData.validity}</p>
            </div>

            <button
              style={{ backgroundColor: 'white', color: BannerData.bgColor }}
              className="px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {BannerData.ctaText}
            </button>

            <p className="text-xs opacity-80">Livraison gratuite incluse</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
