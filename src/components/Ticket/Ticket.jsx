import classes from './Ticket.module.scss'
import FlightTable from './../FlightTable/FlightTable'
import { add, parseJSON } from 'date-fns'
function Ticket({ data }) {
  const { carrier, price } = data
  const [firstSegment, secondSegment] = data.segments

  function extractTime(dateString) {
    const date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  // console.log(extractTime(firstSegment.date))
  // console.log(extractTime(add(firstSegment.date, { minutes: firstSegment.duration })))

  function minutesToString(minutes) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}ч ${remainingMinutes}м`
  }
  return (
    <>
      <article className={classes.ticket}>
        <div style={{ display: 'flex' }}>
          <h1 className={classes.price}>{`${price} P`}</h1>
          <img
            style={{ marginLeft: 'auto', marginRight: 20, height: 40, marginTop: 14 }}
            src={`https://pics.avs.io/99/36/${carrier}.png`}
            alt="logo"
          />
        </div>
        <FlightTable
          origin={`${firstSegment.origin}`}
          destination={`${firstSegment.destination}`}
          date={`${extractTime(firstSegment.date)} – ${extractTime(add(firstSegment.date, { minutes: firstSegment.duration }))}`}
          flightTime={minutesToString(firstSegment.duration)}
          stops={firstSegment.stops.join(', ')}
          stopsCount={firstSegment.stops.length}
        />
        <FlightTable
          origin={`${secondSegment.origin}`}
          destination={`${secondSegment.destination}`}
          date={`${extractTime(secondSegment.date)} – ${extractTime(add(secondSegment.date, { minutes: secondSegment.duration }))}`}
          flightTime={minutesToString(secondSegment.duration)}
          stops={secondSegment.stops.join(', ')}
          stopsCount={secondSegment.stops.length}
        />
      </article>
    </>
  )
}

export default Ticket
