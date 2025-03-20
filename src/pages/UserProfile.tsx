
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, LogOut, Wallet, Calendar, Settings } from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      navigate('/login');
      return;
    }
    
    setUserInfo(JSON.parse(storedUserInfo));
    
    // Get wallet balance
    const walletData = JSON.parse(localStorage.getItem('walletData') || '{"balance": 0}');
    setWalletBalance(walletData.balance);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate('/login');
  };
  
  if (!userInfo) {
    return null; // or a loading indicator
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Card */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-2">
                  <AvatarImage src="" alt={userInfo.name} />
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {userInfo.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userInfo.name}</CardTitle>
                <CardDescription>{userInfo.email}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Wallet size={16} />
                    <span>Wallet Balance</span>
                  </div>
                  <span className="font-semibold">{walletBalance} Coins</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Total Bookings</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="destructive" 
                  className="w-full flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </CardFooter>
            </Card>
            
            {/* Main Content Area */}
            <div className="md:col-span-2">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="appointments">My Appointments</TabsTrigger>
                  <TabsTrigger value="wallet">My Wallet</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <User size={18} />
                        Account Details
                      </CardTitle>
                      <CardDescription>
                        Your personal information and settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-1">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{userInfo.name}</p>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="font-medium">{userInfo.email}</p>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm text-muted-foreground">Account Created</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full flex items-center gap-2">
                        <Settings size={16} />
                        Edit Profile
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appointments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar size={18} />
                        My Appointments
                      </CardTitle>
                      <CardDescription>
                        View and manage your upcoming and past appointments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>You don't have any appointments yet.</p>
                        <Button className="mt-4" variant="outline" onClick={() => navigate('/professionals')}>
                          Book a Professional
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="wallet" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Wallet size={18} />
                        My Wallet
                      </CardTitle>
                      <CardDescription>
                        Manage your coins and transactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-primary/10 p-4 rounded-lg mb-6 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Balance</p>
                          <p className="text-3xl font-semibold">{walletBalance} Coins</p>
                        </div>
                        <Button onClick={() => navigate('/wallet')}>Add Coins</Button>
                      </div>
                      
                      <div className="text-center py-4 text-muted-foreground">
                        <p>No recent transactions to display.</p>
                        <Button 
                          className="mt-4" 
                          variant="outline" 
                          onClick={() => navigate('/wallet')}
                        >
                          View All Transactions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
