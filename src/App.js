// Chakra UI Provider
import { ChakraProvider,Spinner,Container } from "@chakra-ui/react";

// Importing the Auth Context
import { authContext } from "./context/AuthContext";

// Importing the Pages
import HomePage from "./pages/HomePage";
import AddPGPage from "./pages/AddPGPage";
import ProfilePage from "./pages/ProfilePage";
import EditPGPage from "./pages/EditPGPage"

// Importing the Components
import Navbar from "./components/Navbar";


// Basic Imports
import { useState,useEffect } from "react";

// Router Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

function App() {
  const [user, setUser] = useState(null);

  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } 
        setIsLoading(false);
    });

  });

  return (
    <ChakraProvider>
      {isLoading ?
      <Container centerContent>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Container>
      : (
      <authContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<HomePage />} />

            <Route
              path={"/admin/add"}
              element={
                <ProtectedRoute>
                  <AddPGPage />
                </ProtectedRoute>
              }
            />

            <Route
              path={"/admin/profile"}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path={"/admin/edit/:id"}
              element={
                <ProtectedRoute>
                  <EditPGPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </authContext.Provider>
      )}
    </ChakraProvider>
  );
}

export default App;
