import Router from 'components/Router';
import { Layout } from 'components/Rayout';
import { getAuth } from "firebase/auth";
import { app } from 'firebaseApp';
import { useState } from 'react';

function App() {
  const auth = getAuth(app);
  //currentUser가 있으면 true, 없으면 false 반환하도록
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  console.log(isAuthenticated);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
