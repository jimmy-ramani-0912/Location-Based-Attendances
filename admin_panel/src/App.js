import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/list/UserList";
import SpecificUserDetail from "./pages/SpecificItemDetails/SpecificUserDetail";
import SpecificUserDetailEdit from "./pages/EditItems/SpecificUserDetailEdit";
import AddingUser from "./pages/AdingsItems/AddingUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Transaction from "./pages/Transactions/Transaction";
import Complain from "./components/extra/Complain";
import Suggestion from "./components/extra/Suggestion";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Home Component */}
            <Route index element={<Home />} />
            {/* Login Component */}
            <Route path="login" element={<Login />} />

            {/* Users Related Component */}
            <Route path="users">
              {/* Main Indec Componen */}
              <Route index element={<UserList />} />

              {/* SpecificUserDetail Component */}
              <Route path=":userId" element={<SpecificUserDetail />} />

              {/* SpecificUserEdit Component */}
              <Route path="edit/:userId" element={<SpecificUserDetailEdit />} />

              {/* Adding New User */}
              <Route
                path="newuser"
                // element={<New inputs={userInputs} title="Add New User" />}
                element={<AddingUser title="Add New User" />}
              />
            </Route>
            {/*route for complain*/}
            <Route path="complain" element={<Complain />}></Route>
            {/*route for suggestion*/}
            <Route path="suggestion" element={<Suggestion />}></Route>

            <Route path="transactions" element={<Transaction />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
