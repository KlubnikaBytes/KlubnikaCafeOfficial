import React from 'react';
import { MISSION } from '../constants';

// Import the 5 images
import heroExterior from "../assets/cafe-images/hero-exterior.jpg";
import exteriorGlass from "../assets/cafe-images/exterior-glass.jpg";
import nightSign from "../assets/cafe-images/night-sign.png";
import interior from "../assets/cafe-images/interior.jpg";
import interiorArt from "../assets/cafe-images/interior-art.png";

const Mission = () => {
  return (
    <section 
      id='mission' 
      className='scroll-mt-24 pt-10 pb-20' 
    >
        <div className='container mx-auto px-4'>
            <h2 className='mb-12 text-center text-4xl lg:text-5xl font-bold tracking-tight'>Our Mission</h2>
            
            <div className='grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-6 w-full'>
                
                {/* Image 1 (Top Left) */}
                <div className='overflow-hidden rounded-3xl shadow-lg w-full aspect-[4/3] lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2'>
                    <img src={heroExterior} alt="Cafe Exterior" className='w-full h-full object-cover hover:scale-110 transition-transform duration-700' />
                </div>
                
                {/* Image 2 (Bottom Left) */}
                <div className='overflow-hidden rounded-3xl shadow-lg w-full aspect-[4/3] lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3'>
                    <img src={exteriorGlass} alt="Cafe Glass" className='w-full h-full object-cover hover:scale-110 transition-transform duration-700' />
                </div>

                {/* Center Column (Middle) */}
                <div className='relative overflow-hidden rounded-3xl shadow-2xl group w-full aspect-square lg:aspect-auto lg:h-full lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3'>
                    <img 
                        src={nightSign} 
                        alt="Night Sign" 
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000' 
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 group-hover:bg-black/50 transition-all duration-500'></div>
                    
                    {/* Mission Text Overlay */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center p-8 text-center'>
                        <p className='max-w-xl text-white text-2xl md:text-3xl lg:text-4xl leading-snug font-medium drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                            "{MISSION}"
                        </p>
                    </div>
                </div>

                {/* Image 4 (Top Right) */}
                <div className='overflow-hidden rounded-3xl shadow-lg w-full aspect-[4/3] lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2'>
                    <img src={interior} alt="Cafe Interior" className='w-full h-full object-cover hover:scale-110 transition-transform duration-700' />
                </div>

                {/* Image 5 (Bottom Right) */}
                <div className='overflow-hidden rounded-3xl shadow-lg w-full aspect-[4/3] lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3'>
                    <img src={interiorArt} alt="Cafe Wall Art" className='w-full h-full object-cover hover:scale-110 transition-transform duration-700' />
                </div>

            </div>
        </div>
    </section>
  )
}

export default Mission;