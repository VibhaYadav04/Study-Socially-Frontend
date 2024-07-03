//isLoggedIn -> local storage me token ki detail hai toh bnda logged in h
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

//doLogin -> set data to local storage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout -> remove data from local storage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//getCurrentUserDetail -> jo bhi user log in hoga uska information mil jyega
export const getCurrentUserDetail = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data"))?.user;
  } else return undefined;
};

export const getToken=()=>{
  if(isLoggedIn()){
    return JSON.parse(localStorage.getItem("data")).token
  }
  else
  return null;
}
