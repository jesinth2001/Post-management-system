import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dialog = (props) => {

const [comments,setComments]=useState();

useEffect(() =>
{
const getComment=async() =>
{ 
const comment= await axios.get("https://jsonplaceholder.typicode.com/posts/post_id/comments")
setComments(comment.data)
console.log(comment)
}
getComment()
},[])

const contentToRender =()=>
{
    if(comments && comments.length==0)
    {
        return "No comments"
    }
    else{
        return "Comments"
    }
   
}

const handleRemove =(dialogbox)=>
{
    
    dialogbox.current.classList.remove("openDialog")
}
  return (
    <div class={props.className} ref={props.dialogbox}>
        <div className='comment-title'>
            <span>comments</span>
            <span onClick={()=>{handleRemove(props.dialogbox)}}>✕</span>
        </div>
        <div className='comment-section'>
        {
            contentToRender()
        }
        </div>
       
    </div>
  )
}

export default Dialog