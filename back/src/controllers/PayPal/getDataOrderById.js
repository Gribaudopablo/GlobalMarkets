const axios = require("axios");

PAYPAL_API="https://api.sandbox.paypal.com";
PAYPAL_API_CLIENT="AfxRBPpYCg7i0bseISrnslYhnCld6FVa4-tPOhoo7MkAjYSpetfETdX3tDKiGNptqJZEFsi2yBoKNCTF";
PAYPAL_API_SECRET="EI9dQUFyOSTloVcocqeJick-Fk7puCqX_WrjkNzCEglwPnE_RYAQmHg1yI6FoB-GffVdPuBSUszgMgps";


const getDataOrderById = async (req, res) => {

  try{
const id=req.params.id  
const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
  
    
      const  {

        
        data: { access_token },
      } = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );

      const response = await axios.get(
        `${PAYPAL_API}/v2/checkout/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return res.json(response.data)
  } 
  catch (err){console.log(err)}
  
    }
      module.exports = getDataOrderById;