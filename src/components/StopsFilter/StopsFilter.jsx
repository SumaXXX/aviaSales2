import { useDispatch, useSelector } from 'react-redux'
import {
  toggleAll,
  toggleNoStops,
  toggleOneStop,
  toggleThreeStops,
  toggleTwoStops,
  isAllChecked,
} from '../../store/AviaSlice'
import classes from './StopsFilter.module.scss'

function StopsFilter({ text, usage }) {
  const filters = useSelector(state => state.aviaApp.filters)
  const dispatch = useDispatch()

  return (
    <article className={classes['stops-filter']}>
      <label className={classes['custom-checkbox']}>
        <input
          type="checkbox"
          checked={
            usage === 'all'
              ? filters.all
              : usage === 'noStops'
                ? filters.noStops
                : usage === 'oneStop'
                  ? filters.oneStop
                  : usage === 'twoStops'
                    ? filters.twoStops
                    : filters.threeStops
          }
          onChange={() => {
            switch (usage) {
              case 'all':
                dispatch(toggleAll())
                dispatch(isAllChecked())
                break
              case 'noStops':
                dispatch(toggleNoStops())
                dispatch(isAllChecked())
                break

              case 'oneStop':
                dispatch(toggleOneStop())
                dispatch(isAllChecked())
                break

              case 'twoStops':
                dispatch(toggleTwoStops())
                dispatch(isAllChecked())
                break

              case 'threeStops':
                dispatch(toggleThreeStops())
                dispatch(isAllChecked())
                break
            }
          }}
        />
        <span className={classes['checkmark']}></span>
        {text}
      </label>
    </article>
  )
}

export default StopsFilter
