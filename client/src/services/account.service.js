import axios from 'axios';
const url = process.env.REACT_APP_URL



const  resetPassword = async ({token,password,confirmPassword})=> {
try{
    return await axios.post(`${url}/reset-password`, {token, password,confirmPassword})

 }catch(error){
     console.log(error)
 }

}

const validateResetToken = async (token)=> {
    try{ 
    return await axios.post(`${url}/validate-reset-token`, {token})

 }catch(error){

    console.log(error)
 }

}

export const accountService = {
    
    validateResetToken,
    resetPassword,
   
};
