export interface BaseResponse{
  success: boolean,
  message: string,
  data: [] | {}
}

export interface UniListItem{
  id : number,
  name : string,
  city : string,
  logo : string, 
}

export interface UniListRes extends BaseResponse{
  data: UniListItem[]
}
