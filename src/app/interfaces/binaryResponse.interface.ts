export interface binaryResponse{
  ok?:boolean,
  msg?:string,
  errors?:error[]
}
export interface error{
  value: string;
  msg: string;
  param: string;
  location: string;
}
