import axios from 'axios';
import React, { useState } from 'react';

import { UniList, ResData } from './types/Objects'; 
import UniCard from './components/UniCard';

function App() {
  const [unis, setUnis] = useState<UniList[]>([{
    "name": "",
    "type": "",
    "city": "",
    "website": "",
    "address": "",
    "url": "",
  }])
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(true)
  const [data, setData] = useState<ResData>()

  React.useEffect(() => {
    axios
    .get("/api/university/universities", {
      headers:{
        Authorization: "Token 7309b0c25ba6ce392fdabf67d62a9c51a02d1fba432aebc7e7b8043530c59333"
      }
    })
    .then((res) => {
      if(res.status == 200){
        setUnis(res.data.data)
        setData(res.data.data)
        setReload(false)

      }
    })
    .catch(e =>{
      console.log(e)
      setError(true)
    });
  }, []);

  return (
    <>
      {!reload && unis.map((uni) =>(
        <UniCard title={uni.name} subtitle={uni.type} />
      ))}
    </>
  );
}

export default App;
