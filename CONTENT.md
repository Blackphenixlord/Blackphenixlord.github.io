# Content inventory — `fresh-build`

Every piece of user-visible text on `master`, where it came from, and whether
it has landed in the new site. Each quoted line is checked by
`npm run check:content`, which searches the built `_site/` (HTML, plus the
JS that prints terminal output) for the exact string and ticks the box.

Legend: `[x]` present in the new build · `[ ]` missing · `[~]` deliberately
not carried, with the reason (UI for a feature the rebuild removed — never
a claim or a fact).

Sources: `site` = `src/_data/site.js`, `projects` = `src/_data/projects.js`,
page names = `src/<page>.html` on master, `home.js` / `resume.js` /
`boot.js` / `contact.js` / `app.js` = the master scripts that printed text.

## Site data (`site`)
- [ ] "Joshua Collado" — site.name
- [ ] "Building software that ships, systems that matter." — site.tagline
- [ ] "joshuacollado636@gmail.com" — site.email
- [ ] "Home" — site.nav
- [ ] "About" — site.nav
- [ ] "Internships" — site.nav
- [ ] "Projects" — site.nav
- [ ] "Résumé" — site.nav
- [ ] "Testimonials" — site.nav
- [ ] "Contact" — site.nav
- [ ] "Full-Stack" — site.categoryLabels
- [ ] "VR / XR" — site.categoryLabels
- [ ] "Automation" — site.categoryLabels
- [ ] "Research" — site.categoryLabels
- [ ] "Security" — site.categoryLabels
- [ ] "Hardware" — site.categoryLabels

## Shared chrome (every page)
- [ ] "Skip to main content" — nav partial
- [ ] "Built with" — footer
- [ ] "UTRGV" — footer ("© 2026 Joshua Collado · Built with </> · UTRGV")
- [ ] "Go to Home" — palette
- [ ] "Go to About" — palette
- [ ] "Go to Internships" — palette
- [ ] "Go to Projects" — palette
- [ ] "Go to Résumé" — palette
- [ ] "Go to Testimonials" — palette
- [ ] "Go to Contact" — palette
- [ ] "Open résumé" — palette action
- [ ] "Toggle scan lines" — palette action
- [ ] "Dyslexia mode" — tweaks
- [ ] "OpenDyslexic + wider spacing" — tweaks
- [ ] "Search commands" — palette
- [ ] "type a command or search..." — palette placeholder
- [~] "Toggle background music" / "lofi: off" — lofi player removed (no audio in rebuild)
- [~] "Custom cursor" / "Green dot crosshair" — custom cursor removed
- [~] "Scroll bar" / "Progress indicator" — replaced by the menubar scroll readout
- [~] "Sound effects" / "Synthesised UI clicks, off by default" — UI sounds removed
- [~] "Accent color" / "Green" / "Red" / "Yellow" / "Cyan" — one green accent only (theme 1)

## Boot sequence (`boot.js`)
- [ ] "JC/OS 2026.05 LTS" — boot banner
- [ ] "joshua-collado.local" — boot banner
- [ ] "joshua-collado login: " — boot
- [ ] "Authenticating..." — boot
- [ ] "[ LOGIN OK ]" — boot
- [ ] "Last login: " — boot
- [ ] "from 127.0.0.1" — boot
- [ ] "Welcome, Joshua Collado." — boot
- [ ] "NASA . Los Alamos . Nerdvana . RECON" — boot
- [ ] "click or press any key to skip" — index boot hint

## Home (`index.html`, `home.js`)
- [ ] "Joshua Collado | Portfolio" — title
- [ ] "Joshua Collado — Engineer, developer, and builder. UTRGV dual enrollment student with internships at NASA, Los Alamos, and RECON Technologies." — meta description
- [ ] "joshua@collado — bash — 80×24" — boot window title
- [ ] "./engineer" — hero logo
- [ ] "Open to Work" — hero badge ("● Open to Work · 2026")
- [ ] "< Hello, World! />" — hero eyebrow
- [ ] "UTRGV Dual Enrollment · Science Academy · Engineering + Computer Science" — hero
- [ ] "View Projects" — hero CTA
- [ ] "Get In Touch" — hero CTA
- [ ] "Including NASA & Los Alamos" — stat (4 Internships)
- [ ] "NASA Trips" — stat (2)
- [ ] "2 visits to Houston" — stat
- [ ] "Languages" — stat (5+)
- [ ] "Coding languages" — stat
- [ ] "Active Projects" — stat (4)
- [ ] "Running in parallel" — stat
- [ ] "Who I Am" — section
- [ ] "Innovative" — trait
- [ ] "From NASA HUNCH to Los Alamos Lab — I build things that haven't existed before and solve real problems." — home trait
- [ ] "Driven" — trait
- [ ] "I've presented to NASA, led teams across multiple internships, and I'm just getting started." — home trait
- [ ] "Purposeful" — trait
- [ ] "Every project I touch has a mission behind it — national security, education, or community impact." — home trait
- [ ] "About Me" — section
- [ ] "cat about.txt" — terminal
- [ ] "try typing: whoami · skills · contact" — terminal hint
- [ ] "// who am i" — home.js about text header
- [ ] "My name is" — home.js about text
- [ ] "with Los Alamos National Laboratory" — home.js about text
- [ ] "co-creating a STEM sandbox for elementary schools with" — home.js about text
- [ ] "engineer, developer, builder." — whoami
- [ ] "UTRGV Dual Enrollment · Science Academy · South Texas." — whoami
- [ ] "Python · Java · JavaScript · HTML/CSS · SQL · C" — skills
- [ ] "Git · Android · VR/Unity · Full-Stack Dev" — skills
- [ ] "AI · Automation · Security" — skills
- [ ] "RECON Technologies · City of Progresso Civic Platform" — projects cmd
- [ ] "NASA HUNCH · Inventory Chain System (Houston finals)" — projects cmd
- [ ] "Los Alamos Lab · VR Training Experience" — projects cmd
- [ ] "Project Evie · AI Home Automation (in progress)" — projects cmd
- [ ] "Available commands:" — help
- [ ] "command not found:" — error
- [ ] "Selected Work" — section
- [ ] "What I have built, and what I am building right now." — section lede
- [ ] "All work" — link
- [ ] "Highlights" — section
- [ ] "Web Dev · RECON" — highlight
- [ ] "Java · JS · Python · C" — highlight
- [ ] "HTML · CSS · SQL" — highlight
- [ ] "VR Development" — highlight
- [ ] "AI Assistant (Evie)" — highlight
- [ ] "Read the case study" — card link

## Projects data (`projects`) — all seven, every field
### progresso-civic-platform
- [ ] "City of Progresso — Civic Platform" — title
- [ ] "RECON Technologies" — org
- [ ] "Code Lead, Security Developer & Design Assistant" — role
- [ ] "Shipped" — status
- [ ] "Web Dev" — stack
- [ ] "Civic Tech" — stack
- [ ] "A secure digital platform giving Progresso residents centralized access to city information, public services, and official records." — summary
- [ ] "Brought a small South Texas city into the digital era — modern, secure, and publicly accessible." — outcome
### inventory-chain-system
- [ ] "Inventory Chain System" — title
- [ ] "NASA HUNCH" — org
- [ ] "2025 – 2026" — years
- [ ] "Full-stack builder and systems teammate" — role
- [ ] "Houston finals" — status
- [ ] "Systems Design" — stack
- [ ] "A full-stack inventory tracking workflow built for NASA's Human Exploration & Operations division. Covers UI, real-time data flow, and multi-team collaboration." — summary
- [ ] "Advanced to the Houston finals and presented directly to NASA representatives." — outcome
### vitals
- [ ] "VITALS — Medical Diagnostic System" — title
- [ ] "2026 – 2027" — years
- [ ] "Team lead and diagnostic engine developer" — role
- [ ] "In progress" — status
- [ ] "AI / ML" — stack
- [ ] "Local LLM" — stack
- [ ] "Knowledge Base" — stack
- [ ] "NVIDIA Jetson" — stack
- [ ] "An offline medical diagnostic assistant for crews far from Earth. A local language model does the reasoning, and a curated medical knowledge base grounds every answer it gives." — summary
- [ ] "Leading Team TETHER through the 2026–27 NASA HUNCH Software & Technology challenge, with the engine, the public site, and the review boards built." — outcome
- [ ] "A crew on the Moon cannot wait on a round trip to Houston every time someone feels wrong. They need a diagnostic aid that runs on board, with no connection to the ground." — problem
- [ ] "A local LLM (served through Ollama) is the reasoner, and a medical knowledge base keeps it honest: the model answers, the knowledge base backs the answer. It is built to run on an NVIDIA Jetson. Sensor and camera inputs are left as open slots rather than filled with plausible fake readings, so nothing in a demo pretends to be data it is not." — approach
- [ ] "The project site" — link label
- [ ] "VITALS · Team TETHER" — link title (→ /vitals/)
### vr-training-experience
- [ ] "VR Training Experience" — title
- [ ] "Los Alamos National Laboratory" — org
- [ ] "XR developer and simulation collaborator" — role
- [ ] "Delivered" — status
- [ ] "Simulation" — stack
- [ ] "A virtual reality training simulation designed for immersive, hands-on instruction in a research environment, built with scientists at one of the US government's top national labs." — summary
- [ ] "Earned an in-person visit to Los Alamos National Laboratory as the only student selected." — outcome
### project-evie
- [ ] "Project Evie" — title
- [ ] "Capstone / Personal" — org
- [ ] "Product designer and AI systems developer" — role
- [ ] "Android" — stack
- [ ] "Cross-Platform" — stack
- [ ] "A personal AI assistant that bridges Android and Windows into a single automation layer — controlling apps, routines, and devices from one unified interface." — summary
- [ ] "Establishing the foundation for a fully AI-powered home control and productivity system." — outcome
### vla-3d-printing
- [ ] "VLA-Enabled 3D Printing" — title
- [ ] "UTRGV Externship" — org
- [ ] "Software lead — vision and control" — role
- [ ] "Machine Vision" — stack
- [ ] "Vision-Language-Action" — stack
- [ ] "Voron 2.4" — stack
- [ ] "G-code" — stack
- [ ] "A large-format, Voron-based 3D printer with a camera and an ML supervisor that watches each layer, catches defects as they happen, and steps in to correct them." — summary
- [ ] "Scoped the full software plan — control loop, defect responses, training data, and a phased build that proves itself on a small printer before moving to the Voron." — outcome
### screen-deck
- [ ] "Screen Deck" — title
- [ ] "Personal" — org
- [ ] "Designer and developer" — role
- [ ] "PowerShell" — stack
- [ ] "WPF" — stack
- [ ] "Touch UI" — stack
- [ ] "A Stream Deck–style touch launcher for a spare touchscreen: tabbed button grids, per-app volume sliders, a soundboard, calendar, notes, and live home-lab stats." — summary
- [ ] "Runs every day on my desk as the control surface for my PC, games, and home lab." — outcome

## Case-study pages (`work.njk`)
- [ ] "Role" — label
- [ ] "Timeline" — label
- [ ] "Status" — label
- [ ] "Outcome" — label
- [ ] "The problem" — label
- [ ] "What I built" — label
- [ ] "The internship behind it" — label
- [ ] "Want the detail?" — label
- [ ] "Get in touch" — link
- [ ] "Keep reading" — aria-label of next/prev

## Projects (`projects.html`)
- [ ] "Projects — Joshua Collado" — title
- [ ] "Work samples and projects by Joshua Collado — NASA HUNCH, VR Training, Project Evie, and more." — meta description
- [ ] "What I built, who it was for, and what came of it." — lede
- [ ] "All" — filter
- [ ] "Nothing in that discipline yet." — empty state
- [ ] "Filter projects by discipline" — aria-label

## About (`about.html`)
- [ ] "About Me | Joshua Collado" — title
- [ ] "About Joshua Collado — Dual Enrollment student, engineer, and builder from South Texas with internships at NASA, Los Alamos, RECON, and Nerdvana." — meta description
- [ ] "Engineer · Developer · Builder · South Texas" — subtitle
- [ ] "UTRGV Dual Enrollment" — tag
- [ ] "Science Academy" — tag
- [ ] "NASA HUNCH Alumni" — tag
- [ ] "Los Alamos Lab" — tag
- [ ] "Class of 2027" — tag
- [ ] "Introduction" — section
- [ ] "and I'm a dual enrollment student at UTRGV through the Science Academy — studying engineering, computer science, and the future. I'm from South Texas, and I'm on a mission to use technology to make life better, smarter, and more collaborative." — intro p1
- [ ] "on an Inventory Chain System that granted me 2 visits to the Houston HQ, built a Virtual Reality training experience with" — intro p2
- [ ] "developed a city website with" — intro p2
- [ ] "and co-created a STEM sandbox for elementary schools with" — intro p2
- [ ] "Right now I'm designing Evie — a personal AI assistant that connects Android and Windows into a unified home automation network. My goal is to become a software engineer and an AI developer who builds systems that actually change how people live and work." — intro p3
- [ ] "Background" — section
- [ ] "Interests" — card
- [ ] "Artificial intelligence & machine learning" — interest
- [ ] "Virtual reality and immersive systems" — interest
- [ ] "Home automation and IoT" — interest
- [ ] "Cybersecurity and national security tech" — interest
- [ ] "Competitive robotics & engineering design" — interest
- [ ] "Music production and creative coding" — interest
- [ ] "Education" — card
- [ ] "Science Academy — STISD High School" — education
- [ ] "STEM-focused engineering and CS track" — education
- [ ] "UTRGV Dual Enrollment — 2025–2027" — education
- [ ] "College-level coursework while in high school" — education
- [ ] "Expected graduation: 2027" — education
- [ ] "Languages & Tools" — card
- [ ] "Python · Java · JavaScript · C" — tools
- [ ] "HTML · CSS · SQL" — tools
- [ ] "Git · Android Studio · Unreal/VR" — tools
- [ ] "Full-stack web development" — tools
- [ ] "AI integration & automation" — tools
- [ ] "Extracurriculars" — card
- [ ] "TSA Club — Technology Student Association" — extracurricular
- [ ] "Design challenges & collaborative engineering" — extracurricular
- [ ] "BPA Club — Business Professionals of America" — extracurricular
- [ ] "Competitive tech events and leadership" — extracurricular
- [ ] "Community volunteer: graphic design support" — extracurricular
- [ ] "Leadership" — card
- [ ] "Team lead on multi-phase school engineering project" — leadership
- [ ] "Organized a student coding workshop on web design basics" — leadership
- [ ] "Coordinated cross-disciplinary NASA HUNCH team" — leadership
- [ ] "Mentored younger students in STEM projects" — leadership
- [ ] "A Bit More About Me" — card
- [ ] "From South Texas — proud of where I'm from" — more
- [ ] "I'm bilingual: English & Spanish" — more
- [ ] "I learn best by building, not watching" — more
- [ ] "My desk is half workstation, half lab" — more
- [ ] "Lofi hip-hop always playing while I code" — more
- [ ] "Three Words That Define Me" — section
- [ ] "From NASA HUNCH to Los Alamos Lab — I build things that haven't existed before and solve problems no one has handed me a template for." — trait
- [ ] "I've presented to NASA engineers, led teams across multiple internships, and I'm just a junior in high school. I'm only getting started." — trait
- [ ] "Every project I touch has a mission behind it — national security, education, or community impact. I don't build for the sake of building." — trait
- [ ] "Where I'm Headed" — section
- [ ] "Goals & Vision" — section
- [ ] "NOW — 2027" — goal
- [ ] "Finish Strong at Science Academy" — goal
- [ ] "Complete the dual enrollment program at UTRGV, graduate with a strong foundation in engineering and CS, and ship at least one public project that has real users." — goal
- [ ] "2027 — 2031" — goal
- [ ] "Computer Science Degree" — goal
- [ ] "Pursue a B.S. in Computer Science or Software Engineering, with a focus on AI systems and human-computer interaction. I want to study somewhere that values builders, not just test-takers." — goal
- [ ] "2031+" — goal
- [ ] "Software Engineer & AI Developer" — goal
- [ ] "Work on systems that matter — AI, automation, security, or space tech. Ultimately, I want to build products used by millions of people, or infrastructure that protects them. Either way, I'm building something real." — goal
- [ ] "Want to know more?" — CTA
- [ ] "Check out my work, internship experience, or just say hello." — CTA
- [ ] "View Internships" — CTA
- [ ] "My Résumé" — CTA

## Internships (`internships.html`)
- [ ] "Internships | Joshua Collado" — title
- [ ] "Joshua Collado's internship experience — NASA HUNCH, Nerdvana, and UTRGV." — meta description
- [ ] "Real-world engineering, research, and development across four programs." — lede
- [ ] "2026 – 2027" — RECON dates
- [ ] "Web Developer — Code Lead & Security Dev" — RECON role
- [ ] "Built a secure digital platform for the City of Progresso, providing public access to city information, services, and records." — RECON
- [ ] "2025 – 2027" — NASA dates
- [ ] "Team Lead — VITALS · Full-Stack Builder" — NASA role
- [ ] "Built an inventory tracking system that advanced to NASA's Houston finals. Now leading Team TETHER on VITALS, an offline AI medical diagnostic system." — NASA
- [ ] "Nerdvana" — program
- [ ] "STEM Educator & Tech Developer" — Nerdvana role
- [ ] "Co-created an interactive STEM sandbox for elementary students, bringing hands-on coding and engineering concepts to the classroom." — Nerdvana
- [ ] "STEM" — tag
- [ ] "Community" — tag
- [ ] "2025 – Present" — UTRGV dates
- [ ] "Dual Enrollment Student & Externship Software Lead" — UTRGV role
- [ ] "Dual enrollment in Engineering and Computer Science through the Science Academy, plus an externship building the software for an AI-supervised 3D printer." — UTRGV
- [ ] "Engineering" — tag
- [ ] "CS" — tag

## NASA HUNCH (`nasa-hunch.html`)
- [ ] "NASA HUNCH | Joshua Collado" — title
- [ ] "Joshua Collado's NASA HUNCH work — Inventory Chain System (Houston finals) and VITALS, an AI medical diagnostic system." — meta description
- [ ] "2025–present" — eyebrow ("internship · 2025–present")
- [ ] "Helping Engineers Utilize NASA Competition Hardware" — subtitle
- [ ] "Houston Finals" — tag / heading
- [ ] "2025–2027" — tag
- [ ] "Full-Stack Builder & Systems Teammate" — role
- [ ] "I joined the NASA HUNCH program as a full-stack developer and systems collaborator. My focus was on designing and building the software and hardware components of our Inventory Chain System — a solution built to solve real logistics problems faced by NASA teams." — role
- [ ] "An end-to-end inventory tracking workflow combining a custom UI, structured data flow, RFID hardware integration, and team collaboration tools. The system was designed to track parts and materials across a workspace with real-time updates and minimal friction." — built
- [ ] "Our team advanced to the NASA HUNCH Houston finals, where we presented the Inventory Chain System directly to NASA representatives and engineers. It was a full-circle moment — building something real, then defending it in front of the people who inspired it." — impact
- [ ] "now building · 2026–2027" — eyebrow
- [ ] "VITALS — Team TETHER" — heading
- [ ] "This year I'm back as team lead. Team TETHER is competing in the Software & Technology challenge with VITALS, a medical diagnostic system for crews far from Earth. I build the engine: a local language model that reasons through symptoms, grounded by a medical knowledge base, built to run offline on an NVIDIA Jetson." — VITALS
- [ ] "Visit the VITALS site" — link
- [ ] "Key Takeaways" — heading
- [ ] "NASA HUNCH taught me that engineering is a team sport. I grew as a communicator — learning to translate technical decisions to non-technical stakeholders — and as a developer who writes code that real people depend on. Presenting at the Houston finals showed me I could perform under pressure and defend my design choices with confidence. Most importantly, I learned that shipping something real, even if imperfect, builds more skills than any assignment ever could." — takeaways
- [ ] "Experience in Photos" — heading
- [ ] "NASA HUNCH project" — alt
- [ ] "NASA HUNCH Houston finals" — alt
- [ ] "NASA HUNCH team" — alt
- [ ] "NASA HUNCH presentation" — alt
- [ ] "NASA HUNCH build" — alt
- [ ] "NASA HUNCH demo" — alt
- [ ] "NASA HUNCH experience" — alt
- [ ] "final design report" — eyebrow
- [ ] "FDR Document" — heading
- [ ] "The Final Design Report submitted to NASA for the 2026 HUNCH competition — covering system architecture, hardware integration, software design, and team documentation." — FDR
- [ ] "View FDR PDF" — link
- [ ] "All Internships" — link

## Nerdvana (`nerdvana.html`)
- [ ] "Nerdvana | Joshua Collado" — title
- [ ] "Joshua Collado's Nerdvana internship — STEM education and community impact." — meta description
- [ ] "2024–2025" — eyebrow/tag
- [ ] "STEM Education & Community Impact" — subtitle
- [ ] "At Nerdvana I wore two hats: educator and builder. I worked directly with elementary school students to introduce them to coding, engineering thinking, and problem-solving — while also developing the digital tools and interactive content used in those sessions." — role
- [ ] "Interactive STEM Sandbox" — heading
- [ ] "Co-created an interactive sandbox curriculum and digital materials that made engineering and computer science concepts accessible and engaging for elementary-age students. The program blended hands-on activities with software-based explorations." — built
- [ ] "Community-Level Change" — heading
- [ ] "The work reached students in South Texas who otherwise had limited exposure to STEM careers and technology. By meeting kids where they were and making learning fun, we planted seeds for the next generation of engineers and developers from our community." — impact
- [ ] "Teaching others is the fastest way to find the gaps in your own knowledge. Every lesson I designed for Nerdvana forced me to break down complex concepts — coding logic, robotics mechanics, hardware wiring — into something a 10-year-old could grasp. That process sharpened my own understanding more than any textbook. I also discovered I genuinely enjoy mentoring: watching a student's face light up when something clicks is one of the most rewarding experiences I've had in tech." — takeaways
- [ ] "Nerdvana STEM program" — alt
- [ ] "Certificate of Completion" — heading
- [ ] "Nerdvana Internship · 2025–2026" — caption
- [ ] "Nerdvana Internship Certificate of Completion — Joshua Collado 2025–2026" — alt

## RECON (`recon.html`)
- [ ] "RECON Technologies | Joshua Collado" — title
- [ ] "Joshua Collado's RECON Technologies internship — Web Developer building a secure digital platform for the City of Progresso." — meta description
- [ ] "web development" — eyebrow
- [ ] "Web Developer — Civic Digital Platform" — subtitle
- [ ] "Team Lead" — tag
- [ ] "Web Developer — Code Lead, Security Developer & Design Assistant" — role heading
- [ ] "At RECON Technologies I served in three overlapping roles on the development team: Code Lead, Security Developer, and Design Assistant. I drove the engineering decisions, ensured the platform met security standards for public-facing civic infrastructure, and contributed to the visual and UX direction of the site." — role
- [ ] "City of Progresso — Public Digital Platform" — heading
- [ ] "Designed and developed a secure digital platform that gives Progresso residents accessible, centralized access to city information, public services, and official records. Working as a team, we built the website from the ground up — from architecture and security hardening to front-end design and final deployment." — built
- [ ] "security & access" — eyebrow
- [ ] "Secure Public Infrastructure" — heading
- [ ] "As Security Developer, I was responsible for implementing best-practice security measures for a government-facing web platform — ensuring that public-facing data, form submissions, and records access were handled safely. This included secure routing, input validation, and hardened deployment configurations." — security
- [ ] "Serving the Community of Progresso" — heading
- [ ] "The City of Progresso website we built gives residents a modern, reliable digital front door to their local government. For a small South Texas city, having a professional and secure online presence improves civic engagement, reduces barriers to accessing public services, and brings local government into the digital era." — impact
- [ ] "Working at Recon Technologies taught me what professional software development actually looks like — deadlines, client expectations, security requirements, and code that has to work the first time. I learned that good engineers don't just write features; they think about the people who will use them and the systems they live inside. Handling real government-level access controls gave me a respect for security I couldn't have gotten from a classroom. I left knowing I can contribute meaningfully on a real engineering team." — takeaways
- [~] "Add team photo" / "Add website screenshot" / "Add development session photo" — empty placeholder tiles for photos that do not exist; the rebuild shows no photo section on this page instead of empty frames

## UTRGV (`utrgv.html`)
- [ ] "UTRGV | Joshua Collado" — title
- [ ] "Joshua Collado's UTRGV dual enrollment experience through the Science Academy." — meta description
- [ ] "University of Texas Rio Grande Valley — Dual Enrollment" — subtitle
- [ ] "Computer Science" — tag
- [ ] "Dual Enrollment" — tag
- [ ] "Externship" — tag
- [ ] "Dual Enrollment Engineering Student" — role
- [ ] "Through the Science Academy, I enrolled in university-level Engineering and Computer Science coursework at UTRGV while still in high school. This means I'm earning college credit in real university classes alongside my high school diploma — ahead of the curve before I've even graduated." — role
- [ ] "what I studied" — eyebrow
- [ ] "Engineering + Computer Science" — heading
- [ ] "Courses span engineering fundamentals, programming, systems design, and applied computer science. I apply this directly to my internships and personal projects — building systems informed by real academic rigor, not just self-teaching alone." — studied
- [ ] "A Head Start on a University Degree" — heading
- [ ] "By combining Science Academy with UTRGV dual enrollment, I'm building a foundation most students don't start until 18 or 19. Every credit I earn now is a semester I buy back later — and every concept I master now makes me a better engineer and developer today." — impact
- [ ] "externship · 2026–2027" — eyebrow
- [ ] "Through a UTRGV externship I'm leading the software side of a large-format, Voron-based 3D printer with a camera and an ML supervisor. The system watches every layer, compares it against the G-code, flags defects as they form, and decides how to respond. I wrote the software plan and I'm building it in phases, starting on a small test printer before moving to the Voron." — externship
- [ ] "Dual enrollment at UTRGV pushed me to operate at a college level while still in high school — and I found out I could handle it. Sitting alongside students years older than me taught me to advocate for myself, ask better questions, and take ownership of my learning in a way that no one else could do for me. The visit to Los Alamos National Laboratory was a turning point: it made abstract career paths feel real and close. I came back knowing exactly what kind of engineer I want to become." — takeaways
- [ ] "UTRGV Science Academy" — alt
- [ ] "UTRGV Science Academy students" — alt
- [ ] "UTRGV LANL program" — alt
- [ ] "Los Alamos National Laboratory visit" — alt

## Shared internship-page labels
- [ ] "my role" — eyebrow
- [ ] "what I built" — eyebrow
- [ ] "impact" — eyebrow
- [ ] "what I learned" — eyebrow
- [ ] "photo gallery" — eyebrow

## Résumé (`resume.html`, `resume.js`)
- [ ] "Résumé | Joshua Collado" — title
- [ ] "Résumé of Joshua Collado — Engineering internships, computer science courses, and presentations at NASA and UTRGV." — meta description
- [ ] "956-574-2556" — contact line
- [ ] "South Texas" — contact line
- [ ] "UTRGV · 2025–2027" — tag
- [ ] "NASA Visits" — stat (2×)
- [ ] "CS Courses" — stat (5+)
- [ ] "Years Building" — stat (3+)
- [ ] "cat resume.txt" — terminal
- [ ] "try typing: education · internships · skills" — terminal hint
- [ ] "// joshua@collado · résumé snapshot" — resume.js
- [ ] "Internships: NASA · Los Alamos · RECON · Nerdvana" — resume.js
- [ ] "NASA HUNCH – Inventory Chain System · Presented Rounds 1 & 2 · Visited NASA in Houston twice" — resume.js internships
- [ ] "Los Alamos Lab – VR Training Experience · Only student selected" — resume.js
- [ ] "RECON Technologies – City of Progresso Website" — resume.js
- [ ] "Nerdvana – STEM Sandbox for Elementary Schools" — resume.js
- [ ] "UTRGV – Dual Enrollment · 2025–2027" — resume.js education
- [ ] "Science Academy · 2023–2027" — resume.js
- [ ] "Rising Scholars Academy · 2021–2023" — resume.js
- [ ] "University of Texas Rio Grande Valley (UTRGV)" — education
- [ ] "Dual Enrollment · Engineering & Computer Science" — education
- [ ] "Science Academy — STISD" — education
- [ ] "2023–2027" — education
- [ ] "P-TECH · Computer Science & Engineering Track" — education
- [ ] "Rising Scholars Academy" — education
- [ ] "2021–2023" — education
- [ ] "Engineering Internships" — heading
- [ ] "NASA HUNCH — SCI-TECH" — internship
- [ ] "2025–2026" — dates
- [ ] "Hardware Manager · Stack Developer · Design Assistant" — NASA role
- [ ] "Developed an Inventory Chain System with a two-person team" — NASA
- [ ] "Presented to NASA Representatives in Rounds 1 & 2; team selected for finals" — NASA
- [ ] "Visited NASA Houston HQ twice for competition finals" — NASA
- [ ] "Los Alamos National Laboratory — UTRGV" — LANL
- [ ] "Project Leader · Stack Developer · Hardware Manager" — LANL role
- [ ] "Built a Virtual Reality training experience with a partner" — LANL
- [ ] "Only student selected to visit the lab in New Mexico" — LANL
- [ ] "Code Lead · Security Developer · Design Assistant" — RECON role
- [ ] "Designed a secure digital platform for the City of Progresso" — RECON
- [ ] "Public access system for city information, services, and records" — RECON
- [ ] "Nerdvana Educational Center" — Nerdvana
- [ ] "Co-Builder · Hardware Manager · Stack Developer" — Nerdvana role
- [ ] "Co-developed a Level Sandbox Environment with the CEO" — Nerdvana
- [ ] "Designed to promote STEM interest in elementary schools" — Nerdvana
- [ ] "Capstone Project" — heading
- [ ] "Project Evie — Home Automation AI Assistant" — capstone
- [ ] "2026–2027" — capstone dates
- [ ] "Developing a home network that bridges Android and Windows devices" — capstone
- [ ] "Personal AI assistant (Evie) that automates life and work tasks" — capstone
- [ ] "Skills" — heading
- [ ] "Tools & Frameworks" — skills
- [ ] "React · TypeScript · Vite · Node.js · Git · Android · Unity / VR" — skills
- [ ] "Focus Areas" — skills
- [ ] "Full-Stack Dev · Project Lead · Web Security · Hardware · AI / Automation" — skills
- [ ] "Coursework" — heading
- [ ] "TSTC — Texas State Technical College" — coursework
- [ ] "2023–2026" — coursework
- [ ] "Java · JavaScript · Advanced Java · HTML/CSS · SQL · C · Texas Advanced Java Certification" — coursework
- [ ] "STISD — Science & Technology ISD" — coursework
- [ ] "AP Computer Science · Industry-Based Certification · P.I.E²" — coursework
- [ ] "UTRGV — University of Texas Rio Grande Valley" — coursework
- [ ] "Python" — coursework
- [ ] "Presentations" — heading
- [ ] "NASA HUNCH — Presented to NASA Representatives in Rounds 1 & 2; team visited Houston HQ for finals" — presentation
- [ ] "STISD Presentation to incoming students interested in STEM" — presentation
- [ ] "UTRGV Research Progress Presentation for Los Alamos National Laboratory" — presentation
- [ ] "Region 1 Students Teach Students — UTRGV Engineering Internships" — presentation
- [ ] "Activities & Volunteerism" — heading
- [ ] "ECC Driver" — activity
- [ ] "2026–Present" — activity
- [ ] "Esports Streaming Manager" — activity
- [ ] "2025–Present" — activity
- [ ] "Minecraft Esports" — activity
- [ ] "2023–2024" — activity
- [ ] "Big Red Ranch Ministries — Volunteer" — activity
- [ ] "2022–2025" — activity
- [ ] "Ranch and camp site dedicated to fighting for the fatherless" — activity
- [~] "joshuacollado656@gmail.com" — résumé header on master; differs from site.email (…636…) everywhere else and in every mailto. Rendered from `site.email` instead. **Flagged for Joshua to confirm.**

## Testimonials (`testimonials.html`)
- [ ] "Testimonials | Joshua Collado" — title
- [ ] "Internship reflections by Joshua Collado — first-person accounts of his experiences at LANL, RECON Technologies, and Nerdvana." — meta description
- [ ] "internship reflections" — eyebrow
- [ ] "Reflections" — heading
- [ ] "My first-hand experiences across internships and programs" — subtitle
- [ ] "LANL" — tag
- [ ] "My Internship Reflections" — heading
- [ ] "First-person accounts of what I built, learned, and experienced across my internships." — lede
- [ ] "Through a UTRGV internship that partnered with Los Alamos National Laboratory, I worked on building a VR training experience and got to operate in a real research environment. I had to move fast, adapt to technical feedback, and focus on building something that was useful, not just impressive. That experience pushed me to communicate better, solve problems under pressure, and trust my skills at a higher level." — LANL
- [ ] "First-Person Reflection · UTRGV × Los Alamos National Laboratory" — attribution
- [ ] "At RECON Technologies, I worked remotely to help build a city website for Progresso and focused on code quality, security, and usability. I got real experience working like a professional developer: collaborating with a distributed team, solving practical problems, and making sure features were reliable for real users. This internship taught me how important clean execution and responsibility are when software affects a whole community." — RECON
- [ ] "First-Person Reflection · RECON Technologies · Remote" — attribution
- [ ] "At Nerdvana, my role was focused on making the sandbox and the software. I worked on building the technical side of the STEM sandbox experience, turning ideas into something students could actually use. This internship helped me improve how I build educational tools and showed me how software can make learning more interactive and accessible." — Nerdvana
- [ ] "First-Person Reflection · Nerdvana" — attribution
- [ ] "My UTRGV-LANL internship experience" — aria-label
- [ ] "My RECON internship experience" — aria-label
- [ ] "My Nerdvana internship experience" — aria-label

## Contact (`contact.html`, `contact.js`)
- [ ] "Contact | Joshua Collado" — title
- [ ] "Get in touch with Joshua Collado — South Texas engineer and developer." — meta description
- [ ] "get in touch" — eyebrow
- [ ] "let's build something together" — subtitle
- [ ] "joshua@portfolio — bash — 80×24" — window title
- [ ] "Launching contact interface... [ OK ]" — typed line
- [ ] "Ways to reach me" — heading
- [ ] "Email" — card
- [ ] "GitHub" — card
- [ ] "github.com/Blackphenixlord" — card
- [ ] "LinkedIn" — card
- [ ] "linkedin.com/in/joshua-collado" — card
- [ ] "available for opportunities" — status
- [ ] "open to internships" — status
- [ ] "response time: 24-48hrs" — status
- [ ] "Send a message" — form heading
- [ ] "Send Joshua a message" — form aria-label
- [ ] "your_name" — label
- [ ] "your_email" — label
- [ ] "subject" — label
- [ ] "message" — label
- [ ] "you@example.com" — placeholder
- [ ] "let's work together" — placeholder
- [ ] "hey Joshua, I wanted to reach out about..." — placeholder
- [ ] "send_message" — button
- [ ] "Your message is ready" — compose fallback
- [ ] "Send it" — compose fallback
- [ ] "Copy message" — compose fallback
- [ ] "Either opens your mail app addressed to" — compose fallback
- [ ] "message and send it however you like." — compose fallback
- [ ] "Edit instead" — compose fallback
- [ ] "Message sent. I usually reply within 24-48 hours." — contact.js success
- [ ] "That did not go through" — contact.js error
- [ ] "Please fix the highlighted fields." — contact.js
- [ ] "is required." — contact.js
- [ ] "That email address does not look right." — contact.js
- [ ] "A little more detail would help — at least 10 characters." — contact.js
- [ ] "Press Ctrl+C" — contact.js copy fallback
- [~] "Company" — a hidden honeypot field label on master, never visible; the rebuild keeps a honeypot under a neutral name

## 404 (`404.html`)
- [ ] "404 — Page Not Found | Joshua Collado" — title
- [ ] "That page doesn't exist. Here's the way back." — meta description
- [ ] "that page isn't on this machine" — heading
- [ ] "cat the-page-you-wanted" — command
- [ ] "cat: no such file or directory" — output
- [ ] "Either the link is wrong, or I moved something and forgot to leave a forwarding address. Both are on me." — copy
- [ ] "Press Ctrl + K to search everything from here." — hint

## Easter egg (`rick.html`)
- [ ] "Never Gonna Give You Up | Joshua Collado" — title
- [ ] "easter_egg.exe — you found it" — eyebrow
- [ ] "NEVER GONNA GIVE YOU UP" — heading
- [ ] "you typed it. you asked for it. no regrets." — subtitle
- [ ] "WATCH ON YOUTUBE" — link
- [ ] "auto-launching in" — countdown
- [ ] "congratulations, you played yourself" — footer
- [ ] "escape back to reality" — link
- [ ] "hint: type rick roll in Ctrl+K" — hint
