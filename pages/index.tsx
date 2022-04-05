import Head from 'next/head'
import Link from 'next/link'
import Body1 from '../Components/Body1'
import Header from '../Components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}

export function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Project-KZ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Body1 />

      {/* Posts */}

      <div className="grid grid-cols-1 gap-3 p-2 py-5 sm:grid-cols-2 md:gap-3 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                src={urlFor(post.mainImage).url()!}
                alt=""
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-110"
              />
              <div className="flex justify-between bg-slate-50 py-5">
                <div className="mx-3">
                  <p className="text-lg font-bold ">{post.title}</p>
                  <p className="py-2 text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  alt=""
                  src={urlFor(post.author.image).url()!}
                  className="mx-5 h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
    title,
    description,
    author ->{
    name,
    image
  },
  body,
  mainImage,
  slug,
  }`

  const posts = await sanityClient.fetch(query)
  return { props: { posts } }
}

// export const getServerSideProps = async () => {
//   const query= `*[_type=="post"]{
//     _id,
//     title,
//     author ->{
//     name,
//     image
//   },
//   body,
//   mainImage,
//   slug,
//   }`;
//   const posts = await sanityClient.fetch(query);
//   return {props:
//     {posts}}
// }
