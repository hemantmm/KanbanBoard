import React from 'react';
import useOrdering from '../contexts/useOrdering';
import './GroupByPriority.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Card from './Card';
import logo from '../images/No-priority.svg'
import logo1 from '../images/Img - Low Priority.svg'
import logo2 from '../images/Img - Medium Priority.svg'
import logo3 from '../images/Img - High Priority.svg'
import logo4 from '../images/SVG - Urgent Priority colour.svg'

const mapping = {
    0: 'No_Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
};

const priorityImages = {
    0: logo,
    1: logo1,
    2: logo2,
    3: logo3,
    4: logo4,
};

const GroupByPriority = ({ tickets, users }) => {
    const uniquePriority = [...new Set(tickets.map(ticket => ticket.priority))];
    uniquePriority.sort((a, b) => a - b);
    
    const ticketsByPriority = uniquePriority.map(priority => {
        const filteredTickets = tickets.filter(ticket => ticket.priority === priority);
        return { priority, tickets: filteredTickets, count: filteredTickets.length };
    });

    const { orderingId } = useOrdering();

    ticketsByPriority.forEach(({ tickets }) => {
        if (orderingId === 0) {
            tickets.sort((a, b) => a.priority - b.priority);
        } else if (orderingId === 1) {
            tickets.sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        }
    });

    const findUser = (id) => {
        return users.find(user => user.id === id);
    };

    return (
        <div className="group-by-priority">
            {
                ticketsByPriority.map(({ priority, tickets, count }, index) => (
                    <div className="priority" key={index}>
                        <div className="priority-title">
                            <div className="left">
                                <img src={priorityImages[priority]} alt={mapping[priority]} className="priority-image" />
                                <h5>{mapping[priority]}</h5>
                            </div>
                            <h5>{count}</h5>
                            <div className="right">
                                <AiOutlinePlus />
                                <BiDotsHorizontalRounded />
                            </div>
                        </div>
                        {
                            tickets.map((t, ind) => (
                                <Card ticket={t} key={ind} user={findUser(t.userId)} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default GroupByPriority;


