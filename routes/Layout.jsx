import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { supabase } from "../src/client.jsx";
import { Input } from "semantic-ui-react";

const Layout = () => {
    const [posts, setPosts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const readPost = async () => {
            const {data, error} = await supabase.from("Footballfrenzy").select().is("parent", null);
            setPosts(data)
        } 
        readPost().catch(console.error)
    }, [supabase]);

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
          const filteredData = posts.filter((post) => 
            (post.title.toLowerCase()
              .includes(searchValue.toLowerCase()))
          )
          setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts)
        }
    };

    return (
        <div>
            <div className="topbar">
                <header className="logo">
                    FootballFrenzy
                </header>
                <div className="search-div">
                    <input className='searchbar' type="text" placeholder="Search Post..." 
                    onChange={(inputString) => searchItems(inputString.target.value)}/>
                </div>
                <nav className="navbar">
                    <ul>
                        <li className="nav-links">
                            <Link 
                                style={{color: "rgba(244, 7, 7, 0.696)"}}
                                to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-links">
                            <Link 
                                style={{color: "rgba(244, 7, 7, 0.696)"}}
                                to="/CreatePosts">
                                Create New Post
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet context={[filteredResults, setFilteredResults]}/>
        </div>
    )
}

export default Layout;