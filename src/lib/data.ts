export interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  longDescription?: string;
  technologies: string[];
  logoPath?: string;
  priority: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  stars: number;
  github: string;
  demo: string | null;
  website: string | null;
  embedYouTubeDemo?: boolean;
  priority: number;
}

export const experienceLongDescriptions: Record<number, string> = {
  1: `➤ Developed and deployed production-ready Django and React (TypeScript) features directly impacting the company’s web application. Integrated PostgreSQL, GraphQL, and AWS S3 to support scalable media operations.

➤ Designed and launched a new Media Shuttle API that automatically emails uploaded AWS S3 file links and paths to admin users, streamlining post-upload workflows.

➤ Built an email parser service that scans admin inboxes for missing S3 paths or upload notifications and returns file locations via automated replies, reducing manual search time by over 95% (from minutes to under a second).

➤ Implemented a new application module - Project Category Type - allowing admins to dynamically classify projects as Commercial, Movie, or TV. Enabled instant backend synchronization via GraphQL refetching, improving UI responsiveness by 80%.

➤ Redesigned the invoice management system and refactored backend queries to include detailed metadata; integrated frontend view/download features and corrected major UI alignment issues, increasing client usability and visual consistency.

➤ Collaborated in a fast-paced startup team, ensuring stable deployments and immediate visibility of all production updates on a live web platform.`,
  2: `➤ Engineered and deployed scalable SaaS modules using React, Django, and PostgreSQL, improving API response times and UI performance by 35%.  

➤ Designed and implemented REST and GraphQL endpoints to support enterprise workflows, optimizing data retrieval and integrating third-party authentication APIs.  

➤ Collaborated with cross-functional teams to identify and resolve bugs in production, enhancing system stability and code reliability.  

➤ Refactored front-end components in TypeScript for dynamic rendering and accessibility, ensuring responsive layouts across multiple client dashboards.  

➤ Applied Agile development practices and version control (Git) to streamline code reviews, documentation, and sprint-based feature delivery.`,
  3: `➤ Conducting research on hand pose estimation for American Sign Language (ASL) using Computer Vision and Artificial Intelligence to improve gesture recognition accuracy and temporal modeling.  

➤ Implemented advanced sequence alignment algorithms, including Dynamic Time Warping (DTW) and Edit Distance, to quantify motion and structural similarity between temporal gesture trajectories.  

➤ Designed and evaluated multiple similarity metrics for self-supervised and few-shot learning frameworks, reducing feature drift and improving recognition robustness.  

➤ Developed preprocessing pipelines for spatiotemporal data normalization and hand joint extraction using OpenCV, MediaPipe, and deep learning-based keypoint detectors.  

➤ Contributed to model experimentation with Convolutional Neural Networks (CNNs) and Graph Neural Networks (GCNs) for temporal sequence classification and representation learning.  

➤ Analyzed performance trade-offs across architectures using PyTorch and TensorFlow, emphasizing generalization across signers and environmental conditions.  

➤ Authored documentation and reproducible Jupyter notebooks supporting ongoing research in human-centered AI and multimodal gesture understanding.  

➤ The broader objective of this project is to advance accessible communication technologies by integrating self-supervised vision models with linguistic pattern recognition in ASL.`,

  4: `➤ Conducted research in Human Pose Estimation using advanced Computer Vision and Artificial Intelligence methodologies, focusing on deep learning architectures such as CNNs, GCNs, and Transformers.  

➤ Published a peer-reviewed paper in IEEE Access titled “A Comprehensive Review of Modern Techniques in Human Pose Estimation,” presenting a rigorous analysis of state-of-the-art models, benchmark datasets, and neural architectures.  

➤ Collaborated on the development and evaluation of neural networks tailored for 2D and 3D pose estimation, improving spatial keypoint detection accuracy and inference efficiency.  

➤ Presented a research poster at the SEE GSW Conference, highlighting the integration of AI-driven vision systems in Special Education and assistive learning contexts.  

➤ Contributed to dataset preprocessing, model training, and comparative analysis of pose estimation pipelines using frameworks like TensorFlow, PyTorch, and OpenCV.  

➤ Strengthened expertise in machine learning, data analysis, and experimental design while advancing accessible AI research within human-centered computing.`,
  
  5: `➤ Facilitated peer-led sessions for undergraduate courses in Data Structures, Algorithms, and Discrete 
Mathematics, reinforcing core programming, logic, and analytical concepts.  

➤ Designed interactive coding activities and algorithm visualization exercises to improve conceptual understanding and student engagement.  

➤ Tutored students individually and in groups, addressing knowledge gaps in recursion, graph theory, sorting, and complexity analysis through targeted practice.  

➤ Created problem sets, mock exams, and structured review materials that enhanced performance and boosted session attendance across multiple cohorts.`,

  6: `➤ Conducting research in event-based computer vision and neuromorphic data analysis under Prof. Diego Patino, focusing on deep learning workflows built with Python, TensorFlow, PyTorch, and OpenCV.
  
➤ Collaborating with Ph.D. researchers to design a novel event data representation technique for machine learning pipelines, improving accuracy and efficiency across multiple event-vision benchmarks.  

➤ Developed and evaluated several event camera representations using the EVIMO dataset; contributed to preprocessing pipelines, representation analysis, and performance validation workflows.  

➤ Experimented with loss functions and optimization strategies on the DDD17 dataset using Convolutional Neural Networks (CNNs) and pretrained ResNet-50 models for steering angle prediction.  

➤ Implemented end-to-end steering angle estimation on the DDD20 dataset (Maqueda et al., 2018) using ResNet-18 and custom CNN architectures, achieving a Root Mean Square Error (RMSE) of 32.8°.  

➤ Created an open-source UI conversion tool that transforms AEDAT4 files into event-frame and RGB-frame sequences, allowing users to visualize frames individually and adjust FPS interactively.  

➤ The project’s goal is to detect visual precursors to structural failure by analyzing event-based motion cues, enabling early prevention of bridge and infrastructure collapse scenarios.  

➤ Authored the research proposal “Event Cameras: A Survey,” summarizing state-of-the-art datasets, representations, and deep learning approaches in neuromorphic vision.`,

  7: `➤ Successfully organized and managed an APSI event on campus, overseeing participation from 500+ attendees.

➤ Collaborated with a cross-functional team to coordinate logistics, scheduling, and on-site operations.

➤ Ensured smooth execution by addressing real-time challenges, enhancing communication, and optimizing team workflows.

➤ Developed skills in large-scale event planning, stakeholder coordination, and high-pressure problem-solving.`,

  8: `➤ Collaborated in a 4-member team to design and deliver MavPrep, a real-time exam preparation and collaboration platform, presented at the ACM Create Summit, supporting 100+ concurrent users across study sessions.

➤ Developed a high-performance frontend using Next.js, React, TypeScript, and Tailwind CSS, improving usability and reducing onboarding friction, resulting in 30% faster task completion during user testing.

➤ Implemented real-time voice and video communication using WebRTC, enabling multi-user study rooms with sub-300ms latency and stable peer-to-peer connections.

➤ Engineered real-time messaging and signaling systems using Socket.IO, supporting low-latency (<100ms) message delivery, presence tracking, and synchronized communication across users.

Designed and integrated a scalable serverless backend using AWS Amplify, Cognito, and DynamoDB, enabling secure authentication and persistent storage for 10K+ messages.

➤ Optimized end-to-end real-time communication pipelines across text, voice, and video, reducing synchronization delays by 40% and improving reliability under concurrent usage.`,

  9: `➤ Architected, built, and launched a core AI research agent, owning end-to-end delivery across orchestration, retrieval, extraction, reporting, persistence, and UI integration to create a scalable workflow from query intake to actionable output.

➤ Designed and productionized a multi-stage AI research pipeline spanning entity resolution, semantic retrieval, crawl/search discovery, structured extraction, and automated report generation, reducing manual research effort by 80%+ and cutting end-to-end latency by 50%.

➤ Engineered a hybrid ranking framework combining keyword search, semantic embeddings, historical signals, and multi-factor scoring, improving retrieval relevance by 30% and reducing irrelevant results by 35% across high-volume research workflows.

➤ Built a React-based workflow and analytics interface, delivering interactive dashboards, tree-based research exploration, and run-level insights across 1K+ records, improving time-to-insight by 35% and increasing user engagement by 2x.

➤ Implemented entity disambiguation, source verification, and LLM-based relevance scoring for attribution-sensitive research outputs, reducing false positives by 60%+ and improving extraction precision by 40% while strengthening trust and explainability.`,

  10: `➤ Led a team of 7 as Project Manager in ACM Create UTA, driving execution of Silo through sprint planning, task delegation, and cross-functional coordination.

➤ Defined project roadmap and milestones, ensuring timely delivery and improving team efficiency by 40% through structured agile workflows.

➤ Architected and built an end-to-end prompt evaluation pipeline enabling automated drift testing (baseline vs candidate), reducing deployment risk for LLM applications.

➤ Developed semantic similarity scoring using embeddings and text distance metrics, improving prompt evaluation accuracy by 35% and enabling objective quality gating.

➤ Implemented latency tracking and regression detection, preventing performance degradation and ensuring consistent response times across prompt versions.

➤ Built scalable backend services using FastAPI and PostgreSQL (Supabase) to manage prompt suites, versions, and 1K+ test executions with persistent evaluation metrics.

➤ Designed CI/CD integration endpoints for automated prompt testing workflows, enabling seamless integration with developer pipelines and Git-based version control.`
}

export const experiences: Experience[] = [
  { id: 1, title: "Software Engineer Intern", company: "Hotspring", startDate: "2024-08", endDate: "2024-12", description: "Developed full-stack Django and React features, automated S3 workflows, improved UI responsiveness, optimized backend queries, and enhanced live production performance.", technologies: ["React", "Node.js", "AWS", "Docker"], logoPath: "/logo/hotspring_logo.jpg", priority: 5, longDescription: experienceLongDescriptions[1] },
  { id: 2, title: "Software Engineer Intern", company: "TopSource Worldwide", startDate: "2024-06", endDate: "2024-08", description: "Developed scalable SaaS modules with React, Django, and PostgreSQL, optimized APIs and UI, improved reliability, and streamlined Agile-based development.", technologies: ["Vue.js", "Python", "PostgreSQL"], logoPath: "/logo/topsource_worldwide_logo.jpg", priority: 5, longDescription: experienceLongDescriptions[2] },
  { id: 3, title: "Research Assistant - Hand Pose Estimation and Self-Supervised Learning for ASL Recognition", company: "The University of Texas at Arlington", startDate: "2024-08", endDate: "2025-08", description: "Researched ASL hand pose estimation using AI, implementing DTW and CNN-GCN models to enhance gesture recognition, robustness, and accessibility.", technologies: ["JavaScript", "HTML/CSS", "Git"], logoPath: "/logo/university_of_texas_at_arlington_logo.jpg", priority: 3, longDescription: experienceLongDescriptions[3] },
  { id: 4, title: "Research Assistant - Human Pose Estimation and AI Systems", company: "The University of Texas at Arlington", startDate: "2024-10", endDate: "2025-10", description: "Researched deep learning-based human pose estimation using CNNs, GCNs, and Transformers; published in IEEE Access; improved model accuracy and accessibility.", technologies: ["Python", "JavaScript", "REST APIs"], logoPath: "/logo/university_of_texas_at_arlington_logo.jpg", priority: 3, longDescription: experienceLongDescriptions[4] },
  { id: 5, title: "Supplemental Instruction Leader", company: "Academic Success Center (UTA)", startDate: "2025-01", endDate: "2025-12", description: "Led peer instruction for Data Structures, Algorithms, and Discrete Math; created interactive activities, tutoring sessions, and review materials to boost comprehension.", technologies: ["HTML", "CSS", "jQuery", "WordPress"], logoPath: "/logo/university_of_texas_at_arlington_logo.jpg", priority: 2, longDescription: experienceLongDescriptions[5] },
  { id: 6, title: "Undergraduate Research Assistant", company: "Primal Lab (UTA)", startDate: "2025-05", endDate: null, description: "Researched event-based computer vision using CNNs and ResNet models, improving event data representations and enabling real-time structural failure prediction systems.", technologies: ["Event Vision", "PyTorch"], logoPath: "/logo/university_of_texas_at_arlington_logo.jpg", priority: 4, longDescription: experienceLongDescriptions[6] },
  { id: 7, title: "APSI Student Assistant", company: "Honor's College (UTA)", startDate: "2025-06", endDate: "2025-06", description: "Organized and managed a large-scale APSI campus event with 500+ attendees, coordinating logistics, teams, and operations to ensure seamless execution.", technologies: ["Communication"], logoPath: "/logo/university_of_texas_at_arlington_logo.jpg", priority: 1, longDescription: experienceLongDescriptions[7] },
  { id: 8, title: "ACM Create Member", company: "ACM (UTA)", startDate: "2025-09", endDate: "2025-12", description: "Serving as ACM Create Member, developing MavsPrep, a web platform that provides UTA students with organized study materials and academic resources.", technologies: ["NextJS"],logoPath: "/logo/acmuta_logo.jpg", priority: 3, longDescription: experienceLongDescriptions[8] },
  { id: 9, title: "AI Native Software Engineer Intern", company: "Ozcorp Scientific LLC", startDate: "2025-12", endDate: null, description: "Built and deployed an end-to-end AI Research Agent that automates entity resolution, retrieval, extraction, ranking, and reporting, reducing manual effort by 80%+, improving relevance by 30%, and cutting latency by 50% while enhancing accuracy and explainability.", technologies: ["LangChain", "NextJS", "AWS", "Docker", "Cursor"], logoPath: "/logo/ozcorp_scientific_logo.jpg", priority: 6, longDescription: experienceLongDescriptions[9] },
  { id: 10, title: "ACM Create Project Manager", company: "ACM (UTA)", startDate: "2026-1", endDate: "2026-5", description: "Led a 7-person team to ship Silo — an LLM prompt evaluation platform — through agile sprints, improving team efficiency by 40% and delivering CI/CD-integrated drift detection.", technologies: ["FastAPI", "PostgreSQL", "Next.js", "Python", "Agile"], logoPath: "/logo/acmuta_logo.jpg", priority: 4, longDescription: experienceLongDescriptions[10] },
];

export const projects: Project[] = [
  { id: 1, title: "UTA Lost & Found", description: "Comprehensive Android app for the UTA campus community with authentication, item reporting, smart search, auto-matching, push notifications, and admin dashboard. Built with Material 3 design.", icon: "📱", tags: ["Kotlin", "Jetpack Compose", "Firebase", "Android"], stars: 0, github: "https://github.com/aroudrasthakur/lostandfound", demo: "https://youtu.be/arhO11kpSTY", website: null, priority: 9 },
  { id: 2, title: "MavPrep", description: "All in one UTA focused study platform with real time chat, voice and video calls, secure login, course based channels, and smart exam prep tools designed to help Mavericks collaborate and succeed academically.", icon: "📚", tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AWS", "WebRTC", "Socket.IO"], stars: 0, github: "https://github.com/aroudrasthakur/Cloud_Migration", demo: "https://main.d3hckg0mxkbe7d.amplifyapp.com/", website: null, priority: 11 },
  { id: 3, title: "LangPal", description: "Language learning partner app connecting users with language exchange partners worldwide. Features real-time chat, partner discovery, safety features, and dark mode support.", icon: "🌍", tags: ["React Native", "TypeScript", "Expo", "AsyncStorage"], stars: 0, github: "https://github.com/aroudrasthakur/LangPal-Prototype", demo: null, website: null, priority: 10 },
  { id: 4, title: "TicketFinder", description: "Ticketing engine that helps users find concerts and games using GoogleAPI, TicketMaster API, and IpInfo API with an intuitive interface.", icon: "🎫", tags: ["TypeScript", "Python", "React", "Django"], stars: 0, github: "https://github.com/aroudrasthakur/TicketFinder", demo: null, website: null, priority: 9 },
  { id: 5, title: "Store Management System", description: "PHP + MySQL based web application for managing stores, vendors, and inventory. Features CRUD operations, stock tracking, and vendor management.", icon: "🏪", tags: ["PHP", "MySQL", "Apache", "CSS"], stars: 0, github: "https://github.com/aroudrasthakur/StoreManagementAndWebInterface", demo: null, website: null, priority: 8 },
  { id: 6, title: "ASL Similarity Measures", description: "Research project implementing Dynamic Time Warping (DTW) and similarity measures for American Sign Language recognition and gesture analysis.", icon: "🤖", tags: ["Python", "DTW", "Machine Learning", "Computer Vision"], stars: 0, github: "https://github.com/aroudrasthakur/Similarity-Measures", demo: null, website: null, priority: 7 },
  { id: 7, title: "Embedded Systems Projects", description: "Collection of C-based projects including HealthMart Pharmacy system, Virtual Chatbot, Alarm System, Sonar Range Finder, and Temperature Sensor on Raspberry Pi 4.", icon: "💻", tags: ["C", "Raspberry Pi", "Embedded Systems", "IoT"], stars: 0, github: "https://github.com/aroudrasthakur/Projects", demo: null, website: null, priority: 6 },
  { id: 8, title: "Personal Portfolio Website", description: "Modern, interactive portfolio website showcasing experiences, projects, and skills with dynamic components and engaging UI elements.", icon: "🎨", tags: ["Next.js", "React", "JavaScript", "CSS"], stars: 0, github: "https://github.com/aroudrasthakur/personal_website", demo: null, website: null, priority: 5 },
  { id: 9, title: "Horizon", description: "Horizon is a comprehensive mobile application designed to provide critical support during natural disasters and emergencies. By combining real-time disaster tracking, emergency service location, and user profile management, Horizon empowers both individuals seeking assistance and emergency service providers.", icon: "🚨", tags: ["JavaScript", "TypeScript", "MongoDB", "Streamlit", "React-Native", "HTML", "CSS", "API"], stars: 0, github: "https://github.com/V-prajit/HackUTA6", demo: null, website: null, priority: 8 },
  { id: 10, title: "Slang Detection LLM", description: "A language model fine-tuned to detect and interpret slang terms in social media text, enhancing sentiment analysis accuracy.", icon: "🗣️", tags: ["Python", "TensorFlow", "NLP", "Machine Learning"], stars: 0, github: "https://github.com/aroudrasthakur/SlangDetectionLLM", demo: null, website: null, priority: 7 },
  { id: 11, title: "Steering Wheel Angle Prediction", description: "Developed a deep learning model to predict steering wheel angles from road images using CNNs, enhancing autonomous driving capabilities.", icon: "🚗", tags: ["Python", "Keras", "Computer Vision", "Deep Learning"], stars: 0, github: "", demo: "https://youtu.be/5VmE4qFt2L8", website: null, priority: 10 },
  { id: 12, title: "Bod-Fix", description: "A fitness application that provides the user with a form correction tool to allow the users to perform exercises with the correct form using pose estimation techniques.", icon: "🏋️‍♂️", tags: ["Python", "OpenCV", "Mediapipe", "Flask"], stars: 0, github: "", demo: null, website: null, priority: 8 },
  { id: 13, title: "PiSense", description: "Modular backend for running, evaluating, and improving conversational agents with retrieval and safety controls. Includes FastAPI routes for chat/eval/admin, an in-memory RAG prototype with optional OpenAI or local Hugging Face fallbacks, and Alembic migrations for persistence.", icon: "🤖", tags: ["Python", "FastAPI", "RAG", "SQLAlchemy", "HuggingFace"], stars: 0, github: "https://github.com/aroudrasthakur/PiSense", demo: null, website: null, priority: 12 },
  { id: 14, title: "AEDAT Stream Viewer", description: "Web app for side-by-side visualization of AEDAT4 event streams and RGB frames. Backend (FastAPI) parses AEDAT files, serves synchronized event windows and frames; frontend (vanilla JS + canvas) renders low-latency event visualization with playback and scrub controls.", icon: "📹", tags: ["Python", "FastAPI", "JavaScript", "AEDAT", "Visualization"], stars: 0, github: "https://github.com/aroudrasthakur/AEDAT_video_tool", demo: null, website: null, priority: 11 },
  { id: 15, title: "Slackbot", description: "Built a production-grade Slackbot and realtime Next.js dashboard for Forward-Deployed Engineers that classifies Slack messages with OpenAI and groups them into actionable tickets using vector similarity and strict guardrails. Designed for reliability and scale with sequential message processing, cross-channel context retrieval, and live ticket updates via Socket.IO.", icon: "🏢", tags: ["Slackbot", "Realtime Systems", "LLMs", "Semantic Search", "Next.js", "Node.js", "Socket.IO"], stars: 0, github: "https://github.com/aroudrasthakur/nixo-slackbot", demo: "https://youtu.be/Pks6yqSAxU8", embedYouTubeDemo: true, website: null, priority: 13 },
  { id: 16, title: "Cicada AML", description: "Built Cicada AML, a full-stack blockchain anti-money-laundering investigation platform that ingests transaction CSVs, builds wallet graphs, runs 185 heuristics and five ML risk lenses, and surfaces suspicious wallets, clusters, flow explanations, reports, and SAR exports in an investigator-ready dashboard.", icon: "🕵️", tags: ["AML", "Blockchain", "FastAPI", "React", "Machine Learning", "Graph Analytics", "Supabase", "Risk Scoring"], stars: 0, github: "https://github.com/aroudrasthakur/Cicada-AML", demo: null, website: null, priority: 14 },
  { id: 17, title: "Silo", description: "Built Silo, a production-ready prompt testing platform that detects prompt drift, compares baseline vs. candidate versions, runs staged evaluations over stored test cases, and gates deployments with CI-ready pass/fail signals, diagnostics, human review, and optimization telemetry.\n\nTry it out:\n`npm install silo-drift-cli`", icon: "🧪", tags: ["Prompt Testing", "LLMOps", "FastAPI", "Next.js", "Supabase", "CI/CD", "Drift Detection", "CLI"], stars: 5, github: "https://github.com/acmuta/Silo", demo: "https://youtu.be/UvGiuThrQqw", website: "https://silo-frontend.onrender.com/", embedYouTubeDemo: true, priority: 15 },
  ];

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export function sortExperiencesByPriority(exps: Experience[]): Experience[] {
  return [...exps].sort((a, b) => {
    if ((b.priority || 0) !== (a.priority || 0)) return (b.priority || 0) - (a.priority || 0);
    return (b.endDate || '9999-99').localeCompare(a.endDate || '9999-99');
  });
}

function toSortableMonth(dateStr: string | null): number {
  if (!dateStr) return Number.MAX_SAFE_INTEGER;

  const [yearPart, monthPart = '1'] = dateStr.split('-');
  const year = Number.parseInt(yearPart, 10);
  const month = Number.parseInt(monthPart, 10);

  if (Number.isNaN(year) || Number.isNaN(month)) return 0;
  return year * 100 + month;
}

export function sortExperiencesByNewest(exps: Experience[]): Experience[] {
  return [...exps].sort((a, b) => {
    const endDiff = toSortableMonth(b.endDate) - toSortableMonth(a.endDate);
    if (endDiff !== 0) return endDiff;

    const startDiff = toSortableMonth(b.startDate) - toSortableMonth(a.startDate);
    if (startDiff !== 0) return startDiff;

    return (b.priority || 0) - (a.priority || 0);
  });
}

export function sortProjectsByPriority(projs: Project[]): Project[] {
  return [...projs].sort((a, b) => {
    if ((b.priority || 0) !== (a.priority || 0)) return (b.priority || 0) - (a.priority || 0);
    return b.stars - a.stars;
  });
}
