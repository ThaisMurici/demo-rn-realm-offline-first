import Realm from 'realm';

const EventSchema = {
  name: 'Event',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    start_date: 'date',
    end_date: 'date',
    created_at: 'date',
    updated_at: 'date?',
    deleted_at: 'date?',
  },
};

const AppConfig = {
  name: 'Setting',
  primaryKey: 'id',
  properties: {
    id: 'string',
    last_synced_at: 'date?',
  },
};

export async function getRealmInstance() {
  return Realm.open({
    schema: [EventSchema, AppConfig],
    schemaVersion: 0,
  });
}
