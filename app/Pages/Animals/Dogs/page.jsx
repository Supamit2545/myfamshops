'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

const DogsPage = () => {
  const [dogs, setDogs] = useState([{}])
  const [info, setInfo] = useState(false)
  const [inmodal, setInmodal] = useState([])
  
  useEffect(() => {
    axios.get('https://freetestapi.com/api/v1/dogs')
      .then(res => {
        setDogs(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // [] หมายถึง `useEffect` นี้จะถูกเรียกใช้ครั้งเดียวเมื่อคอมโพเนนต์ mount

  const ReadInfo = (image, name, origin, colors, temperament, description) => {
    setInfo(!info)
    setInmodal({
      img : image,
      names : name,
      origins : origin,
      colorss : colors,
      temperaments : temperament,
      descriptions : description,
    })
  }

  return (
    <div className='Cat-Container'>
      <h1 className='text-4xl text-center font-bold my-5 underline font-mono'>!This Is For <span className='text-red-500'>Test Only</span>!</h1>
      <div className='Cat-Card-box'>
        {dogs.length > 0 ? (
          dogs.map((dog, index) => (
            <div className='cat-cards' key={dog.id || index}>
              <div>
                <Image className='cat-img' src={dog.image} alt={dog.name} width={150} height={150} />
              </div>
              <div className='cat-Text'>
                <div>ID: {dog.id}</div>
                <div>Breeds: {dog.name}</div>
                <div>Locations-From: None</div>
              </div>  
              <div>
              </div>
              <button className='card-btn ' onClick={(e) => { e.preventDefault, ReadInfo(dog.image, dog.name, dog.origin, dog.colors, dog.temperament, dog.description) }}>More Info!</button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {info && (
        <div className={`pet-modalOverlay`}>
          <div className={`pet-modalContent`}>
            <div className={`modalBody`}>
              <h2 className='font-bold font-mono text-5xl mb-10'>Selected Pets Infomations</h2>
              <div className='pet-modal-info'>
                <Image className='rounded-2xl' src={inmodal.img} width={450} height={350}></Image> 
                <div className='pet-info-inmodal'>
                  <div className='font-bold text-green-700'>Name : <span className='font-bold text-lg text-black'>{inmodal.names}</span></div>
                  <div className='font-bold text-green-700'> origin: <span className='font-bold text-lg text-black'>{inmodal.origins}</span></div>
                  <div className='font-bold text-green-700'> colors : <span className='font-bold text-lg text-black'>{inmodal.colorss}</span></div>
                  <div className='font-bold text-green-700'> temperament : <span className='font-bold text-lg text-black'>{inmodal.temperaments}</span></div>
                  <div className='font-bold text-green-700'> description : <span className='font-bold text-black'>{inmodal.descriptions}</span></div>
                  <div className='font-bold text-green-700'> Characteristics : <span className='font-bold text-black'>None</span></div>
                </div>
              </div>
              <div className='modal-button text-center space-x-10 my-2'>
                <button className='px-5 py-1 bg-red-500 rounded-xl hover:bg-red-700' onClick={(e) => { setInfo(!info) }}>Cancel</button>
                <button className='px-5 py-1 bg-blue-500 rounded-xl hover:bg-blue-700' >Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default DogsPage