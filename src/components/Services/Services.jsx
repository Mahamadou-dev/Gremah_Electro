import React from 'react'
import {
    FaCarSide,
    FaHeadphonesAlt, 
    FaWallet, 
    FaCheckCircle   
} from 'react-icons/fa';

const serviceData = [
    {
        id: 1,
        icon: <FaCarSide className='text-4xl text-primary md:text-5xl' />,
        title: 'Livraison gratuite',
        description: 'Profitez de la livraison gratuite à partir de 100 000 fcfa.'
    },
    {
        id: 2,
        icon: <FaHeadphonesAlt className='text-4xl md:text-5xl  text-primary' />,
        title: 'Support client',
        description: 'Notre équipe est disponible 24/7 pour vous aider.'
    },
    {
        id: 3,
        icon: <FaWallet className='text-4xl md:text-5xl  text-primary' />,
        title: 'Paiement sécurisé',
        description: 'Vos transactions sont protégées par les dernières technologies de sécurité.'
    },
    {
        id: 4,
        icon: <FaCheckCircle className='text-4xl md:text-5xl  text-primary' />,
        title: 'Garantie de satisfaction',
        description: 'Nous garantissons votre satisfaction ou votre argent de retour.'
    }
];
const Services = () => {
  return (
    <div>
        <div className="container mt-14 md:mt-20">
            <div className='grid  grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8'>
              {
                serviceData.map(service => (
                    <div 
                        key={service.id} 
                        className='flex flex-col items-start sm:flex-row gap-4'
                    >
                        {service.icon}
                        <div >
                            <h1 className='lg:text-xl font-bold'>{service.title}</h1>
                            <h1 className='text-gray-400 text-sm'>{service.description}</h1>
                        </div>
                        <div>
    
                        </div>
                    </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default Services