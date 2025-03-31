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
              <div className="sidebar-wrap">
                <Sidebar />
              </div>
            </div>
            <Sidebar />,
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
