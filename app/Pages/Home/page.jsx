import React from 'react'
import Image from 'next/image'

// Image
import ร้านผัดไทย from '../Restaurant/Resimg/ร้านผัดไทย.jpg'
import Web from '../ProgramService/PSimg/WebSite.png'

const HomePage = () => {
  return (
    <div className='Home-Container'>
      <div className='H-Head mt-5'>
        <h1 className='text-white underline text-center text-4xl font-bold font-mono'>Welcome TO Phappusa Website</h1>
        <p className='text-white underline text-center text-2xl font-bold font-mono'>My Family Bussiness</p>
      </div>
      <div className='Home-Body'>
        <div className='Home-Body-Left'>
          <div className="left-Head">
            <h1 className='left-cat text-3xl text-center my-5 font-bold text-white font-mono mt-20'>Catagory : Food</h1>
          </div>
          <div className="left-Body">
            <div>
              <Image className='left-img mx-auto' src={ร้านผัดไทย} alt=''></Image>
            </div>
            <div className='H-info'>
              <p className='H-info-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione est cum laborum aspernatur quas possimus temporibus culpa dolore atque deleniti provident, dolor illum nam! Possimus tempora laudantium sequi aut odit.</p>
            </div>
          </div>
        </div>
        <div className='Home-Body-Right'>
          <div className="right-Head">
            <h1 className='right-cat text-3xl text-center my-5 font-bold text-white font-mono mt-20'>Catagory : Programming</h1>
          </div>
          <div className="right-Body">
            <div>
              <Image className='right-img mx-auto' src={Web} alt=''></Image>
            </div>
            <div className="H-info">
              <p className='H-info-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione est cum laborum aspernatur quas possimus temporibus culpa dolore atque deleniti provident, dolor illum nam! Possimus tempora laudantium sequi aut odit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage