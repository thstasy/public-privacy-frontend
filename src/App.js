import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.js";
import OpinionsList from './components/OpinionsList.js';
import NotFound from './components/NotFound.js';
import OpinionDetails from './components/OpinionDetails.js';
import AddOpinion from "./components/AddOpinion.js";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import About from "./components/About.jsx";
import SelectedReferences from "./components/SelectedReferences.js";
import Dashboard from "./components/Dashboard.js"
import { AuthContextProvider } from "./components/shared/AuthContext.js";
import {Route, Routes } from "react-router-dom";
import DeleteAccount from "./components/DeleteAccount.js"
import ResetPassword from "./components/ResetPassword.js"
import ToCollaborators from "./components/ToCollaborators.js";
import Popup from "./Popup.js";
import EnterPwd from "./components/EnterPwd.js";
import AddDraft from "./components/AddDraft.js"; 
import DraftDetails from "./components/DraftDetails.js";
import TestComponent from "./components/TestComponent.js";
import GlobeVisualization from "./components/GlobeVisualization.js";

function App() {

  return (

    <AuthContextProvider>
        <div>
          <Popup/>
          <Navbar />
          <div>
            <Routes> 
              <Route path="/" element={<About />} />             
              <Route path="/about" element={<About />} />
              <Route path="/selected-references" element={<SelectedReferences />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/collaborator" element={<ToCollaborators />} />
              <Route path="/collaborator/dashboard" element={<Dashboard />} />
              <Route path="/collaborator/deleteAccount" element={<DeleteAccount />} />
              <Route path="/collaborator/resetPassword1" element={<ResetPassword />} />
              <Route path="/collaborator/enter-new-password" element={<EnterPwd />} />
              <Route path="/collaborator/register" element={<Register />} />
              <Route path="/collaborator/login" element={<Login />} /> 
              <Route path="/collaborator/logout" element={<Logout />} />
              <Route path="/forum/opinions" element={<OpinionsList />} />

              <Route path="/globe-visualization" element={<GlobeVisualization />} />
              <Route path="/forum/opinions" element={<OpinionsList />} />
              <Route path="/forum/test-component" element={<TestComponent />} />

              <Route path="/forum/drafts/add" element={<AddDraft />} />
              <Route path="/forum/drafts/edit/:id" element={<AddDraft />} />
              <Route path="/forum/drafts/:id" element={<DraftDetails />} />

              <Route path="/forum/opinions/add" element={<AddOpinion />} />
              <Route path="/forum/opinions/edit/:id" element={<AddOpinion />} />
              <Route path="/forum/opinions/:id" element={<OpinionDetails />} />
            </Routes>
          </div>
        </div>
    </AuthContextProvider>
  );
}

export default App;

