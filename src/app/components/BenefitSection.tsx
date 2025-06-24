'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BenefitCard from './BenefitCard';
import { fetchBenefits } from '@/lib/api';
import Skeleton, { SkeletonRect, SkeletonText } from './Skeleton';

interface Benefit {
  id: string;
  title: string;
  icon: string;
  description: string;
  ctaText: string;
}

const BenefitsSection = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBenefits = async () => {
      setLoading(true);
      const data = await fetchBenefits();
      setBenefits(data);
      setLoading(false);
    };
    loadBenefits();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
        Your Exclusive Benefits
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 p-5 flex flex-col justify-between">
                <SkeletonRect className="w-12 h-12 mx-auto mb-3" />
                <SkeletonText className="w-3/4 h-5 mx-auto mb-2" />
                <SkeletonText className="w-full h-3 mb-4" />
                <SkeletonRect className="w-24 h-10 mx-auto" />
              </Skeleton>
            ))
          : benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="h-full"
              >
                <BenefitCard {...benefit} key={benefit.id} />
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
};

export default BenefitsSection;