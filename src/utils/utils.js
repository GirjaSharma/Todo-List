import {v4 as uuidv4} from 'uuid';

export const generateId = ()=> uuidv4();


export const getNow=()=> new Date();

export const formatHeaderdate=(date)=>{
    return date.toDateString();
}

export const formatTime=(date)=>{
    return date.toLocaleString()

}

export const getDayKey=(date= new Date())=>{
return date.toISOString().split("T")[0]
}

export const parseDayKey =(dayKey)=>{
    const [year, month, day] = dayKey.split("-")
    return new Date(year, month-1, day)
}