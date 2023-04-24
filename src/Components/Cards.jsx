import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { supabase } from '../client.jsx'


const Cards = (props) =>  {
    const date = moment.utc(props.created_at).local().fromNow()

  return (
    <div>
        <Link style={{color: "black"}} to={`/DetailPost/${props.id}`}>
            <div className="Card">
                <p>Posted <span>{date}</span></p> 
                <h3><span>{props.title}</span></h3> 
                <p>{props.upvotes} upvotes</p> 
            </div>
        </Link>
    </div>
  );
};

export default Cards;