export const formatDate = (fullDate:Date):string=>{
    const year:number = fullDate.getFullYear();
    const month:string = fullDate.toLocaleString('default',{ month: 'short'});
    const date:number = fullDate.getDate();
    return `${date} ${month}, ${year}`
}