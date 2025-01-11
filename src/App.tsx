import Router from 'components/Router';
import { Layout } from 'components/Rayout';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from 'firebaseApp';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const auth = getAuth(app);
  //init이 되었는지
  const [init, setInit] = useState<boolean>(false);
  //currentUser가 있으면 true, 없으면 false 반환하도록
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  //console.log(isAuthenticated);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        SetIsAuthenticated(true);
      } else {
        SetIsAuthenticated(false);
      }

      setInit(true);
    })
  }, [auth]); //auth값이 바뀔 때마다 호출될 수 있도록 설정
  return (
    <Layout>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : "loading"}
    </Layout>
  );
}

export default App;
