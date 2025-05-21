"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://staging-http.tandev-stage.fun/viewAll");
      const ws = new WebSocket("http://staging-ws.tandev-stage.fun");
      ws.onopen = ()=>{
        alert("Connected!!")
      }
      console.log(res.data.users);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      
      {loading ? (
        <div>Loading users...</div>
      ) : users.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded-md">No users found</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Username</th>
              <th className="border border-gray-300 p-2 text-left">Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: {
              username: string,
              age: number
            }, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}