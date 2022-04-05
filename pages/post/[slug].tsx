import { GetStaticProps } from 'next'
import Header from '../../Components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface Props {
  post: Post
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}
function Post({ post }: Props) {
  //   console.log(post)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const [submitted, setSubmitted] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'post',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <main>
      <Header />
      <img
        className="mx-auto h-40 w-full object-cover pl-10 pr-10"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center pt-2">
          <img
            src={urlFor(post.author.image).url()!}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="pl-5 text-sm font-extralight">
            Posted by <span className="text-green-500">{post.author.name}</span>{' '}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            className=""
            // dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            // projectId= {process.env.NEXT_PUBLIC_SANITY_ID!}
            dataset="production"
            projectId="m6g9aasp"
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1
                  className="my-5 text-justify text-2xl font-bold"
                  {...props}
                />
              ),

              h2: (props: any) => (
                <h2
                  className="my-5 text-justify text-xl font-bold text-gray-900"
                  {...props}
                />
              ),

              normal: (props: any) => (
                <p
                  className="text-l my-5 text-justify font-semibold text-gray-700"
                  {...props}
                />
              ),

              li: ({ children }: any) => (
                <li className="ml-l list-disc text-justify">{children}</li>
              ),

              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="my-5 mx-auto max-w-lg border border-green-700" />
      {submitted ? (
        <div className="my-10 mx-auto max-w-2xl bg-green-500 p-10 py-10 text-white">
          <h1 className="font-sans text-3xl font-semibold">
            Thanks For Your Comment
          </h1>
          <p>Your Comment Will be Appeared Here Once its Approved</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-green-600 ">Enjoyed The Article?</h3>
          <h4 className="font-sans text-3xl font-bold">
            Leave a Comment Below
          </h4>
          <hr className="mt-2 py-3" />
          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="mb-5 block">
            <span className="text-gray-700">Name:</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-green-600 focus:ring-2"
              type="text"
              placeholder="Enter Name Here"
            />
          </label>
          <label className="mb-5 block">
            <span>Email:</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-green-600 focus:ring-2"
              type="email"
              placeholder="Enter Email Here"
            />
          </label>
          <label className="mb-5 block">
            <span>Comment:</span>
            <textarea
              {...register('comment', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-green-600 focus:ring"
              rows={8}
              placeholder="Enter Your Comment Here"
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-900">Name is Required</span>
            )}
            {errors.email && (
              <span className="text-red-900">Email is Required</span>
            )}
            {errors.comment && (
              <span className="text-red-900">Comment is Required</span>
            )}
          </div>

          <input
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded bg-green-600 p-4 py-2 px-4 font-bold text-white shadow ring-green-200 hover:bg-green-400 focus:outline-none"
          />
        </form>
      )}
      {/* Comments Portion */}

      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-green-400">
        <h1 className="text-4xl">Comments</h1>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id} className="mt-3">
            <p className="space-x-3">
              <span className="mr-3 font-bold text-green-500">
                {comment.name}:
              </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{
        current
      }
      }`
  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
        name,
        image
      },
        'comments':*[
          _type=="comment" && 
          post._ref == ^._id &&
          approved == true
        ],
      description,
      mainImage,
      slug,
      body
      }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    //to update post/page cache every minute
    revalidate: 60,
  }
}
