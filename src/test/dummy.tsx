import { useEffect } from "react"

interface DummyProps {
    tablename: string;
    urlname: string;
  }
  
  export const Dummy = ({ tablename, urlname }: DummyProps) => {
    useEffect(()=> {
        console.log(tablename)
    })
    return(
        <>sjdksnnsdkj</>
    )
}
export default Dummy