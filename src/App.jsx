import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useState } from "react";

const myContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
                <Sidebar />
                <Dashboard />
            </div>
          </section>
        </>
      ),
    },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <myContext.Provider value={values}>
      <RouterProvider router={router} />
    </myContext.Provider>
  );
}

export default App;

export { myContext };
