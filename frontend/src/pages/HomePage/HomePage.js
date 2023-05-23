import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [subscription, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_subscription", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSubscriptions(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSubscriptions();
  }, [token]);
  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.username}!</h1>
      <Link to="/addsurvey">
        <p>Click to add Subscription</p>
      </Link>
      {subscription &&
        ((subscription) => (
          <p key={subscription.id}>
            {subscription.type} {subscription.family_size} {subscription.price} {subscription.user_id} {subscription.user} {subscription.product_id} {subscription.product}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
