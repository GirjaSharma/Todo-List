import {v4 as uuidv4} from 'uuid';

export const generateId = ()=> uuidv4();


export const getNow=()=> new Date();

export const formatHeaderdate=(date)=>{
    return date.toDateString();
}

export const formatTime=(date)=>{
    return date.toLocaleString()
    //     [],{
    //     hour:"2-digit",
    //     minute: "2-digit"
    // }

}

export const getDayKey=(date= new Date())=>{
return date.toISOString().split("T")[0]
}