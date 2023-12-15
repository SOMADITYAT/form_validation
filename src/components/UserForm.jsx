import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../redux/userActions";


const UserForm = () => {
  const editingUser = useSelector((state) => state.users.editingUser);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: '',
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address1: "",
    state: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const generateTimestampId = () => {
    return new Date().getTime().toString(); 
  };
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);

  const [isEditMode, setIsEditMode]= useState(false);
  const [userId ,setUserId] = useState(null);

  const editUser = (user) => {
    setIsEditMode(true);
    setUserId(user.id);
    setFormData(user);
  };

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  useEffect(() => {
     axios('https://restcountries.com/v3.1/all')
     .then((response) => {
        setCountries(response.data)
     })
     .catch((error) => {
        console.log('Error Fetching Countries', error);
     });
  }, []);

  const validation = () => {
    let valid = true;
    const newErrors= {};

    if(!formData.firstName.trim() || formData.firstName.trim().length < 5) {
        newErrors.firstName= 'First Name should be at least 5 charchters';
       valid = false;
    }
    if(!formData.lastName.trim() || formData.lastName.trim().length < 5 ) {
        newErrors.lastName = 'Last Name should be at least  5 chartchters';
        valid= false;
    }
    if(!formData.email.trim()){
        newErrors.email = 'Email is required';
        valid= false;   
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
        newErrors.email = 'Invalid email address';
        valid =false;
    }
    if(!formData.mobileNo.trim()){
        newErrors.mobileNo = 'Invalid Mobile is required';
        valid =false;
    }else if (!/^\d{10}$/.test(formData.mobileNo)){
        newErrors.mobileNo ='Invalid mobile number (10 digits)';
        valid= false;
    }
    if (!formData.address1.trim()) {
        newErrors.address1 = 'Address 1 is required';
        valid = false;
      }
  
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
      valid = false;
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
      valid = false;
    } else if (!/^\d+$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Invalid postal code (must contain only numbers)';
      valid = false;
    } 

    setErrors(newErrors)
    return valid
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;

        getStatesByCountry(selectedCountry);
        setFormData({
            ...formData,
            country:selectedCountry,
        })

        
  }
  const getStatesByCountry = (country) => {  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (validation()) {
      const id = generateTimestampId(); 
      const newUser = { ...formData, id };
      if (editingUser) {
        dispatch(updateUser(formData)); 
      } else {
        dispatch(addUser(newUser));
      }


      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        address1: "",
        state: "",
        city: "",
        country: "",
        postalCode: "",
        
      });
      setErrors({});
    }
  };
  return (
    <div className="max-w-md mx-auto bg-gray-200 shadow-md p-10 rounded-md mt-8">
       <h2 className="text-2xl mb-4 font-semibold">Add User</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
      <label className="block text-gray-700  text-sm font-bold mb-4">
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your fist name"
          className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.firstName && <span className="error text-red-500 block mt-1 ml-1">{errors.firstName}</span>} <br />
      </label >
      <label className="block text-gray-700 text-sm  font-bold mb-4 ">
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name "
          className="border rounded-md px-3 py-2  w-full mt-1 focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.lastName && <span className="error text-red-500 block mt-1 ml-1">{errors.lastName}</span>} <br />
      </label>
      <label className="block text-gray-700 text-sm  font-bold mb-4">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.email && <span className="error text-red-500 block mt-1 ml-1">{errors.email}</span>} <br />
      </label>
      <label className="block text-gray-700 text-sm  font-bold mb-4">
        MobileNo :
        <input
          type="tel"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleInputChange}
          placeholder="Enter your mobile"
          className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.mobileNo && <span className="error text-red-500 block mt-1 ml-1">{errors.mobileNo}</span>} <br />
      </label>
      <label className="block text-gray-700 text-sm  font-bold mb-4">
        Address1 :
        <input 
        type="text"
        name="address1"
        value={formData.address1}
        onChange={handleInputChange}
        placeholder="Address" 
        className="border rounded-md px-3 py-2 w-full mb-4  mt-1 focus:outline-none focus:ring focus:border-blue-300"/>
         {errors.address1 && <span className="error">{errors.address1}</span>} <br />

        <div>
          <label className="block text-gray-700 text-sm  font-bold mb-4">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
                {errors.state && <span className="error text-red-500 block mt-1 ml-1">{errors.state}</span>} <br />

          </label>
          <label className="block text-gray-700 text-sm  font-bold mb-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
                {errors.city && <span className="error text-red-500 block mt-1 ml-1">{errors.city}</span>} <br />

          </label>
          <label className="block text-gray-700 text-sm  font-bold mb-4">
          <select 
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300" >
                <option value="">Select Country</option>
                {countries.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
             </select>
             {errors.country && <span className="error text-red-500 block mt-1 ml-1">{errors.country}</span>} <br />

          </label>

          <label className="block text-gray-700 text-sm  font-bold mb-4">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="PostalCode"
              className="border rounded-md px-3 py-2 w-full  mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
                  {errors.postalCode && <span className="error text-red-500 block mt-1 ml-1">{errors.postalCode}</span>}

          </label>
        </div>

      </label>
      <div className="mt-6">
            <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-4  rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >{isEditMode ? "Update" : "Submit"}</button>
            
      </div>
     
      </div>    
    </form>
   
    </div>
  );
};

export default UserForm;
