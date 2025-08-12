import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Shared/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = ({ BannerData }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: false,
      mirror: false
    });
  }, []);

  const handleViewDetails = (BannerData) => {
    if (!BannerData?.slug) {
      console.error('BannerData slug is missing!', BannerData);
      return;
    }
    navigate(`/produit/${encodeURIComponent(BannerData.slug)}`);
  };

  // Définition des courbes de timing personnalisées dans le style inline
  const customEasing = {
    bezier: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    bezierFast: 'cubic-bezier(0.68, -0.3, 0.32, 1.3)'
  };

  return (
    <div className="min-h-[500px] flex justify-center items-center py-14">
      <div className="container px-4">
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          style={{ backgroundColor: BannerData.bgColor }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-8 md:p-10 relative isolate"
        >
          {/* Effets décoratifs animés */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div 
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/5"
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="1200"
            ></div>
            <div 
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1200"
            ></div>
          </div>

          {/* Texte principal */}
          <div className="space-y-5 relative z-10">
            <span 
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-white/90 bg-white/10 rounded-full backdrop-blur-sm"
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-easing="ease-out-back"
            >
              {BannerData.discount}
            </span>

            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              {BannerData.mainTitle}
            </h1>

            <p 
              className="text-white/90 text-base leading-relaxed"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              {BannerData.description}
            </p>

            <ul className="space-y-3 mt-6">
              {BannerData.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm md:text-base text-white/90"
                  data-aos="fade-up"
                  data-aos-delay={250 + index * 50}
                  data-aos-anchor-placement="top-bottom"
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-3 bg-white/20 rounded-full animate-[pulse_2s_infinite]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Image centrale avec animations améliorées */}
          <div className="flex justify-center items-center relative h-full z-10">
            <div 
              className="relative group"
              data-aos="zoom-in"
              data-aos-delay="300"
              data-aos-duration="600"
            >
              <div 
                className="absolute -inset-4 bg-white/20 rounded-full blur-md group-hover:blur-lg"
                style={{
                  transition: `all 700ms ${customEasing.bezier}`
                }}
              ></div>
              <img
                src={BannerData.image}
                alt={BannerData.mainTitle}
                className="relative w-[200px] md:w-[280px] lg:w-[320px] object-contain drop-shadow-2xl hover:scale-105"
                style={{
                  transition: `transform 700ms ${customEasing.bezier}`
                }}
                data-aos="zoom-in"
                data-aos-delay="350"
                data-aos-duration="800"
              />
            </div>
          </div>

          {/* Section CTA avec animations */}
          <div className="space-y-6 text-white relative z-10">
            <div 
              className="p-5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 hover:border-white/10"
              style={{
                transition: `all 500ms ${customEasing.bezierFast}`
              }}
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <p className="text-xs uppercase tracking-wider mb-2 opacity-90">
                Offre limitée
              </p>
              <p className="text-xl font-bold">{BannerData.validity}</p>
            </div>
            
            <Button 
              text={"Voir les détails"}
              bgColor={'white'}
              textColor={'primary'}
              ariaLabel={`Voir les détails de ${BannerData.mainTitle}`}
              onClick={() => handleViewDetails(BannerData)}
              className="px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl w-full hover:-translate-y-1"
              style={{
                transition: `all 500ms ${customEasing.bezierFast}`
              }}
              data-aos="fade-up"
              data-aos-delay="450"
            />

            <div 
              className="flex items-center text-sm text-white/80"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <svg 
                className="w-5 h-5 mr-2 animate-[bounce_1.5s_infinite]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Livraison gratuite incluse
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;