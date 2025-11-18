import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface CalendarEvent {
    id: string;
    name: string;
    color: string;
    dates: string[];
}

// Mock Data
export const MOCK_EVENTS: CalendarEvent[] = [
    {
        id: '1',
        name: 'Acme Corp - Campus Visit',
        color: '#3B82F6',
        dates: ['2025-10-20']
    },
    {
        id: '2',
        name: 'Goldman Sachs - Info Session',
        color: '#8B5CF6',
        dates: ['2025-10-21', '2025-10-22']
    },
    {
        id: '3',
        name: 'Tech Career Fair',
        color: '#10B981',
        dates: ['2025-10-22', '2025-10-25']
    },
    {
        id: '4',
        name: 'Microsoft - Engineering Workshop',
        color: '#F59E0B',
        dates: ['2025-10-23', '2025-10-24']
    },
    {
        id: '5',
        name: 'Meta - Product Design Session',
        color: '#EF4444',
        dates: ['2025-10-23']
    },
    {
        id: '6',
        name: 'Startup Networking Lunch',
        color: '#EC4899',
        dates: ['2025-10-24']
    },
    {
        id: '7',
        name: 'McKinsey & Co - Consulting Summit',
        color: '#6366F1',
        dates: ['2025-10-27', '2025-11-02']
    },
    {
        id: '8',
        name: 'Deloitte - Leadership Development',
        color: '#14B8A6',
        dates: ['2025-10-28', '2025-10-29', '2025-11-03', '2025-11-04']
    },
    {
        id: '9',
        name: 'AWS - Cloud Computing Bootcamp',
        color: '#F97316',
        dates: ['2025-11-06', '2025-11-08']
    },
    {
        id: '10',
        name: 'J.P. Morgan - Investment Banking Forum',
        color: '#06B6D4',
        dates: ['2025-11-09', '2025-11-11']
    },
    {
        id: '11',
        name: 'Boston Consulting Group - Case Workshop Day 1',
        color: '#8B5CF6',
        dates: ['2025-11-12']
    },
    {
        id: '12',
        name: 'Boston Consulting Group - Case Workshop Day 2',
        color: '#8B5CF6',
        dates: ['2025-11-13']
    },
    {
        id: '13',
        name: 'Finance Industry Expo',
        color: '#10B981',
        dates: ['2025-11-12', '2025-11-14']
    },
    {
        id: '14',
        name: 'Google - Coffee Chats',
        color: '#EF4444',
        dates: ['2025-11-13']
    },
    {
        id: '15',
        name: 'Fall Recruiting Season - Open Access',
        color: '#64748B',
        dates: ['2025-11-10', '2025-11-21']
    },
    {
        id: '16',
        name: 'Salesforce - Sales Engineer Panel',
        color: '#3B82F6',
        dates: ['2025-11-17']
    },
    {
        id: '17',
        name: 'Bain & Company - Strategy Workshop',
        color: '#F59E0B',
        dates: ['2025-11-18']
    },
    {
        id: '18',
        name: 'Apple - Design Thinking Session',
        color: '#EC4899',
        dates: ['2025-11-20']
    },
    {
        id: '19',
        name: 'Stripe - Engineering Mixer',
        color: '#F97316',
        dates: ['2025-11-21', '2025-11-22']
    },
    {
        id: '20',
        name: 'Bloomberg - Data Analytics Day',
        color: '#06B6D4',
        dates: ['2025-10-20']
    },
    {
        id: '21',
        name: 'LinkedIn Recruiter Meetup',
        color: '#0A66C2',
        dates: ['2025-10-23']
    },
    {
        id: '22',
        name: 'Resume Review Workshop',
        color: '#7C3AED',
        dates: ['2025-10-23']
    },
    {
        id: '23',
        name: 'Networking Happy Hour',
        color: '#F472B6',
        dates: ['2025-10-23']
    },
    {
        id: '24',
        name: 'IBM - AI Research Presentation',
        color: '#0F62FE',
        dates: ['2025-11-13']
    },
    {
        id: '25',
        name: 'Twitter/X - Social Media Panel',
        color: '#1DA1F2',
        dates: ['2025-11-13']
    },
    {
        id: '26',
        name: 'Career Services Drop-In',
        color: '#059669',
        dates: ['2025-11-13']
    },
    {
        id: '27',
        name: 'Uber - Product Manager Talk',
        color: '#000000',
        dates: ['2025-11-13']
    },
    {
        id: '28',
        name: 'Adobe - Creative Workshop',
        color: '#FF0000',
        dates: ['2025-10-30']
    },
    {
        id: '29',
        name: 'Spotify - Engineering Culture Talk',
        color: '#1DB954',
        dates: ['2025-10-30']
    },
    {
        id: '30',
        name: 'Tesla - Manufacturing Tour',
        color: '#CC0000',
        dates: ['2025-10-30']
    },
    {
        id: '31',
        name: 'Netflix - Content Strategy Session',
        color: '#E50914',
        dates: ['2025-10-30']
    },
    {
        id: '32',
        name: 'Interview Prep Bootcamp',
        color: '#9333EA',
        dates: ['2025-10-30']
    },
    {
        id: '33',
        name: 'Alumni Networking Event',
        color: '#14B8A6',
        dates: ['2025-10-30']
    }
];


// Service
class CalendarService {
    private events: CalendarEvent[] = [...MOCK_EVENTS];

    async getEventsByDateRange(
        startDate: string,
        endDate: string
    ): Promise<CalendarEvent[]> {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filtered = this.events.filter((event) =>
            event.dates.some((d) => {
                const date = new Date(d);
                return date >= start && date <= end;
            })
        );

        await new Promise((r) => setTimeout(r, 200));
        return filtered;
    }
}

const calendarService = new CalendarService();

// Utility to produce YYYY-MM-DD local dates
const toLocalDate = (date: Date) => date.toLocaleDateString("en-CA");

export default function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
    const [eventsByDate, setEventsByDate] = useState<Map<string, CalendarEvent[]>>(new Map());
    const [loading, setLoading] = useState(false);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    useEffect(() => {
        loadEventsForMonth();
    }, [currentDate]);

    const loadEventsForMonth = async () => {
        setLoading(true);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const startDate = toLocalDate(new Date(year, month, 1));
        const endDate = toLocalDate(new Date(year, month + 1, 0));

        try {
            const fetchedEvents = await calendarService.getEventsByDateRange(startDate, endDate);
            const map = new Map<string, CalendarEvent[]>();

            fetchedEvents.forEach((event) => {
                event.dates.forEach((d) => {
                    if (!map.has(d)) map.set(d, []);
                    map.get(d)!.push(event);
                });
            });

            setEventsByDate(map);
        } finally {
            setLoading(false);
        }
    };

    const generateCalendar = () => {
        const days: { day: number; isCurrentMonth: boolean }[] = [];
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        // Leading empty cells
        for (let i = 0; i < firstDay; i++) {
            days.push({ day: 0, isCurrentMonth: false });
        }

        // Actual days
        for (let d = 1; d <= daysInMonth; d++) {
            days.push({ day: d, isCurrentMonth: true });
        }

        return days;
    };

    const navigateMonth = (dir: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + dir);
        setCurrentDate(newDate);
    };

    const isToday = (day: number) => {
        const now = new Date();
        return (
            day === now.getDate() &&
            currentDate.getMonth() === now.getMonth() &&
            currentDate.getFullYear() === now.getFullYear()
        );
    };

    const getDateKey = (day: number) =>
        toLocalDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));

    const getEventsForDay = (day: number) => {
        return eventsByDate.get(getDateKey(day)) || [];
    };

    const calendarDays = generateCalendar();

    return (
        <div className="flex justify-center h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-[1200px] w-full mx-4 h-fit">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 rounded-full border border-gray-400 bg-gray-800 hover:bg-gray-700"
                        disabled={loading}
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-100" />
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-800">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>

                    <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 rounded-full border border-gray-400 bg-gray-800 hover:bg-gray-700"
                        disabled={loading}
                    >
                        <ChevronRight className="w-5 h-5 text-gray-100" />
                    </button>
                </div>

                {/* WEEKDAY HEADERS */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="text-center text-sm font-medium text-gray-500 py-2">
                            {d}
                        </div>
                    ))}
                </div>

                {/* CALENDAR GRID */}
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((item, idx) =>
                        !item.isCurrentMonth ? (
                            <div key={idx} className="h-28 border-2 border-transparent" />
                        ) : (
                            <div
                                key={idx}
                                className={`
                                    h-28 flex flex-col items-start p-2 rounded-lg border-2 transition
                                    ${isToday(item.day)
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }
                                `}
                            >
                                <span
                                    className={`font-semibold text-sm mb-1 ${
                                        isToday(item.day) ? "text-blue-600" : "text-gray-700"
                                    }`}
                                >
                                    {item.day}
                                </span>

                                {/* Event list */}
                                <div className="flex flex-col gap-1 w-full overflow-hidden">
                                    {getEventsForDay(item.day).slice(0, 3).map((event) => (
                                        <div
                                            key={event.id}
                                            className="text-xs font-medium truncate px-1 py-0.5 rounded"
                                            style={{
                                                backgroundColor: event.color + "20",
                                                color: event.color,
                                                borderLeft: `3px solid ${event.color}`
                                            }}
                                            title={event.name}
                                        >
                                            {event.name}
                                        </div>
                                    ))}
                                    {getEventsForDay(item.day).length > 3 && (
                                        <div className="text-xs text-gray-500 px-1">
                                            +{getEventsForDay(item.day).length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}