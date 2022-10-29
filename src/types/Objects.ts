export interface UniList{
  name : string,
  type : string ,
  city : string ,
  website : string ,
  address : string ,
  url : string ,
}

export interface ResData {
  status: Number,
  success: boolean,
  message: string,
  data: UniList[]
}