import React from 'react';
// Asegúrate de reemplazar estos paths con la ubicación real de tus imágenes
import burgerPromo from '/images/banner01.webp'; 
import wrapPromo from '/images/banner02.webp'; 

const Promotions = () => {
  return (
    // Padding horizontal variable: móvil/tablet pegado, PC alejado
    <section className="py-12 px-4 md:px-6 lg:px-40">
      
      {/* Título de la sección */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-wider uppercase">
        PROMOCIONES
      </h2>

      {/* Grid para las tarjetas de promoción: siempre 2 columnas */}
      <div className="grid grid-cols-2 gap-8">
        
        {/* Tarjeta de Promoción 1 */}
        <div className="rounded-lg shadow-xl overflow-hidden cursor-pointer">
          <img 
            src={burgerPromo} 
            alt="Promoción Roky's Burger Extrema, S/15.90" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Tarjeta de Promoción 2 */}
        <div className="rounded-lg shadow-xl overflow-hidden cursor-pointer">
          <img 
            src={wrapPromo} 
            alt="Promoción Roky Wrap Sabor que te Envuelve, desde S/14.90" 
            className="w-full h-auto object-cover"
          />
        </div>
        
      </div>
    </section>
  );
};

export default Promotions;
