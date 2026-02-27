import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { 
  GraduationCap, Play, Calendar, Users, LogOut, Loader2, 
  Bookmark, Video, Award, Clock, Star, Heart, ExternalLink,
  Search, BookmarkPlus, Check, Download, X, ChevronRight
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/react-app/components/ui/avatar";
import { Badge } from "@/react-app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/react-app/components/ui/tabs";
import { Input } from "@/react-app/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/react-app/components/ui/dialog";

// Sample data - Available webinars to browse/register
const availableWebinars = [
  { id: 101, title: "Blockchain Fundamentals", date: "Dec 25, 2:00 PM", host: "Alex Rivera", duration: "90 min", thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop", spots: 45, category: "Technology" },
  { id: 102, title: "Digital Marketing Masterclass", date: "Dec 26, 11:00 AM", host: "Emma Wilson", duration: "120 min", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop", spots: 30, category: "Marketing" },
  { id: 103, title: "Cybersecurity Essentials", date: "Dec 27, 3:00 PM", host: "James Chen", duration: "90 min", thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop", spots: 25, category: "Security" },
  { id: 104, title: "AI for Business Leaders", date: "Dec 28, 10:00 AM", host: "Dr. Lisa Park", duration: "60 min", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop", spots: 50, category: "Business" },
  { id: 105, title: "Mobile App Development", date: "Dec 29, 4:00 PM", host: "Ryan Martinez", duration: "120 min", thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop", spots: 35, category: "Development" },
  { id: 106, title: "Public Speaking Mastery", date: "Dec 30, 1:00 PM", host: "Amanda Brooks", duration: "75 min", thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=225&fit=crop", spots: 20, category: "Soft Skills" },
];

// Sample data
const initialUpcomingWebinars = [
  { id: 1, title: "Introduction to Machine Learning", date: "Today, 3:00 PM", host: "Dr. Sarah Chen", duration: "90 min", thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop" },
  { id: 2, title: "Web Development Best Practices", date: "Tomorrow, 10:00 AM", host: "John Smith", duration: "60 min", thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop" },
  { id: 3, title: "Data Science Fundamentals", date: "Dec 20, 2:00 PM", host: "Prof. Mike Johnson", duration: "120 min", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop" },
];

const initialEnrolledCourses = [
  { id: 1, title: "Complete Python Bootcamp", instructor: "Dr. Angela Yu", progress: 65, totalLessons: 24, completedLessons: 16, currentLesson: "Lesson 17: File Handling", thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop" },
  { id: 2, title: "React Masterclass", instructor: "Max Schwarzmüller", progress: 40, totalLessons: 32, completedLessons: 13, currentLesson: "Lesson 14: React Hooks", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop" },
  { id: 3, title: "Machine Learning A-Z", instructor: "Kirill Eremenko", progress: 25, totalLessons: 40, completedLessons: 10, currentLesson: "Lesson 11: Linear Regression", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop" },
  { id: 4, title: "Data Structures & Algorithms", instructor: "Abdul Bari", progress: 80, totalLessons: 28, completedLessons: 22, currentLesson: "Lesson 23: Graph Algorithms", thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop" },
  { id: 5, title: "Cloud Computing Essentials", instructor: "Stephane Maarek", progress: 10, totalLessons: 20, completedLessons: 2, currentLesson: "Lesson 3: AWS Basics", thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=225&fit=crop" },
];

const initialSavedWebinars = [
  { id: 1, title: "Advanced JavaScript Patterns", date: "Recorded", host: "Kyle Simpson", duration: "2h 15min", thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop" },
  { id: 2, title: "UI/UX Design Principles", date: "Recorded", host: "Sarah Drasner", duration: "1h 45min", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop" },
  { id: 3, title: "DevOps for Beginners", date: "Dec 22, 4:00 PM", host: "Nana Janashia", duration: "90 min", thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=225&fit=crop" },
];

const liveSessions = [
  { id: 1, title: "1-on-1 Mentoring: Career Guidance", mentor: "Dr. Sarah Chen", time: "Today, 5:00 PM", status: "scheduled", type: "Video Call", meetLink: "https://meet.google.com/abc-defg-hij" },
  { id: 2, title: "Group Study: React Hooks Deep Dive", mentor: "John Smith", time: "Tomorrow, 3:00 PM", status: "scheduled", type: "Group Session", meetLink: "https://meet.google.com/xyz-uvwx-yz" },
  { id: 3, title: "Q&A Session: Machine Learning", mentor: "Prof. Mike Johnson", time: "Dec 18, 11:00 AM", status: "scheduled", type: "Live Q&A", meetLink: "https://meet.google.com/qrs-tuvw-xyz" },
];

const certificates = [
  { id: 1, title: "Python Programming Fundamentals", issueDate: "Nov 15, 2024", credential: "WH-PY-2024-1234" },
  { id: 2, title: "Introduction to Web Development", issueDate: "Oct 28, 2024", credential: "WH-WD-2024-5678" },
];

const completedWebinars = [
  { id: 1, title: "Cloud Computing Basics", date: "Dec 15, 2024", host: "Stephane Maarek", duration: "1h 30min", rating: 4.8, replayUrl: "#" },
  { id: 2, title: "Introduction to Docker", date: "Dec 10, 2024", host: "Bret Fisher", duration: "2h", rating: 4.9, replayUrl: "#" },
  { id: 3, title: "Git & GitHub Essentials", date: "Dec 5, 2024", host: "Colt Steele", duration: "1h 15min", rating: 4.7, replayUrl: "#" },
];

export default function Dashboard() {
  const { user, logout, isPending } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedWebinarIds, setSavedWebinarIds] = useState<number[]>([1, 2, 3]);
  const [registeredWebinarIds, setRegisteredWebinarIds] = useState<number[]>([1, 2, 3]);
  const [savedWebinars, setSavedWebinars] = useState(initialSavedWebinars);
  const [upcomingWebinars, setUpcomingWebinars] = useState(initialUpcomingWebinars);
  
  // Modal states
  const [courseModal, setCourseModal] = useState<typeof initialEnrolledCourses[0] | null>(null);
  const [sessionModal, setSessionModal] = useState<typeof liveSessions[0] | null>(null);
  const [webinarModal, setWebinarModal] = useState<typeof availableWebinars[0] | null>(null);
  const [certificateModal, setCertificateModal] = useState<typeof certificates[0] | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSaveWebinar = (webinar: typeof availableWebinars[0]) => {
    if (savedWebinarIds.includes(webinar.id)) {
      setSavedWebinarIds(savedWebinarIds.filter(id => id !== webinar.id));
      setSavedWebinars(savedWebinars.filter(w => w.id !== webinar.id));
      showNotification(`Removed "${webinar.title}" from saved`);
    } else {
      setSavedWebinarIds([...savedWebinarIds, webinar.id]);
      setSavedWebinars([...savedWebinars, { 
        id: webinar.id, 
        title: webinar.title, 
        date: webinar.date, 
        host: webinar.host, 
        duration: webinar.duration, 
        thumbnail: webinar.thumbnail 
      }]);
      showNotification(`Saved "${webinar.title}"`);
    }
  };

  const handleRegisterWebinar = (webinar: typeof availableWebinars[0]) => {
    if (!registeredWebinarIds.includes(webinar.id)) {
      setRegisteredWebinarIds([...registeredWebinarIds, webinar.id]);
      setUpcomingWebinars([...upcomingWebinars, {
        id: webinar.id,
        title: webinar.title,
        date: webinar.date,
        host: webinar.host,
        duration: webinar.duration,
        thumbnail: webinar.thumbnail
      }]);
      showNotification(`Successfully registered for "${webinar.title}"!`);
      setWebinarModal(null);
    }
  };

  const handleDownloadCertificate = (cert: typeof certificates[0]) => {
    // Create a simple certificate text file for download
    const certContent = `
═══════════════════════════════════════════════════════════════
                       CERTIFICATE OF COMPLETION
═══════════════════════════════════════════════════════════════

                           WebinarHub

This is to certify that

                    ${user?.google_user_data?.name || user?.email || "Student"}

has successfully completed the course

                    "${cert.title}"

                    
Issue Date: ${cert.issueDate}
Credential ID: ${cert.credential}

═══════════════════════════════════════════════════════════════
                    Verified by WebinarHub
═══════════════════════════════════════════════════════════════
    `;
    
    const blob = new Blob([certContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate-${cert.credential}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Certificate downloaded!");
  };

  const handleJoinSession = (session: typeof liveSessions[0]) => {
    setSessionModal(session);
  };

  const handleContinueCourse = (course: typeof initialEnrolledCourses[0]) => {
    setCourseModal(course);
  };

  const filteredAvailableWebinars = availableWebinars.filter(w => 
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const stats = [
    { icon: Play, label: "Upcoming Webinars", value: upcomingWebinars.length.toString(), color: "from-violet-500 to-purple-600", tab: "upcoming" },
    { icon: Calendar, label: "Completed", value: completedWebinars.length.toString(), color: "from-emerald-500 to-teal-600", tab: "completed" },
    { icon: Users, label: "Enrolled Courses", value: initialEnrolledCourses.length.toString(), color: "from-blue-500 to-cyan-600", tab: "courses" },
    { icon: GraduationCap, label: "Certificates", value: certificates.length.toString(), color: "from-orange-500 to-amber-600", tab: "certificates" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check className="w-5 h-5" />
            {notification}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-white">WebinarHub</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.google_user_data?.picture || undefined} />
                <AvatarFallback className="bg-emerald-500 text-white">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user.google_user_data?.name || user.email}</p>
                <p className="text-xs text-slate-400">Student</p>
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.google_user_data?.given_name || "Student"}! 👋
          </h1>
          <p className="text-slate-300">
            Here's what's happening with your webinars today.
          </p>
        </div>

        {/* Stats - Clickable */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card 
              key={i} 
              className={`bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer hover:border-violet-400/50 transition-all duration-300 ${activeTab === stat.tab ? 'ring-2 ring-violet-500' : ''}`}
              onClick={() => setActiveTab(stat.tab)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border border-white/20 p-1 flex-wrap h-auto">
            <TabsTrigger value="browse" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Search className="w-4 h-4 mr-2" />
              Browse
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Play className="w-4 h-4 mr-2" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Video className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              <Award className="w-4 h-4 mr-2" />
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Browse & Register Webinars */}
          <TabsContent value="browse">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-violet-400" />
                  Browse Webinars
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Discover and register for new webinars
                </CardDescription>
                <div className="pt-2">
                  <Input
                    placeholder="Search by title, host, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAvailableWebinars.map((webinar) => {
                    const isRegistered = registeredWebinarIds.includes(webinar.id);
                    const isSaved = savedWebinarIds.includes(webinar.id);
                    return (
                      <div key={webinar.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-400/50 transition-all relative">
                        <button 
                          onClick={() => handleSaveWebinar(webinar)}
                          className={`absolute top-2 right-2 p-2 rounded-full ${isSaved ? 'bg-pink-500 text-white' : 'bg-black/50 text-white/70 hover:text-pink-400'} transition-colors z-10`}
                        >
                          {isSaved ? <Heart className="w-4 h-4 fill-current" /> : <BookmarkPlus className="w-4 h-4" />}
                        </button>
                        <img src={webinar.thumbnail} alt={webinar.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs mb-2">
                            {webinar.category}
                          </Badge>
                          <h3 className="font-medium text-white mb-1">{webinar.title}</h3>
                          <p className="text-sm text-slate-400 mb-2">by {webinar.host}</p>
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {webinar.date}
                            </div>
                            <span>{webinar.spots} spots left</span>
                          </div>
                          {isRegistered ? (
                            <Button className="w-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-0" size="sm" disabled>
                              <Check className="w-4 h-4 mr-1" />
                              Registered
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => setWebinarModal(webinar)}
                              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0" 
                              size="sm"
                            >
                              Register Now
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Webinars */}
          <TabsContent value="upcoming">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-violet-400" />
                  Upcoming Webinars
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Your scheduled live sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingWebinars.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 mb-4">No upcoming webinars. Browse and register for new ones!</p>
                    <Button onClick={() => setActiveTab("browse")} className="bg-violet-500 hover:bg-violet-600">
                      Browse Webinars
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingWebinars.map((webinar) => (
                      <div key={webinar.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-400/50 transition-all">
                        <img src={webinar.thumbnail} alt={webinar.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h3 className="font-medium text-white mb-1">{webinar.title}</h3>
                          <p className="text-sm text-slate-400 mb-2">Hosted by {webinar.host}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-violet-400">
                              <Clock className="w-3 h-3" />
                              {webinar.date}
                            </div>
                            <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">
                              {webinar.duration}
                            </Badge>
                          </div>
                          <Button 
                            onClick={() => showNotification("Joining webinar...")}
                            className="w-full mt-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0" 
                            size="sm"
                          >
                            Join Webinar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrolled Courses */}
          <TabsContent value="courses">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Continue learning where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {initialEnrolledCourses.map((course) => (
                    <div key={course.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all">
                      <img src={course.thumbnail} alt={course.title} className="w-32 h-20 object-cover rounded-lg hidden sm:block" />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{course.title}</h3>
                        <p className="text-sm text-slate-400 mb-1">by {course.instructor}</p>
                        <p className="text-xs text-blue-400 mb-2">Next: {course.currentLesson}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleContinueCourse(course)}
                            size="sm" 
                            className="bg-blue-500 text-white hover:bg-blue-600 border-0"
                          >
                            <ChevronRight className="w-4 h-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Webinars */}
          <TabsContent value="saved">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-pink-400" />
                  Saved Webinars
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Webinars you've bookmarked for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedWebinars.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 mb-4">No saved webinars yet. Browse and save webinars you're interested in!</p>
                    <Button onClick={() => setActiveTab("browse")} className="bg-pink-500 hover:bg-pink-600">
                      Browse Webinars
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedWebinars.map((webinar) => (
                      <div key={webinar.id} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-pink-400/50 transition-all relative">
                        <button 
                          onClick={() => {
                            setSavedWebinarIds(savedWebinarIds.filter(id => id !== webinar.id));
                            setSavedWebinars(savedWebinars.filter(w => w.id !== webinar.id));
                            showNotification(`Removed "${webinar.title}" from saved`);
                          }}
                          className="absolute top-2 right-2 p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors z-10"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <img src={webinar.thumbnail} alt={webinar.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h3 className="font-medium text-white mb-1">{webinar.title}</h3>
                          <p className="text-sm text-slate-400 mb-2">Hosted by {webinar.host}</p>
                          <div className="flex items-center justify-between">
                            <Badge className={webinar.date === "Recorded" ? "bg-slate-500/20 text-slate-300 border-slate-500/30 text-xs" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs"}>
                              {webinar.date}
                            </Badge>
                            <span className="text-xs text-slate-400">{webinar.duration}</span>
                          </div>
                          <Button 
                            onClick={() => showNotification(webinar.date === "Recorded" ? "Opening video player..." : "Joining live webinar...")}
                            className="w-full mt-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0" 
                            size="sm"
                          >
                            {webinar.date === "Recorded" ? "Watch Now" : "Join Live"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Sessions / Video Calls */}
          <TabsContent value="sessions">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-emerald-400" />
                  Live Sessions
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Your scheduled video calls and mentoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{session.title}</h3>
                          <p className="text-sm text-slate-400">with {session.mentor}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                              {session.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-emerald-400">{session.time}</p>
                        <Button 
                          onClick={() => handleJoinSession(session)}
                          size="sm" 
                          className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Webinars */}
          <TabsContent value="completed">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  Completed Webinars
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Webinars you've attended
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedWebinars.map((webinar) => (
                    <div key={webinar.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <h3 className="font-medium text-white">{webinar.title}</h3>
                        <p className="text-sm text-slate-400">Hosted by {webinar.host} • {webinar.duration}</p>
                        <p className="text-xs text-slate-500 mt-1">{webinar.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{webinar.rating}</span>
                        </div>
                        <Button 
                          onClick={() => showNotification("Opening replay...")}
                          size="sm" 
                          variant="outline" 
                          className="border-violet-500/50 text-violet-400 hover:bg-violet-500/20"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Replay
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Your Certificates
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Certificates you've earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-400/50 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{cert.title}</h3>
                            <p className="text-sm text-slate-400">Issued {cert.issueDate}</p>
                            <p className="text-xs text-amber-400/70 mt-1 font-mono">{cert.credential}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          onClick={() => setCertificateModal(cert)}
                          size="sm" 
                          className="flex-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border-0"
                        >
                          View Certificate
                        </Button>
                        <Button 
                          onClick={() => handleDownloadCertificate(cert)}
                          size="sm" 
                          variant="outline" 
                          className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Course Player Modal */}
      <Dialog open={!!courseModal} onOpenChange={() => setCourseModal(null)}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{courseModal?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">
              by {courseModal?.instructor}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-white/50 mx-auto mb-2" />
                <p className="text-slate-400">{courseModal?.currentLesson}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Lesson {(courseModal?.completedLessons || 0) + 1} of {courseModal?.totalLessons}</span>
              <span>{courseModal?.progress}% complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                style={{ width: `${courseModal?.progress}%` }}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                <Play className="w-4 h-4 mr-2" />
                Start Lesson
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View All Lessons
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Session Join Modal */}
      <Dialog open={!!sessionModal} onOpenChange={() => setSessionModal(null)}>
        <DialogContent className="bg-slate-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{sessionModal?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">
              with {sessionModal?.mentor}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-2">
                <Video className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-emerald-400">{sessionModal?.type}</span>
              </div>
              <p className="text-sm text-slate-300">Scheduled for: {sessionModal?.time}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  window.open(sessionModal?.meetLink, '_blank');
                  setSessionModal(null);
                  showNotification("Opening video call...");
                }}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Join Video Call
              </Button>
              <Button 
                onClick={() => setSessionModal(null)}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Webinar Registration Modal */}
      <Dialog open={!!webinarModal} onOpenChange={() => setWebinarModal(null)}>
        <DialogContent className="bg-slate-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{webinarModal?.title}</DialogTitle>
            <DialogDescription className="text-slate-400">
              by {webinarModal?.host}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img src={webinarModal?.thumbnail} alt={webinarModal?.title} className="w-full h-40 object-cover rounded-lg" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-slate-400">Date & Time</p>
                <p className="font-medium">{webinarModal?.date}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-slate-400">Duration</p>
                <p className="font-medium">{webinarModal?.duration}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-slate-400">Category</p>
                <p className="font-medium">{webinarModal?.category}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-slate-400">Available Spots</p>
                <p className="font-medium">{webinarModal?.spots}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => webinarModal && handleRegisterWebinar(webinarModal)}
                className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm Registration
              </Button>
              <Button 
                onClick={() => setWebinarModal(null)}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate View Modal */}
      <Dialog open={!!certificateModal} onOpenChange={() => setCertificateModal(null)}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Certificate of Completion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 text-center">
              <Award className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <p className="text-slate-400 text-sm mb-2">This is to certify that</p>
              <p className="text-2xl font-bold text-white mb-2">{user.google_user_data?.name || user.email}</p>
              <p className="text-slate-400 text-sm mb-2">has successfully completed</p>
              <p className="text-xl font-semibold text-amber-400 mb-4">"{certificateModal?.title}"</p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500">Issue Date: {certificateModal?.issueDate}</p>
                <p className="text-xs text-slate-500 font-mono">Credential ID: {certificateModal?.credential}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => certificateModal && handleDownloadCertificate(certificateModal)}
                className="flex-1 bg-amber-500 hover:bg-amber-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button 
                onClick={() => setCertificateModal(null)}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
