import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./Utils/appStrore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
export default 
function App() {
  return (
 <>
 <Provider store={appStore}>
 <BrowserRouter basename="/" >
 <Routes>
         <Route path="/" element={<Body />} >
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
  </Route>
 </Routes>
 </BrowserRouter>
 </Provider>
    </>
  )
}
