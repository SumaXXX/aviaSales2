import classes from './ShowMoreButton.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addMoreVisibleTickets } from '../../store/AviaSlice'
function ShowMoreButton() {
  const dispatch = useDispatch()
  const {visibleTickets, tickets} = useSelector(state => state.aviaApp)
  if (visibleTickets.length < tickets.length) return (
    <button className={classes['show-more-button']} onClick={() => dispatch(addMoreVisibleTickets())}>
      {'Показать еще 5 билетов!'.toUpperCase()}
    </button>
  )

  return <></>
}

export default ShowMoreButton
