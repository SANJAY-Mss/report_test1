import React from 'react';
import Link from 'next/link';

export function BottomCTA() {
  return (
    <section className="pt-24 pb-0 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          Smart report validation<br />for modern academics
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          Upload unlimited documents, receive instantaneous grading insights, and ensure absolute compliance with your university's guidelines.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/signup" className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
            Start Scanning
          </Link>
          <Link href="/contact" className="px-8 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all w-full sm:w-auto">
            For Universities
          </Link>
        </div>

        {/* Massive Dashboard Mockup */}
        <div className="relative max-w-5xl mx-auto">
           {/* Abstract glow behind the dashboard */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-blue-100/50 blur-[100px] rounded-full z-0" />
           
           <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-200 border-b-0 overflow-hidden min-h-[500px] flex">
              
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-100 p-6 hidden md:block bg-gray-50/30">
                 <div className="flex items-center gap-2 mb-10">
                    <div className="w-6 h-6 bg-blue-600 rounded-md grid place-items-center">
                       <div className="w-2 h-2 bg-white rotate-45" />
                    </div>
                    <span className="font-bold text-lg text-black tracking-tight">ReportGuard</span>
                 </div>
                 
                 <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm">
                       <span className="text-lg">⊞</span> Dashboard
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                       <span className="text-lg">📄</span> My Reports
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                       <span className="text-lg">✍</span> AI Editor
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                       <span className="text-lg">🛡</span> Plagiarism
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                       <span className="text-lg">⚙</span> Settings
                    </div>
                 </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-8 bg-white text-left">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h2 className="text-2xl font-bold text-gray-900">Recent Scans</h2>
                       <p className="text-sm text-gray-500 mt-1">Review your latest formatting and plagiarism checks.</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-xs shadow-sm">🔍</div>
                       <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:bg-blue-700 transition">
                         +
                       </div>
                    </div>
                 </div>

                 {/* Kanban Board Columns -> Scan Columns */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                       <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                          <h3 className="font-bold text-gray-800">Uploaded</h3>
                          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">2</span>
                       </div>
                       {/* Task Card */}
                       <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-sm text-gray-900 mb-1">Chapter 1 Review.docx</h4>
                          <p className="text-xs text-gray-500 mb-3">Checking against University Standard IEEE template.</p>
                          <div className="flex gap-2 mb-4">
                             <span className="px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-100 text-[10px] font-bold rounded">Waiting</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="w-[10%] bg-yellow-400 h-1.5 rounded-full"></div></div>
                       </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                       <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                          <h3 className="font-bold text-gray-800">Scanning</h3>
                          <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">1</span>
                       </div>
                       {/* Task Card */}
                       <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-sm text-gray-900 mb-1">Literature_Review.pdf</h4>
                          <p className="text-xs text-gray-500 mb-3">Running deep plagiarism and citation checks.</p>
                          <div className="flex gap-2 mb-4">
                             <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold rounded">Analyzing</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="w-[65%] bg-blue-500 h-1.5 rounded-full animate-pulse"></div></div>
                       </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-4">
                       <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                          <h3 className="font-bold text-gray-800">Completed</h3>
                          <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-0.5 rounded-full">12</span>
                       </div>
                       {/* Task Card */}
                       <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-200">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-sm text-gray-900">Final_Thesis.pdf</h4>
                            <span className="text-sm font-black text-green-500">98%</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">Analysis complete. 2 minor margin formatting issues found.</p>
                          <div className="flex gap-2">
                             <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold rounded">Excellent</span>
                             <span className="px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-[10px] font-bold rounded">Export PDF</span>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
