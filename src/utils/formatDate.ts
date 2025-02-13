export const formatDate = (fullDate:Date):string=>{
    const year:number = fullDate.getFullYear();
    const month:string = fullDate.toLocaleString('default',{ month: 'short'});
    const date:number = fullDate.getDate();
    return `${date} ${month}, ${year}`
}

export function getWeekDates(): string[] {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay(); // Adjust the date to the start of the week
    const startOfWeek = new Date(today.setDate(firstDayOfWeek));
    const weekDates: string[] = [];

    for(let i=0; i<7; i++){
        const date = Number(startOfWeek.getDate())+i
        weekDates.push(`${date}`)
    }
    return weekDates;
}
