"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  Settings,
  Home,
  PieChart,
  ArrowRightLeft,
} from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  first_name: string;
  // add other profile fields as needed
}

const Dashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          router.push("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        setUser(profile as UserProfile);
      } catch (error) {
        console.error("Error in getUser:", error);
        router.push("/login");
      }
    };

    getUser();
  }, [router, supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-200">Nova</h2>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
            <Home size={20} className="text-gray-400" />
            <span className="font-medium text-gray-200">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50">
            <CreditCard size={20} className="text-gray-400" />
            <span className="text-gray-300">Cards</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50">
            <ArrowRightLeft size={20} className="text-gray-400" />
            <span className="text-gray-300">Transactions</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50">
            <PieChart size={20} className="text-gray-400" />
            <span className="text-gray-300">Analytics</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50">
            <Settings size={20} className="text-gray-400" />
            <span className="text-gray-300">Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-200">
            Welcome, {user?.first_name || "User"}!
          </h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700">
              Move money
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="mb-6 bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold text-gray-200 mb-4">$0.00</h2>
            <div className="h-40 w-full bg-gray-800/50 rounded-lg"></div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Cards Section */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-200">My Cards</CardTitle>
              <button className="text-sm px-3 py-1 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800">
                + Add bank
              </button>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 text-gray-200">
                {/* Placeholder for card design */}
              </div>
            </CardContent>
          </Card>

          {/* Spend Activity */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">Spend activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-gray-800/50 rounded-lg"></div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Section */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Transaction rows would go here */}
              <div className="p-4 border border-gray-800 rounded-lg bg-gray-800/50">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Transaction placeholder</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
