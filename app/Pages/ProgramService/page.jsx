'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Aos from 'aos'
import axios from 'axios'
import emailjs from '@emailjs/browser';

// Import รูป
import Webtum from './PSimg/Empty.png'
import Stores from './PSimg/WebSite.png'
import testprofile from './PSimg/Profile/testprofile.jpg'

const ProgramServicePage = () => {
  const [opts, setOpts] = useState('')
  const [Logeding, setLogin] = useState(false)
  const [getname, setGetname] = useState('')
  const [content, setContent] = useState("")
  const [psreivew, setPsreview] = useState({})
  const [prodSendText, setprodSendText] = useState('')
  const [dataSelect, setDataSelect] = useState('')
  const [QuotaLeft , setQuotaLeft] = useState()
  const [productSelect, setProductsSelect] = useState([{
      form_name:'',
      to_name: 'Supamit Phappusa',
      user_name: '',
      selections: '',
      message:'',
  }])
  const [SendModal, setSendModal] = useState(false)

  const [checkedprod, setCheckedprod] = useState({})

  const [webcheckboxes, setCheckboxes] = useState({
    "Front-End": false,
    "Back-End": false,
    Hosting: false,
  });

  const [editcheckboxes, setEditCheckboxes] = useState({
    "Photo": false,
    "Video": false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  const handleEditCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  const webcheckedValues = Object.keys(webcheckboxes)
    .filter(key => webcheckboxes[key])
    .map(key => key.replace('checkbox', ''));

  const editcheckedValues = Object.keys(editcheckboxes)
    .filter(key => editcheckboxes[key])
    .map(key => key.replace('checkbox', ''));

  const displayText = webcheckedValues.length > 2 ? webcheckedValues.join(':') : webcheckedValues.join(' / ');
  const editdisplayText = editcheckedValues.length > 2 ? editcheckedValues.join(':') : editcheckedValues.join(' / ');

  useEffect(() => {
    Aos.init();
  }, [])
  useEffect(() => {
    const response = axios.get('https://myfamshop-d6e1348c9f1e.herokuapp.com:3001/user', {
      withCredentials: true
    }).then((res) => {
      setLogin(!Logeding)
      setGetname(res.data.users)
    }).catch((err) => {
      console.log("Not LoggedIn")
    })
  }, [])

  const setProducts = () => {
    setProductsSelect([{
      username: getname,
      selections: { displayText, dataSelect },
      text: prodSendText,
    }])
  }
  const ToggleSendModal = (productSelect) => {
    setSendModal(!SendModal)
  }
  useEffect(() => {
    axios.get('http://localhost:3001/GetReviewps')
      .then((res) => setPsreview(res.data))
      .catch((err) => console.log("Error: ", err))
  }, [])

  function SendPsreview() {
    axios.post('http://localhost:3001/SendReviewps', {
      displayname: getname,
      content: content,
    }).then(() => {
      setPsreview([
        ...psreivew, {
          displayname: getname,
          content: content
        }
      ])
    })
    alert("Review Created")
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send('service_akq8gr9', 'template_t1s9m11', templateParams, {
        publicKey: 'FQ72-xWBbMPyHJRPp',
      })
      .then(
        () => {
          alert('Send to supamitwork@gmail.com : SUCCESS!');
        },
        (error) => {
          console.log('Send : FAILED...', error); 
        },
      );
  };

  const templateParams  = {
    form_name: getname,
    to_name: 'Supamit Phappusa',
    user_name: getname,
    message1: "Selections : " + displayText ,
    message2: "Database : " + dataSelect , 
    message3: "ข้อความที่ลูกค้าส่งมา : " + prodSendText
  }
  const test = (e) => {
    sendEmail(e)
  }

  const scrollRef = useRef(null);
  const form = useRef();

  const scrollLeft = (px) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -px, behavior: 'smooth' });
    }
  };

  const scrollRight = (px) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: px, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('wheel', handleWheel);
    }

    // Cleanup function
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('wheel', handleWheel);
      }
    };
  })
  return (
    <div className='ProgramService-container' data-aos={'fade-in'}>
      <div className=''>
        <p className='text-4xl text-center font-bold py-10 bg-green-500'>My Programing Services</p>
        <div className='PS-Header'>
          <p className='text-5xl text-center text-white my-5 font-bold'>Sold Out Projects</p>
          <div className='PS-show-box'>
            <div className='Ps-show-Card'>
              <Image className='show-img' src={Webtum} alt="show-img" width={'auto'} />
              <div className='show-text'>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur quae ducimus quia a praesentium quas. Non architecto nam quod alias, officiis, reprehenderit dicta assumenda ipsam illo ut laudantium. Pariatur?</p>
                <button className='flex bg-blue-500 border-2 border-gray-500 rounded-xl px-5 py-2 mx-auto mt-10 hover:bg-blue-700 hover:text-white'>Visit Website</button>
              </div>
            </div>
            <div className='Ps-show-Card'>
              <Image className='show-img' src={Webtum} alt="show-img" width={'auto'} />
              <div className='show-text'>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur quae ducimus quia a praesentium quas. Non architecto nam quod alias, officiis, reprehenderit dicta assumenda ipsam illo ut laudantium. Pariatur?</p>
                <button className='flex bg-blue-500 border-2 border-gray-500 rounded-xl px-5 py-2 mx-auto mt-10 hover:bg-blue-700 hover:text-white'>Visit Website</button>
              </div>
            </div>
            <div className='Ps-show-Card'>
              <Image className='show-img' src={Webtum} alt="show-img" width={'auto'} />
              <div className='show-text'>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur quae ducimus quia a praesentium quas. Non architecto nam quod alias, officiis, reprehenderit dicta assumenda ipsam illo ut laudantium. Pariatur?</p>
                <button className='flex bg-blue-500 border-2 border-gray-500 rounded-xl px-5 py-2 mx-auto mt-10 hover:bg-blue-700 hover:text-white'>Visit Website</button>
              </div>
            </div>
            <div className='Ps-show-Card'>
              <Image className='show-img' src={Webtum} alt="show-img" width={'auto'} />
              <div className='show-text'>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur quae ducimus quia a praesentium quas. Non architecto nam quod alias, officiis, reprehenderit dicta assumenda ipsam illo ut laudantium. Pariatur?</p>
                <button className='flex bg-blue-500 border-2 border-gray-500 rounded-xl px-5 py-2 mx-auto mt-10 hover:bg-blue-700 hover:text-white'>Visit Website</button>
              </div>
            </div>
            <div className='Ps-show-Card'>
              <Image className='show-img' src={Webtum} alt="show-img" width={'auto'} />
              <div className='show-text'>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur quae ducimus quia a praesentium quas. Non architecto nam quod alias, officiis, reprehenderit dicta assumenda ipsam illo ut laudantium. Pariatur?</p>
                <button className='flex bg-blue-500 border-2 border-gray-500 rounded-xl px-5 py-2 mx-auto mt-10 hover:bg-blue-700 hover:text-white'>Visit Website</button>
              </div>
            </div>
            <div className='Ps-show-Card'>
              <Image className='show-img' src={Webtum} alt="show-img" width={'auto'} />
              <div className='show-text'>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur quae ducimus quia a praesentium quas. Non architecto nam quod alias, officiis, reprehenderit dicta assumenda ipsam illo ut laudantium. Pariatur?</p>
                <button className='flex bg-blue-500 border-2 border-gray-500 rounded-xl px-5 py-2 mx-auto mt-10 hover:bg-blue-700 hover:text-white'>Visit Website</button>
              </div>
            </div>
          </div>
        </div>
        <div className='PS-body'>
          <p className='text-5xl py-5 font-bold text-center text-white'>My Services</p>
          <div className='PS-Shop flex' data-aos={'fade-up'}>
            <div className='ps-shop-card'>
              <p className='text-center text-4xl text-white font-bold py-2'>Website Developer</p>
              <Image className='mx-auto rounded-xl my-1' src={Stores} alt='รูปStore' width={250}></Image>
              <div id='selects' className='ps-shop-info'>
                <div>
                  <div className='flex'>
                    <input className='Website-inputs' type="checkbox" id="Front-End" name="Front-End" checked={webcheckboxes.Front} value="Front-End" placeholder='' onChange={handleCheckboxChange} /><p className='font-bold mx-2'>Front-End</p>
                  </div>
                  <div className='flex'>
                    <input className='Website-inputs' type="checkbox" id="Back-End" name="Back-End" checked={webcheckboxes.Back} value="Back-End" placeholder='' onChange={handleCheckboxChange} /><p className='font-bold mx-2'>Back-End</p>
                  </div>
                  <div className='flex'>
                    <input className='Website-inputs' type="checkbox" id="Hosting" name="Hosting" value="Hosting" checked={webcheckboxes.Hosting} placeholder='' disabled onChange={handleCheckboxChange} /><p className='font-bold mx-2'>Hosting</p>
                  </div>
                  <div className="flex justify-between">
                    <p className='font-bold'>Database</p>
                    <select className='w-2/4 border-2 border-black rounded-xl px-2' name="" id="" onChange={(e) => { setDataSelect(e.target.value) }}>
                      <option value="none">None</option>
                      <option value="Firebase">Firebase</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="MySQL">MySQL</option>
                    </select>
                  </div >
                </div>
                <div className='flex justify-between'>
                  <p className=''>Selected :</p>
                  <p className='selected-text'>{webcheckboxes.Front ? "Front-End" : ""} {displayText} {webcheckboxes.Back ? "Back-End" : ""}</p>
                </div>
              </div>
              <div className='text-center space-x-5'>
                <button className='bg-blue-500 px-5 py-3 rounded-xl text-white font-bold border-2 border-gray-800 hover:bg-blue-700' onClick={(e) => { setProducts(), ToggleSendModal({ productSelect }) }}>Select</button>
              </div>
            </div>
            <div className='ps-shop-card'>
              <p className='text-center text-4xl text-white font-bold py-2'>Editor Services</p>
              <Image className='mx-auto rounded-xl my-1' src={Stores} alt='รูปStore' width={250}></Image>
              <div id='selects' className='ps-shop-info'>
                <div>
                  <div className='flex'>
                    <input className='Website-inputs' type="checkbox" id="Front-End" name="Photo" checked={editcheckboxes.Photo} value="Photo" placeholder='' onChange={handleEditCheckboxChange} /><p className='font-bold mx-2'>Photo</p>
                  </div>
                  <div className='flex'>
                    <input className='Website-inputs' type="checkbox" id="Back-End" name="Video" checked={editcheckboxes.Video} value="Video" placeholder='' onChange={handleEditCheckboxChange} /><p className='font-bold mx-2'>Video</p>
                  </div>
                  <p className='font-bold mx-2'>(CommingSoon)</p>
                </div>
                <div className='flex justify-between'>
                  <p className=''>Selected :</p>
                  <p className='selected-text'> {editdisplayText}</p>
                </div>
              </div>
              <div className='text-center space-x-5'>
                <button className='bg-blue-500 px-5 py-3 rounded-xl text-white font-bold border-2 border-gray-800 hover:bg-blue-700'>Select</button>
              </div>
            </div>
            {/* <div className='ps-shop-card'>
              <p className='text-center text-4xl text-white font-bold py-2'>Editor Services</p>
              <Image className='mx-auto rounded-xl my-1' src={Stores} alt='รูปStore' width={250}></Image>
              <div id='selects' className='ps-shop-info'>
                <div>
                 <div className='flex'>
                  <input className='Website-inputs' type="checkbox" id="Front-End" name="Photo" checked={editcheckboxes.Photo} value="Photo" placeholder='' onChange={handleEditCheckboxChange}/><p className='font-bold mx-2'>Photo</p>
                 </div>
                 <div className='flex'>
                  <input className='Website-inputs' type="checkbox" id="Back-End" name="Video" checked={editcheckboxes.Video} value="Video" placeholder=''  onChange={handleEditCheckboxChange}/><p className='font-bold mx-2'>Video</p>
                 </div>
                </div>
                 <div className='flex justify-between'>
                    <p className=''>Selected :</p>
                    <p className='selected-text'> {editdisplayText}</p>
                 </div>
              </div>
              <div className='text-center space-x-5'>
                <button className='bg-orange-500 px-5 py-3 rounded-xl text-white font-bold border-2 border-gray-800 hover:bg-orange-700'>Detail</button>
                <button className='bg-blue-500 px-5 py-3 rounded-xl text-white font-bold border-2 border-gray-800 hover:bg-blue-700'>Send</button>
              </div>
            </div> */}
          </div>
        </div>
        <div className='PS-Footer' >
          <div className="PS-Review" data-aos={'fade-up'}>
            <p className='text-center text-5xl font-bold py-5 text-white'>Send Review!</p>
            <div className='PS-Review-Box'>
              <div className='w-2/4'>
                <div id="scrollable" ref={scrollRef} className='PS-Review-Show' aria-readonly>
                  <div className='PS-Review-body'>
                    {psreivew.length > 0 ? (
                      psreivew.map((review, index) => (
                        <div key={index} className='PS-Review-Card' dir="ltr">
                          <div className='pscard-header'>DisplayName : <span className='font-bold'>{review.displayname}</span></div>
                          <div className='pscard-body'><span>{review.content}</span></div>
                        </div>
                      ))
                    ) : (
                      <p>Review is Empty</p>
                    )}
                  </div>
                </div>
                <div className='flex justify-around'>
                  <button className='ps-btn-scroll py-2 text-white font-bold border-2 boder-black bg-orange-500 hover:bg-orange-700 px-5 rounded-3xl' onClick={() => { scrollLeft(635) }}>Left</button>
                  {/* <button className='py-2 text-white font-bold border-2 boder-black bg-green-500 hover:bg-green-700 px-5 rounded-3xl' onClick={sendEmail}>Test</button>  */}
                  <button className='ps-btn-scroll py-2 text-white font-bold border-2 boder-black bg-green-500 hover:bg-green-700 px-5 rounded-3xl' onClick={() => { scrollRight(635) }}>Right</button>
                </div>
                {Logeding ? (
                  <textarea className='ps-review-area w-full h-40 my-5 p-1 rounded-xl border-4 border-orange-500 font-mono font-bold bg-transparent text-green-500' name="" id="" placeholder='Send Review Here!' onChange={(e) => { setContent(e.target.value) }}></textarea>
                ) : (
                  <div></div>
                )}
              </div>
              <div className='ps-intro-review'>
                {Logeding ? (
                  <div className=''>
                    <p className='text-4xl text-center font-bold font-mono py-2 text-green-600'>Infomation</p>
                    {/* <div className='Profile-spin'></div>
                    <div className='Profile-Box'><Image className='mx-auto rounded-full' src={testprofile} alt='' width={160} height={160}></Image></div> */}
                    <div className='Profile-Display-Name'><p className='text-display absolute -top-5 text-xl text-green-500 px-1'>Display Name</p>{getname}</div>
                    <div className='flex justify-center my-5'>
                      <button className='send-review-button text-white font-bold px-4 py-2 rounded-xl' onClick={SendPsreview}>SEND REVIEW</button>
                    </div>
                  </div>
                ) : (
                  <div className='flex p-5'>
                    <p className='text-center mt-24 mx-auto text-5xl text-white font-bold font-mono'>Please Log In First!</p>
                  </div>
                )}
              </div>
              {SendModal && (
                <div className={`modalOverlay`}>
                  <div className={`modalContent`}>
                    {/* <button className={`closeButton`} onClick={(e) => {ModalToggle()}}>X</button> */}
                    <div className={`modalBody`}>
                      <div className='pb-10'>
                        <h2 className='font-bold font-mono text-3xl' name="">Send Gmail To : <span className='text-blue-800'>SupamitWork@gmail.com</span></h2>
                      </div>
                      <div className='modal-input space-y-5'>
                        <div className='text-3xl font-bold font-mono'>Options selected : {productSelect[0].selections.displayText}</div>
                        <div className='text-3xl font-bold font-mono'>Database selected : {productSelect[0].selections.dataSelect}</div>
                        <div className='text-xl font-bold font-mono text-red-700'>*รบกวนพิมพ์ Mail ไว้ให้ผมตอบกลับด้วยนะฮะ พอดีไม่ได้เก็บ Mail แหะๆ :D</div>
                        
                        <textarea className='modal-input-text' name='' id="" placeholder='Give me more info please Thank you' onChange={(e) => { setprodSendText(e.target.value) }}></textarea>
                      </div>
                      <div className='modal-button text-center space-x-10 my-2'>
                        <button className='px-5 py-1 bg-red-500 rounded-xl hover:bg-red-700' onClick={ToggleSendModal}>Cancel</button>
                        <button className='px-5 py-1 bg-blue-500 rounded-xl hover:bg-blue-700' onClick={(e) => { sendEmail(e) }}>Submit</button>
                        {/* <button className='px-5 py-1 bg-blue-500 rounded-xl hover:bg-blue-700' onClick={console.log(displayText)}>Test</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramServicePage