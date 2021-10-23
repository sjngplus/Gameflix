import axios from 'axios'
import { useEffect } from "react"

const ApiRequest = () => {

  useEffect(() => {
    const url = `http://localhost:3001/api/search`
    axios.get(url).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
    
  }, [])



  return (
    <div>
      Api Request Test
    </div>
  )
}

export default ApiRequest
