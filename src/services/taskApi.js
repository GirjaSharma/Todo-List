// const BASE_URL = 'http://localhost:8000/tasks'

const BASE_URL = import.meta.env.VITE_API_URL

export async function getTasks(){
    try{
        const response=   await fetch(BASE_URL);
      
        if(!response.ok){
            throw new Error('Failed to fetch tasks')
        }
          const data = await response.json();
         return data;
        }
          
    catch(err){
            console.error(err)
        }  
}


export async function postTask(newTaskData){
    try{
        const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskData)
      
        });
        console.log("new task Data before post call", newTaskData);
        if(!response.ok){
            throw new Error('Network response was not ok.')
        }
        const data= await response.json();
        console.log("response Data from post call", data);
        return data;
    }catch(error){
        console.error("There was an error with the POST request");
        throw error;
    }    

}


export async function updateTask(id, updates){
    try{
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates)
        })
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error)
        throw error;
    }
}


export async function deleteTask(id){
    try{
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
       
    })
     if(!response.ok){
            throw new Error('Failed to fetch tasks')
        }
    const data= await response.json();
    console.log(data);
    return data;
    }
    catch(error){
        console.error(error)
        throw error;
    }
}
