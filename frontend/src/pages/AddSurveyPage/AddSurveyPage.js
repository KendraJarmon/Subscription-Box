import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useEffect } from "react";


const AddSurveyPage = (props) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange] = useCustomForm()

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try { 
                    let response =  await axios.get("http://127.0.0.1:5000/api/user_product", {
                        headers: {
                          Authorization: "Bearer " + token,   
                        },
                    });
                    fetchSubscriptions(response.data);
            } catch (error) {
              console.log(error.response.data);
    }
  };
    fetchSubscriptions();
}, [token]);

  return (
    <div className="box">
        {console.log(user)}
        <h1 id="title">The Goodies</h1>
        <hr></hr>
        <p id="description">What whould you like to recieve in your subscription box?</p>
        <hr></hr>
        <form
            id="form">
                <label> 
                <label htmlFor="meat">Choose your Meat:</label><select name="meat" id="meat" value={formData.meat}
                        onChange={handleInputChange}>
                        <option value="no meat">NO MEAT</option>
                        <option value="meat lover">Meat Lover</option>
                        <option value="just fish">Just Fish</option>
                        <option value="seafood lover">Seafood Lover</option>
                        <option value="chicken & beef">Chicken & Beef</option>
                    </select>
                </label>
                <label>  
                <label htmlFor="veggies">Choose your Veggie:</label><select name="veggies" id="veggies" value={formData.veggie}
                        onChange={handleInputChange}>
                        <option value="no veggies">NO VEGGIES</option>
                        <option value="the green ones">The Green Ones</option>
                        <option value="mixed">Mixed</option>
                        <option value="sqaush">Sqaush</option>
                        <option value="corn & carrots">Corn & Carrots</option>
                    </select>
                </label>
                <label>  
                <label htmlFor="sides">Choose your Sidees:</label><select name="sides" id="sides" value={formData.sides}
                        onChange={handleInputChange}>
                        <option value="white rice">White Rice</option>
                        <option value="brown rice">Brown Rice</option>
                        <option value="wild rice">Wild Rice</option>
                        <option value="veriety rice">Veriety Rice </option>
                        <option value="potatoes of every kind">Potatoes</option>
                        <option value="chickpeas">Brown Rice</option>
                        <option value="lintils">Wild Rice</option>
                    </select>
                </label>
                <label>  
                <label htmlFor="breads">Choose your Breads:</label><select name="breads" id="breads" value={formData.breads}
                        onChange={handleInputChange}>
                        <option value="white bread">White Bread</option>
                        <option value="wheat bread">Wheat Rice</option>
                        <option value="spelt bread">Spelt Bread</option>
                        <option value="whole grain bread">Whole Grain Bread</option>
                        <option value="kamut bread">Kamut Bread</option>
                        <option value="corn bread">Corn Bread</option>
                    </select>
                </label>
                <label>
                <label htmlFor="life style">Choose your life style:</label><select name="life style" id="life style" value={formData.life_style}
                        onChange={handleInputChange}>
                        <option value="keto">Keto</option>
                        <option value="plant based">Plant Based</option>
                        <option value="muscle build">Muscle Build</option>
                        <option value="fit">Fit</option>
                        <option value="lean">Lean</option>
                        <option value="veggiterian">Veggiterian</option>
                    </select>
                </label>
                <label>
                <label htmlFor="goals">What are your goals?:</label><select name="goals" id="goals" value={formData.goals}
                        onChange={handleInputChange}>
                        <option value="save money">Save Money</option>
                        <option value="spice up your palet">Spice up your palet</option>
                        <option value="save time">Save Time</option>
                        <option value="healthier eating">Healthier Eating</option>
                        <option value="just trying it out">Just trying it out</option>
                    </select>
                </label>
                <div className="submit">
                    <body>
                        <h2>If you're all done hit submit</h2>
                        <button class="button"><span>Submit </span></button>
                    </body>
                </div>
        </form>
    </div>
)
  };


export default AddSurveyPage;