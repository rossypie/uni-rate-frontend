import { Container } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { HeaderMegaMenu } from '../../layouts/header/Navbar';
import SearchBar from '../../components/SearchBar';

import { UniListRes } from '../../types/Responses'

const Index = () => {

  const [uniData, setUniData] = useState<UniListRes>({
    success : true,
    message : "",
    data: [
      { id:5, name:"Erzurum Teknik Üniversitesi", city:"Erzurum", logo:"https://erzurum.edu.tr/Content/etugeneldosyalar/0c1eed6a-e2af-4604-8a19-0bac26250f08.jpg"},
      { id:5, name:"Eskişehir Osmangazi Üniversitesi", city:"Eskişehir", logo:"https://smyo.ogu.edu.tr/Storage/smyo/Uploads/ce3b3d532bc46b89a9b6dac7adccfd37.jpg"},
      { id:5, name:"İstanbul Medipol Üniversitesi", city:"İstanbul", logo:"https://www.medipol.edu.tr/sites/default/files/2022-07/Arma_01_Eng.png"},
      { id:5, name:"Sakarya Üniversitesi", city:"Sakarya", logo:"https://www.sakarya.edu.tr/kutuphane/download/logo/dikeylogo.png"},
      { id:5, name:"Karabük Üniversitesi", city:"Karabük", logo:"https://www.karabuk.edu.tr/wp-content/uploads/2019/08/baykus.jpg"},
    ]
  })

  return (
    <>
    <HeaderMegaMenu />
    <Container size="sm" px="sm">
      <SearchBar data={uniData?.data || []} placeholder={"Üniversite Adı"} label={"Arama"} />
    </Container>
    </>
  );
}
 
export default Index;