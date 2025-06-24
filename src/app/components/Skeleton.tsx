'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

const Skeleton = ({ className, children }: SkeletonProps) => {
  return (
    <motion.div
      className={`relative animate-pulse overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
    >
      {children}
    </motion.div>
  );
};

export const SkeletonRect = ({ className }: SkeletonProps) => (
  <Skeleton className={`w-full h-4 ${className}`} />
);

export const SkeletonCircle = ({ className }: SkeletonProps) => (
  <Skeleton className={`w-10 h-10 rounded-full ${className}`} />
);

export const SkeletonText = ({ className }: SkeletonProps) => (
  <Skeleton className={`w-3/4 h-3 ${className}`} />
);

export default Skeleton;