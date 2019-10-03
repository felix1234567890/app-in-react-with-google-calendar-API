import React from 'react';
import moment from 'moment';

const SingleEvent = ({ event, deleteEvent }) => {
  const { name, date, start, end, id } = event;
  const modDate = moment(date).format('dddd DD MMMM');
  const modStart = `${start.split(':')[0]}:${start.split(':')[1]}`;
  const modEnd = `${end.split(':')[0]}:${end.split(':')[1]}`;
  return (
    <>
      <div className="card">
        <h2 className="card-title">{name}</h2>
        <h4 className="card-subtitle">{modDate}</h4>
        <p className="card-text">
          {modStart} - {modEnd}
        </p>
        <button className="delete" onClick={() => deleteEvent(id)}>
          Izbriši
        </button>
      </div>
    </>
  );
};

export default SingleEvent;
