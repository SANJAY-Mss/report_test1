"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";

function AuthButtons() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        {session.user?.image ? (
                            <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full" />
                        ) : (
                            <User className="w-4 h-4 text-white" />
                        )}
                    </div>
                </div>
                <button
                    onClick={() => signOut()}
                    className="p-2 text-white/40 hover:text-white transition-colors"
                    title="Sign Out"
                >
                    <LogOut className="w-4 h-4" />
                </button>
                <Link href="/dashboard" className="retune-btn-primary px-6 py-2.5">
                    Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center">
            <Link href="/login" className="text-[10px] mono font-bold text-white/80 hover:text-white transition-colors pr-8 uppercase tracking-widest">
                Login
            </Link>
            <Link href="/signup" className="retune-btn-primary px-6 py-2.5">
                Start Validating Now
            </Link>
        </div>
    );
}

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [activeHash, setActiveHash] = useState("");

    useEffect(() => {
        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show timeline navbar if scrolling up, or if at the very top
            if (currentScrollY < lastY || currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastY && currentScrollY > 50) {
                // Hide if scrolling down and not at the top
                setIsVisible(false);
            }

            lastY = currentScrollY;

            // Scroll spy logic for homepage sections
            if (window.location.pathname === "/") {
                const sections = ['faq', 'how-it-works', 'features'];
                let current = "";

                for (const section of sections) {
                    const el = document.getElementById(section);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        // If the top of the section is passing the middle of the screen
                        if (rect.top <= window.innerHeight * 0.4) {
                            current = `#${section}`;
                            break;
                        }
                    }
                }

                setActiveHash(current);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initialize on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-4 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'top-6 translate-y-0 opacity-100' : '-top-20 -translate-y-full opacity-0'
            }`}>
            {/* Crisp dark container mimicking the Retune aesthetic */}
            <div className="relative h-[68px] bg-[#050505] backdrop-blur-3xl border border-white/10 flex items-center justify-between overflow-hidden pr-3 pl-6">

                {/* Logo section mimicking "O CORE" layout */}
                <Link href="/" className="flex items-center gap-[6px] group shrink-0 relative z-10 w-48">
                    <div className="w-4 h-4 border border-white transition-transform group-hover:scale-110 ml-1" />
                    <span className="text-[15px] font-bold text-white tracking-widest uppercase font-sans">
                        PROJECT<span className="font-light">TRACKER</span>
                    </span>
                </Link>

                {/* Desktop Nav - Centered absolute links with pink active line */}
                <nav className="hidden md:flex items-center justify-center flex-1 h-full relative z-10">
                    {[
                        { label: "Features", href: "/#features" },
                        { label: "How It Works", href: "/#how-it-works" },
                        { label: "Pricing", href: "/pricing" },
                        { label: "FAQ", href: "/#faq" },
                    ].map((item) => {
                        const isHomeSection = item.href.startsWith("/#");
                        const itemHash = item.href.replace("/", "");

                        // Active if we're exactly on the page, or if it's a hash link and it matches the current scroll spy hash
                        let isActive = pathname === item.href;
                        if (pathname === "/" && isHomeSection) {
                            if (activeHash === itemHash) {
                                isActive = true;
                            } else if (activeHash === "" && item.href === "/#features") {
                                // Default fallback top of the page
                                isActive = true;
                            }
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`relative h-full flex items-center px-4 xl:px-6 text-[13px] font-bold tracking-wide transition-colors duration-200 ${isActive ? "text-white" : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA Right side */}
                <div className="hidden md:flex items-center justify-end w-48 shrink-0 relative z-10">
                    <AuthButtons />
                </div>

                {/* Mobile Menu Button  */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-white/70 hover:text-white transition-colors relative z-10"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-20 left-4 right-4 p-4 bg-[#18181c]/95 backdrop-blur-xl rounded-2xl border border-white/10 space-y-4 shadow-2xl animate-in slide-in-from-top-4">
                    <Link href="/#features" className="block text-[13px] font-bold tracking-wide text-white/80 hover:text-white hover:pl-2 transition-all">
                        Features
                    </Link>
                    <Link href="/#how-it-works" className="block text-[13px] font-bold tracking-wide text-white/80 hover:text-white hover:pl-2 transition-all">
                        How It Works
                    </Link>
                    <Link href="/pricing" className="block text-[13px] font-bold tracking-wide text-white/80 hover:text-white hover:pl-2 transition-all">
                        Pricing
                    </Link>
                    <Link href="/#faq" className="block text-[13px] font-bold tracking-wide text-white/80 hover:text-white hover:pl-2 transition-all">
                        FAQ
                    </Link>
                    <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                        <AuthButtons />
                    </div>
                </div>
            )}
        </header>
    );
}
