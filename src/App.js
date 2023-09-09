
import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import {FaTrashCan} from "react-icons/fa6"
import Header from './Header';
import valueProvider from './valueProvider';
import Dialog from './Dialog';



function App() {

  const [posts,setPosts] = useState();
  const [search,setSearch] = useState("");
  const dialogbox=useRef();


  useEffect(()=>
  {
    const getdata = async ()=>
    {
    try {
      const {data} =await axios.get("https://jsonplaceholder.typicode.com/posts")
      setPosts(data)
      console.log(data)
  
    }
    catch(err)
    {
      console.log(err);
    }
  }
  getdata()
  },[])



  useEffect(()=>{
    const d =localStorage.getItem("search")
    setSearch(d)
  },[])

const handleClick = ()=>{
  dialogbox.current.classList.add("openDialog")
}


const handleDelete =async(id) =>
{

  try{
    //await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const deletepost= posts.filter ((post) =>
    post.id!==id)
    setPosts(deletepost)
    alert('Delete successfully');
  
  }
  catch(err){
    console.log(err)

  }
}
 


  


  return (
    <div >
      <valueProvider.Provider value={[search,setSearch]}>
      <Header></Header>
      <Dialog className='dialogbox' dialogbox={dialogbox}></Dialog>
  
      <div className='App'>
      {
       posts&& posts.filter( j => j.title.includes(search)).map(i =>
          {
            return(<Card sx={{maxWidth:"30%",height:"250px",borderRadius:"10px",cursor:"pointer",bgcolor:"#222",color:"white"}} 
                 className='card'  key={i.id}>

              <CardHeader sx ={{textTransform:"capitalize"}} 
               avatar={
                  <Avatar sx={{bgcolor:red[600]}}>{i.userId} </Avatar>
               } 
               title={i.title}>
              </CardHeader>

                <CardContent   onClick={handleClick} >
                   <Typography>
                     {i.body}
                   </Typography>
                </CardContent>


                <CardActions sx={{justifyContent:"space-between"}}>
                         <IconButton><FaTrashCan size={15} color='white' onClick={()=>{handleDelete(i.id)}}/></IconButton>
                </CardActions>

                </Card>)
          })
      }
      </div>
      </valueProvider.Provider>
    </div>
  );
}

export default App;
