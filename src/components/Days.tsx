
interface DaysProps{
    year:number,
    month:number
}
export const Days=({year,month}:DaysProps)=>{
     
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    const todayDate=new Date();

    const isToday=(day: Date)=>
      day.getDate()===todayDate.getDate() &&
      day.getMonth()===todayDate.getMonth() &&
      day.getFullYear()===todayDate.getFullYear();
      
    return <div className="grid grid-cols-12">
        <div className="grid col-span-2 border"></div>
        <div className="grid col-span-10">

        <div className="flex flex-col">
          <div className="flex h-12">
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-w-[80px] border p-2 text-sm text-center ${isToday(day) ? 'bg-blue-500 rounded-full text-white p-0' : ''} relative`}
              >
                <div>{day.getDate()}</div>
                <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              </div>
            ))}
          </div>
        </div>

    </div>
    </div>
}