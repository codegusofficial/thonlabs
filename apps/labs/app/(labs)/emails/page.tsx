import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import { BsEnvelopePaper } from 'react-icons/bs';

export const metadata: Metadata = {
  title: 'Emails',
};

export default function Emails() {
  return (
    <>
      <PageHeader title="Emails" icon={BsEnvelopePaper} />
      <PageWrapper>Emails page</PageWrapper>
    </>
  );
}
