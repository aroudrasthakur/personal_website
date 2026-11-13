import { useState, useEffect } from "react";

export default function ResumeViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"1-page" | "2-page">("1-page");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      console.log("Opening resume viewer");
      setIsOpen(true);
    };
    window.addEventListener("openResumeViewer", handleOpen);
    console.log("ResumeViewer mounted and listening for events");
    return () => window.removeEventListener("openResumeViewer", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTabChange = (tab: "1-page" | "2-page") => {
    if (tab === activeTab || isAnimating) return;
    setIsAnimating(true);
    setActiveTab(tab);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const resumePath =
    activeTab === "1-page" ? "/resume/1 page.pdf" : "/resume/2 Page.pdf";

  return (
    <div className="resume-viewer-overlay" onClick={() => setIsOpen(false)}>
      <div
        className="resume-viewer-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-viewer-header">
          <div className="resume-tabs">
            <button
              className={`resume-tab ${activeTab === "1-page" ? "active" : ""}`}
              onClick={() => handleTabChange("1-page")}
              disabled={isAnimating}
            >
              <span className="resume-tab-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="13" y2="15" />
                </svg>
              </span>
              <span>1-Page</span>
            </button>
            <button
              className={`resume-tab ${activeTab === "2-page" ? "active" : ""}`}
              onClick={() => handleTabChange("2-page")}
              disabled={isAnimating}
            >
              <span className="resume-tab-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="8" y1="6" x2="10" y2="6" />
                  <line x1="8" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="6" x2="16" y2="6" />
                  <line x1="14" y1="10" x2="16" y2="10" />
                </svg>
              </span>
              <span>2-Page</span>
            </button>
          </div>
          <button
            className="resume-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close resume viewer"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div
          className={`resume-viewer-content ${isAnimating ? "animating" : ""}`}
        >
          <iframe
            src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=1`}
            className="resume-iframe"
            title={`Resume - ${activeTab}`}
          />
        </div>
        <div className="resume-viewer-footer">
          <a href={resumePath} download className="resume-download-btn">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
