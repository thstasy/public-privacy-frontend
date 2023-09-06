import React, { useContext, useEffect } from "react";
import AuthContext from "./shared/AuthContext.js";


const TestComponent = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.AccessDashboard();
  }, []);

  return (
    <div>
      <h1>Test Component</h1>
      <div>
        <h2>Drafts by User</h2>
        <pre>{JSON.stringify(authContext.draftsByUser, null, 2)}</pre>
      </div>
      <div>
        <h2>Opinions by User</h2>
        <pre>{JSON.stringify(authContext.opinionsByUser, null, 2)}</pre>
      </div>
    </div>
  );
};


export default TestComponent;
