import React from 'react'

import Data from './Data.js'

import Card from './Card'
const Cardlist = () => {
  return (


    <section className='secondsection'>
    <div>
    <h2 className='secondhead'>Get Great Work for Your Budget</h2>
    <p className='secondpara'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, ab quas. Quisquam esse porro voluptatem!</p>
    </div>

    { Data.map(item => {
        return (
            
            <Card 
            img={item.coverImg}
            heading={item.heading}
            para={item.para}
            />
            
        )
    })
}
    
    </section>
      
      
      

      )
}

export default Cardlist