import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";


const defaultValues = {
    "subscription_type": "",
    "family_size": ""
}

const AddSubscriptionPage =  (props) => {

    const [token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange,] = useCustomForm(defaultValues)

    async function postSubscription(){
       try {
            let response = await axios.post("http://127.0.0.1:5000/api/user_survey", formData, {
                headers: {
                  Authorization: "Bearer " + token,   
                },
            })
            navigate(response.data)
       } catch (error) {
           console(error.response.data)
       }
 
    } 

postSubscription()

    return(
        <div className="1choice">
            <label htmlFor="subscription_type">Choose a Subscription:</label><select name="subscription_type" id="subscription_type" value={formData.subscription_type}
                onChange={handleInputChange}>
                <option value="1 month">1 month subscription</option>
                <option value="3 month">3 month subscription</option>
                <option value="6 month">6 month subscription</option>
                <option value="12 month">12 month subscription</option>
            </select>
        <hr></hr>
            <div className="2choice">
                <label htmlFor="family_size">Choose your household size:</label><select name="family_size" id="family_size" value={formData.family_size} 
                onChange={handleInputChange}>
                        <option value="2 people">2 People</option>
                        <option value="4 people">4 People</option>
                        <option value="6 people">6 People</option>
                        <option value="8 people">8 People</option>
                    </select>
                    <hr></hr>
                <div className="3choice">
                    <label htmlFor="meals_per_week">Choose how maney meals per week you want to recieve:</label><select name="meals_per_week" id="meals_per_week" value={formData.meals_per_week} 
                    onChange={handleInputChange}>
                            <option value="4 meals">4 Meals</option>
                            <option value="6 meals">6 Meals</option>
                            <option value="8 meals">8 Meals</option>
                            <option value="10 meals">10 Meals</option>
                        </select>
                    <button>Add!</button>
                </div>
            </div>  
        </div>
        
    )
}

export default AddSubscriptionPage;
