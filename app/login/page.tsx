"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo/Brand */}
        <div className="mb-12 relative">
          <div className="w-16 h-16 bg-gradient-to-tr from-gray-700 to-gray-500 rounded-full flex items-center justify-center transform rotate-45">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full transform -rotate-45">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-white text-transparent bg-clip-text">
                  N
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 w-full text-center">
            <span className="text-gray-300 text-xl font-medium">Nova</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full space-y-6 bg-gray-900/50 p-8 rounded-2xl backdrop-blur-xl border border-gray-800">
          <h1 className="text-2xl font-medium text-gray-200 text-center mb-8">
            Welcome back
          </h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                         transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600
                         transition-colors"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-gray-800 border-gray-700 rounded"
              />
              <span className="text-sm text-gray-400 ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-300">
              Forgot password?
            </a>
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200">
            Sign In
          </Button>

          <div className="text-center">
            <span className="text-gray-500">Don't have an account? </span>
            <Link href="/signup" className="text-gray-300 hover:text-white">
              Sign up
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;