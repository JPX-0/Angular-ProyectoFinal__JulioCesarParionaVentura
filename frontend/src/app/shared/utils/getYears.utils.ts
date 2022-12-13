export const getYears = (date: Date | string): { _myTime: number, _currentTime: number } => {
  let md = {
    day: +(new Date(date).getDate()),
    month: +(new Date(date).getMonth()),
    year: +(new Date(date).getFullYear())
  };
  let cd = {
    day: +(new Date(Date.now()).getDate()),
    month: +(new Date(Date.now()).getMonth()),
    year: +(new Date(Date.now()).getFullYear())
  };
  if(md.day > cd.day) md.month++;
  if(md.month > cd.month) md.year++;
  return { _myTime: md.year, _currentTime: cd.year }
}