import axios from 'axios'
import { useEffect } from "react"

const ApiRequest = () => {

  useEffect(() => {
    const url = `http://localhost:3001/api/search/games?title=batman&steamAppID=35140&limit=60&exact=0`
    axios.get(url)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))    
  }, [])

  return (
    <div>
      Api Request Test
    </div>
  )
}

export default ApiRequest
