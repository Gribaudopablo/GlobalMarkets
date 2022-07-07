
const axios = require("axios");


PAYPAL_API="https://api.sandbox.paypal.com";
PAYPAL_API_CLIENT="AfxRBPpYCg7i0bseISrnslYhnCld6FVa4-tPOhoo7MkAjYSpetfETdX3tDKiGNptqJZEFsi2yBoKNCTF";
PAYPAL_API_SECRET="EI9dQUFyOSTloVcocqeJick-Fk7puCqX_WrjkNzCEglwPnE_RYAQmHg1yI6FoB-GffVdPuBSUszgMgps";

const captureOrder = async (req, res) => {
    const { token } = req.query;
  
    try {
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );
       
        
      res.redirect("http://localhost:3000/orders/history");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
    }
  };
  
    

  module.exports = captureOrder;