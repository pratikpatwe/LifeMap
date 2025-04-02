'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              See Lifemap in Action
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Watch how our intelligent assistant transforms chaos into clarity with personalized organization.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800"
          >
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 z-0"></div>

            <iframe
              className="absolute inset-0 w-full h-full z-10"
              src="https://www.youtube.com/embed/HiYlb4DECTs?rel=0&showinfo=0"
              title="Lifemap Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Smart Prioritization', description: 'AI-powered task sorting that knows what matters most' },
              { title: 'Focus Time Optimization', description: 'Schedule work during your most productive hours' },
              { title: 'Adaptive Planning', description: 'Adjusts to your patterns and preferences automatically' }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <a
              href="#get-started"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;