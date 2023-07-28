# Tokopedia Play Clone

Tokopedia Play Clone is a backend server task provided by *GoTo Impact - Generasi Gigih 3.0*. This project uses a REST API architecture built using Express JS technology as a framework for routing and managing HTTP requests and Mongoose to connect and interact with the MongoDB database.

## Feature

- [x] Video API
  - [x] Create video
  - [x] Update video
  - [x] Delete video
  - [x] Get all videos
  - [x] Get video by id
  - [x] Get video by user id 
- [x] Product API
  - [x] Create product
  - [x] Update product
  - [x] Delete product
  - [x] Get all products
  - [x] Get product by id
  - [x] Get products by video id
- [x] Comment API
  - [x] Create comment
  - [x] Update comment
  - [x] Delete comment 
  - [x] Get comment by id
  - [x] Get comment by video id 
- [x] User API
  - [x] update user
- [x] Auth API
  - [x] Login
  - [x] Register

## Additional Feature

- [x] JWT Authentication

## Technology & Depedencies

- Node JS
- Express JS
- Mongoose
- bcrypt
- jsonwebtoken

## How to run

The following are the steps to install and run this project in your local environment:

- **Prerequisites**
  
   - Make sure you have Node.js installed on your computer. If not, download and install Node.js from [official Node.js website](https://nodejs.org).
  
   - Make sure you have MongoDB installed on your computer. If not, download and install MongoDB from [official MongoDB website](https://www.mongodb.com).

- **Clone Repository**

   Open a terminal or command prompt and run the following command to clone the repository to your local directory:

   ```bash
   git clone https://github.com/morphiezy/tokopedia-play-clone.git
   cd tokopedia-play-clone
   ```

- **Install Dependencies**

   Make sure you are in the project directory and run the following command to install all the required dependencies:

   ```bash
   npm install
   ```

- **Configuration**

    - Copy the `.env.example` file and rename it to `.env`.

    - Open the `.env` file and set the variables. Make sure the value matches the variabels context.
  
- **Running Server**

   Run the following command to start the server :

   ```bash
   npm start
   ```

   If you do not specify PORT in the `.env` file, by default server port is 3000. Then server can be access on **http://localhost:3000**

## Database Schema (MongoDB)

In this project, we use MongoDB as a database to store information.

### User Collection

```js
{
  _id: ObjectID
  username: String
  password: String
  created_at: Date
  updated_at: Date
}
```

### Video Collection

```js
{
  _id: ObjectID
  user_id: ObjectID
  title: String
  youtube_url: String
  thumbnail: String
  views: Number
  created_at: Date
  updated_at: Date
}
```

### Product Collection

```js
{
  _id: ObjectID
  video_id: ObjectID
  title: String
  picture: String
  price: Number
  url: String
  created_at: Date
  updated_at: Date
}
```

### Comment Collection

```js
{
  _id: ObjectID
  user_id: ObjectID
  video_id: ObjectID
  comment: String
  created_at: Date
  updated_at: Date
}
```

## API Request & Response

```js
🔒 : Protected Endpoint
🌍 : Public Endpoint
```

### POST api/auth/register

🌍 Creates a new `user` and returns the new object.

* **Headers**  
  Content-Type: application/json 
   
* **Request Body**  

```json
{
  "username": "GIGIH",
  "password": "SiG1gih"
}
```

* **Success Response:**  
* **Code :** 201  
* **Content :**

```json
{
  "status": "success",
  "data": {
      "token": String
  }
}
```

### POST api/auth/login

🌍 Authenticate `user` and returns the new object.

* **Headers**  
  Content-Type: application/json 
   
* **Request Body**  

```json
{
  "username": "GIGIH",
  "password": "SiG1gih"
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
  "status": "success",
  "data": {
      "token": String
  }
}
```

* **Error Response:**  
* **Code :** 400
* **Content :**

```json
{
    "status": "failed",
    "message": "username & password required."
}
``` 

* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "username not registered or password incorrect"
}
```

### PATCH api/user/:id

🔒 update `user` data and returns the new object.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "username": String,
  "password": String
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
  "status": "success",
  "data": {
      "_id_": String,
  }
}
```

* **Error Response:**  
* **Code :** 400
* **Content :**

```json
{
    "status": "failed",
    "message": "Failed to update user"
}
``` 

* **Code :** 401
* **Content :**

```json
{
    "error": "Unauthorized"
}
``` 

### GET api/videos

🌍 get all `videos` data and returns list of videos.

* **URL Params**  
  None 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": [
        ...list of video
    ]
}
```

### GET api/videos/:id

🌍 get `videos` by id and return new object data.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": {
        "_id": String,
        "title": String,
        "youtube_url": String,
        "thumbnail": String,
        "views": Number,
        "user_id": String,
        "createdAt": Date,
    }
}
```

### POST api/videos

🔒 create `video` data and returns the new object.

* **URL Params**  
  None

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "username": String,
  "password": String
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
  "status": "success",
  "data": {
      "_id": String,
      "title": String,
      "youtube_url": String,
      "thumbnail": String
  }
}
```

* **Error Response:**  
* **Code :** 400
* **Content :**

```json
{
    "status": "failed",
    "message": "Failed to create video"
}
``` 

### PATCH api/videos/:id

🔒 update `video` data and returns the new object.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "title": String,
  "youtube_url": String
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": {
        "_id": String,
        "title": String,
        "youtube_url": String,
        "thumbnail": String,
        "updatedAt": Date,
    }
}
```

* **Error Response:**  
* **Code :** 400
* **Content :**

```json
{
    "status": "failed",
    "message": "Update vide failed"
}
``` 

### DELETE api/videos/:id

🔒 delete `video` data.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`

* **Success Response:**  
* **Code :** 204
  

### GET api/users/:id/videos

🌍 get list of `videos` by user id.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": [
        ...list of videos
    ]
}
```

* **Error Response:**  
* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "user not found"
}
```

### GET api/products

🌍 get all `products` data.

* **URL Params**  
  None 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": [
        ...list of products
    ]
}
```

### POST api/products

🔒 create `product` of video and return new object data.

* **URL Params**  
  None

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "title": String,
  "picture": String,
  "price": Number,
  "url": String,
  "video_id": String,
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
  "status": "success",
  "data": {
      "title": String,
      "picture": String,
      "price": Number,
      "url": String,
      "video_id": String,
      "_id": String,
      "createdAt": Date,
      "updatedAt": Date,
  }
}
```

* **Error Response:**  
* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "Video not found"
}
``` 

### GET api/products/:id

🌍 get `product` by id and return new object data.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": {
        ...product data
    }
}
```

### GET api/videos/:id/products

🌍 get products of `videos` by video id.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": [
      ...list of products
    ]
}
```

* **Error Response:**  
* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "video not found"
}
```

### PATCH api/products/:id

🔒 update `product` data and returns the new object.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "title": String,
  "picture": String,
  "price:": Number,
  "url": String
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": {
        ...all product field
    }
}
```

* **Error Response:**  
* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "Product not found"
}
``` 

### DELETE api/products/:id

🔒 delete `products` data.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`

* **Success Response:**  
**Code :** 204

* **Error Response:**  
**Code :** 401
* **Content :**

```json
{
    "error": "Unauthorized"
}
``` 

### POST api/comments

🔒 create `comment` data and returns the new object.

* **URL Params**  
  None

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "video_id": String,
  "comment": String
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
  "status": "success",
  "data": {
      ...all field of comment
  }
}
```

* **Error Response:**  
* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "Video ID not found"
}
``` 

### PATCH api/comments/:id

🔒 update `comment` data and returns the new object.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`
   
* **Request Body**  

```json
{
  "comment": String
}
```

* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": {
        "_id": "64c314e29fe1762cd6fe05ce",
        "comment": "KIW!",
        "updatedAt": "2023-07-28T01:11:29.740Z"
    }
}
```

* **Error Response:**  
* **Code :** 401
* **Content :**

```json
{
    "status": "failed",
    "message": "unauthorized"
}
``` 

### DELETE api/comments/:id

🔒 delete `comment` data.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<JWT Token>`

* **Success Response:**  
* **Code :** 204

* **Error Response:**  
* **Code :** 401
* **Content :**

```json
{
    "status": "failed",
    "message": "unauthorized"
}
``` 

### GET api/comments/:id

🌍 get `comment` by id and return new object data.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": {
        ...all of comment field
    }
}
```

### GET api/videos/:id/comments

🌍 get products of `comments` by video id.

* **URL Params**  
  *Required* : String 

* **Headers**  
  Content-Type: application/json  
   
* **Success Response:**  
* **Code :** 200
* **Content :**

```json
{
    "status": "success",
    "data": [
      {
        "_id": String,
        "user_id": {
            "username": String
        },
        "comment": String,
        "createdAt": Date
      }
    ]
}
```

* **Error Response:**  
* **Code :** 404
* **Content :**

```json
{
    "status": "failed",
    "message": "video not found"
}
```