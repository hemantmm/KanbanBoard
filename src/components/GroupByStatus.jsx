import React from 'react';
import useOrdering from '../contexts/useOrdering';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Card from './Card';
import './GroupByStatus.css';

// Import your images
import todoImage from '../images/To-do.svg';
import inProgressImage from '../images/in-progress.svg';
import backlogImage from '../images/Backlog.svg';
import doneImage from '../images/Done.svg';
import cancelImage from '../images/Cancelled.svg';

const statusImages = {
    Todo: todoImage,
    'In progress': inProgressImage,
    Backlog: backlogImage,
    Done: doneImage,
    Cancelled: cancelImage,
};

const GroupByStatus = ({ tickets, users }) => {
    const uniqueStatus = [...new Set(tickets.map(ticket => ticket.status))];
    const ticketsByStatus = uniqueStatus.map(status => {
        return tickets.filter(ticket => ticket.status === status);
    });

    const { orderingId } = useOrdering();
    if (orderingId === 0) {
        ticketsByStatus.forEach(ticket => {
            ticket.sort((a, b) => a.priority - b.priority);
        });
    } else if (orderingId === 1) {
        ticketsByStatus.forEach(ticket => {
            ticket.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        });
    }

    const findUser = (id) => {
        return users.find(user => user.id === id);
    };

    return (
        <div className="group-by-status">
            {
                ticketsByStatus.map((ticket, index) => (
                    <div className="status" key={index}>
                        <div className="status-title">
                            <div className="left">
                                <img src={statusImages[uniqueStatus[index]]} alt={uniqueStatus[index]} className="status-image" />
                                <h5>{uniqueStatus[index]}</h5>
                            </div>
                            <div className="right">
                                <AiOutlinePlus />
                                <BiDotsHorizontalRounded />
                            </div>
                        </div>
                        {
                            ticket.map((t, ind) => (
                                <Card ticket={t} user={findUser(t.userId)} key={ind} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default GroupByStatus;
