# ExpressMongo-CRUD-API

##  Features  
- CRUD (Create, Read, Update, Delete) operations for user management  
- Built with **Express.js**, **TypeScript**, and **MongoDB**  
- Input validation using **Joi**  
- Authentication with **JWT Token**  
- Secure API with **Helmet & CORS**  
 

## Tech Stack  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB
- **Validation:** Joi 
- **Authentication (Optional):** JWT  
- **Security:** Helmet, CORS  

## Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Nidhibhide/ExpressMongo-CRUD-API.git
   cd ExpressMongo-CRUD-API
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add your environment variables  
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

4. **Start the server**  
   ```bash
   npm run dev
   ```
   

##  API Endpoints  

### **User Routes**  

| Method | Endpoint       | Description               |
|--------|--------------|---------------------------|
| POST   | `/api/users/create`  | Create a new user        |
| GET    | `/api/users/getAll`  | Get all users            |
| GET    | `/api/users/:id` | Get a user by ID        |
| PUT    | `/api/users/:id` | Update user information |
| DELETE | `/api/users/:id` | Delete a user          |
