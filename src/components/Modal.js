import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, Zoom } from 'react-toastify';
import moment from 'moment';
toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT,
  hideProgressBar: true,
  transition: Zoom
});
const Modal = ({ setShow, createEvent }) => {
  const [data, setData] = useState({ name: '', date: '', start: '', end: '' });
  const onChangeHandler = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    //datepicker is start and end of an event in wrong timezone so I have to add 2 hours to be correct
    const start = moment(data.start)
      .add(2, 'hours')
      .toISOString();
    const end = moment(data.end)
      .add(2, 'hours')
      .toISOString();

    const eventObject = {
      summary: data.name,
      start: {
        dateTime: start,
        timeZone: 'Europe/Zurich'
      },
      end: {
        dateTime: end,
        timeZone: 'Europe/Zurich'
      }
    };
    try {
      await createEvent(eventObject);
    } catch (err) {
      console.log(err);
      toast.error('Početak događaja mora biti ranije od završetka istog');
    }
    setShow(false);
  };

  return (
    <div>
      <section className="modal-main">
        <form onSubmit={onSubmitHandler} className="newContainer">
          <div className="form">
            <h2 className="newTitle">Dodaj novi događaj</h2>
            <div className="form-group">
              <label>Ime događaja</label>
              <input
                type="text"
                placeholder="Naziv"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label>Vrijeme početka</label>
              <DatePicker
                selected={data.start}
                onChange={start => setData({ ...data, start })}
                showTimeSelect
                timeIntervals={30}
                timeCaption="Vrijeme početka"
                dateFormat="h:mm aa"
                placeholderText="Početak"
                minDate={new Date()}
              />
            </div>
            <div className="form-group">
              {data.start && (
                <>
                  <label>Vrijeme završetka</label>
                  <DatePicker
                    selected={data.end}
                    onChange={end => setData({ ...data, end })}
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="Vrijeme završetka"
                    dateFormat="h:mm aa"
                    placeholderText="Kraj"
                    minDate={data.start}
                    maxDate={data.start}
                  />
                </>
              )}
            </div>
            <div className="button-form-group">
              <button onClick={() => setShow(false)} className={'delete'}>
                Zatvori
              </button>
              <button className={'save'}>Spremi</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Modal;
