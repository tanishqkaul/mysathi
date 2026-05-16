import { GridBackground } from '@/components/ui/GridBackground';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { GiftIcon, CrownIcon, TicketSaleIcon } from '@/components/ui/FeatureIcons';
import { GamificationModal } from '@/components/gamification';
import { useGamification } from '@/hooks/useGamification';

const FEATURE_CARDS = [
  {
    icon: <GiftIcon />,
    title: 'Reward Your Ambassadors',
    description: 'Boost campaign performance by setting up rewards for ambassadors',
  },
  {
    icon: <CrownIcon />,
    title: 'Set Milestones',
    description: <>Set up custom goals for sales,<br />posts, or time-based achievements</>,
  },
  {
    icon: <TicketSaleIcon />,
    title: 'Customise Incentives',
    description: 'Create custom incentives like flat fees, free products, or special commissions.',
  },
];

export function GamificationPage() {
  const { state, openModal } = useGamification();

  return (
    <div className="min-h-full bg-white">
      {/* Hero — grid background, fixed 60rem × 20.125rem as per Figma */}
      <GridBackground>
        <div className="flex flex-col items-center justify-center h-full px-8 gap-4 text-center">
          <h2
            className="text-2xl sm:text-[28px] font-semibold leading-[1.4]"
            style={{ color: '#561056', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Gamify your Campaign
          </h2>
          <p
            className="text-base leading-[1.4]"
            style={{ color: '#616161', fontFamily: "'Inter', sans-serif" }}
          >
            Enable gamification to start crafting<br />your custom reward system.
          </p>
          <button
            onClick={openModal}
            className="mt-2 w-[310px] max-w-full h-10 active:scale-[0.98] text-white text-base transition-all duration-150"
            style={{ backgroundColor: '#c530c5', borderRadius: 10, fontFamily: "'Inter', sans-serif" }}
          >
            Enable Gamification
          </button>
        </div>
      </GridBackground>

      {/* Feature cards — overlap the bottom of the grid */}
      <div className="relative z-10 -mt-16 px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>

      {/* Gamification modal */}
      <GamificationModal isOpen={state.isModalOpen} />
    </div>
  );
}
