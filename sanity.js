import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  // projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  projectId: 'm6g9aasp',
  apiVersion: '2021-03-25',

  useCdn: process.env.NODE_ENV === 'production',
  // useCdn: true,
  // useCDN: false,
}

export const sanityClient = createClient(config)
export const urlFor = (source) => imageUrlBuilder(config).image(source)
export const useCurrentUser = createCurrentUserHook(config)

// const client = sanityClient({
//   projectId: "",
//   dataset: 'production',
//   apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
//   token: 'sanity-auth-token', // or leave blank for unauthenticated usage
//   useCdn: true, // `false` if you want to ensure fresh data
// })

// const sanityClient = require('@sanity/client')
// const client = sanityClient({
//   projectId: "",
//   dataset: 'production',
//   apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
//   token: 'sanity-auth-token', // or leave blank for unauthenticated usage
// `false` if you want to ensure fresh data
// })
