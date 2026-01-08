import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]); // Empty dependency to avoid infinite loop

  const handleRoleChange = (userId, newRole) => {
    axiosSecure
      .patch(`/users/${userId}`, { role: newRole })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call backend to delete user
        axiosSecure
          .delete(`/users/${userId}`)
          .then(() => {
            // Remove deleted user from state
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== userId)
            );

            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto dark:bg-gray-900">
      <table className="table w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td className="flex gap-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="select select-bordered select-sm outline-none"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="decorator">decorator</option>
                </select>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-error btn-sm bg-secondary text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
