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
    <div className="col-10 dashboard_wrapper">
      <div className="dashboard_top">
        <h2>User Analytic Dashboard</h2>
      </div>
      <div className="table_wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#512da8", color: "white" }}>#</th>
              <th style={{ backgroundColor: "#512da8", color: "white" }}>
                Name
              </th>
              <th style={{ backgroundColor: "#512da8", color: "white" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#512da8", color: "white" }}>
                Number of queries
              </th>
              <th style={{ backgroundColor: "#512da8", color: "white" }}>
                Last Login
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.queryCount}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
