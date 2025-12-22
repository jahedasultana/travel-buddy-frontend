"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-primary text-sm font-medium mb-6 border border-teal-100 dark:border-teal-800">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            Connect with 10,000+ travelers
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                           Travel Together,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                                 Create Memories
                            </span>
                        </h1>

                        <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-lg">
                            You don’t have to travel solo. Find companions heading to the same destination and turn trips into memories.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/find-buddy"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white bg-primary hover:bg-teal-800 transition-all shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 transform hover:-translate-y-1"
                            >
                                Find Travel Buddies
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/explore"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-text-primary bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                Explore Destinations
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-sm text-text-secondary">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 overflow-hidden">
                                        <img
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                    +2k
                                </div>
                            </div>
                            <p>Join our growing community</p>
                        </div>
                    </motion.div>

                    {/* Enhanced Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Floating Background Elements */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-20 animate-pulse" />
                            <div className="absolute bottom-20 left-5 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-pulse delay-1000" />
                        </div>

                        <div className="relative z-10 grid grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Main Destination Card */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 hover:scale-105 group"
                                >
                                    <div className="relative overflow-hidden rounded-2xl mb-4">
                                        <img
                                            src="https://www.historyhit.com/app/uploads/bis-images/5150130/Statue-of-Liberty-e1632495792514-750x537-f50_50.jpg?x10081"
                                            alt="Paris"
                                            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full">
                                            <MapPin size={16} className="text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-text-primary mb-1">United States</h3>
                                            <p className="text-sm text-text-secondary flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                Dec 12 - 20
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-text-secondary">3 buddies</p>
                                            <div className="flex -space-x-2 mt-1">
                                                <img src="https://i.pravatar.cc/100?img=20" alt="User" className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" />
                                                <img src="https://i.pravatar.cc/100?img=21" alt="User" className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" />
                                                <img src="https://i.pravatar.cc/100?img=22" alt="User" className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* User Profile Card */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 p-4 rounded-2xl shadow-lg transform rotate-[1deg] hover:rotate-0 transition-all duration-300 border border-teal-200 dark:border-teal-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src="https://i.pravatar.cc/100?img=32" alt="Sarah" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800" />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-text-primary">Sarah Chen</h3>
                                            <p className="text-xs text-text-secondary">Solo Traveler • 24</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-xs bg-teal-200 dark:bg-teal-700 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded-full">Photography</span>
                                                <span className="text-xs bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-full">Adventure</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6 mt-8">
                                {/* Match Success Card */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none transform rotate-[2deg] hover:rotate-0 transition-all duration-500 hover:scale-105 group"
                                >
                                    <div className="relative overflow-hidden rounded-2xl mb-4">
                                        <img
                                            src="https://www.veryhungrynomads.com/wp-content/uploads/2023/08/Historical-Places-of-Mexico-Chichen-Itza.jpg"
                                            alt="Travel Match"
                                            className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                                                ✨ Perfect Match!
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-text-primary mb-1">Mexico</h3>
                                            <p className="text-xs text-text-secondary">2 travelers matched</p>
                                        </div>
                                        <div className="flex -space-x-3">
                                            <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" />
                                            <img src="https://i.pravatar.cc/100?img=45" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Stats Card */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="bg-gradient-to-br from-primary to-teal-700 p-6 rounded-3xl shadow-2xl shadow-teal-900/30 transform rotate-[-1deg] hover:rotate-0 transition-all duration-500 text-white relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-3xl font-bold">2.5K+</h3>
                                            <div className="text-teal-200">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-teal-100 text-sm leading-relaxed">
                                            Successful connections made this month. Your next adventure awaits!
                                        </p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="flex -space-x-1">
                                                {[1,2,3].map(i => (
                                                    <div key={i} className="w-2 h-2 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
                                                ))}
                                            </div>
                                            <span className="text-xs text-teal-200">Live activity</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Mini Activity Card */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl border border-orange-200 dark:border-orange-800 transform rotate-[1deg] hover:rotate-0 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            🎒
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-orange-800 dark:text-orange-200">New Trip Alert!</p>
                                            <p className="text-xs text-orange-600 dark:text-orange-300">Bali • Starting tomorrow</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
