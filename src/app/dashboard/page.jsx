

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { LogOut, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

// // Import your components (adjust paths if needed)
// import Summary from '../summary/page';
// import Approve1 from '../Office/Approve1/page';
// import Approve2 from '../Office/Approvel2/page';
// import BillEntry from '../Office/BillEntry/page';
// import Payment from '../Office/Payment/page';

// export default function Dashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('summary'); // lowercase 'summary'
//   const [officeDropdownOpen, setOfficeDropdownOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     try {
//       const token = sessionStorage.getItem('token');
//       const userData = sessionStorage.getItem('user');
      
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       if (userData && userData !== 'undefined' && userData !== 'null') {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Dashboard init error:', error);
//       setLoading(false);
//     }
//   }, [router]);

//   const handleLogout = () => {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//     router.push('/login');
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'summary':
//         return <Summary user={user} />;

//       case 'approve1':
//         return <Approve1 user={user} />;

//       case 'approve2':    return <Approve2 user={user} />;
//       case 'billentry':   return <BillEntry user={user} />;
//       case 'payment':     return <Payment user={user} />;

//       default:
//         return <Summary user={user} />; // fallback to summary
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Fixed Navbar */}
//       <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Left - Logo */}
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-4"
//               >
//                 {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//               </button>
//               <div className="flex items-center space-x-2">
//                 <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white font-bold text-lg">D</span>
//                 </div>
//                 <span className="text-lg font-bold text-gray-800 hidden sm:block">
//                   Dimension
//                 </span>
//               </div>
//             </div>

//             {/* Center - Summary + Office buttons */}
//             <div className="flex-1 flex justify-center items-center space-x-8">
//               {/* Summary Button */}
//               <button
//                 onClick={() => {
//                   setActiveTab('summary');
//                   setOfficeDropdownOpen(false);
//                 }}
//                 className={`px-5 py-2 rounded-lg font-medium text-base transition-colors ${
//                   activeTab === 'summary'
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 Summary
//               </button>

//               {/* Office Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setOfficeDropdownOpen(!officeDropdownOpen)}
//                   className={`flex items-center space-x-1.5 px-5 py-2 rounded-lg font-medium text-base transition-colors ${
//                     ['approve1', 'approve2', 'billentry', 'payment'].includes(activeTab)
//                       ? 'bg-blue-100 text-blue-800'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span>Office</span>
//                   {officeDropdownOpen ? (
//                     <ChevronUp className="w-4 h-4" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4" />
//                   )}
//                 </button>

//                 {officeDropdownOpen && (
//                   <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
//                     <button
//                       onClick={() => { setActiveTab('approve1'); setOfficeDropdownOpen(false); }}
//                       className={`w-full px-5 py-3 text-left hover:bg-gray-50 transition-colors text-sm ${activeTab === 'approve1' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
//                     >
//                       Approve 1
//                     </button>
//                     <button
//                       onClick={() => { setActiveTab('approve2'); setOfficeDropdownOpen(false); }}
//                       className={`w-full px-5 py-3 text-left hover:bg-gray-50 transition-colors text-sm ${activeTab === 'approve2' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
//                     >
//                       Approve 2
//                     </button>
//                     <button
//                       onClick={() => { setActiveTab('billentry'); setOfficeDropdownOpen(false); }}
//                       className={`w-full px-5 py-3 text-left hover:bg-gray-50 transition-colors text-sm ${activeTab === 'billentry' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
//                     >
//                       Bill Entry
//                     </button>
//                     <button
//                       onClick={() => { setActiveTab('payment'); setOfficeDropdownOpen(false); }}
//                       className={`w-full px-5 py-3 text-left hover:bg-gray-50 transition-colors text-sm ${activeTab === 'payment' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
//                     >
//                       Payment
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right - Logout */}
//             <div className="flex items-center">
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Main Content Area */}
//           <div className="bg-white rounded-xl shadow-lg p-6 min-h-[600px]">
//             <h2 className="text-lg font-bold text-gray-800 mb-5">
//               {activeTab === 'summary' && 'Dashboard Summary'}
//               {activeTab === 'approve1' && 'Approve 1'}
//               {activeTab === 'approve2' && 'Approve 2'}
//               {activeTab === 'billentry' && 'Bill Entry'}
//               {activeTab === 'payment' && 'Payment Processing'}
//             </h2>

//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

import Summary   from '../summary/page';
import Approve1  from '../Office/Approve1/page';
import Approve2  from '../Office/Approvel2/page';
import BillEntry from '../Office/BillEntry/page';
import Payment   from '../Office/Payment/page';

// ─── Har userType ko jo tabs dikhne chahiye ───────────────────────────────────
// Backend se jo userType aaye, wahi key yahan use karo
// Naya user type aaye to bas ek nai line add karo
const USER_TABS = {
  ADMIN:      ['summary', 'approve1', 'approve2', 'billentry', 'payment'],
  VIJAY:  ['approve1'],
  APPROVEL2:  ['summary', 'approve2'],
  // ACCOUNTANT: ['summary', 'billentry', 'payment'],
};

// Office dropdown mein kaunse tabs aate hain
const OFFICE_TABS = ['approve1', 'approve2', 'billentry', 'payment'];

const TAB_LABELS = {
  summary:   'Summary',
  approve1:  'Approve 1',
  approve2:  'Approve 2',
  billentry: 'Bill Entry',
  payment:   'Payment',
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser]                         = useState(null);
  const [allowedTabs, setAllowedTabs]           = useState([]);
  const [activeTab, setActiveTab]               = useState('summary');
  const [officeDropdownOpen, setOfficeDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [loading, setLoading]                   = useState(true);

  useEffect(() => {
    const token    = sessionStorage.getItem('token');
    const userData = sessionStorage.getItem('user');

    if (!token) { router.push('/login'); return; }

    if (userData) {
      const parsed   = JSON.parse(userData);
      setUser(parsed);

      // userType uppercase karke tabs dhundo
      const key  = (parsed?.userType || '').toUpperCase().replace(/\s+/g, '');
      const tabs = USER_TABS[key] || ['summary'];
      setAllowedTabs(tabs);
      setActiveTab(tabs[0]);
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':   return <Summary   user={user} />;
      case 'approve1':  return <Approve1  user={user} />;
      case 'approve2':  return <Approve2  user={user} />;
      case 'billentry': return <BillEntry user={user} />;
      case 'payment':   return <Payment   user={user} />;
      default:          return <Summary   user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  // Office dropdown mein sirf wahi tabs jo allowed hain
  const visibleOfficeTabs = OFFICE_TABS.filter(t => allowedTabs.includes(t));
  const showSummary       = allowedTabs.includes('summary');
  const showOffice        = visibleOfficeTabs.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 mr-3">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="ml-2 text-lg font-bold text-gray-800 hidden sm:block">Dimension</span>
            </div>

            {/* Center tabs */}
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-6">

              {showSummary && (
                <button
                  onClick={() => { setActiveTab('summary'); setOfficeDropdownOpen(false); }}
                  className={`px-5 py-2 rounded-lg font-medium text-base transition-colors ${
                    activeTab === 'summary' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Summary
                </button>
              )}

              {showOffice && (
                <div className="relative">
                  <button
                    onClick={() => setOfficeDropdownOpen(!officeDropdownOpen)}
                    className={`flex items-center space-x-1.5 px-5 py-2 rounded-lg font-medium text-base transition-colors ${
                      OFFICE_TABS.includes(activeTab) ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>Office</span>
                    {officeDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {officeDropdownOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      {visibleOfficeTabs.map(tab => (
                        <button
                          key={tab}
                          onClick={() => { setActiveTab(tab); setOfficeDropdownOpen(false); }}
                          className={`w-full px-5 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                            activeTab === tab ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {TAB_LABELS[tab]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right - user info + logout */}
            <div className="flex items-center space-x-3">
              {user?.name && (
                <span className="hidden md:block text-sm text-gray-600">{user.name}</span>
              )}
              {user?.userType && (
                <span className="hidden sm:block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  {user.userType}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span className="font-bold text-gray-800">Dimension</span>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {allowedTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSidebarOpen(false); }}
                  className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {TAB_LABELS[tab]}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t">
              <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 min-h-[600px]">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {TAB_LABELS[activeTab]}
            </h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}