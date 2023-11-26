import React, { useState, useEffect } from 'react';
import './Home.css';
import Loading from './Loading';

function Home() {

  const [cards, setCards] = useState([]) 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const getData = async() => {
        const fetchData = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`)
        const response  = await fetchData.json();
        setCards(prev => [...prev, ...response]);
        setLoading(false);
      }
    getData();
  },[page])

  useEffect(()=>{

    const handleInfiniteScroll = async() => {

        // console.log("Scroll Height: ", document.documentElement.scrollHeight);
        // console.log("Inner Height: ", window.innerHeight);
        // console.log("Scroll Top: ", document.documentElement.scrollTop)
    
        // window.innerHeight returns the inner height of the window (the height of the browser window's viewport), in pixels.
        // document.documentElement.scrollTop returns the number of pixels that the document has been scrolled vertically.
    
        // The inner height of the window is the height of the viewable area of the webpage, which is the height of the browser 
        // window's viewport. The scroll height is the total height of the webpage, including any content that extends beyond the 
        // viewable area and requires scrolling to see.
    
        // So, window.innerHeight is the height of the viewport, document.documentElement.scrollTop is the number of pixels the 
        // document has been scrolled, and document.documentElement.scrollHeight is the height of the entire document.
    
        try{
            if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
                setLoading(true)
                setPage(prev=>prev+1)
            }
    
        }catch(error){
            console.log(error)
        }
      }

    window.addEventListener("scroll", handleInfiniteScroll)

    return () => {
        window.removeEventListener("scroll", handleInfiniteScroll)
    }
  },[])


  return (
    <div className="home">
        {cards.map((item)=>{
            return (
                <div key={item.id} className="card">
                    <h2>{item.id}</h2>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                </div>
                )
        })}
        {loading ? <Loading/> : null}
    </div>
  )
}

export default Home