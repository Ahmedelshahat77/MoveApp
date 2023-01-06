import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMassege, seterrorMassege] = useState("");
  const [errorsList, setErrorsList] = useState([]);

  let formSubmit = async (e) => {
    e.preventDefault();
    let responseValdiate = validateFormData();
    if (responseValdiate.error) {
      setErrorsList(responseValdiate.error.details);
    } else {
      const { data } = await axios.post(
        "https://routeegypt.herokuapp.com/signup",
        user
      );
      if (data.message === "success") {
        navigate("/login");
      } else {
        seterrorMassege(data.message);
      }
    }
  };
  let validateFormData = () => {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().required().min(2).max(10),
      last_name: Joi.string().alphanum().required().min(2).max(10),
      age: Joi.number().min(20).max(80).required(),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const getInputValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  };

  return (
    <div className=" w-75 m-auto  py-5 ">
      <h2 className="my-3">Registration Form</h2>
      <form onSubmit={formSubmit}>
        {errorsList.map((error, index) => (
          <div key={index} className="alert alert-danger p-2">
            {error.message}
          </div>
        ))}
        {errorMassege ? (
          <div className="my2 alert alert-danger">
            <p>{errorMassege}</p>
          </div>
        ) : (
          ""
        )}

        <div className="my-2">
          <label htmlFor="first_name" className="form-label">
            First Name :
          </label>
          <input
            onChange={getInputValue}
            type="text"
            className="form-control"
            name="first_name"
          />
        </div>
        <div className="my-2">
          <label htmlFor="last_name" className="form-label">
            LAst Name :
          </label>
          <input
            onChange={getInputValue}
            type="text"
            className="form-control"
            name="last_name"
          />
        </div>
        <div className="my-2">
          <label htmlFor="last_name" className="form-label">
            Age :
          </label>
          <input
            onChange={getInputValue}
            type="number"
            className="form-control"
            name="age"
          />
        </div>
        <div className="my-2">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={getInputValue}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
        </div>
        <div className="my-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={getInputValue}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
