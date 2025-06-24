'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { fetchRewardPoints } from '@/lib/api';
import Skeleton, { SkeletonCircle, SkeletonText } from './Skeleton';

interface RewardPoints {
  total: number;
  redeemed: number;
  available: number;
  goal: number;
}

const RewardPointsProgress = () => {
  const [pointsData, setPointsData] = useState<RewardPoints | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPoints = async () => {
      setLoading(true);
      const data = await fetchRewardPoints();
      setPointsData(data);
      setLoading(false);
    };
    loadPoints();
  }, []);

  const progress = pointsData ? (pointsData.available / pointsData.goal) * 100 : 0;
  const data = [
    {
      name: 'Reward Points',
      value: pointsData?.available || 0,
      fill: '#8884d8',
    },
  ];

  if (loading) {
    return (
      <Skeleton className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-64">
        <SkeletonCircle className="w-32 h-32 mb-4" />
        <SkeletonText className="w-3/4 h-5 mb-2" />
        <SkeletonText className="w-1/2 h-4" />
      </Skeleton>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-gray-900 dark:text-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">Reward Points</h2>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="90%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={90 + (progress / 100) * 360}
        >
          <PolarAngleAxis type="number" domain={[0, pointsData?.goal || 1]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={10} fill="#8884d8" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-3xl font-bold fill-current"
          >
            {pointsData?.available}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        You have {pointsData?.available} available points out of {pointsData?.goal} to reach your next goal!
      </p>
      <div className="flex justify-around w-full mt-4 text-sm">
        <div>
          <span className="font-semibold">{pointsData?.total}</span> Total
        </div>
        <div>
          <span className="font-semibold">{pointsData?.redeemed}</span> Redeemed
        </div>
      </div>
    </motion.div>
  );
};

export default RewardPointsProgress;