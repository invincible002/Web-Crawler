import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);

  const formatDate = (inputDate) => {
    if (!isNaN(inputDate)) return;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: userTimezone,
    };

    const utcDate = new Date(inputDate);
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      utcDate
    );

    return formattedDate;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-all-users")
      .then((res) => {
        if (res.status == 200) {
          setAllUsers(res.data.users);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard_wrapper col-span-10">
      <div className="dashboard_top p-4">
        <h2 className="text-xl font-bold text-gray-700 md:text-2xl">
          User Analytic Dashboard
        </h2>
      </div>
      <div className="table_wrapper overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Number of Queries</th>
              <th className="px-4 py-2">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.queryCount}</td>
                <td className="px-4 py-2">{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
