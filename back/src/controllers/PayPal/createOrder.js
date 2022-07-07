

const axios = require("axios");

PAYPAL_API="https://api.sandbox.paypal.com";
PAYPAL_API_CLIENT="AfxRBPpYCg7i0bseISrnslYhnCld6FVa4-tPOhoo7MkAjYSpetfETdX3tDKiGNptqJZEFsi2yBoKNCTF";
PAYPAL_API_SECRET="EI9dQUFyOSTloVcocqeJick-Fk7puCqX_WrjkNzCEglwPnE_RYAQmHg1yI6FoB-GffVdPuBSUszgMgps";
 


const createOrder = async (req, res) => {

    try {
      const total= req.body.total;
      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value:total,
            },
          },
        ],
        application_context: {
          brand_name: "GlobalMarket",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `http://localhost:9000/paypal/capture-order`,
          cancel_url: `http://localhost:9000/paypal/cancel-payment`,
        },
      };
  
  
    
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
  
    
      const {
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
  
  
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
  
      return res.json(response.data);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Something goes wrong");
    }
  };

  
  module.exports = createOrder;