
let eventGuid = 0
let today = new Date()
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1)
tomorrow = tomorrow.toISOString().replace(/T.*$/, '')

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: todayStr
  // },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: tomorrow + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}