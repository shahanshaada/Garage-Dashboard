interface UserProfile {
  id: string;
  avatar: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

interface Benefit {
  id: string;
  title: string;
  icon: string;
  description: string;
  ctaText: string;
}

interface RewardPoints {
  total: number;
  redeemed: number;
  available: number;
  goal: number;
}

const mockUserProfile: UserProfile = {
  id: 'user-123',
  avatar: '/woman.png',
  name: 'Rachael Marcus',
  level: 12,
  xp: 750,
  xpToNextLevel: 1000,
};

const mockBenefits: Benefit[] = [
  {
    id: 'b1',
    title: '50% Off Car Wash',
    icon: '/car.svg',
    description: 'Claim a massive discount on your next car wash service.',
    ctaText: 'View Details',
  },
  {
    id: 'b2',
    title: 'Free Tyre Rotation',
    icon: '/settings.svg',
    description: 'Keep your tyres in top condition with a complimentary rotation.',
    ctaText: 'View Details',
  },
  {
    id: 'b3',
    title: 'Roadside Assistance',
    icon: '/sos.svg',
    description: '24/7 support for breakdowns and emergencies.',
    ctaText: 'View Details',
  },
  {
    id: 'b4',
    title: 'Fuel Cashback',
    icon: '/fuel.svg',
    description: 'Get 5% cashback on all your fuel purchases this month.',
    ctaText: 'View Details',
  },
];

const mockRewardPoints: RewardPoints = {
  total: 5000,
  redeemed: 1500,
  available: 3500,
  goal: 10000,
};

const mockDelay = <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const fetchUserProfile = () => mockDelay(mockUserProfile, 1200);
export const fetchBenefits = () => mockDelay(mockBenefits, 1500);
export const fetchRewardPoints = () => mockDelay(mockRewardPoints, 1000);
