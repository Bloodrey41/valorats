import create from 'zustand'

const DEFAULT_EVENT = 'https://www.thespike.gg/events/stats/vct-2023-challengers-league-spain-rising-split-1/2267'

type EventState = {
    selectedEvent: string
    setSelectedEvent: (event: string) => void,
}

const useEventStore = create<EventState>(set => ({
    selectedEvent: DEFAULT_EVENT,
    setSelectedEvent: (event: string) => set({ selectedEvent: event })
}))

export default useEventStore
