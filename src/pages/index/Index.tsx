import { Container } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SearchBar from "../../components/SearchBar";


const Index = () => {
  const [searchData, setSearchData] = useState<string[]>([])

  useEffect(()=>{
    axios
    .get('/api/university/universities', {
      headers:{
        Authorization: `Token ${localStorage.getItem('auth_token')}`
      }
    })
    .then((res)=>{
      if(res.status==200){
        setSearchData(res.data.data)
      }
    })
  },[])

  return (
    <>
    <Container size="sm" px="sm">
        
      <SearchBar data={[]} placeholder={"Üniversite Adı"} label={"Arama"} />

    </Container>
    </>
  );
}
 
export default Index;