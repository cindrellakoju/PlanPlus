export const formatDate = (fullDate:Date):string=>{
    const year:number = fullDate.getFullYear();
    const month:string = fullDate.toLocaleString('default',{ month: 'short'});
    const date:number = fullDate.getDate();
    return `${date} ${month}, ${year}`
}

const today = new Date();
export const today_date = String(today.getDate());
export const today_day = today.toLocaleString('en-US',{ weekday:'short'})

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
