
let eventGuid = 100
let today = new Date()
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1)
tomorrow = tomorrow.toISOString().replace(/T.*$/, '')

console.log("date string: ", todayStr)

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: todayStr
  // },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    data: [['msi', 'msu'], ['bob', 'joe','bert','larry']],
    jobs: ['msi', 'msu'],
    assignees: ['bob', 'joe','bert','larry'],
    assignees2: ['bob', 'joe','bert','larry']
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: tomorrow + 'T12:00:00',
    data: [['msi', 'msu'], ['bob', 'joe','bert','larry'], ['bob', 'joe','bert','larry']],
    jobs: ['msi', 'msu'],
    assignees: ['bob', 'joe','bert','larry'],
    assignees2: ['bob', 'joe','bert','larry']
  }
]

export function createEventId() {
  return String(eventGuid++)
}