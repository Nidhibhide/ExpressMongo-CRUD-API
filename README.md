# **ExpressMongo-CRUD-API**  

## **Features**  
- CRUD operations for **Users & Orders**  
- Built with **Express.js**, **TypeScript**, and **MongoDB**  
- Input validation using **Joi**  
- Secure API with **JWT, Helmet & CORS**  
- **MongoDB Aggregation Pipeline** for advanced queries  

## **Tech Stack**  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB  
- **Validation:** Joi  
- **Authentication:** JWT  
- **Security:** Helmet, CORS  

## **Base URL**  
All API requests must be prefixed with the following base URL:  
```
BASE_URL = http://localhost:5000/api
```

## **Installation**  
```bash
# Clone the repository
git clone https://github.com/Nidhibhide/ExpressMongo-CRUD-API.git
cd ExpressMongo-CRUD-API

# Install dependencies
npm install
```

### **Set up environment variables**  
Create a `.env` file and add:  
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### **Run the server**  
```bash
npm run dev
```

## **Authentication**
This API uses **JWT (JSON Web Token)** for authentication. The token should be sent in the `Authorization` header as follows:
```yaml
Authorization: Bearer <your_token_here>
```

## **API Endpoints**  

### **User Management**  
- `POST ${BASE_URL}/user/create` → Create User  
- `GET ${BASE_URL}/user/getAll` → Get All Users  
- `GET ${BASE_URL}/user/getById/:id` → Get User by ID  
- `PUT ${BASE_URL}/user/update/:id` → Update User  
- `DELETE ${BASE_URL}/user/delete/:id` → Delete User  
- `POST ${BASE_URL}/user/login` → Login User & Get Token  

### **Order Management**  
- `POST ${BASE_URL}/order/create` → Create Order (Protected)  
- `GET ${BASE_URL}/order/bill` → Get Bill (Protected)  

### **MongoDB Aggregation Pipeline**  
This project leverages **MongoDB Aggregation Pipeline** for efficient data processing and transformation:

- **Joining Orders with Users** – Uses `$lookup` to fetch related order details for each user.  
- **Unwinding Orders** – Uses `$unwind` to deconstruct order arrays into individual documents.  
- **Grouping Data** – Aggregates user order details such as total spent, number of orders, and purchased items.  
- **Projecting Fields** – Uses `$project` to include only relevant fields like name, email, total spent, and order details.  
- **Sorting Orders** – Applies `$sort` to arrange users based on total spending in ascending order.  

