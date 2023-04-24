import React, { useState, useEffect } from 'react';
import { supabase } from "../client.jsx";
import { useOutletContext } from "react-router-dom";
import Cards from './Cards.jsx';

const ReadPosts = () => {

    const [posts, setPosts] = useState([]);

    const [filteredResults, setFilteredResults] = useOutletContext();

    const [orderBy, setOrderBy] = useState('created_at');

    useEffect(() => {
        const readPost = async () => {
            const {data, error} = await supabase.from("Footballfrenzy").select().is("parent", null).order(orderBy, { ascending: false });
            setPosts(data)
        } 
        readPost().catch(console.error)
    }, [orderBy]);

    const createPlayer = (event) => {
        event.preventDefault();
        window.location = "/CreatePosts"
    }
    
    return (
        <div className="App">
            {   (filteredResults.length > 0) || (posts.length > 0) ?
                <div className='order-by'>
                    <h4>Order by:</h4>
                    <button className="btn" onClick={() => setOrderBy('created_at')}>Newest</button>
                    <button className="btn" onClick={() => setOrderBy('upvotes')}>Most Popular</button>
                </div> :
                null
            }
            <div className='Card-container'>
                {
                    filteredResults && filteredResults.length > 0 ?
                    filteredResults.map((post, index) => 
                    <Cards key={post.id} id={post.id} created_at={post.created_at} title={post.title} content={post.content} image={post.image} upvotes={post.upvotes}/>
                    ) : 
                        posts && posts.length > 0 ? 
                        posts.map((post,index) => 
                        <Cards key={post.id} id={post.id} created_at={post.created_at} title={post.title} content={post.content} image={post.image} upvotes={post.upvotes}/>
                        ) : 
                        <div>
                            <h2>{'No Post has been made yet'}</h2>
                            <button className='btn' onClick={createPlayer}>Create One here!</button>
                        </div>
                }
            </div>
        </div>  
    )
}

export default ReadPosts;