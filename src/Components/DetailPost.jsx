import React from 'react'
import { useState, useEffect, Components } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client.jsx'
import moment from 'moment'

const DetailPost = () =>  {
    let params = useParams();
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const [vote, setVote] = useState(0)
    const updateUpvotes = async (event) => {
        event.preventDefault();
        await supabase.from('Footballfrenzy').update({ upvotes: vote + 1 }).eq('id', params.id)

        setVote((vote) => vote + 1);
    }

    useEffect(() => {
        const checkPost = async () => {
            const {data, error} = await supabase.from("Footballfrenzy").select().eq("id", params.id);
            setPosts(data)
            setVote(data[0].upvotes)
        } 
        const checkComment = async () => {
            const {data, error} = await supabase.from("Footballfrenzy").select().eq("parent", params.id);
            setComments(data)
        }
        checkPost().catch(console.error)
        increaseVotes()
        checkComment().catch(console.error)
    }, [supabase]);

    const increaseVotes = () => {
        if (posts && posts.length > 0) {
            setVote(posts[0].upvotes)
        }
    }

    const updatePost = async (event) => {
      event.preventDefault();
      window.location = `/UpdatePost/${params.id}`
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase.from('Footballfrenzy').delete().eq('id', params.id);
        await supabase.from("Footballfrenzy").delete().eq("parent", params.id);

        alert("Your post has been successfully deleted")
        window.location = "/";
    }

    const updateComment = async (event) => {
        event.preventDefault();

        if (comment.length > 0) {
            await supabase.from("Footballfrenzy").insert({payload: comment, parent: params.id})
            console.log(comment)
        }
        
        window.location = `/DetailPost/${params.id}`
        alert("Your comment has been successfully added")
    }
  
    return ( 
        <div>
            <div className='detail-post'>
                {
                    (posts.length > 0) ? 
                    <div className='details'>
                        <p>Posted {moment.utc(posts[0].created_at).local().fromNow()}</p>
                        <h2>{posts[0].title}</h2>
                        <p >{posts[0].content}</p>
                        { posts[0].image ? <img src={posts[0].image} alt="Post-image" width="500px" height="300px" /> : null}
                        <div className='edits'>
                            <div className='upvote'>
                                <button onClick={updateUpvotes} className='upvote-btn'>👍 </button>
                                <p> {vote} upvotes</p>
                            </div>
                            <div className='edit'>
                                <button onClick={updatePost} className='upvote-btn'> 🖋️ </button>
                                <button onClick={deletePost} className='upvote-btn'> 🗑️ </button>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
            <div className='comment'>
                    {(comments.length > 0) ? 
                        comments.map((comment, index) => 
                        <div className='each-comment'>
                            <p>{comment.payload}</p> <br />
                        </div>
                        ) : null
                    }
                    <input className='text' type="text" placeholder='Leave a comment...' id="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button onClick={updateComment} className='btn comment-btn'> Leave Comment</button>
            </div>
        </div>
    );
  };
  
  export default DetailPost;