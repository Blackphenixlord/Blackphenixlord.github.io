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
- [x] "Joshua Collado" — site.name
- [x] "Building software that ships, systems that matter." — site.tagline
- [x] "joshuacollado636@gmail.com" — site.email
- [x] "Home" — site.nav
- [x] "About" — site.nav
- [x] "Internships" — site.nav
- [x] "Projects" — site.nav
- [x] "Résumé" — site.nav
- [x] "Testimonials" — site.nav
- [x] "Contact" — site.nav
- [x] "Full-Stack" — site.categoryLabels
- [x] "VR / XR" — site.categoryLabels
- [x] "Automation" — site.categoryLabels
- [x] "Research" — site.categoryLabels
- [x] "Security" — site.categoryLabels
- [x] "Hardware" — site.categoryLabels

## Shared chrome (every page)
- [x] "Skip to main content" — nav partial
- [x] "Built with" — footer
- [x] "UTRGV" — footer ("© 2026 Joshua Collado · Built with </> · UTRGV")
- [x] "Go to Home" — palette
- [x] "Go to About" — palette
- [x] "Go to Internships" — palette
- [x] "Go to Projects" — palette
- [x] "Go to Résumé" — palette
- [x] "Go to Testimonials" — palette
- [x] "Go to Contact" — palette
- [x] "Open résumé" — palette action
- [x] "Toggle scan lines" — palette action
- [x] "Dyslexia mode" — tweaks
- [x] "OpenDyslexic + wider spacing" — tweaks
- [x] "Search commands" — palette
- [x] "type a command or search..." — palette placeholder
- [~] "Toggle background music" / "lofi: off" — lofi player removed (no audio in rebuild)
- [~] "Custom cursor" / "Green dot crosshair" — custom cursor removed
- [~] "Scroll bar" / "Progress indicator" — replaced by the menubar scroll readout
- [~] "Sound effects" / "Synthesised UI clicks, off by default" — UI sounds removed
- [~] "Accent color" / "Green" / "Red" / "Yellow" / "Cyan" — one green accent only (theme 1)

## Boot sequence (`boot.js`)
- [x] "JC/OS 2026.05 LTS" — boot banner
- [x] "joshua-collado.local" — boot banner
- [x] "joshua-collado login: " — boot
- [x] "Authenticating..." — boot
- [x] "[ LOGIN OK ]" — boot
- [x] "Last login: " — boot
- [x] "from 127.0.0.1" — boot
- [x] "Welcome, Joshua Collado." — boot
- [x] "NASA . Los Alamos . Nerdvana . RECON" — boot
- [x] "click or press any key to skip" — index boot hint

## Home (`index.html`, `home.js`)
- [x] "Joshua Collado | Portfolio" — title
- [x] "Joshua Collado — Engineer, developer, and builder. UTRGV dual enrollment student with internships at NASA, Los Alamos, and RECON Technologies." — meta description
- [x] "joshua@collado — bash — 80×24" — boot window title
- [x] "./engineer" — hero logo
- [x] "Open to Work" — hero badge ("● Open to Work · 2026")
- [x] "< Hello, World! />" — hero eyebrow
- [x] "UTRGV Dual Enrollment · Science Academy · Engineering + Computer Science" — hero
- [x] "View Projects" — hero CTA
- [x] "Get In Touch" — hero CTA
- [x] "Including NASA & Los Alamos" — stat (4 Internships)
- [x] "NASA Trips" — stat (2)
- [x] "2 visits to Houston" — stat
- [x] "Languages" — stat (5+)
- [x] "Coding languages" — stat
- [x] "Active Projects" — stat (4)
- [x] "Running in parallel" — stat
- [x] "Who I Am" — section
- [x] "Innovative" — trait
- [x] "From NASA HUNCH to Los Alamos Lab — I build things that haven't existed before and solve real problems." — home trait
- [x] "Driven" — trait
- [x] "I've presented to NASA, led teams across multiple internships, and I'm just getting started." — home trait
- [x] "Purposeful" — trait
- [x] "Every project I touch has a mission behind it — national security, education, or community impact." — home trait
- [x] "About Me" — section
- [x] "cat about.txt" — terminal
- [x] "try typing: whoami · skills · contact" — terminal hint
- [x] "// who am i" — home.js about text header
- [x] "My name is" — home.js about text
- [x] "with Los Alamos National Laboratory" — home.js about text
- [x] "co-creating a STEM sandbox for elementary schools with" — home.js about text
- [x] "engineer, developer, builder." — whoami
- [x] "UTRGV Dual Enrollment · Science Academy · South Texas." — whoami
- [x] "Python · Java · JavaScript · HTML/CSS · SQL · C" — skills
- [x] "Git · Android · VR/Unity · Full-Stack Dev" — skills
- [x] "AI · Automation · Security" — skills
- [x] "RECON Technologies · City of Progresso Civic Platform" — projects cmd
- [x] "NASA HUNCH · Inventory Chain System (Houston finals)" — projects cmd
- [x] "Los Alamos Lab · VR Training Experience" — projects cmd
- [x] "Project Evie · AI Home Automation (in progress)" — projects cmd
- [x] "Available commands:" — help
- [x] "command not found:" — error
- [x] "Thanks for stopping by." — hello/hi ("Hey! 👋 Thanks for stopping by.")
- [x] "Tab completes · ↑ recalls history" — help
- [x] "Selected Work" — section
- [x] "What I have built, and what I am building right now." — section lede
- [x] "All work" — link
- [x] "Highlights" — section
- [x] "Web Dev · RECON" — highlight
- [x] "Java · JS · Python · C" — highlight
- [x] "HTML · CSS · SQL" — highlight
- [x] "VR Development" — highlight
- [x] "AI Assistant (Evie)" — highlight
- [x] "Read the case study" — card link

## Projects data (`projects`) — all seven, every field
### progresso-civic-platform
- [x] "City of Progresso — Civic Platform" — title
- [x] "RECON Technologies" — org
- [x] "Code Lead, Security Developer & Design Assistant" — role
- [x] "Shipped" — status
- [x] "Web Dev" — stack
- [x] "Civic Tech" — stack
- [x] "A secure digital platform giving Progresso residents centralized access to city information, public services, and official records." — summary
- [x] "Brought a small South Texas city into the digital era — modern, secure, and publicly accessible." — outcome
### inventory-chain-system
- [x] "Inventory Chain System" — title
- [x] "NASA HUNCH" — org
- [x] "2025 – 2026" — years
- [x] "Full-stack builder and systems teammate" — role
- [x] "Houston finals" — status
- [x] "Systems Design" — stack
- [x] "A full-stack inventory tracking workflow built for NASA's Human Exploration & Operations division. Covers UI, real-time data flow, and multi-team collaboration." — summary
- [x] "Advanced to the Houston finals and presented directly to NASA representatives." — outcome
### vitals
- [x] "VITALS — Medical Diagnostic System" — title
- [x] "2026 – 2027" — years
- [x] "Team lead and diagnostic engine developer" — role
- [x] "In progress" — status
- [x] "AI / ML" — stack
- [x] "Local LLM" — stack
- [x] "Knowledge Base" — stack
- [x] "NVIDIA Jetson" — stack
- [x] "An offline medical diagnostic assistant for crews far from Earth. A local language model does the reasoning, and a curated medical knowledge base grounds every answer it gives." — summary
- [x] "Leading Team TETHER through the 2026–27 NASA HUNCH Software & Technology challenge, with the engine, the public site, and the review boards built." — outcome
- [x] "A crew on the Moon cannot wait on a round trip to Houston every time someone feels wrong. They need a diagnostic aid that runs on board, with no connection to the ground." — problem
- [x] "A local LLM (served through Ollama) is the reasoner, and a medical knowledge base keeps it honest: the model answers, the knowledge base backs the answer. It is built to run on an NVIDIA Jetson. Sensor and camera inputs are left as open slots rather than filled with plausible fake readings, so nothing in a demo pretends to be data it is not." — approach
- [x] "The project site" — link label
- [x] "VITALS · Team TETHER" — link title (→ /vitals/)
### vr-training-experience
- [x] "VR Training Experience" — title
- [x] "Los Alamos National Laboratory" — org
- [x] "XR developer and simulation collaborator" — role
- [x] "Delivered" — status
- [x] "Simulation" — stack
- [x] "A virtual reality training simulation designed for immersive, hands-on instruction in a research environment, built with scientists at one of the US government's top national labs." — summary
- [x] "Earned an in-person visit to Los Alamos National Laboratory as the only student selected." — outcome
### project-evie
- [x] "Project Evie" — title
- [x] "Capstone / Personal" — org
- [x] "Product designer and AI systems developer" — role
- [x] "Android" — stack
- [x] "Cross-Platform" — stack
- [x] "A personal AI assistant that bridges Android and Windows into a single automation layer — controlling apps, routines, and devices from one unified interface." — summary
- [x] "Establishing the foundation for a fully AI-powered home control and productivity system." — outcome
### vla-3d-printing
- [x] "VLA-Enabled 3D Printing" — title
- [x] "UTRGV Externship" — org
- [x] "Software lead — vision and control" — role
- [x] "Machine Vision" — stack
- [x] "Vision-Language-Action" — stack
- [x] "Voron 2.4" — stack
- [x] "G-code" — stack
- [x] "A large-format, Voron-based 3D printer with a camera and an ML supervisor that watches each layer, catches defects as they happen, and steps in to correct them." — summary
- [x] "Scoped the full software plan — control loop, defect responses, training data, and a phased build that proves itself on a small printer before moving to the Voron." — outcome
### screen-deck
- [x] "Screen Deck" — title
- [x] "Personal" — org
- [x] "Designer and developer" — role
- [x] "PowerShell" — stack
- [x] "WPF" — stack
- [x] "Touch UI" — stack
- [x] "A Stream Deck–style touch launcher for a spare touchscreen: tabbed button grids, per-app volume sliders, a soundboard, calendar, notes, and live home-lab stats." — summary
- [x] "Runs every day on my desk as the control surface for my PC, games, and home lab." — outcome

## Case-study pages (`work.njk`)
- [x] "Role" — label
- [x] "Timeline" — label
- [x] "Status" — label
- [x] "Outcome" — label
- [x] "The problem" — label
- [x] "What I built" — label
- [x] "The internship behind it" — label
- [x] "Want the detail?" — label
- [x] "Get in touch" — link
- [x] "Keep reading" — aria-label of next/prev

## Projects (`projects.html`)
- [x] "Projects — Joshua Collado" — title
- [x] "Work samples and projects by Joshua Collado — NASA HUNCH, VR Training, Project Evie, and more." — meta description
- [x] "What I built, who it was for, and what came of it." — lede
- [x] "All" — filter
- [x] "Nothing in that discipline yet." — empty state
- [x] "Filter projects by discipline" — aria-label

## About (`about.html`)
- [x] "About Me | Joshua Collado" — title
- [x] "About Joshua Collado — Dual Enrollment student, engineer, and builder from South Texas with internships at NASA, Los Alamos, RECON, and Nerdvana." — meta description
- [x] "Engineer · Developer · Builder · South Texas" — subtitle
- [x] "UTRGV Dual Enrollment" — tag
- [x] "Science Academy" — tag
- [x] "NASA HUNCH Alumni" — tag
- [x] "Los Alamos Lab" — tag
- [x] "Class of 2027" — tag
- [x] "Introduction" — section
- [x] "and I'm a dual enrollment student at UTRGV through the Science Academy — studying engineering, computer science, and the future. I'm from South Texas, and I'm on a mission to use technology to make life better, smarter, and more collaborative." — intro p1
- [x] "on an Inventory Chain System that granted me 2 visits to the Houston HQ, built a Virtual Reality training experience with" — intro p2
- [x] "developed a city website with" — intro p2
- [x] "and co-created a STEM sandbox for elementary schools with" — intro p2
- [x] "Right now I'm designing Evie — a personal AI assistant that connects Android and Windows into a unified home automation network. My goal is to become a software engineer and an AI developer who builds systems that actually change how people live and work." — intro p3
- [x] "Background" — section
- [x] "Interests" — card
- [x] "Artificial intelligence & machine learning" — interest
- [x] "Virtual reality and immersive systems" — interest
- [x] "Home automation and IoT" — interest
- [x] "Cybersecurity and national security tech" — interest
- [x] "Competitive robotics & engineering design" — interest
- [x] "Music production and creative coding" — interest
- [x] "Education" — card
- [x] "Science Academy — STISD High School" — education
- [x] "STEM-focused engineering and CS track" — education
- [x] "UTRGV Dual Enrollment — 2025–2027" — education
- [x] "College-level coursework while in high school" — education
- [x] "Expected graduation: 2027" — education
- [x] "Languages & Tools" — card
- [x] "Python · Java · JavaScript · C" — tools
- [x] "HTML · CSS · SQL" — tools
- [x] "Git · Android Studio · Unreal/VR" — tools
- [x] "Full-stack web development" — tools
- [x] "AI integration & automation" — tools
- [x] "Extracurriculars" — card
- [x] "TSA Club — Technology Student Association" — extracurricular
- [x] "Design challenges & collaborative engineering" — extracurricular
- [x] "BPA Club — Business Professionals of America" — extracurricular
- [x] "Competitive tech events and leadership" — extracurricular
- [x] "Community volunteer: graphic design support" — extracurricular
- [x] "Leadership" — card
- [x] "Team lead on multi-phase school engineering project" — leadership
- [x] "Organized a student coding workshop on web design basics" — leadership
- [x] "Coordinated cross-disciplinary NASA HUNCH team" — leadership
- [x] "Mentored younger students in STEM projects" — leadership
- [x] "A Bit More About Me" — card
- [x] "From South Texas — proud of where I'm from" — more
- [x] "I'm bilingual: English & Spanish" — more
- [x] "I learn best by building, not watching" — more
- [x] "My desk is half workstation, half lab" — more
- [x] "Lofi hip-hop always playing while I code" — more
- [x] "Three Words That Define Me" — section
- [x] "From NASA HUNCH to Los Alamos Lab — I build things that haven't existed before and solve problems no one has handed me a template for." — trait
- [x] "I've presented to NASA engineers, led teams across multiple internships, and I'm just a junior in high school. I'm only getting started." — trait
- [x] "Every project I touch has a mission behind it — national security, education, or community impact. I don't build for the sake of building." — trait
- [x] "Where I'm Headed" — section
- [x] "Goals & Vision" — section
- [x] "NOW — 2027" — goal
- [x] "Finish Strong at Science Academy" — goal
- [x] "Complete the dual enrollment program at UTRGV, graduate with a strong foundation in engineering and CS, and ship at least one public project that has real users." — goal
- [x] "2027 — 2031" — goal
- [x] "Computer Science Degree" — goal
- [x] "Pursue a B.S. in Computer Science or Software Engineering, with a focus on AI systems and human-computer interaction. I want to study somewhere that values builders, not just test-takers." — goal
- [x] "2031+" — goal
- [x] "Software Engineer & AI Developer" — goal
- [x] "Work on systems that matter — AI, automation, security, or space tech. Ultimately, I want to build products used by millions of people, or infrastructure that protects them. Either way, I'm building something real." — goal
- [x] "Want to know more?" — CTA
- [x] "Check out my work, internship experience, or just say hello." — CTA
- [x] "View Internships" — CTA
- [x] "My Résumé" — CTA

## Internships (`internships.html`)
- [x] "Internships | Joshua Collado" — title
- [x] "Joshua Collado's internship experience — NASA HUNCH, Nerdvana, and UTRGV." — meta description
- [x] "Real-world engineering, research, and development across four programs." — lede
- [x] "2026 – 2027" — RECON dates
- [x] "Web Developer — Code Lead & Security Dev" — RECON role
- [x] "Built a secure digital platform for the City of Progresso, providing public access to city information, services, and records." — RECON
- [x] "2025 – 2027" — NASA dates
- [x] "Team Lead — VITALS · Full-Stack Builder" — NASA role
- [x] "Built an inventory tracking system that advanced to NASA's Houston finals. Now leading Team TETHER on VITALS, an offline AI medical diagnostic system." — NASA
- [x] "Nerdvana" — program
- [x] "STEM Educator & Tech Developer" — Nerdvana role
- [x] "Co-created an interactive STEM sandbox for elementary students, bringing hands-on coding and engineering concepts to the classroom." — Nerdvana
- [x] "STEM" — tag
- [x] "Community" — tag
- [x] "2025 – Present" — UTRGV dates
- [x] "Dual Enrollment Student & Externship Software Lead" — UTRGV role
- [x] "Dual enrollment in Engineering and Computer Science through the Science Academy, plus an externship building the software for an AI-supervised 3D printer." — UTRGV
- [x] "Engineering" — tag
- [x] "CS" — tag

## NASA HUNCH (`nasa-hunch.html`)
- [x] "NASA HUNCH | Joshua Collado" — title
- [x] "Joshua Collado's NASA HUNCH work — Inventory Chain System (Houston finals) and VITALS, an AI medical diagnostic system." — meta description
- [x] "2025–present" — eyebrow ("internship · 2025–present")
- [x] "Helping Engineers Utilize NASA Competition Hardware" — subtitle
- [x] "Houston Finals" — tag / heading
- [x] "2025–2027" — tag
- [x] "Full-Stack Builder & Systems Teammate" — role
- [x] "I joined the NASA HUNCH program as a full-stack developer and systems collaborator. My focus was on designing and building the software and hardware components of our Inventory Chain System — a solution built to solve real logistics problems faced by NASA teams." — role
- [x] "An end-to-end inventory tracking workflow combining a custom UI, structured data flow, RFID hardware integration, and team collaboration tools. The system was designed to track parts and materials across a workspace with real-time updates and minimal friction." — built
- [x] "Our team advanced to the NASA HUNCH Houston finals, where we presented the Inventory Chain System directly to NASA representatives and engineers. It was a full-circle moment — building something real, then defending it in front of the people who inspired it." — impact
- [x] "now building · 2026–2027" — eyebrow
- [x] "VITALS — Team TETHER" — heading
- [x] "This year I'm back as team lead. Team TETHER is competing in the Software & Technology challenge with VITALS, a medical diagnostic system for crews far from Earth. I build the engine: a local language model that reasons through symptoms, grounded by a medical knowledge base, built to run offline on an NVIDIA Jetson." — VITALS
- [x] "Visit the VITALS site" — link
- [x] "Key Takeaways" — heading
- [x] "NASA HUNCH taught me that engineering is a team sport. I grew as a communicator — learning to translate technical decisions to non-technical stakeholders — and as a developer who writes code that real people depend on. Presenting at the Houston finals showed me I could perform under pressure and defend my design choices with confidence. Most importantly, I learned that shipping something real, even if imperfect, builds more skills than any assignment ever could." — takeaways
- [x] "Experience in Photos" — heading
- [x] "NASA HUNCH project" — alt
- [x] "NASA HUNCH Houston finals" — alt
- [x] "NASA HUNCH team" — alt
- [x] "NASA HUNCH presentation" — alt
- [x] "NASA HUNCH build" — alt
- [x] "NASA HUNCH demo" — alt
- [x] "NASA HUNCH experience" — alt
- [x] "final design report" — eyebrow
- [x] "FDR Document" — heading
- [x] "The Final Design Report submitted to NASA for the 2026 HUNCH competition — covering system architecture, hardware integration, software design, and team documentation." — FDR
- [x] "View FDR PDF" — link
- [x] "All Internships" — link

## Nerdvana (`nerdvana.html`)
- [x] "Nerdvana | Joshua Collado" — title
- [x] "Joshua Collado's Nerdvana internship — STEM education and community impact." — meta description
- [x] "2024–2025" — eyebrow/tag
- [x] "STEM Education & Community Impact" — subtitle
- [x] "At Nerdvana I wore two hats: educator and builder. I worked directly with elementary school students to introduce them to coding, engineering thinking, and problem-solving — while also developing the digital tools and interactive content used in those sessions." — role
- [x] "Interactive STEM Sandbox" — heading
- [x] "Co-created an interactive sandbox curriculum and digital materials that made engineering and computer science concepts accessible and engaging for elementary-age students. The program blended hands-on activities with software-based explorations." — built
- [x] "Community-Level Change" — heading
- [x] "The work reached students in South Texas who otherwise had limited exposure to STEM careers and technology. By meeting kids where they were and making learning fun, we planted seeds for the next generation of engineers and developers from our community." — impact
- [x] "Teaching others is the fastest way to find the gaps in your own knowledge. Every lesson I designed for Nerdvana forced me to break down complex concepts — coding logic, robotics mechanics, hardware wiring — into something a 10-year-old could grasp. That process sharpened my own understanding more than any textbook. I also discovered I genuinely enjoy mentoring: watching a student's face light up when something clicks is one of the most rewarding experiences I've had in tech." — takeaways
- [x] "Nerdvana STEM program" — alt
- [x] "Certificate of Completion" — heading
- [x] "Nerdvana Internship · 2025–2026" — caption
- [x] "Nerdvana Internship Certificate of Completion — Joshua Collado 2025–2026" — alt

## RECON (`recon.html`)
- [x] "RECON Technologies | Joshua Collado" — title
- [x] "Joshua Collado's RECON Technologies internship — Web Developer building a secure digital platform for the City of Progresso." — meta description
- [x] "web development" — eyebrow
- [x] "Web Developer — Civic Digital Platform" — subtitle
- [x] "Team Lead" — tag
- [x] "Web Developer — Code Lead, Security Developer & Design Assistant" — role heading
- [x] "At RECON Technologies I served in three overlapping roles on the development team: Code Lead, Security Developer, and Design Assistant. I drove the engineering decisions, ensured the platform met security standards for public-facing civic infrastructure, and contributed to the visual and UX direction of the site." — role
- [x] "City of Progresso — Public Digital Platform" — heading
- [x] "Designed and developed a secure digital platform that gives Progresso residents accessible, centralized access to city information, public services, and official records. Working as a team, we built the website from the ground up — from architecture and security hardening to front-end design and final deployment." — built
- [x] "security & access" — eyebrow
- [x] "Secure Public Infrastructure" — heading
- [x] "As Security Developer, I was responsible for implementing best-practice security measures for a government-facing web platform — ensuring that public-facing data, form submissions, and records access were handled safely. This included secure routing, input validation, and hardened deployment configurations." — security
- [x] "Serving the Community of Progresso" — heading
- [x] "The City of Progresso website we built gives residents a modern, reliable digital front door to their local government. For a small South Texas city, having a professional and secure online presence improves civic engagement, reduces barriers to accessing public services, and brings local government into the digital era." — impact
- [x] "Working at Recon Technologies taught me what professional software development actually looks like — deadlines, client expectations, security requirements, and code that has to work the first time. I learned that good engineers don't just write features; they think about the people who will use them and the systems they live inside. Handling real government-level access controls gave me a respect for security I couldn't have gotten from a classroom. I left knowing I can contribute meaningfully on a real engineering team." — takeaways
- [~] "Add team photo" / "Add website screenshot" / "Add development session photo" — empty placeholder tiles for photos that do not exist; the rebuild shows no photo section on this page instead of empty frames

## UTRGV (`utrgv.html`)
- [x] "UTRGV | Joshua Collado" — title
- [x] "Joshua Collado's UTRGV dual enrollment experience through the Science Academy." — meta description
- [x] "University of Texas Rio Grande Valley — Dual Enrollment" — subtitle
- [x] "Computer Science" — tag
- [x] "Dual Enrollment" — tag
- [x] "Externship" — tag
- [x] "Dual Enrollment Engineering Student" — role
- [x] "Through the Science Academy, I enrolled in university-level Engineering and Computer Science coursework at UTRGV while still in high school. This means I'm earning college credit in real university classes alongside my high school diploma — ahead of the curve before I've even graduated." — role
- [x] "what I studied" — eyebrow
- [x] "Engineering + Computer Science" — heading
- [x] "Courses span engineering fundamentals, programming, systems design, and applied computer science. I apply this directly to my internships and personal projects — building systems informed by real academic rigor, not just self-teaching alone." — studied
- [x] "A Head Start on a University Degree" — heading
- [x] "By combining Science Academy with UTRGV dual enrollment, I'm building a foundation most students don't start until 18 or 19. Every credit I earn now is a semester I buy back later — and every concept I master now makes me a better engineer and developer today." — impact
- [x] "externship · 2026–2027" — eyebrow
- [x] "Through a UTRGV externship I'm leading the software side of a large-format, Voron-based 3D printer with a camera and an ML supervisor. The system watches every layer, compares it against the G-code, flags defects as they form, and decides how to respond. I wrote the software plan and I'm building it in phases, starting on a small test printer before moving to the Voron." — externship
- [x] "Dual enrollment at UTRGV pushed me to operate at a college level while still in high school — and I found out I could handle it. Sitting alongside students years older than me taught me to advocate for myself, ask better questions, and take ownership of my learning in a way that no one else could do for me. The visit to Los Alamos National Laboratory was a turning point: it made abstract career paths feel real and close. I came back knowing exactly what kind of engineer I want to become." — takeaways
- [x] "UTRGV Science Academy" — alt
- [x] "UTRGV Science Academy students" — alt
- [x] "UTRGV LANL program" — alt
- [x] "Los Alamos National Laboratory visit" — alt

## Shared internship-page labels
- [x] "my role" — eyebrow
- [x] "what I built" — eyebrow
- [x] "impact" — eyebrow
- [x] "what I learned" — eyebrow
- [x] "photo gallery" — eyebrow

## Résumé (`resume.html`, `resume.js`)
- [x] "Résumé | Joshua Collado" — title
- [x] "Résumé of Joshua Collado — Engineering internships, computer science courses, and presentations at NASA and UTRGV." — meta description
- [x] "956-254-7815" — contact line (Joshua changed the number from 956-574-2556 on 2026-11-06)
- [x] "South Texas" — contact line
- [x] "UTRGV · 2025–2027" — tag
- [x] "NASA Visits" — stat (2×)
- [x] "CS Courses" — stat (5+)
- [x] "Years Building" — stat (3+)
- [x] "cat resume.txt" — terminal
- [x] "try typing: education · internships · skills" — terminal hint
- [x] "// joshua@collado · résumé snapshot" — resume.js
- [x] "Internships: NASA · Los Alamos · RECON · Nerdvana" — resume.js
- [x] "to explore." — resume.js ("Type education, internships, or help to explore.")
- [x] "NASA HUNCH – Inventory Chain System · Presented Rounds 1 & 2 · Visited NASA in Houston twice" — resume.js internships
- [x] "Los Alamos Lab – VR Training Experience · Only student selected" — resume.js
- [x] "RECON Technologies – City of Progresso Website" — resume.js
- [x] "Nerdvana – STEM Sandbox for Elementary Schools" — resume.js
- [x] "UTRGV – Dual Enrollment · 2025–2027" — resume.js education
- [x] "Science Academy · 2023–2027" — resume.js
- [x] "Rising Scholars Academy · 2021–2023" — resume.js
- [x] "University of Texas Rio Grande Valley (UTRGV)" — education
- [x] "Dual Enrollment · Engineering & Computer Science" — education
- [x] "Science Academy — STISD" — education
- [x] "2023–2027" — education
- [x] "P-TECH · Computer Science & Engineering Track" — education
- [x] "Rising Scholars Academy" — education
- [x] "2021–2023" — education
- [x] "Engineering Internships" — heading
- [x] "NASA HUNCH — SCI-TECH" — internship
- [x] "2025–2026" — dates
- [x] "Hardware Manager · Stack Developer · Design Assistant" — NASA role
- [x] "Developed an Inventory Chain System with a two-person team" — NASA
- [x] "Presented to NASA Representatives in Rounds 1 & 2; team selected for finals" — NASA
- [x] "Visited NASA Houston HQ twice for competition finals" — NASA
- [x] "Los Alamos National Laboratory — UTRGV" — LANL
- [x] "Project Leader · Stack Developer · Hardware Manager" — LANL role
- [x] "Built a Virtual Reality training experience with a partner" — LANL
- [x] "Only student selected to visit the lab in New Mexico" — LANL
- [x] "Code Lead · Security Developer · Design Assistant" — RECON role
- [x] "Designed a secure digital platform for the City of Progresso" — RECON
- [x] "Public access system for city information, services, and records" — RECON
- [x] "Nerdvana Educational Center" — Nerdvana
- [x] "Co-Builder · Hardware Manager · Stack Developer" — Nerdvana role
- [x] "Co-developed a Level Sandbox Environment with the CEO" — Nerdvana
- [x] "Designed to promote STEM interest in elementary schools" — Nerdvana
- [x] "Capstone Project" — heading
- [x] "Project Evie — Home Automation AI Assistant" — capstone
- [x] "2026–2027" — capstone dates
- [x] "Developing a home network that bridges Android and Windows devices" — capstone
- [x] "Personal AI assistant (Evie) that automates life and work tasks" — capstone
- [x] "Skills" — heading
- [x] "Tools & Frameworks" — skills
- [x] "React · TypeScript · Vite · Node.js · Git · Android · Unity / VR" — skills
- [x] "Focus Areas" — skills
- [x] "Full-Stack Dev · Project Lead · Web Security · Hardware · AI / Automation" — skills
- [x] "Coursework" — heading
- [x] "TSTC — Texas State Technical College" — coursework
- [x] "2023–2026" — coursework
- [x] "Java · JavaScript · Advanced Java · HTML/CSS · SQL · C · Texas Advanced Java Certification" — coursework
- [x] "STISD — Science & Technology ISD" — coursework
- [x] "AP Computer Science · Industry-Based Certification · P.I.E²" — coursework
- [x] "UTRGV — University of Texas Rio Grande Valley" — coursework
- [x] "Python" — coursework
- [x] "Presentations" — heading
- [x] "NASA HUNCH — Presented to NASA Representatives in Rounds 1 & 2; team visited Houston HQ for finals" — presentation
- [x] "STISD Presentation to incoming students interested in STEM" — presentation
- [x] "UTRGV Research Progress Presentation for Los Alamos National Laboratory" — presentation
- [x] "Region 1 Students Teach Students — UTRGV Engineering Internships" — presentation
- [x] "Activities & Volunteerism" — heading
- [x] "ECC Driver" — activity
- [x] "2026–Present" — activity
- [x] "Esports Streaming Manager" — activity
- [x] "2025–Present" — activity
- [x] "Minecraft Esports" — activity
- [x] "2023–2024" — activity
- [x] "Big Red Ranch Ministries — Volunteer" — activity
- [x] "2022–2025" — activity
- [x] "Ranch and camp site dedicated to fighting for the fatherless" — activity
- [~] "joshuacollado656@gmail.com" — résumé header on master; differs from site.email (…636…) everywhere else and in every mailto. Rendered from `site.email` instead. Joshua confirmed 636 is correct (656 was a typo on master).

## Testimonials (`testimonials.html`)
- [x] "Testimonials | Joshua Collado" — title
- [x] "Internship reflections by Joshua Collado — first-person accounts of his experiences at LANL, RECON Technologies, and Nerdvana." — meta description
- [x] "internship reflections" — eyebrow
- [x] "Reflections" — heading
- [x] "My first-hand experiences across internships and programs" — subtitle
- [x] "LANL" — tag
- [x] "My Internship Reflections" — heading
- [x] "First-person accounts of what I built, learned, and experienced across my internships." — lede
- [x] "Through a UTRGV internship that partnered with Los Alamos National Laboratory, I worked on building a VR training experience and got to operate in a real research environment. I had to move fast, adapt to technical feedback, and focus on building something that was useful, not just impressive. That experience pushed me to communicate better, solve problems under pressure, and trust my skills at a higher level." — LANL
- [x] "First-Person Reflection · UTRGV × Los Alamos National Laboratory" — attribution
- [x] "At RECON Technologies, I worked remotely to help build a city website for Progresso and focused on code quality, security, and usability. I got real experience working like a professional developer: collaborating with a distributed team, solving practical problems, and making sure features were reliable for real users. This internship taught me how important clean execution and responsibility are when software affects a whole community." — RECON
- [x] "First-Person Reflection · RECON Technologies · Remote" — attribution
- [x] "At Nerdvana, my role was focused on making the sandbox and the software. I worked on building the technical side of the STEM sandbox experience, turning ideas into something students could actually use. This internship helped me improve how I build educational tools and showed me how software can make learning more interactive and accessible." — Nerdvana
- [x] "First-Person Reflection · Nerdvana" — attribution
- [x] "My UTRGV-LANL internship experience" — aria-label
- [x] "My RECON internship experience" — aria-label
- [x] "My Nerdvana internship experience" — aria-label

## Contact (`contact.html`, `contact.js`)
- [x] "Contact | Joshua Collado" — title
- [x] "Get in touch with Joshua Collado — South Texas engineer and developer." — meta description
- [x] "get in touch" — eyebrow
- [x] "let's build something together" — subtitle
- [x] "joshua@portfolio — bash — 80×24" — window title
- [x] "Launching contact interface... [ OK ]" — typed line
- [x] "Ways to reach me" — heading
- [x] "Email" — card
- [x] "GitHub" — card
- [x] "github.com/Blackphenixlord" — card
- [x] "LinkedIn" — card
- [x] "linkedin.com/in/joshua-collado" — card
- [x] "available for opportunities" — status
- [x] "open to internships" — status
- [x] "response time: 24-48hrs" — status
- [x] "Send a message" — form heading
- [x] "Send Joshua a message" — form aria-label
- [x] "your_name" — label
- [x] "your_email" — label
- [x] "subject" — label
- [x] "message" — label
- [x] "you@example.com" — placeholder
- [x] "let's work together" — placeholder
- [x] "hey Joshua, I wanted to reach out about..." — placeholder
- [x] "send_message" — button
- [x] "Your message is ready" — compose fallback
- [x] "Send it" — compose fallback
- [x] "Copy message" — compose fallback
- [x] "Either opens your mail app addressed to" — compose fallback
- [x] "message and send it however you like." — compose fallback
- [x] "Edit instead" — compose fallback
- [x] "Message sent. I usually reply within 24-48 hours." — contact.js success
- [x] "That did not go through" — contact.js error
- [x] "Please fix the highlighted fields." — contact.js
- [x] "is required." — contact.js
- [x] "That email address does not look right." — contact.js
- [x] "A little more detail would help — at least 10 characters." — contact.js
- [x] "Press Ctrl+C" — contact.js copy fallback
- [~] "Company" — a hidden honeypot field label on master, never visible; the rebuild keeps a honeypot under a neutral name

## 404 (`404.html`)
- [x] "404 — Page Not Found | Joshua Collado" — title
- [x] "That page doesn't exist. Here's the way back." — meta description
- [x] "that page isn't on this machine" — heading
- [x] "cat the-page-you-wanted" — command
- [x] "cat: no such file or directory" — output
- [x] "Either the link is wrong, or I moved something and forgot to leave a forwarding address. Both are on me." — copy
- [x] "Press Ctrl + K to search everything from here." — hint

## Easter egg (`rick.html`)
- [x] "Never Gonna Give You Up | Joshua Collado" — title
- [x] "easter_egg.exe — you found it" — eyebrow
- [x] "NEVER GONNA GIVE YOU UP" — heading
- [x] "you typed it. you asked for it. no regrets." — subtitle
- [x] "WATCH ON YOUTUBE" — link
- [x] "auto-launching in" — countdown
- [x] "congratulations, you played yourself" — footer
- [x] "escape back to reality" — link
- [x] "hint: type rick roll in Ctrl+K" — hint
