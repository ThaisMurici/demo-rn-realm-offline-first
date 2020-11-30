const groupByDate = (accumulator, currentValue) => {
  const formattedDateString = new Date(currentValue.start_date)
    .toISOString()
    .split('T')[0];

  const dateGroupIndex = accumulator.findIndex(
    (group) => group.title === formattedDateString,
  );

  if (dateGroupIndex > 0) {
    accumulator[dateGroupIndex].data.push({
      id: currentValue.id,
      name: currentValue.name,
      startDate: currentValue.start_date,
      endDate: currentValue.end_date,
    });
  } else {
    accumulator.push({
      title: formattedDateString,
      data: [
        {
          id: currentValue.id,
          name: currentValue.name,
          startDate: currentValue.start_date,
          endDate: currentValue.endDate,
        },
      ],
    });
  }

  return accumulator;
};

export const groupEventsByDate = (eventList) => {
  return eventList.reduce(groupByDate, []);
};
