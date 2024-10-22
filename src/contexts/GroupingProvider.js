import React from 'react'
import GroupingContext from './GroupingContext'

const OrderingProvider=({children})=> {
    const [groupingId,setGroupingId]=React.useState(0)

    const value={
        groupingId,
        setGroupingId
    }
  return (
    <GroupingContext.Provider value={value}>
        {children}
    </GroupingContext.Provider>
  )
}

export default OrderingProvider