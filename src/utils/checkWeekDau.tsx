export const checkWeekDay = (tablename : string)  => {
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ];
      const isWeekday = daysOfWeek.includes(tablename);
      return isWeekday
}