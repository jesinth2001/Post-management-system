import  { useEffect, useRef } from 'react'
import "./header.css"
import { Button } from '@mui/material'
import valueProvider from './valueProvider'
import { useContext } from 'react'

const Header = () => {

    const [search,setSearch]=useContext(valueProvider)
    const myref = useRef();

const handleClick= () => {
    localStorage.setItem('search',myref.current.value)
    
}

useEffect(() => {
    myref.current.value=search;
},[search])

  return (
    <div className='header' >
        <input ref={myref} type='text' placeholder='search post here...' onChange={(e)=>{setSearch(e.target.value)}}></input>
        <button onClick={handleClick}>Search</button>
    </div>
  )
}

export default Header