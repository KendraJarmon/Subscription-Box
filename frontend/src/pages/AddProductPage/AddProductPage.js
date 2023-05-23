import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";


const defaultValues = {
    "product_name": "",
    "price": ""
}

const AddProductPage = (props) => {
    const [token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues)

    async function postProduct(){
       try {
            let response = await axios.post("http://127.0.0.1:5000/api/user_product", formData, {
                headers: {
                  Authorization: "Bearer " + token,   
                },
            })
            navigate(response.data)
       } catch (error) {
           console(error.response.data)
       }

    }

  postProduct()

    return(
        <div className="container">
          <form classname="form" onSubmit={handleSubmit}>
            <label>
             Subscription type:{" "}
             <input
               type="text"
               name="subscription_type"
               value={formData.product_type}
               onChange={handleInputChange}
               />
            </label>
            <label>
              Family_size:{" "}
              <input
                type="text"
                name="family_size"
                value={formData.family_size}
                onChange={handleInputChange}
                />
            </label>
            <button>Add!</button>    
          </form>
        </div>
    )
}

export default AddProductPage;
