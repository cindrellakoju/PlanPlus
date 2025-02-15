import React from 'react'
import TopPriority from '../toppriority/TopPriority'
import ToDo from '../todo/ToDo'


export const FirstRow:React.FC =() =>{
  const style:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "20px"
  }
  return (
    <div style={style}>
        <TopPriority/>
        <ToDo/>
    </div>
  )
}
