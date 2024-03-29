# graphQL / Apollo Server(+Express) / postgreSQL .with Prisma

This server requirements

- Apollo Server (Express)
- postgreSQL
- Prisma

```
npm install
npm run dev
```

frontend here: https://github.com/windo-developer/SNS-frontend

---

if you get a "Maximum call stack size exceeded resolution" error, try the following solutions. this issue basic **grahql-upload** has bug. (this bug occures in node version 12 or higher) so disable graphql upload in server settings and install `graphql-upload@latest`

https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289

you want another way, refer to the this link (my code applied this. **※this way interim solution**)

https://github.com/jaydenseric/graphql-upload/issues/170#issuecomment-707934264

1. add code in package.json

```javascript
"resolutions": {
    "fs-capacitor":"^6.2.0",
    "graphql-upload": "^11.0.0"
  }
```

2. delete node_modules folder
3. npm install (npx npm-force-resolutions)

### User model

[✔] Create Account  
[✔] Login  
[✔] View User Profile  
[✔] Edit User Profile  
[✔] Following / UnFollow  
[✔] Searching User

### Photo(Post) model

[✔] Upload Photo (+user profile image)  
[✔] Like / UnLike Post  
[✔] Showing Likes  
[🔺] Showing Post (Feed Page) // TODO: pagnation

### Hashtag model

[✔] Create hashtag  
[✔] parser hashtag  
[✔] Search hashtag

### Comment model

[✔] create Comment  
[✔] edit / delete comment

### DM model

[✔] Create DM Room  
[✔] see room list  
[✔] send, read Message(message read check)  
[✔] real time message(PubServer)

### Connent AWS

[✔] S3 file upload
