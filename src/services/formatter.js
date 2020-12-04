const groupByDate = (accumulator, currentValue) => {
  const formattedDateString = new Date(currentValue.start_date)
    .toISOString()
    .split('T')[0];

  const dateGroupIndex = accumulator.findIndex(
    (group) => group.title === formattedDateString,
  );

  if (dateGroupIndex >= 0) {
    accumulator[dateGroupIndex].data.push({
      id: currentValue.id,
      name: currentValue.name,
      start_date: currentValue.start_date,
      end_date: currentValue.end_date,
      created_at: currentValue.created_at,
      updated_at: currentValue.updated_at,
      deleted_at: currentValue.deleted_at,
    });
  } else {
    accumulator.push({
      title: formattedDateString,
      data: [
        {
          id: currentValue.id,
          name: currentValue.name,
          start_date: currentValue.start_date,
          end_date: currentValue.end_date,
          created_at: currentValue.created_at,
          updated_at: currentValue.updated_at,
          deleted_at: currentValue.deleted_at,
        },
      ],
    });
  }

  return accumulator;
};

export const isoStringToReadableDateString = (isoDateString) => {
  if (isoDateString) {
    const dateObject = new Date(isoDateString);
    return `${dateObject.toLocaleDateString()} (${dateObject.toLocaleTimeString()})`;
  }
  return '---';
};

export const groupEventsByDate = (eventList) => {
  return eventList.reduce(groupByDate, []);
};
