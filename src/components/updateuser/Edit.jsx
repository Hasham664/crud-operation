import React, { useState,useEffect } from 'react'
import '../adduser/add.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Edit = () => {

    const users = {
        fname:"",
        lname: "",
        email:""

    }
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState(users)
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]:value })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`).then((response) => {
         setUser(response.data)
          
        }).catch((error) => {
          console.log(error);
      })
    }, [id])

    const submitForm = async(e) => {
        e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate('/')
      })
      .catch((error) => console.log(error));
    }
    
    return (
      <div className='main'>
        <div className="addUser">
          <Link to={"/"}>Back</Link>
          <h3>Update user</h3>
          <form
            autoComplete="off"
            className="addUserForm"
            onSubmit={submitForm}
          >
            <div className="inputGroup">
              <label htmlFor="fname">First Name</label>
              <input
                onChange={inputChangeHandler}
                value={user.fname}
                type="text"
                id="fname"
                name="fname"
                autoComplete="off"
                placeholder="First Name"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="lname">Last Name</label>
              <input
                onChange={inputChangeHandler}
                value={user.lname}
                type="text"
                id="lname"
                name="lname"
                autoComplete="off"
                placeholder="Last Name"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="fname">Email</label>
              <input
                onChange={inputChangeHandler}
                value={user.email}
                type="email"
                id="email"
                name="email"
                autoComplete="new-password"
                placeholder="Email"
              />
            </div>

            <div className="inputGroup">
              <button type="submit"> UPDATE USER</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Edit