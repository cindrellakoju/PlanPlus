import React from 'react'
import TopPriority from '../toppriority/TopPriority'
import ToDo from '../todo/ToDo'
import BucketList from '../bucketlist/BucketList'
import Schedule from '../schedule/Schedule'
import Money from '../money/Money'
import ToBuy from '../tobuy/ToBuy'



export const FirstRow:React.FC =() =>{
  const style:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px"
  }
  return (
    <div style={style}>
        <TopPriority/>
        <ToDo/>
        <BucketList/>
        <Schedule/>
        <Money/>
        <ToBuy/>
    </div>
  )
}
