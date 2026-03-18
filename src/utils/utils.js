import {v4 as uuidv4} from 'uuid';

export const generateId = ()=> uuidv4();


export const getNow=()=> new Date();

export const formatHeaderdate=(date)=>{
    return date.toDateString();
}

export const formatTime=(date)=>{
    return date.toLocaleString()

}

export const getDayKey=(date)=>{
const year = date.getFullYear();
const month = String(date.getMonth()+1).padStart(2,"0");
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`
}

export const parseDayKey =(dayKey)=>{
    const [year, month, day] = dayKey.split("-")
    return new Date(year, month-1, day)
}


export const getOnlyTime=(date)=>{
    const dateObj = new Date(date);

    const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();

    return formattedTime;
}