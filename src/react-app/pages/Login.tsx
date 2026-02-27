import { GraduationCap, Shield, Play, Users, Calendar } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { useAuth } from "@getmocha/users-service/react";
import { useNavigate } from "react-router";

export default function Login() {
  const { redirectToLogin, user, isPending } = useAuth();
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    sessionStorage.setItem("login_role", "student");
    redirectToLogin();
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem("login_role", "admin");
    redirectToLogin();
  };

  // If already logged in, redirect to appropriate dashboard
  if (!isPending && user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-white">WebinarHub</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Hero text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">WebinarHub</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Your gateway to interactive learning experiences. Join live webinars, engage with experts, and expand your knowledge.
            </p>
          </div>

          {/* Login cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Student Login */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-violet-400/50 transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Student</CardTitle>
                <CardDescription className="text-slate-300">
                  Join webinars and access learning materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    Watch live and recorded webinars
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Participate in Q&A sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Access your schedule
                  </li>
                </ul>
                <Button 
                  onClick={handleStudentLogin}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                  size="lg"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Sign in as Student
                </Button>
              </CardContent>
            </Card>

            {/* Admin Login */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-violet-400/50 transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Administrator</CardTitle>
                <CardDescription className="text-slate-300">
                  Manage webinars and conduct sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-violet-400" />
                    Create and manage webinars
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-violet-400" />
                    Monitor attendee engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-violet-400" />
                    Requires MFA verification
                  </li>
                </ul>
                <Button 
                  onClick={handleAdminLogin}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0"
                  size="lg"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Sign in as Administrator
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-sm mt-8">
            Sign in with your Google account to continue
          </p>
        </div>
      </main>
    </div>
  );
}
