import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser } from '../redux/userActions';


const UserList = () => {
  const userList = useSelector ((state) => state.users.userList);
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    dispatch(editUser(user));
  };
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  } 

  return (
    <div className=' p-8 text-left'>
  
    <h2 className='text-2xl font-semibold'>User List</h2>
    {userList && userList.length ? (
    <table className="border-collapse border border-gray-400 mt-4 m-auto ">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2">First Name</th>
          <th className="border border-gray-400 px-4 py-2">Last Name</th>
          <th className="border border-gray-400 px-4 py-2">Email</th>
          <th className="border border-gray-400 px-4 py-2">Mobile Number</th>
          <th className="border border-gray-400 px-4 py-2">Address</th>
          <th className="border border-gray-400 px-4 py-2">State</th>
          <th className="border border-gray-400 px-4 py-2">Country</th>
          <th className="border border-gray-400 px-4 py-2">Zip Code</th>
          
          <th className="border border-gray-400 px-4 py-2">Actions</th>
          
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id} className="border border-gray-400">
            <td className="border border-gray-400 px-4 py-2">{user.firstName}</td>
            <td className="border border-gray-400 px-4 py-2">{user.lastName}</td>
            <td className="border border-gray-400 px-4 py-2">{user.email}</td>
            <td className="border border-gray-400 px-4 py-2">{user.mobileNo}</td>
            <td className="border border-gray-400 px-4 py-2">{user.address1}</td>
            <td className="border border-gray-400 px-4 py-2">{user.state}</td>
            <td className="border border-gray-400 px-4 py-2">{user.country}</td>
            <td className="border border-gray-400 px-4 py-2">{user.postalCode}</td>
            <td className="border border-gray-400 px-4 py-2">
              <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      ) : (
        <p className="mt-4 text-gray-500 text-center">No users available.</p>
      )}
  </div>
  
  );
};

export default UserList;
