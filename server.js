const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8081

// Use cookie-parser middleware
app.use(cookieParser());

// Enable CORS with credentials
// Allow multiple origins
const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500',"http://localhost:5173" , "http://localhost:8081","https://cookies-frontend.vercel.app"];
app.use(cors({
  origin: (origin, callback) => {
    console.log(origin)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow cookies to be sent and received
}));

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('accessToken', '123456789', {
    httpOnly: true,   // Accessible only by web server
    secure: true,     // Ensures the browser only sends the cookie over HTTPS
    sameSite: 'None', // Required for cross-site cookies
    // domain: 'http://localhost:8081', // Replace with your backend domain
    path: '/'         // Adjust to your path if necessary
  });
  res.send('Cookie set');
});

// Route to access the cookie
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies)
  const cookieValue = req.cookies.accessToken;
  res.send(`Cookie value: ${cookieValue}`);
});


app.listen(PORT,()=>{
    console.log("Server listening on port ", PORT)
})
