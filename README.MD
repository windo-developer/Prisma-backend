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

### User model

[✔] Create Account  
[✔] Login  
[✔] View User Profile  
[✔] Edit User Profile  
[✔] Following / UnFollow  
[✔] Searching User

### Photo model

[✔] Upload Photo (+user profile image)  
[✔] Like / UnLike Post  
[✔] Showing Likes  
[🔺] Showing Post (Feed Page)

### Hashtag model

[✔] Create hashtag
[✔] parser hashtag
[✔] Search hashtag

### Comment model

[] create Comment
[] edit / delete comment

### DM model

[] Create DM Room  
[] send, read Message
