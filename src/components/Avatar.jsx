import React from 'react'
import './Avatar.css'
import { FaCircle } from 'react-icons/fa'

const Avatar=({image,name,isAvailable})=>{
    const firstLetter=name[0].toUpperCase()
    const secondLetter=name[1].toUpperCase()
  return (
    <div className="avatar">
        <div className="avatar-img" style={{
            backgroundColor:`rgba(${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)},0.7)`
        }}>
            {
                image?<img src={image} alt='avatar' /> : <p>{firstLetter}{secondLetter}</p>
            }
        </div>
        <div className="avatar-info">
            {isAvailable?<FaCircle style={{color:'#26f87d'}} /> : <FaCircle style={{color:'#ccc'}} />}
        </div>
    </div>
  )
}

export default Avatar