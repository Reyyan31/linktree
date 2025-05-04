import clientPromise from "@/lib/mongodb"


export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("linktree")
    const collection = db.collection("links")

   const doc = await collection.findOne({handle : body.handle})
   if (doc){
    return Response.json({message : 'Your LinkTree already exists!', success : false, error : true, result : null})
   }

 const result = await collection.insertOne(body)
    return Response.json({message : 'Your LinkTree has been generated!', success : true, error : false, result : result})
}



