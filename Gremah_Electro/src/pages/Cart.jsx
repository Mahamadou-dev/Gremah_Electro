import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiArrowRight, FiCheck, FiPercent } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Shared/Button';
import p1 from '../assets/product/p-1.jpg';
import p2 from '../assets/product/p-2.jpg';
import p3 from '../assets/product/p-3.jpg';
import p4 from '../assets/product/p-4.jpg';
import p5 from '../assets/product/p-5.jpg';
import p6 from '../assets/product/p-6.jpg';
import p7 from '../assets/product/p-7.jpg';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      img: p1, 
      title: "Casque Bluetooth Premium", 
      price: 4200,
      originalPrice: 5000,
      quantity: 2,
      color: "Noir",
      warranty: "2 ans"
    },
    { 
      id: 2, 
      img: p2, 
      title: "Smartwatch Pro", 
      price: 8000,
      quantity: 1,
      color: "Argent",
      warranty: "1 an"
    },
    { 
      id: 3, 
      img: p3, 
      title: "Lunettes VR", 
      price: 3200,
      quantity: 1,
      color: "Noir",
      warranty: "1 an"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Niger',
    paymentMethod: 'cash'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleQuantityChange = (id, value) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    let total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    if (promoApplied) {
      total *= 0.9; // 10% de réduction
    }
    return total;
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => 
      total + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulation de traitement de commande
    setTimeout(() => {
      console.log('Commande soumise:', { ...formData, items: cartItems, total: calculateTotal() });
      setIsProcessing(false);
      setOrderCompleted(true);
      setCartItems([]);
    }, 2000);
  };

  const applyPromoCode = () => {
    if (promoCode === "SOLDE10") {
      setPromoApplied(true);
    }
  };

  // Animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    },
    hover: {
      scale: 1.005,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 mt-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4 md:mb-0">
            Votre Panier
          </h1>
          {cartItems.length > 0 && (
            <motion.p 
              whileHover={{ scale: 1.02 }}
              className="text-sm bg-primary/10 text-primary dark:text-primary-light px-4 py-2 rounded-full flex items-center"
            >
              <FiCheck className="mr-2" /> {cartItems.reduce((acc, item) => acc + item.quantity, 0)} articles sélectionnés
            </motion.p>
          )}
        </motion.div>
        
        {orderCompleted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl mx-auto p-8"
          >
            <motion.div 
              animate={pulseAnimation}
              className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Commande confirmée !</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Merci pour votre achat. Votre commande a été enregistrée.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                text="Suivre ma commande" 
                bgColor="bg-primary" 
                textColor="text-white" 
                icon={<FiArrowRight className="ml-2" />}
                href="/compte/commandes"
                animation="hover"
              />
              <Button 
                text="Continuer mes achats" 
                bgColor="bg-gray-200 dark:bg-gray-700" 
                textColor="text-gray-800 dark:text-gray-200" 
                href="/boutique"
                animation="hover"
              />
            </div>
          </motion.div>
        ) : cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <motion.div 
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiShoppingCart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </motion.div>
            <h3 className="text-xl font-medium">Votre panier est vide</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Parcourez notre boutique pour trouver des produits</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block"
            >
              <Button 
                text="Aller à la boutique" 
                bgColor="bg-primary" 
                textColor="text-white" 
                href="/boutique"
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Liste des articles */}
            <div className="w-full lg:w-2/3">
              <motion.div 
                layout
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                variants={cardVariants}
              >
                <div className="hidden md:grid grid-cols-12 bg-gray-100 dark:bg-gray-700 p-4 font-medium">
                  <div className="col-span-5">Produit</div>
                  <div className="col-span-2 text-center">Prix</div>
                  <div className="col-span-3 text-center">Quantité</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover="hover"
                      layout
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-12 items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:bg-gray-750 transition-colors"
                    >
                      <div className="col-span-12 md:col-span-5 flex items-center mb-4 md:mb-0">
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img 
                            src={item.img} 
                            alt={item.title} 
                            className="w-16 h-16 object-contain mr-4 rounded-lg bg-white p-1 shadow-sm"
                          />
                          {item.originalPrice && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                            >
                              <FiPercent className="inline" /> {Math.round((1 - item.price/item.originalPrice)*100)}%
                            </motion.span>
                          )}
                        </motion.div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.color && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {item.color}
                              </span>
                            )}
                            {item.warranty && (
                              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                Garantie: {item.warranty}
                              </span>
                            )}
                          </div>
                          <motion.button 
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeItem(item.id)}
                            className="flex items-center text-sm text-red-500 mt-2 hover:text-red-600 transition-colors"
                          >
                            <FiTrash2 className="mr-1" /> Supprimer
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="col-span-4 md:col-span-2 text-center mb-4 md:mb-0">
                        <p className="font-medium">{item.price.toLocaleString()} FCFA</p>
                        {item.originalPrice && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 line-through">
                            {item.originalPrice.toLocaleString()} FCFA
                          </p>
                        )}
                      </div>
                      
                      <div className="col-span-4 md:col-span-3 flex justify-center mb-4 md:mb-0">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <motion.button 
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center border-r bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiMinus />
                          </motion.button>
                          <motion.span 
                            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800"
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button 
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center border-l bg-gray-100 dark:bg-gray-700 hover:border-primary dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiPlus />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="col-span-4 md:col-span-2 text-center font-medium">
                        <motion.p
                          key={`total-${item.id}-${item.quantity}`}
                          initial={{ scale: 1.2, color: "#3B82F6" }}
                          animate={{ scale: 1, color: "inherit" }}
                          transition={{ duration: 0.3 }}
                        >
                          {(item.price * item.quantity).toLocaleString()} FCFA
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Code promo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6"
              >
                <h3 className="text-lg font-semibold mb-4">Code promo</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Entrez votre code (ex: SOLDE10)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                    className={`px-6 py-3 rounded-r-lg transition-all ${promoApplied 
                      ? 'bg-green-500 text-white cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-primary/90'}`}
                  >
                    {promoApplied ? 'Appliqué' : 'Appliquer'}
                  </motion.button>
                </div>
                {promoApplied && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-sm mt-2 flex items-center"
                  >
                    <FiCheck className="mr-1" /> Réduction de 10% appliquée
                  </motion.p>
                )}
              </motion.div>
            </div>
            
            {/* Récapitulatif et formulaire */}
            <div className="w-full lg:w-1/3">
              <motion.div 
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4"
              >
                <h3 className="text-xl font-bold mb-6">Récapitulatif de commande</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Sous-total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} articles)</span>
                    <span>{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()} FCFA</span>
                  </div>
                  
                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Économies</span>
                      <span>-{calculateDiscount().toLocaleString()} FCFA</span>
                    </div>
                  )}
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-500">
                      <span>Réduction promo</span>
                      <span>-{(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.1).toLocaleString()} FCFA</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="text-green-500">Gratuit</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <motion.span 
                      key={`total-${calculateTotal()}`}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-primary"
                    >
                      {calculateTotal().toLocaleString()} FCFA
                    </motion.span>
                  </div>
                </div>
                
                <motion.form 
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={inputVariants}>
                    <label className="block mb-2 text-sm font-medium">Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all duration-200 focus:shadow-md"
                    />
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all duration-200 focus:shadow-md"
                    />
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <label className="block mb-2 text-sm font-medium">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all duration-200 focus:shadow-md"
                    />
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <label className="block mb-2 text-sm font-medium">Adresse</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all duration-200 focus:shadow-md"
                    ></textarea>
                  </motion.div>
                  
                  <motion.div variants={inputVariants} className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Ville</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all duration-200 focus:shadow-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium">Pays</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent transition-all duration-200 focus:shadow-md appearance-none"
                      >
                        <option value="Niger">Niger</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                        <option value="Sénégal">Sénégal</option>
                      </select>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={inputVariants} className="pt-4">
                    <h4 className="font-medium mb-3">Méthode de paiement</h4>
                    <div className="space-y-3">
                      <motion.label 
                        whileHover={{ y: -2 }}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="mr-3 h-5 w-5 text-primary focus:ring-primary border-gray-300"
                        />
                        <div>
                          <p className="font-medium">Paiement à la livraison</p>
                          <p className="text-sm text-gray-500">Espèces ou carte à la livraison</p>
                        </div>
                      </motion.label>
                      
                      <motion.label 
                        whileHover={{ y: -2 }}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobile"
                          checked={formData.paymentMethod === 'mobile'}
                          onChange={handleInputChange}
                          className="mr-3 h-5 w-5 text-primary focus:ring-primary border-gray-300"
                        />
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-gray-500">Orange Money, MTN Mobile Money</p>
                        </div>
                      </motion.label>
                      
                      <motion.label 
                        whileHover={{ y: -2 }}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="mr-3 h-5 w-5 text-primary focus:ring-primary border-gray-300"
                        />
                        <div>
                          <p className="font-medium">Carte bancaire</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard</p>
                        </div>
                      </motion.label>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.99 }}
                      disabled={isProcessing}
                      className={`w-full py-4 mt-6 rounded-lg bg-primary text-white font-medium flex items-center justify-center ${
                        isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                      } transition-all duration-200`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Traitement en cours...
                        </>
                      ) : (
                        <>
                          Passer la commande
                          <FiArrowRight className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;