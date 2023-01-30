import "./List.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AllUsers from "../../components/AllTables/AllUsers";

const UserList = () => {
 
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <AllUsers />
      </div>
    </div>
  );
};

export default UserList;  
