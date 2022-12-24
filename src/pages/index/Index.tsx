import { Container } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

import SearchBar from "../../components/SearchBar";
import { HeaderMegaMenu } from '../../layouts/header/Navbar';


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
    <HeaderMegaMenu />
    <Container size="sm" px="sm">
        
      <SearchBar data={[]} placeholder={"Üniversite Adı"} label={"Arama"} />

    </Container>
    </>
  );
}
 
export default Index;