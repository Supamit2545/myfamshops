'use client'
import Topbar from '@/app/components/Topbar/Topbar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import ReactStars from 'react-stars'
import Gmap from '@/app/components/Gmap/Gmap'
// Picture import
import ร้านผัดไทย from "../Restaurant/Resimg/ร้านผัดไทย.jpg"
import promotions from "../Restaurant/Resimg/Promotions.jpg"
import วุ้นเส้น from '../Restaurant/Resimg/Menus/วุ้นเส้น.jpg'
import axios from 'axios'
const RestaurantPage = () => {
    const menuData = {
        "Menus": [
            {
                "img": "https://example.com/images/glassnoodle.jpg",
                "name": "วุ้นเส้น",
                "detail": "เมนูเส้น",
                "price": "50"
            },
            {
                "img": "https://example.com/images/jan_noodle.jpg",
                "name": "เส้นจันทร์",
                "detail": "เมนูเส้น",
                "price": "50"
            },
            {
                "img": "https://example.com/images/white_noodle.jpg",
                "name": "หมี่ขาว",
                "detail": "เมนูเส้น",
                "price": "50"
            },
            {
                "img": "https://example.com/images/crispy_noodle.jpg",
                "name": "หมี่กรอบ",
                "detail": "เมนูแป้งทอดกรอบราดด้วยผัดไทย",
                "price": "50"
            },
            {
                "img": "https://example.com/images/crispy_wonton.jpg",
                "name": "เกี๊ยวกรอบ",
                "detail": "เมนูแป้งทอดกรอบราดด้วยผัดไทย",
                "price": "50"
            },
            {
                "img": "https://example.com/images/crispy_wonton.jpg",
                "name": "เส้นนปลาทาโร่",
                "detail": "เมนูแป้งทอดกรอบราดด้วยผัดไทย",
                "price": "50"
            },
        ],
        "Pop": [
            {
                "img": "https://example.com/images/crispy_noodle.jpg",
                "name": "หมี่กรอบ",
                "detail": "เมนูแป้งทอดกรอบราดด้วยผัดไทย",
                "price": "50"
            },
        ],
    };
    const [Menus, setMenus] = useState([])
    const [Pop, setPop] = useState([])
    const [review, setReview] = useState([])
    const [reviewModal, setReviewModal] = useState(false)
    const [star, setStars] = useState("")
    const [displayname, setDisplayname] = useState("")
    const [content, setContent] = useState("")
    const [rate, setRate] = useState()
    const [sdreview, setSendreview] = useState([])


    const ModalToggle = () => {
        setReviewModal(!reviewModal)
    }

    useEffect(() => {
        setMenus(menuData.Menus)
        setPop(menuData.Pop)
        setReview(menuData.Review)
        Aos.init();
    }, [])



    const handleRatingChange = (newRating) => {
        setStars(newRating);
        // คุณสามารถส่งค่า rating ไปยังเซิร์ฟเวอร์หรือจัดการอื่นๆ ได้ที่นี่
    };

    useEffect(() => {
        const response = axios.get('https://testbackend-1-88e7.onrender.com/user', {
            withCredentials: true
        }).then((res) => {
            setDisplayname(res.data.users)
        }).catch((err) => {
            console.log("Not LoggedIn")
        })
    }, [])
    useEffect(() => {
        axios.get('https://testbackend-1-88e7.onrender.com/getRating')
        .then((res)=>setReview(res.data))
        .catch((err)=>console.log(err))
    }, [])

    const sendReivew = () => {
        if (!displayname) {
            alert("Please Login First!")
        } else {
            axios.post("https://testbackend-1-88e7.onrender.com/save-rating", {
                displayname: displayname,
                content: content,
                rate: star
            }).then(() => {
                setSendreview([
                    ...sdreview, {
                        displayname: displayname,
                        content: content,
                        rate: star
                    }
                ])
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className='Res-container'>
            <h1 className='mt-5 text-4xl font-bold text-center underline'>ลุงเปี๊ยกผัดไทย</h1>
            <div className='Res-Header'>
                <div className="Promotions">
                    <Image className='Promotions-img' src={promotions} width={1270} height={720} alt='โปรโมทชั่น'></Image>
                </div>
            </div>
            <div className="Res-Body ">
                <div className="Res-body-Popular">
                    <p className='poptext text-4xl font-bold font-mono flex justify-center'><span className='text-pink-500'>Popular</span> Menus</p>
                    {Pop.map((pop, index) => {
                        return (
                            <div key={index} className='Card-Menus' data-aos="fade-in">
                                <div className='Card-Menus-Head'>
                                    <Image className='Card-Menus-imgobject-scale-down relative bottom-40 ' src={วุ้นเส้น} alt='menu-popular' />
                                </div>
                                <div className="Card-Menus-Body">
                                    <p>ชื่อเมนู : {pop.name}</p>
                                    <p>ประเภท : {pop.detail}</p>
                                </div>
                                <div className="Card-Menus-Footer">
                                    <p>price : <span className=''>{pop.price}</span> บาท</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="Res-body-Menus" >
                    <p className='text-center text-4xl font-bold font-mono'>Menus</p>
                    <div className='menus-respon flex space-x-10 my-5'>
                        {Menus.map((val, index) => {
                            return (
                                <div key={index} className='Card-Menus' data-aos="fade-in">
                                    <div className='Card-Menus-Head'>
                                        <Image className='Card-Menus-img relative bottom-32' src={วุ้นเส้น} alt='menus' />
                                    </div>
                                    <div className="Card-Menus-Body">
                                        <p className=''>ชื่อเมนู : {val.name}</p>
                                        <p>ประเภท : {val.detail}</p>
                                    </div>
                                    <div className="Card-Menus-Footer">
                                        <p>price : <span className='text-green-700'>{val.price}</span> บาท</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='Res-infomation flex w-4/5 mx-auto my-10 bg-red-200 rounded-2xl shadow-2xl shadow-red-500 py-5' data-aos={'fade-up'}>
                    <div className='Res-info-left my-auto mx-auto'>
                        <Image className='rounded-2xl' src={ร้านผัดไทย} alt="รูปหน้าร้าน" width={700} height={800} />
                    </div>
                    <div className="Res-info-right mx-auto w-2/4">
                        <div className='text-4xl font-bold font-mono text-center'>Infomations</div>
                        <div className="review-block bg-white rounded-2xl h-56 mb-5 relative">
                            <p className='bg-red-300 w-28 rounded-2xl text-center absolute -top-2 border-2 border-white'>Review ร้าน</p>
                            <div className="review-container pt-10 px-5">
                                <div className="review-box">
                                    {review && review.map((val, index) => {
                                        return (
                                            <div className="review-card border-2 w-2/6 h-40 bg-pink-200 rounded-xl">
                                                <div className='review-card-top flex justify-between px-5 mt-2'>
                                                    {/* <div className='w-10 h-10 rounded-full border-2 border-black overflow-hidden'><Image className='' src={วุ้นเส้น} alt="โปรไฟล์" width={50} /></div> */}
                                                    <p className='text-xl pt-1'>{val.displayname} : </p>
                                                    <div className=''>
                                                        <ReactStars className='' size={24} value={val.rate} edit={false}/>
                                                    </div>
                                                </div>
                                                <div className='review-card-bottom h-24 overflow-auto px-2'>
                                                    <p className='px-2 bg-white h-20 rounded-xl'>{val.content}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                                <div className='Btn-Res-review text-center py-2'>
                                    <button className='bg-blue-400 rounded-lg px-5 py-2 border-2 border-gray-400 hover:bg-blue-200' onClick={(e) => { ModalToggle() }}>เขียน Review</button>
                                </div>
                        <div className='Res-info-right flex justify-around'>
                            <div className="g-map w-2/6 bg-white rounded-2xl flex flex-col justify-between ">
                                <div className=''>
                                    {/* <Gmap/> */}
                                    <p className=' text-center font-bold text-4xl'>(Soon!)</p>
                                    <p className='text-center text-2xl mt-20'>กดปุ่มเพื่อดูด้านล่าง Map!</p>
                                </div>
                                <div>
                                    <a href="https://www.google.com/maps/place/%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%97%E0%B8%A5%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%B5%E0%B9%8A%E0%B8%A2%E0%B8%81/@13.7746742,100.64759,17z/data=!3m1!4b1!4m6!3m5!1s0x311d6189cddaee33:0x2e15842110f9c991!8m2!3d13.7746742!4d100.6501649!16s%2Fg%2F11c4vhywf2?entry=ttu"><button className='w-full bg-blue-400 px-2 py-1 rounded-lg border-2 shadow-2xl shadow-blue-600 hover:bg-blue-300'>ดูในเส้นทาง</button></a>
                                </div>
                            </div>
                            <div className='Res-info-bottom-right bg-white rounded-2xl px-2'>
                                <p className='text-center font-bold '>เวลาเปิด - ปิด(GMT+7)</p>
                                <div className='flex'>
                                    <div >
                                        <p>จันทร์ :</p>
                                        <p>อังคาร :</p>
                                        <p>พุธ: </p>
                                        <p>พฤหัส : </p>
                                        <p>ศุกร์ : </p>
                                        <p>เสาร์ : </p>
                                        <p>อาทิตย์ : </p>
                                    </div>
                                    <div>
                                        <p className='text-green-500'>10.00 น. - 00.30 น.</p>
                                        <p className='text-green-500'>10.00 น. - 00.30 น.</p>
                                        <p className='text-green-500'>10.00 น. - 00.30 น.</p>
                                        <p className='text-green-500'>10.00 น. - 00.30 น.</p>
                                        <p className='text-green-500'>10.00 น. - 00.30 น.</p>
                                        <p className='text-red-500'>หยุด(Closed)</p>
                                        <p className='text-green-500'>10.00 น. - 00.30 น.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='Res-info-bottom-right bg-white rounded-2xl px-2 w-40 h-0'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {reviewModal && (
                <div className={`modalOverlay`}>
                    <div className={`modalContent`}>
                        {/* <button className={`closeButton`} onClick={(e) => {ModalToggle()}}>X</button> */}
                        <div className={`modalBody`}>
                            <h2 className='font-bold font-mono text-3xl'>เขียน Review ร้านผัดไทยลุงเปี๊ยก</h2>
                            <div className='modal-input'>
                                <ReactStars count={5} size={40} color2={'#ffd700'} onChange={handleRatingChange} />
                                <textarea className='modal-input-text' name="" id="" placeholder='ใส่ความคิดเห็นของคุณ' onChange={(e) => { setContent(e.target.value) }}></textarea>
                            </div>
                            <div className='modal-button text-center space-x-10 my-2'>
                                <button className='px-5 py-1 bg-red-500 rounded-xl hover:bg-red-700' onClick={(e) => { ModalToggle() }}>Cancel</button>
                                <button className='px-5 py-1 bg-blue-500 rounded-xl hover:bg-blue-700' onClick={(e) => { sendReivew() }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RestaurantPage