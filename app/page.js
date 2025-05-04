"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
export default function Home() {
  const [text, settext] = useState("")
  const router = useRouter()
  const claimTree = () => {
    router.push(`/generate?handle=${encodeURIComponent(text)}`);
  }
  
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
       <div className=" flex gap-3 items-center justify-center flex-col mb-48 ml-[10vw] space-y-2">
        <p className="text-yellow-300 font-bold text-5xl">Everything you are. 
          In one, simple link in bio.</p>
        <p className="text-yellow-300 text-xl">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        <div className="input flex gap-4 mr-24 my-2">
          <input value={text} onChange={(e)=>settext(e.target.value)} className="bg-white px-2 py-2 rounded-lg focus:outline-green-800" type="text" placeholder="Enter Your Handle"/>
         <button onClick={claimTree} className="p-3 rounded-full bg-pink-400 font-bold cursor-pointer">Claim Your LinkTree</button>
        </div>
        </div> 
        <div className=" flex items-center justify-center flex-col my-44 mr-[10vw]">
          <img src="/tree.png" alt="image" />
        </div>
      </section>
      <section className="bg-red-400 min-h-[100vh]">
        
      </section>
    </main>
  );
}
