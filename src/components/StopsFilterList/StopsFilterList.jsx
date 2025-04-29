import classes from './StopsFilterList.module.scss'
import StopsFilter from '../StopsFilter/StopsFilter'
function StopsFilterList() {
    return (
      <>
        <article className={classes['stops-filter-list']}>
          <h2 style={{fontSize: '15px', margin: 0, marginBottom: 20}}>Количество пересадок</h2>
            <StopsFilter text={'Все'} usage={'all'}/>
            <StopsFilter text={'Без пересадок'} usage={'noStops'}/>
            <StopsFilter text={'1 пересадка'} usage={'oneStop'}/>
            <StopsFilter text={'2 пересадки'} usage={'twoStops'}/>
            <StopsFilter text={'3 пересадки'} usage={'threeStops'}/>
        </article>
      </>
    )
  }
  
  export default StopsFilterList