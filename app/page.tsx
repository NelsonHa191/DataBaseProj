"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Menu,
  X,
  Shield,
  CreditCard,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-gray-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">N</span>
              </div>
              <span className="text-xl font-medium">Nova</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm text-gray-300 hover:text-white">
                Cards
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">
                Banking
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">
                Security
              </a>
              <Link href="./login">
                <Button
                  variant="ghost"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
        fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out
        transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        md:hidden
      `}
      >
        <div className="pt-20 px-4 space-y-6">
          <a href="#" className="block text-lg text-gray-300">
            Cards
          </a>
          <a href="#" className="block text-lg text-gray-300">
            Banking
          </a>
          <a href="#" className="block text-lg text-gray-300">
            Security
          </a>
          <Button className="w-full">Sign In</Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text">
            Banking Reimagined
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience the future of finance with our premium metal card and
            advanced digital banking.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Button className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500">
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto h-12 px-8 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Floating Card Visual */}
        {/*<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-20">
          <img
            src="/api/placeholder/800/500"
            alt="Credit Card"
            className="w-full h-auto"
          />
        </div>*/}
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Features
            </h2>
            <p className="text-gray-400 text-lg">
              Experience banking without compromises
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800">
              <CreditCard className="h-12 w-12 mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold mb-4">Metal Card</h3>
              <p className="text-gray-400">
                Premium metal card with contactless payment and global
                acceptance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800">
              <Smartphone className="h-12 w-12 mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold mb-4">Digital Banking</h3>
              <p className="text-gray-400">
                Advanced mobile app with instant notifications and controls.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800">
              <Shield className="h-12 w-12 mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold mb-4">Security First</h3>
              <p className="text-gray-400">
                State-of-the-art encryption and fraud protection systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Card Section */}
      <div className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Premium Metal Card
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Experience unlimited possibilities with our signature metal
                card. Crafted from premium materials for those who demand
                excellence.
              </p>
              <Button className="h-12 px-8 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500">
                Apply Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                <img
                  src="/api/placeholder/600/600"
                  alt="Premium Card"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">N</span>
                </div>
                <span className="text-xl font-medium">Nova</span>
              </div>
              <p className="text-gray-500">
                Next generation banking for the digital age.
              </p>
            </div>

            <div>
              <h4 className="text-gray-300 font-medium mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Accounts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Savings
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-300 font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-300 font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">© 2024 Nova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
