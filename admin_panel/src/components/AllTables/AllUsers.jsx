import "./AllTables.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const AllUsers = () => {
  // const [data, setData] = useState(userRows);
  const [getUserDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("/api/users")
      .then((response) => response.data)
      .then((data) => {
        setUserDetails(data.data.Users);
        // for (var i = 0; i < data.data.Users.length; i++) {
        //   console.log(data.data.Users);
        // }
      });
  };

  const handleDelete = (_id) => {
    axios.delete("/api/users/" + _id).then((response) => {
      if (response.data !== null) {
        setUserDetails(getUserDetails.filter((item) => item._id !== _id));
        //console.log(response.data.Users.username + "Record Delete Successful");
      }
    });
  };

  const handleView = (_id) => {
    window.localStorage.setItem("userSpecificId", _id);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/users/" + params.row._id}
              onClick={() => handleView(params.row._id)}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return window.localStorage.getItem("token") ? (
    <div className="datatable">
      <div className="datatableTitle">
        Current Users
        <Link to="newuser" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={getUserDetails}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[8]}
        checkboxSelection
        onClick={getUsers}
      />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    // renderCell: (params) => {
    //   return(
    //     <div>
    //      {for (let index = 0; index < params.length; index++) {

    //      }}
    //     </div>
    //   );
    // },
  },
  {
    field: "user",
    headerName: "User",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 350,
  },
];

export default AllUsers;
