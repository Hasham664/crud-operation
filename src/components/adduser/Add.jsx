import React, { useState } from "react";
import "./add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'

const Add = () => {
  const navigate = useNavigate()
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log(user);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate('/')
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="main-add">
      <div className="addUser">
        <Link to={"/"}>Back</Link>
        <h3>Add new user</h3>
        <form autoComplete="off" className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="fname"
              name="fname"
              autoComplete="off"
              placeholder="First Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="lname"
              name="lname"
              autoComplete="off"
              placeholder="Last Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="fname">Email</label>
            <input
              type="email"
              onChange={inputHandler}
              id="email"
              name="email"
              autoComplete="new-password"
              placeholder="Email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="fname">Password</label>
            <input
              type="password"
              onChange={inputHandler}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div className="inputGroup">
            <button type="submit"> Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
