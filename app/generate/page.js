"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const Generate = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [links, setlinks] = useState([{ link: "", linktext: "" }])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [pic, setpic] = useState("")

  const handleChange = (index, link, linktext) => {
    setlinks((initialLinks) => {
      return initialLinks.map((item, i) => {  
        if (i == index) {
          return { link, linktext }
        } else {
          return item
        }
      })
    })
  }

  const addLink = () => {
    setlinks(links.concat([{ link: "", linktext: "" }]))
  }

  const submitLinks = async () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "pic": pic
    })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    }

    const r = await fetch("http://localhost:3000/api/add", requestOptions)
    const result = await r.json()
      
    if (result.success) {
      toast.success(result.message, {
        style: {
          backgroundColor: 'black',
          color: 'white', 
        },
      })
      
      // Redirect to the newly created LinkTree page
      router.push(`/${handle}`)
      
      // Clear the form (optional since we're redirecting)
      setlinks([])
      setpic("")
      sethandle("")
    } else {
      toast.error(result.message, {
        style: {
          backgroundColor: 'red',
          color: 'white', 
        },
      })
    }
  }

  return (
    <div className='bg-blue-400 min-h-screen grid grid-cols-2'>
      <div className="col1 flex justify-center items-center flex-col gap-5 mt-32 ">
        <h1 className='text-4xl font-bold '>Create Your LinkTree</h1>
        <div className='flex flex-col gap-5'>
          <div className="item">
            <h2 className='text-2xl font-semibold'>Step 1 : Claim Your Handle</h2>
            <div className='mx-5'>
              <input 
                value={handle || ""} 
                onChange={e => sethandle(e.target.value)} 
                className='bg-white p-3 focus:outline-blue-500 my-2 rounded-xl ' 
                type="text" 
                placeholder='Choose a Handle' 
              />
            </div>
          </div>
          <div className="item ">
            <h2 className='text-2xl font-semibold'>Step 2 : Add Links</h2>
            {links && links.map((item, index) => {
              return (
                <div key={index} className='mx-5 '>
                  <input 
                    value={item.linktext || ""} 
                    onChange={e => handleChange(index, item.link, e.target.value)}  
                    className='bg-white p-3 mx-3 my-2 focus:outline-blue-500 rounded-xl ' 
                    type="text" 
                    placeholder='Enter Link Text ' 
                  />
                  <input 
                    value={item.link || ""} 
                    onChange={e => handleChange(index, e.target.value, item.linktext)}  
                    className='bg-white p-3 my-2 focus:outline-blue-500 rounded-xl ' 
                    type="text" 
                    placeholder='Enter Link ' 
                  />
                </div>
              )
            })}
            <button 
              onClick={() => addLink()} 
              className='p-3 mx-52 font-bold text-white rounded-3xl cursor-pointer bg-slate-900'
            >
              + Add Link
            </button>
          </div>
          <div className="item">
            <h2 className='text-2xl font-semibold'>Step 3 : Add Picture and Finalize</h2>
            <div className='mx-5 flex flex-col items-center '>
              <input 
                value={pic || ""} 
                onChange={e => setpic(e.target.value)}  
                className='bg-white p-3 w-full my-2 focus:outline-blue-500 rounded-xl ' 
                type="text" 
                placeholder='Enter Link To Your Picture' 
              />
              <button 
                disabled={pic == "" || handle == "" || links[0].linktext == ""} 
                onClick={() => submitLinks()} 
                className='p-3 mx-32 font-bold w-fit my-3 text-white rounded-3xl disabled:bg-slate-500 cursor-pointer bg-slate-900'
              >
                Create Your LinkTree
              </button> 
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen ">
        <img className='h-full object-contain ml-52 ' src="/banner.webp" alt="image" />
        <ToastContainer />
      </div>
    </div>
  )
}

export default Generate