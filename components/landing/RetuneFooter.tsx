import React from 'react';
import Link from 'next/link';

export function RetuneFooter() {
    return (
        <footer className="w-full py-12 px-6 border-t border-slate-200 flex flex-col items-center justify-center text-center bg-white">
            <div className="mono text-[10px] text-slate-500 w-full max-w-7xl flex justify-between">
                <span>© {new Date().getFullYear()} PROJECT TRACKER</span>
                <span>[ SYSTEM ACTIVE ]</span>
            </div>
        </footer>
    );
}
