import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import Cookies from 'js-cookie'

const Home = () => {
  const [user, setUser] = useState([]);
  const navigate= useNavigate()


    useEffect(()=>{
      if(!Cookies.get("token")){
        navigate("/login") 
      }
      else{
        navigate('/')
      }
    }, [])

 

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios(`${api}`, {
          withCredentials:true,
        })
        setUser(response.data);
      };

      fetchData();
    }, []);
  
 



  return (
    <div className="fetchDataDiv">
      <h1>Logged Users</h1>
      
      {user.map((item, index) => {
        return (
          <div className="dataWrapper" key={index}>
            <div>LoggedIn</div>
            <div>{item.username}</div>
          </div>
        );
      })}
    </div>
  );
};


export default Home;
