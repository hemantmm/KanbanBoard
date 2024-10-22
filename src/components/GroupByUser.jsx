import React from 'react'
import Avatar from './Avatar'
import Card from './Card'
import './GroupByUser.css'
import useOrdering from '../contexts/useOrdering'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const GroupByUser=({tickets,users})=>{
    const ticketByUser=users.map(user=>{
        return tickets.filter(ticket=>ticket.userId===user.id)
    })

    const {orderingId}=useOrdering()
    if(orderingId===0)
    {
        ticketByUser.forEach(ticket => {
            ticket.sort((a,b)=>a.priority-b.priority)
        });
    }
    else if(orderingId===1)
    {
        ticketByUser.forEach(ticket => {
            ticket.sort((a,b)=>{
                if(a.title<b.title)
                {
                    return -1
                }
                if(a.title>b.title)
                {
                    return 1
                }
                else
                {
                    return 0
                }
            })
        });
    }
  return (
    <div className="group-by-user">
        {
            ticketByUser.map((ticket,index)=>(
                <div className="user" key={index}>
                    <div className="user-title">
                        <div className="left">
                            <Avatar name={users[index].name} isAvailable={users[index].available} />
                            <h5>{users[index].name}</h5>
                        </div>
                        <div className="right">
                            <AiOutlinePlus />
                            <BiDotsHorizontalRounded />
                        </div>
                    </div>
                    {ticket.map((t,ind)=>(
                        <Card ticket={t} user={users[index]} key={ind} />
                    ))}
                </div>
            ))
        }
    </div>
  )
}

export default GroupByUser