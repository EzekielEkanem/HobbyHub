import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { supabase } from "../client.jsx";

const UpdatePost = () => {
    let params = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const readPost = async () => {
            const {data, error} = await supabase.from("Footballfrenzy").select().eq("id", params.id);
            setPosts(data)
        } 
        readPost().catch(console.error)
    }, [supabase]);

    const updatePost = async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('img').value;

        const post = {
            title: title,
            content: content,
            image: image
        }

        await supabase.from('Footballfrenzy').update({ title: post.title, content: post.content, image: post.image })
        .eq('id', params.id);

        alert("Your Player has been successfully updated")
        window.location = `/Detailpost/${params.id}`;
    }

    return (
        <div>
            <h3>Current Post Info:</h3>
            {posts.length > 0 ? 
                <div className='create-post'>
                    <input className='text' type="text" id="title" name="title" placeholder='Title' value={posts[0].title} onChange={(e) => setPosts(posts[0].title = e.target.value)} /> <br />
                    <textarea name="content" id="content" cols="25" rows="25" placeholder='Content (Optional)' value={posts[0].content} onChange={(e) => setPosts(posts[0].content = e.target.value)} ></textarea> <br />
                    <input className='text' type="text" id="img" name="img" placeholder='Image URL (Optional)' value={posts[0].image} onChange={(e) => setPosts(posts[0].image = e.target.value)} /> <br />
                    <button className='btn' onClick={updatePost}>Update Post</button>
                </div> : 
            null}
        </div>
    )
}

export default UpdatePost;