import React from 'react'
import OrderingContext from './OrderingContext'

const OrderingProvider=({children})=> {
    const [orderingId,setOrderingId]=React.useState(0)

    const value={
        orderingId,
        setOrderingId
    }
  return (
    <OrderingContext.Provider value={value}>
        {children}
    </OrderingContext.Provider>
  )
}

export default OrderingProvider