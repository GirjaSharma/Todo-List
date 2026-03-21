export const getGroupedHistory=(historyTasks)=>{
    const groupedHistory = Object.groupBy(historyTasks, task => task.date);

    const historyArray = Object.entries(groupedHistory)
    .sort((a,b) => new Date(b[0]) - new Date(a[0]))
     .map(([date, tasks]) => ({
        date,
        tasks,
    }))
    return historyArray;
}