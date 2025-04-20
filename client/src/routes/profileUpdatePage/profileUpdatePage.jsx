import { useContext, useState, useEffect } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/uploadWidget/uploadWidget.jsx";

function ProfileUpdatePage() {
    const [error,setError]= useState("");
    const [avatar,setAvatar]= useState([])
   const navigate= useNavigate();
   
  const {currentUser,updateUser}= useContext(AuthContext);

  useEffect(() => {
    if (avatar[0]) {
      updateUser({ ...currentUser, avatar: avatar[0] });
    }
  }, [avatar]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData= new FormData(e.target);
    const {username, email,password}= Object.fromEntries(formData);
    try {
      const response= await apiRequest.put(`/users/${currentUser.id}`,{
        username, email,
         password,
         avatar: avatar[0]
      });
      updateUser(response.data);
      navigate("/profile");
    } catch (error) {
       console.log(error);
       setError(error.response.data.message)      
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget uwconfig={
          {
            cloudName:"dpub5xf2v",
            uploadPreset:"estate",
            multiple:false,
            maxImageSize: 2000000,
            folders:["avatars"]
          }}

          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
