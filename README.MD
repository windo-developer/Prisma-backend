# graphQL / Apollo Server(+Express) / postgreSQL .with Prisma

This server requirements

- Apollo Server (Express)
- postgreSQL
- Prisma

server does not use **AWS**, so the server itself saves and loads files as "static".

```
npm install
npm run dev
```

---

node.js 14.X has graphql upload bug.  
if you get a "Maximum call stack size exceeded resolution" error, try the following solutions.

    1. npm install graphql-upload graphql
    2. delete node_modules folder
    3. npm install

or **downgrade node version 12.x**

[V] Create Account
[V] Login
[V] View User Profile
[V] Edit User Profile
[] Following / UnFollow
[] Searching User
[] Upload Photo
[] Like / UnLike Post
[] Showing Like
[] Showing Post (Feed)
[] Comment
[] Create DM Room
[] send, read Message
[] subscript
