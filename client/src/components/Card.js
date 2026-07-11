import React from 'react'
import Data from './Data'
const Card = (props) => {
  return (
    <div>
    
    <div className='All'>
  

<div className="gfg">
    <img className='img1' src={props.img}/>
    <h3 className="first-txt">
    {props.heading}
    </h3>
    
    <h3 className="second-txt">
    {props.para}
    </h3>
    
    </div>
    
    
    </div>
      
    
    
    </div>
  )
}

export default Card
