export interface TimerProps {
    seconds: number
}

export const HOUR = 3600
export const MINUTE = 60

export const toTime = (seconds: number) => {
    return {
        hours: seconds >= HOUR ? Math.floor(seconds / HOUR) : 0,
        minutes: seconds >= MINUTE ? Math.floor((seconds % HOUR) / MINUTE) : 0,
        seconds: Math.floor(seconds % MINUTE)
    }
}

export const toTimeString = (seconds: number, format: string = "m:ss") => {
    const time = toTime(seconds)
    return format.split(':').map(part => {
        switch(part) {
            case "h" : return String(time.hours)
            case "m" : return String(time.minutes)
            case "s" : return String(time.seconds)
            case "hh": return String(time.hours).padStart(2, '0')
            case "mm": return String(time.minutes).padStart(2, '0')
            case "ss": return String(time.seconds).padStart(2, '0')
            default: return part
        }
    }).join(':')
}

