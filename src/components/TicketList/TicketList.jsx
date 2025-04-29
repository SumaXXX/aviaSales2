import classes from './TicketList.module.scss'
import Ticket from '../Ticket/Ticket'
import ShowMoreButton from './../ShowMoreButton/ShowMoreButton'
import { useSelector } from 'react-redux'

function TicketList() {
  const { status, error } = useSelector(state => state.aviaApp)
  const { visibleTickets, tickets } = useSelector(state => state.aviaApp)
  if (!tickets.length )
    return (
      <h2>
        Рейсов, подходящих под заданные фильтры,
        <br /> не найдено
      </h2>
    )
  if (status === 'loading')
    return (
      <>
        <h2>LOADING...</h2>
        <div className={classes['ticket-list']}>
          {visibleTickets.map(ticket => (
            <Ticket key={ticket.price} data={ticket} />
          ))}
          <ShowMoreButton />
        </div>
      </>
    )



  if (status === 'rejected')
    return (
      <>
        <h2>
          There is an error: {error} - <br /> не все билеты загружены. Всего: {tickets.length}
        </h2>
        <div className={classes['ticket-list']}>
          {visibleTickets.map(ticket => (
            <Ticket key={ticket.price} data={ticket} />
          ))}
          <ShowMoreButton />
        </div>
      </>
    )



  if (status === 'resolved')
    return (
      <>
        <div className={classes['ticket-list']}>
          {visibleTickets.map(ticket => (
            <Ticket key={ticket.price} data={ticket} />
          ))}
          <ShowMoreButton />
        </div>
      </>
    )
}

export default TicketList
