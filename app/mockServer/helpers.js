const getUpdatedData = (dbInstance, lastSyncedAt, resourceName) => {
  const formattedData = {};

  if (lastSyncedAt === undefined) {
    formattedData.created = dbInstance
      .get(resourceName)
      .filter((item) => item.deleted_at === null)
      .sortBy('views')
      .value();

    formattedData.updated = [];
    formattedData.deleted = [];
  } else {
    formattedData.created = dbInstance
      .get(resourceName)
      .filter(
        (item) =>
          Date.parse(item.created_at) >= lastSyncedAt &&
          item.updated_at === null &&
          item.deleted_at === null,
      )
      .sortBy('created_at')
      .value();

    formattedData.updated = dbInstance
      .get(resourceName)
      .filter(
        (item) =>
          Date.parse(item.updated_at) >= lastSyncedAt &&
          item.deleted_at === null,
      )
      .sortBy('created_at')
      .value();

    formattedData.deleted = dbInstance
      .get(resourceName)
      .filter((item) => Date.parse(item.deleted_at) >= lastSyncedAt)
      .map((item) => ({ id: item.id, deleted_at: item.deleted_at }))
      .value();
  }

  return formattedData;
};

const buildSyncBody = (dbInstance, lastSyncedAt) => {
  const body = {};
  body.events = getUpdatedData(dbInstance, lastSyncedAt, 'events');
  return body;
};

const updateResourceData = (dbInstance, resourceName, resourceData) => {
  resourceData.created.forEach((event) => {
    const { id, name, start_date, end_date, created_at, updated_at } = event;
    const eventAlreadyCreated = dbInstance
      .get(resourceName)
      .find({ id })
      .value();

    if (eventAlreadyCreated) {
      dbInstance
        .get(resourceName)
        .find({ id })
        .assign({ name, start_date, end_date, updated_at })
        .write();
    } else {
      dbInstance
        .get(resourceName)
        .push({
          id,
          name,
          start_date,
          end_date,
          created_at,
          updated_at: null,
          deleted_at: null,
        })
        .write();
    }
  });

  resourceData.updated.forEach((event) => {
    const { name, start_date, end_date, updated_at } = event;
    dbInstance
      .get(resourceName)
      .find({ id: event.id })
      .assign({ name, start_date, end_date, updated_at })
      .write();
  });

  resourceData.deleted.forEach((event) => {
    const { id, deleted_at } = event;
    dbInstance.get(resourceName).find({ id }).assign({ deleted_at }).write();
  });
};

const savePushedData = (dbInstance, updatedDataFromClient) => {
  updateResourceData(dbInstance, 'events', updatedDataFromClient.events);
};

module.exports = {
  buildSyncBody,
  savePushedData,
};
