import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

// Layouts & Protection Routes
import { PublicLayout } from '@/components/layout/PublicLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { RoleRoute } from '@/components/layout/RoleRoute';

// Public Pages
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Pricing } from '@/pages/Pricing';
import { Portfolio } from '@/pages/Portfolio';
import { FAQ } from '@/pages/FAQ';
import { HowItWorks } from '@/pages/HowItWorks';
import { Contact } from '@/pages/Contact';
import { Privacy } from '@/pages/Privacy';
import { Terms } from '@/pages/Terms';
import { Login } from '@/pages/Login';
import { ResetPassword } from '@/pages/ResetPassword';
import { AdminLogin } from '@/pages/AdminLogin';
import { RequestProject } from '@/pages/RequestProject';
import { NotFound } from '@/pages/NotFound';

// Student Dashboard Pages
import { StudentDashboard } from '@/pages/student/StudentDashboard';
import { MyProject } from '@/pages/student/MyProject';
import { Milestones } from '@/pages/student/Milestones';
import { Tasks } from '@/pages/student/Tasks';
import { Files } from '@/pages/student/Files';
import { Messages } from '@/pages/student/Messages';
import { Quotes } from '@/pages/student/Quotes';
import { Payments } from '@/pages/student/Payments';
import { Support } from '@/pages/student/Support';
import { Profile } from '@/pages/student/Profile';

// Admin Dashboard Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { Requests } from '@/pages/admin/Requests';
import { Projects } from '@/pages/admin/Projects';
import { AdminProjectDetail } from '@/pages/admin/AdminProjectDetail';
import { Students } from '@/pages/admin/Students';
import { AdminQuotes } from '@/pages/admin/AdminQuotes';
import { AdminMilestones } from '@/pages/admin/AdminMilestones';
import { AdminMessages } from '@/pages/admin/AdminMessages';
import { AdminPayments } from '@/pages/admin/AdminPayments';
import { AdminPortfolio } from '@/pages/admin/AdminPortfolio';
import { AdminServices } from '@/pages/admin/AdminServices';
import { AdminFAQs } from '@/pages/admin/AdminFAQs';
import { AdminNotifications } from '@/pages/admin/AdminNotifications';
import { AdminSettings } from '@/pages/admin/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/request-project" element={<RequestProject />} />
          </Route>

          {/* Hidden Admin Entry Point */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Student Routes */}
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route element={<RoleRoute allow="student" />}>
              <Route path="/student" element={<DashboardLayout variant="student" />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="project" element={<MyProject />} />
                <Route path="milestones" element={<Milestones />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="files" element={<Files />} />
                <Route path="messages" element={<Messages />} />
                <Route path="quotes" element={<Quotes />} />
                <Route path="payments" element={<Payments />} />
                <Route path="support" element={<Support />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute redirectTo="/admin/login" />}>
            <Route element={<RoleRoute allow="admin" />}>
              <Route path="/admin" element={<DashboardLayout variant="admin" />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="requests" element={<Requests />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<AdminProjectDetail />} />
                <Route path="students" element={<Students />} />
                <Route path="quotes" element={<AdminQuotes />} />
                <Route path="milestones" element={<AdminMilestones />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="faqs" element={<AdminFAQs />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;