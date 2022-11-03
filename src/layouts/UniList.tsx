import { useState } from "react";
import { Loader } from '@mantine/core';
import axios from 'axios';

import { UniListObject } from "../types/Objects";

const UniList = () => {
  const [unis, setUnis] = useState<UniListObject[]>([{
    "name": "",
    "type": "",
    "city": "",
    "website": "",
    "address": "",
    "url": "",
  }])
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(true)

  return ( 
    <>
    </>
  );
}
 
export default UniList;