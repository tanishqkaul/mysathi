import GiftSvg from '@/assets/icons/gift.svg?react';
import CrownSvg from '@/assets/icons/crown.svg?react';
import TicketSaleSvg from '@/assets/icons/ticket-sale.svg?react';

export function GiftIcon({ className }: { className?: string }) {
  return <GiftSvg className={className} />;
}

export function CrownIcon({ className }: { className?: string }) {
  return <CrownSvg className={className} />;
}

export function TicketSaleIcon({ className }: { className?: string }) {
  return <TicketSaleSvg className={className} />;
}
