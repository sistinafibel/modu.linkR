export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const isEmpty = (value : any) : boolean =>{
  if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ 
    return true 
  }else{ 
    return false 
  } 
};

export const randomId = (): string => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( let i=0; i < 7; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

