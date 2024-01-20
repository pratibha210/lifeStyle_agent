
const isDev =()=>{
    if(process.env.NODE_ENV=='production')
    return false;
    else
    return true;
}
export const __DEV = isDev();