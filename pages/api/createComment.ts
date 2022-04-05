// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient  from '@sanity/client'


const config={
    dataset:"production",
    projectId:"m6g9aasp",
    // apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'production',
    token:"skZTy1dEKLqZ2b5dE5f2DSvbhltKhhjKDs6YubH8LDjqBlVNoJkVy06wL7Us3BKbEWhg0vfRUB2FQbuwAeWHFyoOyRQUhs3g7pi4BeX59QZrUR9UeXiP45RG0F4nYkH5GoMQJaSxWoS7k80gNgq5GNKvnNw5KftljTonoSlXv2KjV2K3rpec"
}

const client = sanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {_id, name, email, comment} = JSON.parse(req.body);
    try{
        await client.create({
            _type: 'comment',
            post:{
                _type:'reference',
                _ref:_id
            },
            name,
            email,
            comment
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'Could not Submit Comment' })
    }
    // console.log("Comment Submitted")
  return res.status(200).json({ message:'Comment Submited' });
}
