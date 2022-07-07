
import NextAuth from 'next-auth'
import githubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../lib/mongodb'



export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers:[githubProvider({
        clientId:'883a101a8d3bbb20d9ed',
        clientSecret: '49a7c5f1e9cf510e0172e829a638358b6c4e6070'
}
)]});

/*
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...
})

*/