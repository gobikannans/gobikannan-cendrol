import React,{useState,useEffect} from 'react'
import JokeItem from '../JokeItem'
import { TailSpin } from 'react-loader-spinner'
import {AiOutlineClose} from "react-icons/ai"
import "./index.css"

const url="https://api.chucknorris.io/jokes/categories"

const apiStatusJokesConstants={
    initial:"INITIAL",
    success:"SUCCESS",
    loading:"LOADING",
    failure:"FAILURE"
}


const apiStatusHomeConstants={
    initial:"INITIAL",
    success:"SUCCESS",
    loading:"LOADING",
    failure:"FAILURE"
}


function Home() {
    const [apiJokeStatus,setJokeStatus]=useState(apiStatusJokesConstants.initial)
    const [apiHomeStatus,setHomeStatus]=useState(apiStatusHomeConstants.initial)

    const [category,setCategory]=useState("undefined")
    const [homeData,setHomeData]=useState([])
    const [jokeData,setJokeData]=useState([])

    const [view,setView]=useState(false)


    //fetching category url
    const fetchedData=async()=>{
        setHomeStatus(apiStatusHomeConstants.loading)
        try{
            const fetchedData= await fetch(url)
            const res=await fetchedData.json()
            setHomeData(res)
            setHomeStatus(apiStatusHomeConstants.success)
        }catch(error){
            console.log(error)
        }
    }

    //fetching jokes url and add category keyword to fetch data
    const fetchJokeData=async()=>{
        const jokeUrl=`https://api.chucknorris.io/jokes/random?category=${category}`

        setJokeStatus(apiStatusJokesConstants.loading)

        try{
            const response= await fetch(jokeUrl)
            const data= await response.json()
            setJokeData(data)
            setJokeStatus(apiStatusJokesConstants.success)
        }catch(error){
            console.log(error)
        }
    }


    //useEffect hooks to mount the component
    //Mount Home data
    useEffect(()=>{
        fetchedData()
      
    },[])

    //Mount joke Data
    useEffect(()=>{
       if(view){ 
        fetchJokeData()
    } 
    // eslint-disable-next-line
    },[category,view])

    
  
    //render successfull Joke View
    const renderSuccessfullJokeData=()=>{
        return(
            <p className='text-blue-200 text-lg md:text-xl font-semibold md:font-bold'>"{jokeData.value}"</p>
        )
    }

    //render Joke loading view
    const renderLoadingJokeData=()=>{
        return(
            <div>
                <TailSpin  height="80" 
                width="80"
                color="#DBEAFE"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
        )
    }

    const renderJokeApiStatus=()=>{
        switch(apiJokeStatus){
            case apiStatusJokesConstants.success:
                return renderSuccessfullJokeData()
            case apiStatusJokesConstants.loading:
                return renderLoadingJokeData()
            default:
                return null        
        }
    }


    //Home data loading api, success api and render home data

    //render Home loading View
    const renderHomeLoadingData=()=>{
        return(
            <div className='h-[100vh]'>
                <TailSpin  height="80" 
                width="80"
                color="#DBEAFE"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
        )
    }

    //render home view
    const renderHomeSuccessData=()=>{
        return(
            <>
            <h1 className='animate-bounce text-green-500 font-bold text-[40px]'>Chuck Norries</h1>
        <ul className='p-0 grid lg:grid-cols-4 md:grid-cols-2  grid-cols-4  text-white text-lg  md:w-fit md:gap-y-2 '>
            {homeData.map((eachItem)=>
                <JokeItem key={eachItem} item={eachItem}  setView={setView} setCategory={setCategory}/> )}
        </ul>
       {view?
        <div className='absolute bg-gradient-to-r mt-5 md:mt-0 from-slate-500  to-slate-800 top-80 rounded-lg  py-6 px-10 w-[100%] md:w-[40vw]'>
            <AiOutlineClose className='right-5 top-5 text-2xl text-white absolute cursor-pointer' onClick={()=>setView(false)}/>
            <h1 className='text-white capitalize text-3xl font-bold'>{category}</h1>
            <div className='border-black border-solid border-[1px] py-5 px-3 mt-3 flex flex-col items-center'>
                {renderJokeApiStatus()}
                <button className='bg-blue-600 w-[100px] lg:w-[250px] mt-4 rounded-md font-bold py-3' onClick={fetchJokeData} >
                    Next Joke
                </button>
            </div>
        </div>:""}
        </>
        )
    }

    //render home api status
    const renderHomeApiStatus=()=>{
        switch(apiHomeStatus){
            case apiStatusHomeConstants.success:
                return renderHomeSuccessData()
            case apiStatusHomeConstants.loading:
                return renderHomeLoadingData()
            default:
                return null        
        }
    }

  return (
    <div className='max-md:h-[100vh]  bg-gradient-to-r from-blue-400 to-slate-600 py-10 flex flex-col  items-center'>
        {renderHomeApiStatus()}
    </div>
  )
}

export default Home