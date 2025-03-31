import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <div className="sidebar-wrap w-[20%]">
                <Sidebar />
              </div>
              <div className="content-wrap w-[80%] py-4 px-5">
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
