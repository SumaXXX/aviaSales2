import classes from './FlightTable.module.scss'

function FlightTable({ origin, destination, date, flightTime, stops, stopsCount }) {
  return (
    <>
      <article className={classes.table}>
        <table style={{ paddingBottom: 8, textAlign: 'left' }}>
          <thead>
            <tr>
              <th className={classes['table-titles']}>{`${origin}-${destination}`}</th>
              <th className={classes['table-titles']}>В ПУТИ</th>
              <th className={classes['table-titles']}>
                {stopsCount === 0
                  ? `НЕТ ПЕРЕСАДОК`
                  : stopsCount > 0 && stopsCount < 2
                    ? `${stopsCount} ПЕРЕСАДКА`
                    : `${stopsCount} ПЕРЕСАДКИ`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: 14, paddingRight: 100 }}>{date}</td>
              <td style={{ fontSize: 14, paddingRight: 100 }}>{flightTime}</td>
              <td style={{ fontSize: 14 }}>{stops}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}
export default FlightTable
