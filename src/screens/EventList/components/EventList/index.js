import React, { useState } from 'react';
import { groupEventsByDate } from '../../../../services/formatter';
import {
  StyledSectionList,
  SectionTitle,
  EventContainer,
  EventName,
} from './styles';
import { syncAppData } from '../../../../services/sync';

export default function EventList({ events, realmInstance }) {
  const [loading, setLoading] = useState(false);

  const formattedGroups = groupEventsByDate(events);

  return (
    <StyledSectionList
      sections={formattedGroups}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }) => (
        <EventContainer>
          <EventName deleted={!!item.deleted_at}>{item.name}</EventName>
        </EventContainer>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <SectionTitle>{title}</SectionTitle>
      )}
      onRefresh={async () => {
        setLoading(true);
        await syncAppData(realmInstance);
        setLoading(false);
      }}
      refreshing={loading}
    />
  );
}
