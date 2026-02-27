import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Play, Calendar, Users, LogOut, Loader2, Plus, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/react-app/components/ui/avatar";
import { Badge } from "@/react-app/components/ui/badge";

export default function AdminDashboard() {
  const { user, logout, isPending } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  const initials = user.google_user_data?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-white">WebinarHub</span>
            <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">Admin</Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.google_user_data?.picture || undefined} />
                <AvatarFallback className="bg-violet-500 text-white">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user.google_user_data?.name || user.email}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-300">
              Manage your webinars and monitor engagement.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Create Webinar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Play, label: "Total Webinars", value: "24", change: "+3 this month", color: "from-violet-500 to-purple-600" },
            { icon: Users, label: "Total Attendees", value: "1,234", change: "+156 this week", color: "from-emerald-500 to-teal-600" },
            { icon: Calendar, label: "Scheduled", value: "8", change: "Next 7 days", color: "from-blue-500 to-cyan-600" },
            { icon: BarChart3, label: "Avg. Attendance", value: "87%", change: "+5% vs last month", color: "from-orange-500 to-amber-600" },
          ].map((stat, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="text-xs text-emerald-400">{stat.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Webinars management */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Webinars</CardTitle>
            <CardDescription className="text-slate-300">
              Manage and monitor your webinar sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Introduction to Machine Learning", date: "Today, 3:00 PM", attendees: 45, status: "Live Soon" },
                { title: "Web Development Best Practices", date: "Tomorrow, 10:00 AM", attendees: 32, status: "Scheduled" },
                { title: "Data Science Fundamentals", date: "Dec 20, 2:00 PM", attendees: 67, status: "Scheduled" },
                { title: "Cloud Computing Basics", date: "Dec 15, 2:00 PM", attendees: 89, status: "Completed" },
              ].map((webinar, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <h3 className="font-medium text-white">{webinar.title}</h3>
                    <p className="text-sm text-slate-400">{webinar.date} • {webinar.attendees} attendees</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      webinar.status === "Live Soon" 
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : webinar.status === "Completed"
                        ? "bg-slate-500/20 text-slate-300 border-slate-500/30"
                        : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    }>
                      {webinar.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="border-violet-500/50 text-violet-400 hover:bg-violet-500/20">
                      {webinar.status === "Completed" ? "View Stats" : "Manage"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
