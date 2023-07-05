import React from 'react'

function JokeItem(props) {
    const {item,setCategory,setView}=props

    const onClickItem=()=>{
        setCategory(item)
        setView(true)
    }

  return (
    <li className=' bg-white md:h-[25vh] w-[60px] md:w-[230px] mx-[10px] md:mx-[20px]    my-[20px] flex flex-col justify-center items-center rounded-lg cursor-pointer' onClick={onClickItem}>
      <h1 className='text-[#1E3A8A] font-bold text-sm md:text-2xl capitalize'>{item}</h1>
      <p className='capitalize hidden  md:flex text-sm text-[#8321A8] mt-2'>unlimited jokes on {item} </p>
    </li>
  )
}

export default JokeItem