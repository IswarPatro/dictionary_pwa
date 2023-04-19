
import './App.css'

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Show from './Show'
import Defs from './Defs'

import { BsFillVolumeUpFill } from "react-icons/bs";
import {Howl} from 'howler'

const App = () => {
  const [src, setSrc] = useState()
  const [word, setWord] = useState()
  const [ant, setAnt] = useState([])
  const [def, setDef] = useState([])
  const [syn, setSyn] = useState([])

  const getData = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      console.log(data.data)
      setSrc((data.data[0].phonetics[0].audio))
      // console.log(src)
      // console.log(data.data[0].meanings[0].definitions[0].definition)

      {
        data.data.map((i) => (
          i.meanings.map((it) => (
            setAnt(it.antonyms),
            setSyn(it.synonyms),
            setDef(it.definitions)
          ))
        ))
      }


      // console.log(ant)
      // console.log(defs)

    } catch (error) {
      console.log(error)

    }

  }

  const soundPlay = (src)=>{
    const sound = new Howl ({
      src,
      html5: true
    })
    sound.play()
  }

  useEffect(() => {
    getData()
    // console.log(word)
  }, [word])
// please like karo


  return (
    <div className='main' style={{marginTop:"65px"}}>
      <div className='heading'>
        <h1 className='text-5xl font-bold text-white' >Dictionary</h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="m-10 xl:w-96">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded border border-solid border-white-600 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-white-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-white-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200 text-white"
                placeholder="Search a word"
                aria-label="Search"
                aria-describedby="button-addon1"
                
                onChange={(e) => {
                  setWord(e.target.value)
                }}
              />
              
            </div>
            <button style={{fontSize: "2.5rem", marginTop: "3rem",color:"white"}} onClick={() => {
                soundPlay(src)
                setTimeout(() => {
                }, 800);
              }}><BsFillVolumeUpFill /></button>
          </div>
          
        </div>
      </div>

      <span style={{margin:"9rem", color:"white", fontSize:"1.5rem"}}>Meanings</span>
      <span style={{margin:"7rem 7rem", color:"white", fontSize:"1.5rem"}}>Synonyms</span>
      <span style={{margin:"9rem", color:"white", fontSize:"1.5rem"}}>Antonyms</span>

      <div className="results container ">
      


        <div className='defns container grid place-items-start' style={{
          border: "2px solid white", 
          color: "white",
          borderRadius: "10px",
          margin: "5px 5px 2rem",
          padding: "2rem",
        }}>
          <Defs defs={def} />
        </div>

        <div className='defns container grid place-items-start' style={{
        border: "2px solid white", 
        color: "white",
        borderRadius: "10px",
        margin: "5px 5px 2rem",
        padding: "2rem",
        
        }}>
          {syn.map((i) => (
            <Show name={i} />
          ))}
        </div>

        <div className='defns container grid place-items-start' style={{
        border: "2px solid white", 
        color: "white",
        borderRadius: "10px",
        margin: "5px 5px 2rem",
        padding: "2rem"}}>
          {ant.map((i) => (
            <Show name={i} />
          ))}
        </div>
      </div>


    </div>


  )
}

export default App
