import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"
export default async function Page({ params }) {
    // const { handle } = (await params).handle
    const { handle } = params

    const client = await clientPromise
    const db = client.db("linktree")
    const collection = db.collection("links")
    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }

    const item2 =
    {
        "_id": {
            "$oid": "680cf1c4bde1f43c12fa4f76"
        },
        "links": [
            {
                "link": "https://chat.deepseek.com/a/chat/s/8b7dd7ea-430b-4c1f-bdd5-f1a827d8eae8",
                "linktext": "DeepSeek Chat"
            },
            {
                "link": "https://youtube.com",
                "linktext": "YouTube"
            },
            {
                "link": "https://twitter.com",
                "linktext": "Twitter / X"
            },
            {
                "link": "https://github.com",
                "linktext": "GitHub"
            }
        ],
            "handle": "reyyan",
        "pic": "https://up.yimg.com/ib/th?id=OIP.Qgd_Mkr49_UkoQV-pNA5TgHaE7&pid=Api&rs=1&c=1&qlt=95&w=173&h=115"
    }
    return <div className="flex bg-blue-300  min-h-screen justify-center items-start py-10">
       {item && <div className="photo  flex items-center gap-2 justify-center flex-col">
            <img className="rounded-full" src={item.pic} alt="" />
            <span className="font-bold text-2xl">@{item.handle}</span>
            <span className="text-xl w-72 text-center">Create Your LinkTree And Let People Know About You</span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link  key={index} href={item.link}>  <div className="p-3 min-w-60 font-semibold text-center shadow-lg rounded-md bg-white flex justify-center my-4">
                         {item.linktext} 

                    </div></Link>
                })}
            </div>
        </div>}

    </div>
}



// import Link from "next/link"
// import clientPromise from "@/lib/mongodb"
// import { notFound } from "next/navigation"

// export default async function Page({ params }) {
//     const { handle } = params // Fixed destructuring

//     const client = await clientPromise
//     const db = client.db("linktree")
//     const collection = db.collection("links")
//     const item = await collection.findOne({handle: handle})
    
//     if(!item){
//         return notFound()
//     }

//     return (
//         <div className="flex bg-blue-300 min-h-screen justify-center items-start py-10">
//             <div className="photo flex items-center gap-2 justify-center flex-col">
//                 <img className="rounded-full" src={item.pic} alt="" />
//                 <span className="font-bold text-2xl">@{item.handle}</span>
//                 <span className="text-xl w-72 text-center">
//                     Create Your LinkTree And Let People Know About You
//                 </span>
//                 <div className="links">
//                     {item.links.map((item, index) => (
//                         <Link key={index} href={item.link}>
//                             <div className="p-3 min-w-60 font-semibold text-center shadow-lg rounded-md bg-white flex justify-center my-4">
//                                 {item.linktext}
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }