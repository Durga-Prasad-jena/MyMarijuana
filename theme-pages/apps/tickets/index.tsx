import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/theme-components/container/PageContainer';
import TicketListing from '../../../src/theme-components/apps/tickets/TicketListing';
import TicketFilter from '../../../src/theme-components/apps/tickets/TicketFilter';
import ChildCard from '../../../src/theme-components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Tickets',
  },
];

const TicketList = () => {
  return (
    <PageContainer>
      <Breadcrumb title="Tickets app" items={BCrumb} />
      <ChildCard>
        <TicketFilter />
        <TicketListing />
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
