import { useState } from "react";
import { TitleContext } from "./TitleContext";
import { Credentials_favContext } from "./components/Credentials_favContext";

import Navbar from "./components/Navbar"
import Home from "./components/Home/Home";
import Fav from "./components/Fav/Fav";
import Landing from "./components/Landing";
import Add from "./components/Add/Add";



import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {
  const [title, setTitle] = useState("")
  const [isFavourite, setIsFavourite] = useState([]);
  const [credentials, setCredentials] = useState([]);


  const router = createBrowserRouter([
    {
      path: "/home",
      element: <><Navbar /><div className="flex flex-col flex-1 o gap-y-6">
        <Home />
      </div></>
    },
    {
      path: "/favorites",
      element: <><Navbar /><div className="flex flex-col flex-1  gap-y-6">
        <Fav />
      </div></>
    },
    {
      path: "/",
      element: <>
        <Landing />
      </>
    },
    {
      path: "/add",
      element: <><Navbar /><div className="flex flex-col flex-1  gap-y-6">
        <Add />
      </div></>

    }
  ])
  return (<>
    <div className="flex relative w-screen h-screen ">
      <div className="relative flex flex-col w-full h-full  bg-linear-to-br from-[#1a0532] via-[#081423] to-[#002233]">
        <Credentials_favContext.Provider value={{ isFavourite, setIsFavourite, credentials, setCredentials }}>

          <TitleContext.Provider value={{ title, setTitle }}>
            <RouterProvider router={router} />
          </TitleContext.Provider>

        </Credentials_favContext.Provider>
      </div>
    </div>
    
  </>
  )
}

export default App
