import type { Metadata } from 'next';
import EnquiryClient from '@/components/EnquiryClient';

export const metadata: Metadata = {
  title: 'Enquiry List',
  description: 'Review your selected AFZOX equipment and send a combined quotation request on WhatsApp.',
  alternates: { canonical: '/enquiry' },
  robots: { index: false, follow: true },
};

export default function EnquiryPage() {
  return <EnquiryClient />;
}
