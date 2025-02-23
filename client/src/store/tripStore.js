import { create } from 'zustand';

const useTripStore = create((set) => ({
  trips: [],
  selectedTrip: null,
  setTrips: (trips) => set({ trips }),
  addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
  selectTrip: (trip) => set({ selectedTrip: trip }),
  updateTrip: (updatedTrip) => set((state) => ({
    trips: state.trips.map(trip => 
      trip.id === updatedTrip.id ? updatedTrip : trip
    )
  })),
}))

export default useTripStore