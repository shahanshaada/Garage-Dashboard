'use client';
import ThemeToggle from '@/app/components/ThemeToggle';
import UserProfileSummary from '@/app/components/UserProfileSummary';
import BenefitsSection from '@/app/components/BenefitSection';
import RewardPointsProgress from '@/app/components/RewardPointsProgress';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.header
        className="w-full max-w-6xl flex justify-between items-center py-4 px-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          CRED Garage Dashboard
        </h1>
        <ThemeToggle />
      </motion.header>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div className="md:col-span-1 flex flex-col gap-6">
          <UserProfileSummary />
          <RewardPointsProgress />
        </div>

        <div className="md:col-span-2">
          <BenefitsSection />
        </div>
      </main>

      <motion.footer
        className="w-full max-w-6xl text-center py-4 text-gray-500 dark:text-gray-400 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        © {new Date().getFullYear()} CRED Garage Inspired Dashboard. All rights reserved.
      </motion.footer>
    </div>
  );
}