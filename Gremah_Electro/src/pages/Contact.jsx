import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Button from '../components/Shared/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traiter l'envoi du formulaire ici
    console.log('Formulaire soumis:', formData);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 mt-10 ">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
        <p className="text-gray-500 mb-8">Nous sommes là pour répondre à vos questions</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Informations de contact */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-bold mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FiMail className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-500">contact@gremahelectro.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FiPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-gray-500">+227 88 77 80 95</p>
                    <p className="text-gray-500">+227 98 77 80 95</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FiMapPin className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-500">Zinder, Niger</p>
                    <p className="text-gray-500">Charée Zamna</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Heures d'ouverture</h3>
                <p className="text-gray-500">Lundi - Vendredi: 8h - 18h</p>
                <p className="text-gray-500">Samedi: 9h - 14h</p>
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Votre nom</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">Votre email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1">Sujet</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                </div>
                
                <div>
                  <label className="block mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  text="Envoyer le message" 
                  bgColor="bg-primary" 
                  textColor="text-white" 
                  className="w-full md:w-auto px-8 py-3 mt-4"
                />
              </form>
            </div>
            
            {/* Carte (optionnelle) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Nous trouver</h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Carte géographique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;