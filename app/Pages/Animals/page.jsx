'use client'
import React , {useState , useEffect} from 'react'
import DogsPage from './Dogs/page'
import CatsPage from './Cats/page'

const AnimalsPage = () => {
  const [active , setActive] = useState(0)

  const SetActive = (index) =>{
    setActive(index)
  }

  function ActiveTab(e){
    
    useEffect(()=>{
      const tabs = document.querySelectorAll('#anitab')
      tabs.forEach((tab)=>{
        tab.addEventListener("click", (e)=>{
          tabs.forEach((tab)=>{
            tab.classList.remove('selectedanitab')
          })
          tab.classList.add('selectedanitab')
        })
      })
    },[])
  }
  console.log(active)
  ActiveTab()
  return (
    <div className='Animals-Container'>
      <div className='Animal-Header'>
        <p className='text-center text-5xl font-bold font-mono py-5'>Looking for pet?</p>
        <nav className='Ani-nav py-6'>
          <ul className='Ani-cats flex space-x-10 justify-center text-4xl font-bold font-mono'>
            <li ><button id='anitab' className='selectedanitab bg-blue-700 rounded-2xl px-7 py-2 hover:text-white' onClick={(e) =>{SetActive(0)}}>All</button></li>
            <li ><button id='anitab' className='bg-blue-700 rounded-2xl px-7 py-2 hover:text-white' onClick={(e) =>{SetActive(1)}}>Dogs</button></li>
            <li ><button id='anitab' className='bg-blue-700 rounded-2xl px-7 py-2 hover:text-white' onClick={(e) =>{SetActive(2)}}>Cats</button></li>
            <li ><button id='anitab' className='bg-blue-700 rounded-2xl px-7 py-2 hover:text-white' onClick={(e) =>{SetActive(3)}}>Other</button></li>
          </ul>
        </nav> 
      </div>
      <div className="Animal-Body">
        <div className={`ani-content ${active === 0 ? "active" : ""}`}>
         <p className='text-5xl underline font-bold font-mono text-center py-5'>Dogs</p>
         <DogsPage/>
         <p className='text-5xl underline font-bold font-mono text-center py-5'>Cats</p>
         <CatsPage/>
        </div>
        <div className={`ani-content ${active === 1 ? "active" : ""}`}>
          <DogsPage/>
        </div>
        <div className={`ani-content ${active === 2 ? "active" : ""}`}>
          <CatsPage/>
        </div>
        <div className={`ani-content ${active === 3 ? "active" : ""}`}>
          <p>Test4</p>
        </div>
      </div>
      <div className="Animal-Footer">
        
      </div>
    </div>
  )
}

export default AnimalsPage