interface CalendarProps {
    month: number; // 0 = January
    year: number;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ month, year }: CalendarProps) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Build a 7x5 = 35 cell grid
    const cells: (number | null)[] = [];

    // Add empty cells before day 1
    for (let i = 0; i < firstDay; i++) cells.push(null);

    // Add the actual days
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    // Fill remaining grid slots with nulls
    while (cells.length < 35) cells.push(null);

    return (
        <div className="w-screen h-screen p-4 flex flex-col bg-white">
            {/* Month + Year */}
            <div className="text-3xl font-bold text-center mb-4">
                {new Date(year, month).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })}
            </div>

            {/* Days of week bar */}
            <div className="grid grid-cols-7 text-center font-semibold mb-2">
                {daysOfWeek.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* 7x5 Full Screen Grid */}
            <div className="grid grid-cols-7 grid-rows-5 gap-[1px] bg-gray-300 flex-1">
                {cells.map((day, idx) => (
                    <div
                        key={idx}
                        className={`bg-white flex items-start justify-start p-2 text-lg ${
                            !day ? "opacity-0" : ""
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}