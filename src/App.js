import { ToastProvider } from "react-toast-notifications";
import ApiProvider from "./components/ApiProvider";
import Dashboard from "./pages/Dashboard";
import "./main.css";
import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <>
      <ToastProvider placement="top-right" autoDismiss>
        <ApiProvider />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />

            {/* <Route path="/adduser">
            <Dashboard />
          </Route> */}
            <Route path="/edituser" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
}

export default App;
