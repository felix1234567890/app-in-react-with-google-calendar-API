import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/actions/loginActions";
import Modal from "./Modal";
import {
  filterByDay,
  filterByMonth,
  filterTomorrowEvents,
} from "../helpers/filter";
import { renderFilteredData } from "../components/Events";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const dispatch = useDispatch();
  const name = useSelector((login) => login.login.name);
  const image = useSelector((login) => login.login.imageUrl);
  const listNewEvents = () => {
    return window.gapi
      ? window.gapi.client.calendar.events.list({
          calendarId: "primary",
          showDeleted: false,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        })
      : Promise.resolve();
  };
  console.log(window.gapi);
  const createEvent = async (event) => {
    window.gapi &&
      (await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      }));
    setEvents([
      ...events,
      {
        id: event.id,
        name: event.summary,
        date: event.start.dateTime.substring(0, 10),
        start: event.start.dateTime.substring(11, 19),
        end: event.end.dateTime.substring(11, 19),
        fullDate: event.start.dateTime,
      },
    ]);
  };
  const deleteEvent = async (eventId) => {
    const newEvents = events.filter((event) => event.id !== eventId);
    setEvents(newEvents);
    return (
      window.gapi &&
      (await window["gapi"].client.calendar.events.delete({
        calendarId: "primary",
        eventId,
      }))
    );
  };

  useEffect(() => {
    toast.success(`Welcome ${name}`);
    if (window.gapi) {
      listNewEvents().then((res) => {
        if (res) {
          let events = res.result.items.map((item) => ({
            id: item.id,
            name: item.summary,
            date: item.start.dateTime.substring(0, 10),
            start: item.start.dateTime.substring(11, 19),
            end: item.end.dateTime.substring(11, 19),
            fullDate: item.start.dateTime,
          }));
          events = events.sort((a, b) => a.start - b.start);
          setEvents(events);
          setFilter("7");
        }
      });
    }
  }, []);

  useEffect(() => {
    filterEvents();
  }, [filter, events]);

  const filterEvents = () => {
    switch (filter) {
      case "1":
        const tomorrowEvents = filterTomorrowEvents(events);
        setFilteredEvents(tomorrowEvents);
        break;
      case "7":
        const filteredEventsinWeek = filterByDay(events);
        setFilteredEvents(filteredEventsinWeek);
        break;
      case "30":
        const filteredEventsinMonth = filterByMonth(events);
        setFilteredEvents(filteredEventsinMonth);
        break;
    }
  };

  const handleSignoutClick = () => {
    window.gapi && window["gapi"].auth2.getAuthInstance().signOut();
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <header className="header">
        <img src={image} alt="Slika korisnika" />
        <h2>Moji događaji</h2>
        <button
          className="logout"
          onClick={() => {
            handleSignoutClick();
            dispatch(removeUser());
          }}
        >
          Logout
        </button>
        <button className="new" onClick={() => setShow(true)}>
          Novi događaj
        </button>
      </header>
      <select className="select" value={filter} onChange={handleFilterChange}>
        <option value="1">Sljedeći dan</option>
        <option value="7">Sljedećih 7 dana</option>
        <option value="30">Sljedećih 30 dana</option>
      </select>
      {renderFilteredData(filter, filteredEvents, deleteEvent)}
      <div>{show && <Modal setShow={setShow} createEvent={createEvent} />}</div>
    </>
  );
};

export default Home;
