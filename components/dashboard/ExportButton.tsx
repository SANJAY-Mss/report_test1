"use client";

import { useState } from "react";
import { Download, FileText, Printer, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExportButtonProps {
  reportId: string;
  filename: string;
}

export function ExportButton({ reportId, filename }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [successDocx, setSuccessDocx] = useState(false);

  // ── Export as Word (.docx) ──
  const handleExportDocx = async () => {
    setLoadingDocx(true);
    setOpen(false);
    try {
      const res = await fetch(`/api/reports/${reportId}/export?format=docx`);
      if (!res.ok) {
        const err = await res.json();
        alert(`Export failed: ${err.error}`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeFilename = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "_");
      a.download = `ProjectTracker_Analysis_${safeFilename}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessDocx(true);
      setTimeout(() => setSuccessDocx(false), 3000);
    } catch (e) {
      alert("Failed to export Word document. Please try again.");
    } finally {
      setLoadingDocx(false);
    }
  };

  // ── Export as PDF (print page in new tab) ──
  const handleExportPdf = async () => {
    setLoadingPdf(true);
    setOpen(false);
    try {
      const res = await fetch(`/api/reports/${reportId}/export?format=pdf`);
      if (!res.ok) {
        alert("Could not fetch report data for PDF export.");
        return;
      }
      const data = await res.json();

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Popup blocked! Please allow popups for this site and try again.");
        return;
      }

      const getSeverityColor = (sev: string) => {
        const map: Record<string, string> = {
          critical: "#dc2626", high: "#d97706", medium: "#ca8a04", low: "#2563eb",
        };
        return map[sev?.toLowerCase()] || "#6b7280";
      };

      const getSeverityBg = (sev: string) => {
        const map: Record<string, string> = {
          critical: "#fef2f2", high: "#fffbeb", medium: "#fefce8", low: "#eff6ff",
        };
        return map[sev?.toLowerCase()] || "#f9fafb";
      };

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Project Tracker — ${data.report.filename}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; color: #111; background: #fff; font-size: 13px; line-height: 1.6; }
    .wrapper { max-width: 900px; margin: 0 auto; padding: 40px 48px; }
    
    /* Header */
    .header { border-bottom: 3px solid #1a1a2e; padding-bottom: 24px; margin-bottom: 32px; }
    .brand { font-size: 28px; font-weight: 800; color: #1a1a2e; letter-spacing: 2px; }
    .brand-sub { font-size: 12px; color: #6b7280; margin-top: 2px; }
    .report-meta { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .meta-item { font-size: 12px; color: #374151; }
    .meta-label { font-weight: 700; color: #1a1a2e; display: inline-block; width: 130px; }

    /* Overall Score Banner */
    .score-banner { background: #1a1a2e; color: #fff; border-radius: 4px; padding: 20px 28px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; }
    .score-banner-left h2 { font-size: 14px; letter-spacing: 1px; opacity: 0.7; font-weight: 500; text-transform: uppercase; }
    .score-banner-left .grade { font-size: 18px; font-weight: 700; margin-top: 4px; }
    .score-banner-right { text-align: right; }
    .score-banner-right .big-score { font-size: 52px; font-weight: 200; line-height: 1; }
    .score-banner-right .score-label { font-size: 11px; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; }

    /* Scores Grid */
    .scores-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 32px; }
    .score-card { border: 1px solid #e5e7eb; border-radius: 4px; padding: 16px; text-align: center; background: #f9fafb; }
    .score-card .val { font-size: 28px; font-weight: 300; color: #1a1a2e; }
    .score-card .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-top: 6px; font-weight: 700; border-top: 1px solid #e5e7eb; padding-top: 6px; }

    /* Section Heading */
    section { margin-bottom: 32px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #1a1a2e; border-bottom: 2px solid #1a1a2e; padding-bottom: 8px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
    .section-count { background: #1a1a2e; color: #fff; font-size: 11px; padding: 2px 10px; border-radius: 20px; font-weight: 700; }

    /* Issue Card */
    .issue-card { border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 12px; overflow: hidden; page-break-inside: avoid; }
    .issue-header { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; }
    .issue-number { font-size: 11px; font-weight: 800; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; }
    .issue-type { display: inline-block; background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 8px; }
    .severity-badge { font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
    .page-badge { font-size: 10px; color: #6b7280; background: #f3f4f6; padding: 2px 8px; border-radius: 2px; font-weight: 600; border: 1px solid #e5e7eb; margin-left: 6px; }
    .issue-body { padding: 14px 16px; background: #fff; }
    .issue-desc { font-size: 13px; color: #1f2937; margin-bottom: 10px; }
    .suggestion-box { background: #f9fafb; border-left: 3px solid #1a1a2e; padding: 10px 14px; font-size: 12px; color: #374151; border-radius: 0 4px 4px 0; }
    .suggestion-label { font-weight: 700; color: #1a1a2e; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }

    /* Tips */
    .tip-item { display: flex; gap: 12px; margin-bottom: 10px; padding: 12px; background: #f9fafb; border-radius: 4px; border: 1px solid #e5e7eb; page-break-inside: avoid; }
    .tip-num { font-size: 14px; font-weight: 800; color: #1a1a2e; min-width: 20px; }
    .tip-text { font-size: 13px; color: #374151; }

    /* Footer */
    .footer { border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 40px; text-align: center; font-size: 11px; color: #9ca3af; }

    /* Print */
    @media print {
      body { font-size: 12px; }
      .wrapper { padding: 20px 30px; }
      .no-print { display: none !important; }
      .issue-card { page-break-inside: avoid; }
      @page { margin: 15mm; }
    }
    
    /* Print button */
    .print-bar { background: #1a1a2e; color: #fff; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
    .print-bar span { font-size: 13px; font-weight: 600; }
    .print-btn { background: #fff; color: #1a1a2e; border: none; padding: 8px 20px; font-size: 12px; font-weight: 700; cursor: pointer; border-radius: 2px; letter-spacing: 0.5px; text-transform: uppercase; }
    .print-btn:hover { background: #e5e7eb; }
  </style>
</head>
<body>
  <!-- Sticky print bar (hidden when printing) -->
  <div class="print-bar no-print">
    <span>🖨️ Project Tracker — ${data.report.filename}</span>
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <div class="brand">PROJECT TRACKER</div>
      <div class="brand-sub">AI-Powered Academic Report Analysis · Anna University 2026 Standards</div>
      <div class="report-meta">
        <div class="meta-item"><span class="meta-label">File Name:</span> ${data.report.filename}</div>
        <div class="meta-item"><span class="meta-label">Upload Date:</span> ${new Date(data.report.uploadedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
        <div class="meta-item"><span class="meta-label">Analysis Date:</span> ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
        <div class="meta-item"><span class="meta-label">Status:</span> ${data.report.status}</div>
      </div>
    </div>

    <!-- Score Banner -->
    <div class="score-banner">
      <div class="score-banner-left">
        <h2>Overall Compliance</h2>
        <div class="grade">${data.grade}</div>
      </div>
      <div class="score-banner-right">
        <div class="big-score">${data.scores.overall}</div>
        <div class="score-label">/ 100</div>
      </div>
    </div>

    <!-- Score Grid -->
    <div class="scores-grid">
      ${[
          { label: "Grammar", val: data.scores.grammar },
          { label: "Structure", val: data.scores.structural },
          { label: "Formatting", val: data.scores.formatting },
          { label: "Clarity", val: data.scores.clarity },
        ].map(s => `
        <div class="score-card">
          <div class="val">${s.val}</div>
          <div class="lbl">${s.label}</div>
        </div>`).join("")}
    </div>

    <!-- Issues Found -->
    <section>
      <div class="section-title">
        Issues Found
        <span class="section-count">${data.violations.length}</span>
      </div>
      ${data.violations.length === 0
          ? `<p style="color:#1a7f37;font-weight:600;">✅ No issues found. Excellent compliance!</p>`
          : data.violations.map((issue: any, i: number) => `
        <div class="issue-card">
          <div class="issue-header" style="background:${getSeverityBg(issue.severity)}">
            <div style="display:flex;align-items:center;gap:0;flex-wrap:wrap;gap:4px;">
              <span class="issue-number">Issue #${i + 1}</span>
              <span class="issue-type">${(issue.type || "issue").replace(/_/g, " ")}</span>
              ${issue.page ? `<span class="page-badge">📄 Page ${issue.page}</span>` : ""}
            </div>
            <span class="severity-badge" style="background:${getSeverityColor(issue.severity)}22;color:${getSeverityColor(issue.severity)};border:1px solid ${getSeverityColor(issue.severity)}44">${issue.severity?.toUpperCase() || "N/A"}</span>
          </div>
          <div class="issue-body">
            <p class="issue-desc">${issue.description || "No description"}</p>
            <div class="suggestion-box">
              <div class="suggestion-label">Suggestion</div>
              ${issue.suggestion || "No suggestion provided."}
            </div>
          </div>
        </div>`).join("")}
    </section>

    ${data.suggestions.length > 0 ? `
    <!-- Improvement Tips -->
    <section>
      <div class="section-title">Improvement Tips</div>
      ${data.suggestions.map((s: any, i: number) => `
        <div class="tip-item">
          <div class="tip-num">${i + 1}.</div>
          <div class="tip-text">${typeof s === "string" ? s : s.description || "Improvement tip"}</div>
        </div>`).join("")}
    </section>` : ""}

    <!-- Footer -->
    <div class="footer">
      Generated by Project Tracker &nbsp;•&nbsp; ${new Date().toLocaleString("en-IN")} &nbsp;•&nbsp; Anna University 2026 Standards
    </div>
  </div>

  <script>
    // Auto-trigger print after a short delay for smooth UX
    // User can also click the sticky button
  </script>
</body>
</html>`;

      printWindow.document.write(html);
      printWindow.document.close();
    } catch (e) {
      alert("Failed to generate PDF preview. Please try again.");
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <div className="relative z-20">
      {/* Main Export Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={loadingDocx || loadingPdf}
        className={cn(
          "inline-flex items-center text-sm font-medium transition-all px-4 py-2 mono text-xs tracking-wider uppercase border",
          successDocx
            ? "border-green-500/50 text-green-400 bg-green-900/20"
            : "text-gray-400 hover:text-white bg-[#0a0a0a] border-[#1a1a1a] hover:border-gray-500"
        )}
      >
        {loadingDocx || loadingPdf ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-500" />
        ) : successDocx ? (
          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {successDocx ? "DOWNLOADED!" : loadingDocx ? "GENERATING..." : loadingPdf ? "PREPARING..." : "EXPORT REPORT"}
        {!loadingDocx && !loadingPdf && !successDocx && (
          <ChevronDown className={cn("w-4 h-4 ml-2 transition-transform duration-200 text-gray-400", open && "rotate-180")} />
        )}
      </button>

      {/* Dropdown */}
      {open && !loadingDocx && !loadingPdf && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-3 border-b border-[#1a1a1a] bg-[#050505]">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 mono">Export Options</p>
              <p className="text-xs text-gray-400 mono">Choose a format to download</p>
            </div>
            
            <div className="py-1">
                {/* Word Export */}
                <button
                onClick={handleExportDocx}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors group"
                >
                <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-white/5 shadow-sm group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 shrink-0 transition-colors">
                    <FileText className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-300 group-hover:text-cyan-400 transition-colors uppercase tracking-widest mono">Word Doc</p>
                    <p className="text-[10px] text-gray-500 mono uppercase tracking-wider">.docx — Share with mentor</p>
                </div>
                </button>

                {/* PDF Export */}
                <button
                onClick={handleExportPdf}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors group"
                >
                <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-white/5 shadow-sm group-hover:border-red-500/50 group-hover:bg-red-500/10 shrink-0 transition-colors">
                    <Printer className="w-4 h-4 text-red-500" />
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-300 group-hover:text-red-400 transition-colors uppercase tracking-widest mono">PDF Document</p>
                    <p className="text-[10px] text-gray-500 mono uppercase tracking-wider">.pdf — Print or save</p>
                </div>
                </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
