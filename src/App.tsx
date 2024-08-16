import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import UserList from "./containers/UserList";
import UserDetail from "./containers/UserDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/detail" element={<UserDetail isCreateMode={false} />} />
        <Route path="/create" element={<UserDetail isCreateMode={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
