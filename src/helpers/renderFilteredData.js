import React from 'react';
import moment from 'moment';
import SingleEvent from '../components/SingleEvent';
export const renderFilteredData = (filter, filteredEvents, deleteEvent) => {
  switch (filter) {
    case '1':
      return filteredEvents.map((filteredEvent, index) => {
        if (!filteredEvent.events.length > 0)
          return (
            <h3 style={{ textAlign: 'center' }} key={index}>
              Nema događaja sljedećeg dana
            </h3>
          );
        else {
          return (
            <div className="mainSection" key={index}>
              <h3 className="filterTitle">
                {moment()
                  .add(1, 'days')
                  .format('dddd DD MMMM')}
              </h3>
              <div className="list">
                {filteredEvent.events.map(event => (
                  <SingleEvent
                    key={event.id}
                    event={event}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </div>
            </div>
          );
        }
      });
    case '7':
      return filteredEvents.map((filteredEvent, index) => {
        if (!filteredEvent.events.length > 0) return;
        else {
          return (
            <div className="mainSection" key={index}>
              <h3 className="filterTitle">{filteredEvent.date}</h3>
              <div className="list">
                {filteredEvent.events.map(event => (
                  <SingleEvent
                    key={event.id}
                    event={event}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </div>
            </div>
          );
        }
      });
    case '30':
      return filteredEvents.map((filteredEvent, index) => {
        if (!filteredEvent.events.length > 0) return;
        else {
          return (
            <div className="mainSection" key={index}>
              <h3 className="filterTitle">
                {filteredEvent.start} - {filteredEvent.end}
              </h3>
              <div className="list">
                {filteredEvent.events.map(event => (
                  <SingleEvent
                    key={event.id}
                    event={event}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </div>
            </div>
          );
        }
      });
  }
};
