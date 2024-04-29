This project is about a chatboard that will crawll user defined website and can give answers to the user's query 

Backend
  ### Installation
    Step 1. git clone
    Step 2. Navigate to the backend folder ( cd Backend  )
    Step 3. Install dependencies  ( npm install )
    Step 4, Start the server ( npm start )

Chatboard (Front End)
  ### Installation
    Step 1. Navigate to the chatboard folder
    Step 2. Install dependencies (npm install )
    Step 3. Start the development server (npm start )


Note:- 
     For the AI Component i am using google's GoogleGenerativeAI api with its free version. 
       In Free version i am allowed around
       1. 2 RPM (requests per minute), 
       2. 32,000 TPM (tokens per minute),
       3. 50 RPD (requests per day)
    Therefore, this project will not crawl the whole website because it may create a large data that can go beyond above constraints.
