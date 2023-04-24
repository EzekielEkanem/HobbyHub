import React from 'react';
import { useState } from 'react';
import { supabase } from "../client.jsx";

const CreatePosts = () => {

    const createTitle = async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('img').value;;

        const post = {
            title: title,
            content: content,
            image: image
        }
        
        await supabase
        .from('Footballfrenzy')
        .insert(post)
        .select();

        alert("Your Post has been successfully created")
        window.location = "/"
    }

    return (
        <div className='create-post'>
            <input className='text' type="text" id="title" name="title" placeholder='Title' /> <br />
            <textarea name="content" id="content" cols="25" rows="25" placeholder='Content (Optional)' ></textarea> <br />
            <input className='text' type="text" id="img" name="img" placeholder='Image URL (Optional)' /> <br />
            <button className='btn' onClick={createTitle}>Create Post</button>
        </div>
    )
}

export default CreatePosts;