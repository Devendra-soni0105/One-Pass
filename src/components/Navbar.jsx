import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { TitleContext } from "../TitleContext";


import HomeIcon from "../icons/home.svg?react";
import AddIcon from "../icons/add.svg?react";
import FavIcon from "../icons/star.svg?react";
import LogoutIcon from "../icons/logout.svg?react";



const Navbar = () => {
    const location = useLocation();
    const { setTitle } = useContext(TitleContext);



    useEffect(() => {
        switch (location.pathname) {
            case "/home":
                setTitle("Home");
                break;
            case "/favorites":
                setTitle("Favorites");
                break;
            case "/add":
                setTitle("Add");
                break;
            default:
                setTitle("Welcome");
        }
    }, [location.pathname]);


    return (


        <div className="flex justify-between text-white px-13 py-5   backdrop-blur-3xl z-30 shadow-[0_0_20px_4px_rgba(0,180,255,0.35)] border border-white/20 bg-[#0a334459] ">
            <div className="text-5xl font-extrabold tracking-wide bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">OnePass</div>
            <div>
                <ul className='flex flex-row gap-x-5 '>

                    <li className="flex justify-center items-center p-1">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive
                                    ? "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#6649BD] bg-[#253964] shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]"
                                    : "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#848388] bg-white/10"
                            }
                        >
                            <HomeIcon className="w-9 h-9" />
                            <div>Home</div>
                        </NavLink>
                    </li>

                    <li className='flex justify-center items-center p-1'>
                        <NavLink to="/favorites" className={({ isActive }) =>
                                isActive
                                    ? "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#6649BD] bg-[#253964] shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]"
                                    : "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#848388] bg-white/10"
                            }>
                            <FavIcon className='w-9 h-9 ' />
                            <div>Favorites</div>
                        </NavLink>
                    </li>

                    <li className='flex justify-center items-center p-1'><NavLink to="/add" className={({ isActive }) =>
                                isActive
                                    ? "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#6649BD] bg-[#253964] shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]"
                                    : "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#848388] bg-white/10"
                            }>
                        <AddIcon className='w-9 h-9 ' />
                        <div>Add</div>
                    </NavLink></li>

                    <li className='flex justify-center items-center p-1'><NavLink to="/" className={({ isActive }) =>
                                isActive
                                    ? "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#6649BD] bg-[#253964] shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]"
                                    : "hover-button-glass button-glass flex items-center justify-center gap-2 text-[#848388] bg-white/10"
                            }>
                        <LogoutIcon className='w-9 h-9 ' />
                        <div>Logout</div>
                    </NavLink></li>

                </ul>
            </div>
        </div>

    )
}

export default Navbar