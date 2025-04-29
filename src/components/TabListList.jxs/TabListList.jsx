import classes from './TabList.module.scss'
import Tab from '../Tab/Tab'

function TabList() {
  return (
    <div className={classes['filter-list']}>
      <Tab title={'САМЫЙ ДЕШЕВЫЙ'}/>
      <Tab title={'САМЫЙ БЫСТРЫЙ'}/>
      <Tab title={'ОПТИМАЛЬНЫЙ'} isLast={true}/>
    </div>
  )
}

export default TabList
