import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';


export const Register = () => {

  const [data,setData]=useState({
    name :"",
    email:"",
    password:"",
    profile_pic:""

  })

  const handleOnChnage =(e)=>{

        const {name,value} =e.target;

        // set the details
        setData((prev)=>{
              
             return {
                  ...prev,
                  [name] :value
             }
        })
  }

  const [uploadPhoto,setUploadPhoto]=useState("")
  const navigate = useNavigate();


  const handleUploadPhoto =async (e)=>{

       e.stopPropagation();
       e.preventDefault();
       const file =await e.target.files[0];
      
       const uploadPhoto = await uploadFile(file);
      //  console.log(uploadPhoto)

        setUploadPhoto(file)

        // set the data of profile pic from cloudinary 
        setData((prev)=>{
          return {
            ...prev ,
            profile_pic:uploadPhoto?.url
          }
        })
  }

  const handleClearPhoto = ()=>{

        setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
     
        e.stopPropagation();
        e.preventDefault();

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
  
        try {
          
            const response = await axios.post(URL, data);
            console.log("response", response);

            toast.success(response.data.message);

            if (response.data.success) {
              setData({
                name: "",
                email: "",
                password: "",
                profile_pic: "",
              });

              navigate("/email");
            }
        } catch (error) {
          
              toast.error(error?.response?.data?.message);
        } 
  
}

  // console.log("Upload photo",uploadPhoto)
  return (
    <div className="mt-5 drop-shadow-2xl ">
      <div className="bg-white w-full max-w-sm  rounded overflow-hidden p-4 mx-auto ">
        {/* Heading Part  */}
        <h3>Welcome to Chat App !</h3>

        {/* form for data  */}

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          {/* name secton  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name "
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChnage}
              required
            />
          </div>

          {/* email  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your email "
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChnage}
              required
            />
          </div>

          {/* password  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your password "
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChnage}
              required
            />
          </div>

          {/* profile_pic  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div
                className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary
               cursor-pointer"
              >
                <p className="text-sm max-w[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto.name ? uploadPhoto.name : "Upload Profile Photo"}
                </p>

                {/* if image is uploaded then only show the cross button  */}
                {uploadPhoto.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onChange={handleClearPhoto}
                  >
                    <IoCloseSharp />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              hidden
              onChange={handleUploadPhoto}
            />
          </div>

          {/* submit button */}
          <button
            className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold
          text-white leading-relaxed tracking-wide"
          >
            Register
          </button>
        </form>

        {/* Already account  */}
        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link to={"/email"} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
