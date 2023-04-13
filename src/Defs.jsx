import React from 'react'

const Defs = ({defs}) => {
  return (
    <>
        {defs.map((it)=>(
            <li>{it.definition}</li>
        ))}
    </>
  )
}

export default Defs