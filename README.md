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

Minimum Requirement
  1. Node version :- Node.js v18+

Future Scope
  1. Images are also being crawled and saved into the system and we can use different AI model to work with Images. Currently i am using gemini-pro.


Note:-
     For the AI Component i am using google's GoogleGenerativeAI api with its free version. In Free version i am allowed around
     
       1. 2 RPM (requests per minute), 
       2. 32,000 TPM (tokens per minute),
       3. 50 RPD (requests per day)
       
    Therefore, this project will not crawl the whole website because it may create a large data that can go beyond above constraints.


Tech Stack
  1. React
  2. Node
  4. MongoDB
     
Library
  1. Express
  2. Axios
  3. Cheerio
  4. Node-fetch
  5. Dotenv
  6. Cors
  7. Nodemon
  8. React-router-dom
