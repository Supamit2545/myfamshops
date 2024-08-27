'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { BEurlContext } from '../BackendChange/BackendChange'


const Topbar = () => {
    const [Logedin, setLogin] = useState('')
    const [activeTab, setTabs] = useState(0)
    const [LoginModal, setLoginModal] = useState(false)
    const [auth, setAuth] = useState('')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passcon, setPasscon] = useState("")
    const [usern, setUname] = useState("")
    const [pass, setPass] = useState("")
    const [user, setUsers] = useState([])
    const [error, setError] = useState("")
    const [openHam, setOpenHam] = useState(false)
    const BEurl = 'https://testbackend-1-88e7.onrender.com'

    useEffect(() => {
        axios.get(`${BEurl}/read`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        try {
            const response = axios.get(`${BEurl}/user`, {
                withCredentials: true
            }).then((res) => {
                setLogin(res.data.users)
            })
        } catch (error) {
            console.error("Not Logged");
        }
    }, [])


    const OpenHam = () => {
        setOpenHam(!openHam)
    }
    const authModal = () => {
        setLoginModal(!LoginModal)
    }

    const ActiveTab = (index) => {
        setTabs(index)
    }

    // underlinetabs
    function undertabs(e) {
        useEffect(() => {
            const tabs = document.querySelectorAll('#tab');

            tabs.forEach((tab) => {
                tab.addEventListener("click", (e) => {
                    tabs.forEach((tab) => {
                        tab.classList.remove('selectedtab')
                    })
                    tab.classList.add('selectedtab')

                    var line = document.querySelector('#undertab');
                    line.style.width = e.target.offsetWidth + "px";
                    line.style.left = e.target.offsetLeft + "px";
                })
            })
        }, []);
    }
    function switchAuth() {
        const Loauths = document.getElementById('auth-Lo')
        const Reauths = document.getElementById('auth-Re')

        setAuth(!auth)

        if (auth === true) {
            Loauths.classList.remove('hidden')
            Loauths.classList.add('active')
            Reauths.classList.remove('active')
            Reauths.classList.add('hidden')
        } else {
            Reauths.classList.remove('hidden')
            Reauths.classList.add('active')
            Loauths.classList.remove('active')
            Loauths.classList.add('hidden')
        }
    }
    function CreateUser() {
        if (passcon === password) {
            axios.post(`${BEurl}/Register`, {
                username: username,
                password: password,
            }).then(() => {
                setUsers([
                    ...user, {
                        username: username,
                        password: password
                    }
                ])
            })
            alert("User Created")
        } else {
            alert('Password Not Matched')
        }
    }
    const Login = async () => {
        try {
            axios.defaults.withCredentials = true
            const response = await axios.post(`${BEurl}/Login`, {
                username: username,
                password: password
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log("Login successful!");
                // ทำงานเมื่อ login สำเร็จ
            }
            window.location.reload()
        } catch (error) {
            console.error("Login Failed!", error.response?.data || error.message);
            setError(`${(error.response?.data || error.message).message}`)
        }
    }
    const Logout = async () => {
        axios.get(`${BEurl}/logout`,{
        }).then((res)=>alert(res.data.message))
        .catch((err)=>console.log(err))
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        window.location.reload()
    }
    undertabs()
    return (
        <main className='topbar'>
            <div className='topbar-container flex shadow-2xl justify-around py-5 text-xl'>
                <button className='topbar-left'>Supamit Shop</button>
                <div className="block md:hidden">
                    <button
                        onClick={OpenHam}
                        className="text-black focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div className='hidden md:flex'>
                    <div className='topbar-middle flex space-x-10 my-auto'>
                        <Link href={'/'}><button id='tab' className={`hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(0) }}>Home</button></Link>
                        <Link href={'/Pages/Restaurant'}><button id='tab' className={`hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(1) }}>My fam restaurant</button></Link>
                        <Link href={'/Pages/ProgramService'}><button id='tab' className={`hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(2) }}>My Programing Service</button></Link>
                        <Link href={'/Pages/Giftshop'}><button id='tab' className={`hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(3) }}>My Fam Shop</button></Link>
                        <Link href={'/Pages/Animals'}><button id='tab' className={`hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(4) }}>stray animals</button></Link>
                    </div>
                    {Logedin ? (
                        <div className='flex text-center space-x-10'>
                            <Image src="" alt=""></Image>
                            <p className='font-bold text-green-700 my-auto'><span className='text-black pr-5'>DisplayName : </span>{Logedin}</p>
                            <button className='bg-red-500 hover:bg-red-700 border-2 px-2 py-1 rounded-xl' onClick={Logout}>Logout</button>
                        </div>
                    ) : (
                        <div className='topbar-right space-x-5 my-auto font-mono'>
                            <button className='border-2 shadow-2xl px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-800 font-bold hover:text-white' onClick={(e) => { authModal() }}>Login</button>
                        </div>
                    )}
                </div>

                <div id='undertab' className='undertab hidden md:flex'></div>

            </div>
            <div className={`Ham ${openHam ? 'block' : 'hidden'}`}>
                <div className='HamTabs'>
                    <Link href={'/'}><button id='tab' className={`tabs hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(0) }}>Home</button></Link>
                    <Link href={'/Pages/Restaurant'}><button id='tab' className={`tabs hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(1) }}>My fam restaurant</button></Link>
                    <Link href={'/Pages/ProgramService'}><button id='tab' className={`tabs hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(2) }}>My Programing Service</button></Link>
                    <Link href={'/Pages/Giftshop'}><button id='tab' className={`tabs hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(3) }}>My Fam Shop</button></Link>
                    <Link href={'/Pages/Animals'}><button id='tab' className={`tabs hover:text-blue-500 font-bold font-mono`} onClick={(e) => { ActiveTab(4) }}>stray animals</button></Link>
                </div>
                {Logedin ? (
                    <div className='flex text-center space-x-10'>
                        <Image src="" alt=""></Image>
                        <p className='font-bold text-green-700 my-auto'><span className='text-black pr-5'>DisplayName : </span>{Logedin}</p>
                        <button className='bg-red-500 hover:bg-red-700 border-2 px-2 py-1 rounded-xl' onClick={Logout}>Logout</button>
                    </div>
                ) : (
                    <div className='topbar-right space-x-5 my-auto font-mono'>
                        <button className='border-1 border-gra px-5 py-2 w-full bg-blue-500 hover:bg-blue-800 font-bold hover:text-white' onClick={(e) => { authModal() }}>Login</button>
                    </div>
                )}
            </div>
            {LoginModal && (
                <div className='login-modalOverlay'>
                    <div className="login-modalContent">
                        <button className='closeButton' onClick={(e) => { authModal() }}>X</button>
                        {/* <button className='bg-blue-500 px-5 py-2 hover:bg-blue-700' onClick={(e) => { getCredent() }}>TestGetData</button> */}
                        <p className='text-4xl font-bold font-mono'>Authentication Modal</p>
                        <p className='text-center text-2xl  mt-5 font-bold font-mono'>Have an Accout?{' >> '}Sigh Up? </p>
                        <button id='switch' className='flex my-5 rounded-xl px-2 py-1 border-2 border-lg bg-blue-300 hover:bg-blue-500 mx-auto' onClick={(e) => { switchAuth() }}>Switch Auth SignIn & SignUp</button>
                        <div className='flex space-x-5'>
                            <form id='auth-Lo' className="Login">
                                <h2 className='text-center font-bold text-4xl mt-5 font-mono'>Login</h2>.
                                <p className='text-xl text-red-500 font-bold py-2 text-center underline'>{error}</p>
                                <div className='flex flex-col p-5 space-y-10'>
                                    <input className='Login-input' type="text" name="username" id="" placeholder='Enter Your Username' onChange={(e) => { setUsername(e.target.value) }} required />
                                    <input className='Login-input' type="password" name="password" id="" placeholder='Enter Your Password' onChange={(e) => { setPassword(e.target.value) }} required />
                                    <button className='flex bg-blue-500 px-10 py-1 rounded-2xl border-2 border-black mx-auto mt-5 text-white hover:bg-blue-700' onClick={(e) => { e.preventDefault(); Login() }}>Login</button>
                                </div>
                                <p className='text-center mb-5 hover:text-blue-500 hover:cursor-pointer'>Forgot Password?</p>
                            </form>
                            <form id='auth-Re' className="Register hidden" >
                                <h2 className='text-center font-bold text-4xl mt-5 font-mono'>Register</h2>
                                <div className='flex flex-col p-5 space-y-5'>
                                    <input className='Login-input' type="text" name="username" id="" placeholder='Enter Your Username' onChange={(e) => { setUsername(e.target.value) }} required />
                                    <input className='Login-input' type="password" name="password" id="" placeholder='Enter Your Password' onChange={(e) => { setPassword(e.target.value) }} required />
                                    <input className='Login-input' type="password" name="password" id="" placeholder='Confirm Password' onChange={(e) => { setPasscon(e.target.value) }} required />
                                    <button className='flex bg-orange-500 px-10 py-1 rounded-2xl border-2 border-black mx-auto mt-5 text-white hover:bg-orange-700' onClick={(e) => { e.preventDefault(); CreateUser() }}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Topbar