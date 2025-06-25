'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BenefitCardProps {
  title: string;
  icon: string;
  description: string;
  ctaText: string;
}

const BenefitCard = ({ title, icon, description, ctaText }: BenefitCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 h-full"
      whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      {icon ? <img className="mb-2" src={icon} height={36} width={36}/> : null}
      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-50">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
        {description}
      </p>
      <Button className="w-full">
        {ctaText}
      </Button>
    </motion.div>
  );
};

export default BenefitCard;