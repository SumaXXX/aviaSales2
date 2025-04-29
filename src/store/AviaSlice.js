import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
let cachedId = null
export const fetchTickets = createAsyncThunk(
  'todos/fetchTickets',
  async function (filters, { rejectWithValue }) {
    try {
      const idResponse = await fetch(' https://aviasales-test-api.kata.academy/search')

      const { searchId } = await idResponse.json()
      if (!cachedId) {
        cachedId = searchId
      } 
      const ticketsResponse = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${cachedId}`
      )
      if (!ticketsResponse.ok) {
        fetchTickets(filters)
        throw new Error('Server Error!')
      }
      const { tickets, stop } = await ticketsResponse.json()
      return { tickets, filters, stop }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected'
  // state.status = 'resolved'
  state.error = action.payload
}

const AviaSlice = createSlice({
  name: 'aviaSales',
  initialState: {
    visibleTicketsCount: 5,
    visibleTickets: [],
    serverTickets: [],
    tickets: [],
    status: null,
    error: null,
    filters: {
      all: true,
      noStops: true,
      oneStop: true,
      twoStops: true,
      threeStops: true,
      mostCheap: false,
      mostFast: false,
      mostOptimal: false,
    },
  },
  reducers: {
    toggleAll(state) {
      console.log('asd')
      if (state.filters.all === false) {
        state.filters.all = true
        state.filters.noStops = true
        state.filters.oneStop = true
        state.filters.twoStops = true
        state.filters.threeStops = true
      } else {
        state.filters.all = false
        state.filters.noStops = false
        state.filters.oneStop = false
        state.filters.twoStops = false
        state.filters.threeStops = false
      }
    },
    toggleNoStops(state) {
      state.filters.all = false
      state.filters.noStops = !state.filters.noStops
    },
    toggleOneStop(state) {
      state.filters.all = false
      state.filters.oneStop = !state.filters.oneStop
    },
    toggleTwoStops(state) {
      state.filters.all = false
      state.filters.twoStops = !state.filters.twoStops
    },
    toggleThreeStops(state) {
      state.filters.all = false
      state.filters.threeStops = !state.filters.threeStops
    },
    isAllChecked(state) {
      if (
        state.filters.noStops &&
        state.filters.oneStop &&
        state.filters.twoStops &&
        state.filters.threeStops
      )
        state.filters.all = true
    },
    toggleMostCheap(state) {
      state.filters.mostFast = false
      state.filters.mostOptimal = false
      state.filters.mostCheap = !state.filters.mostCheap
    },
    toggleMostFast(state) {
      state.filters.mostCheap = false
      state.filters.mostOptimal = false
      state.filters.mostFast = !state.filters.mostFast
    },
    toggleMostOptimal(state) {
      state.filters.mostCheap = false
      state.filters.mostFast = false
      state.filters.mostOptimal = !state.filters.mostOptimal
    },
    addMoreVisibleTickets(state) {
      state.visibleTicketsCount += 5
      let cutTickets = [...state.tickets]
      cutTickets.length = state.visibleTicketsCount
      state.visibleTickets = cutTickets
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTickets.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchTickets.fulfilled || fetchTickets.rejected || fetchTickets.pending, (state, action) => {
      let filters = action.payload.filters
      
      state.status = 'resolved'
      state.serverTickets.push(...action.payload.tickets)
      state.tickets = [...state.serverTickets]
      if (filters.noStops === false) {
        state.tickets = state.tickets.filter(
          t => t.segments[0].stops.length !== 0 && t.segments[1].stops.length !== 0
        )
      }
      if (filters.oneStop === false) {
        state.tickets = state.tickets.filter(
          t => t.segments[0].stops.length !== 1 && t.segments[1].stops.length !== 1
        )
      }

      if (filters.twoStops === false) {
        state.tickets = state.tickets.filter(
          t => t.segments[0].stops.length !== 2 && t.segments[1].stops.length !== 2
        )
      }

      if (filters.threeStops === false) {
        state.tickets = state.tickets.filter(
          t => t.segments[0].stops.length !== 3 && t.segments[1].stops.length !== 3
        )
      }

      if (filters.mostCheap === true) {
        state.tickets = state.tickets.sort((a, b) => a.price - b.price)
      }

      if (filters.mostFast === true) {
        state.tickets = state.tickets.sort(
          (a, b) => a.segments[0].duration - b.segments[0].duration
        )
      }

      if (filters.mostOptimal === true) {
        state.tickets = state.tickets.sort(
          (a, b) => a.segments[0].duration + a.price - (b.segments[0].duration + b.price)
        )
      }

      let cutTickets = [...state.tickets]
      cutTickets.length = state.visibleTicketsCount
      state.visibleTickets = cutTickets
      if (action.payload.stop === false) fetchTickets(filters)
    })
    builder.addCase(fetchTickets.rejected, setError)
  },
})

export const {
  toggleAll,
  toggleNoStops,
  toggleOneStop,
  toggleTwoStops,
  toggleThreeStops,
  isAllChecked,
  addMoreVisibleTickets,
  toggleMostCheap,
  toggleMostFast,
  toggleMostOptimal,
} = AviaSlice.actions
export default AviaSlice.reducer
