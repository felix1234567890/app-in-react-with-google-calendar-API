import moment from 'moment';
export const filterTomorrowEvents = events => {
  const nextDayStart = moment()
    .add(1, 'days')
    .startOf('day');
  const nextDayEnd = moment()
    .add(1, 'days')
    .endOf('day');
  const dailyEvents = [];
  events.filter(event => {
    if (moment(event.fullDate).isBetween(nextDayStart, nextDayEnd)) {
      dailyEvents.push(event);
    }
  });
  const tommorrowEvents = [{ events: dailyEvents }];
  return tommorrowEvents;
};
export const filterByDay = events => {
  const now = moment();
  const week = moment().add(7, 'days');
  const firstDay = [];
  const secondDay = [];
  const thirdDay = [];
  const fourthDay = [];
  const fifthDay = [];
  const sixthDay = [];
  const seventhDay = [];
  events
    .filter(event => {
      if (moment(event.fullDate).isBetween(now, week)) {
        return true;
      }
      return false;
    })
    .map(event => {
      if (
        moment(event.fullDate).isBetween(
          moment().startOf('day'),
          moment().endOf('day')
        )
      ) {
        firstDay.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(1, 'days')
            .startOf('day'),
          moment()
            .add(1, 'days')
            .endOf('day')
        )
      ) {
        secondDay.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(2, 'days')
            .startOf('day'),
          moment()
            .add(2, 'days')
            .endOf('day')
        )
      ) {
        thirdDay.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(3, 'days')
            .startOf('day'),
          moment()
            .add(3, 'days')
            .endOf('day')
        )
      ) {
        fourthDay.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(4, 'days')
            .startOf('day'),
          moment()
            .add(4, 'days')
            .endOf('day')
        )
      ) {
        fifthDay.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(5, 'days')
            .startOf('day'),
          moment()
            .add(5, 'days')
            .endOf('day')
        )
      ) {
        sixthDay.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(6, 'days')
            .startOf('day'),
          moment()
            .add(6, 'days')
            .endOf('day')
        )
      ) {
        seventhDay.push(event);
      }
    });
  const weekFilteredEvents = [
    { events: firstDay, date: moment().format('dddd DD MMMM') },
    {
      events: secondDay,
      date: moment()
        .add('1', 'days')
        .startOf('day')
        .format('dddd DD MMMM')
    },
    {
      events: thirdDay,
      date: moment()
        .add('2', 'days')
        .startOf('day')
        .format('dddd DD MMMM')
    },
    {
      events: fourthDay,
      date: moment()
        .add('3', 'days')
        .startOf('day')
        .format('dddd DD MMMM')
    },
    {
      events: fifthDay,
      date: moment()
        .add('4', 'days')
        .startOf('day')
        .format('dddd DD MMMM')
    },
    {
      events: sixthDay,
      date: moment()
        .add('5', 'days')
        .startOf('day')
        .format('dddd DD MMMM')
    },
    {
      events: seventhDay,
      date: moment()
        .add('6', 'days')
        .startOf('day')
        .format('dddd DD MMMM')
    }
  ];
  return weekFilteredEvents;
};
export const filterByMonth = events => {
  const now = moment();
  const month = moment().add(30, 'days');
  const firstWeek = [];
  const secondWeek = [];
  const thirdWeek = [];
  const fourthWeek = [];
  events
    .filter(event => {
      if (moment(event.fullDate).isBetween(now, month)) {
        return true;
      }
      return false;
    })
    .map(event => {
      if (
        moment(event.fullDate).isBetween(
          moment(),
          moment()
            .add(7, 'days')
            .endOf('day')
        )
      ) {
        firstWeek.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(8, 'days')
            .startOf('day'),
          moment()
            .add(15, 'days')
            .endOf('day')
        )
      ) {
        secondWeek.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(16, 'days')
            .startOf('day'),
          moment()
            .add(23, 'days')
            .endOf('day')
        )
      ) {
        thirdWeek.push(event);
      } else if (
        moment(event.fullDate).isBetween(
          moment()
            .add(24, 'days')
            .startOf('day'),
          moment()
            .add(31, 'days')
            .endOf('day')
        )
      ) {
        fourthWeek.push(event);
      }
    });
  const monthFilteredEvents = [
    {
      events: firstWeek,
      start: moment().format('dddd DD MMMM'),
      end: moment()
        .add(7, 'days')

        .format('dddd DD MMMM')
    },
    {
      events: secondWeek,
      start: moment()
        .add(8, 'days')
        .format('dddd DD MMMM'),
      end: moment()
        .add(15, 'days')
        .format('dddd DD MMMM')
    },
    {
      events: thirdWeek,
      start: moment()
        .add(16, 'days')
        .format('dddd DD MMMM'),
      end: moment()
        .add(23, 'days')
        .format('dddd DD MMMM')
    },
    {
      events: fourthWeek,
      start: moment()
        .add(24, 'days')
        .format('dddd DD MMMM'),
      end: moment()
        .add(31, 'days')
        .format('dddd DD MMMM')
    }
  ];

  return monthFilteredEvents;
};
