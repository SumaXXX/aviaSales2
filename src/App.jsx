import classes from './App.module.scss'
import TabList from './components/TabListList.jxs/TabListList'
import TicketList from './components/TicketList/TicketList'
import StopsFilterList from './components/StopsFilterList/StopsFilterList'
import { useEffect } from 'react'
import { fetchTickets } from './store/AviaSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const {filters, serverTickets} = useSelector(state => state.aviaApp)
  useEffect(() => {
    dispatch(fetchTickets(filters))
  }, [filters, serverTickets])
  return (
    <>
      <main className={classes.app}>
        <img src="/Logo.svg" alt="" className={classes.logo} />
        <section style={{ marginTop: '150px' }}>
          <StopsFilterList />
        </section>
        <div style={{ marginTop: '150px' }}>
          <TabList />
          <TicketList />
        </div>
      </main>
    </>
  )
}

export default App
