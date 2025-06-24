'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchUserProfile } from '@/lib/api';
import { SkeletonCircle, SkeletonRect, SkeletonText } from './Skeleton';
import Image from 'next/image';

interface UserProfile {
  id: string;
  avatar: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

const UserProfileSummary = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const data = await fetchUserProfile();
      setUserProfile(data);
      setLoading(false);
    };
    loadProfile();
  }, []);

  const progress = userProfile ? (userProfile.xp / userProfile.xpToNextLevel) * 100 : 0;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? (
        <>
          <SkeletonCircle className="w-16 h-16" />
          <div className="flex-1 space-y-2">
            <SkeletonText className="h-5 w-48" />
            <SkeletonText className="h-4 w-32" />
            <SkeletonRect className="h-3 w-full" />
          </div>
        </>
      ) : (
        <>
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
            <Image
              src={userProfile?.avatar || '/images/avatar.jpg'} // Fallback image
              alt={userProfile?.name || 'User Avatar'}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              {userProfile?.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Level: {userProfile?.level}
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <motion.div
                className="bg-blue-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                style={{ width: `${progress}%` }}
              ></motion.div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {userProfile?.xp} / {userProfile?.xpToNextLevel} XP
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default UserProfileSummary;