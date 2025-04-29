import classNames from 'classnames'
import classes from './Tab.module.scss'
import { toggleMostCheap, toggleMostFast, toggleMostOptimal } from '../../store/AviaSlice'
import { useDispatch, useSelector } from 'react-redux'

function Tab({ isLast, title }) {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.aviaApp.filters)
  const filterClass = classNames({
    [classes['filter-button']]: true,
    [classes['filter-button--last']]: isLast,
    [classes['filter-button-selected']]:
      title === 'САМЫЙ ДЕШЕВЫЙ'
        ? filters.mostCheap
        : title === 'САМЫЙ БЫСТРЫЙ'
          ? filters.mostFast
          : filters.mostOptimal,
  })
  return (
    <>
      <button className={filterClass} onClick={() => title === 'САМЫЙ ДЕШЕВЫЙ' ? dispatch(toggleMostCheap()) : title === 'САМЫЙ БЫСТРЫЙ' ?  dispatch(toggleMostFast()) : dispatch(toggleMostOptimal())}>
        {title}
      </button>
    </>
  )
}

export default Tab
