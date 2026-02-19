import Link from "next/link";
import { Shield, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[rgb(var(--card))]">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold gradient-text">ReportGuard</span>
                        </div>
                        <p className="text-sm text-foreground/60">
                            AI-powered academic report analyzer for Anna University standards.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li><Link href="/features" className="hover:text-purple-500 transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-purple-500 transition-colors">Pricing</Link></li>
                            <li><Link href="/docs" className="hover:text-purple-500 transition-colors">Documentation</Link></li>
                            <li><Link href="/changelog" className="hover:text-purple-500 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li><Link href="/blog" className="hover:text-purple-500 transition-colors">Blog</Link></li>
                            <li><Link href="/tutorials" className="hover:text-purple-500 transition-colors">Tutorials</Link></li>
                            <li><Link href="/guidelines" className="hover:text-purple-500 transition-colors">Anna University Guidelines</Link></li>
                            <li><Link href="/support" className="hover:text-purple-500 transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li><Link href="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-purple-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/security" className="hover:text-purple-500 transition-colors">Security</Link></li>
                            <li><Link href="/contact" className="hover:text-purple-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-foreground/60">
                    <p>&copy; {new Date().getFullYear()} ReportGuard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
