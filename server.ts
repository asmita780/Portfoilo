import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "portfolio.json");
const JWT_SECRET = process.env.JWT_SECRET || "ravina-portfolio-secret-123";

// Mock Database Connection (Simple Object as requested in Option 1)
const MOCK_USERS = [
  { username: "author", password: "password123", role: "author" }
];

// Initial data structure matching PDF content
const INITIAL_DATA = {
  profile: {
    name: "Ravina Kumari",
    title: "Developer by logic, designer by heard. Obsessed with clean code.",
    experienceYears: "03",
    cvUrl: "/cv.pdf",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  },
  about: {
    description: "I'm a self-taught developer who enjoys building clean, meaningful, and reliable software. I value intention, clarity, and thoughtful decisions in everything I build.",
    journey: [
      "I completed my 12th (Arts, First Division). I had always loved math, but due to family circumstances, I couldn't pursue science. At that time, I had never heard of coding.",
      "My journey changed when I joined Navgurukul, an NGO that introduced me to programming. It was my first exposure to code — and it instantly clicked.",
      "With no formal degree, I relied on self-learning, practice, and discipline. Hard work and consistency became my biggest strengths.",
      "I built real projects, worked on production systems, and learned by solving actual problems. Practical experience shaped me more than any classroom could.",
      "Today, I'm a confident and professional developer. I don't have a degree — but I have skills, experience, and a strong sense of ownership. And I'm proud of how far I've come."
    ],
    howIWork: [
      { title: "Understand before building", description: "I care about why something works, not just that it does.", icon: "zap" },
      { title: "Depth with practicality", description: "I go deep when it adds value and move fast when it doesn't.", icon: "scale" },
      { title: "Respect clean system", description: "I prefer clean code, while respecting existing working systems.", icon: "check-circle" },
      { title: "Think long-term", description: "I'm deeply curious about building scalable and robust solutions.", icon: "lightbulb" }
    ]
  },
  testimonials: [
    {
      name: "Dharmesh Donga",
      role: "Program Manager",
      quote: "Her commitment to delivering quality work makes a real difference.",
      feedback: "You have been an outstanding contributor to the team. Your technical skills and problem-solving approach have consistently impressed me. I truly appreciate your proactive attitude and the way you collaborate with others—It creates a positive and productive environment. Keep up.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Sarmistha Maity",
      role: "Senior Software Engineer",
      quote: "She is a deep learner with remarkable clarity.",
      feedback: "I have had the pleasure of working with her on the same project, and I am genuinely impressed by her dedication and talent. She consistently delivers work with clarity and strong conceptual grounding. she is truly an asset to any team.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Zaid Mansuri",
      role: "Senior Software Engineer",
      quote: "She brings passion and positive energy to everything she does.",
      feedback: "It's truly great working with Ravina --- she is supportive, dedicated, and always brings positive energy. She consistently puts passion.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    }
  ],
  experience: [
    {
      period: "2025 - Present",
      role: "Senior Engineer",
      skills: "Nest JS, Typescript, React js, MongoDB, PostgreSQL, AWS",
      description: "Working with a global pharma client on a high-security, AWS-heavy system with strict compliance and modern tooling. Building with NestJS, Docker, and cloud-first architecture — still learning, still building, still curious about what's next."
    },
    {
      period: "2023 - 2025",
      role: "Full-Stack Web Developer",
      skills: "Next JS, Express JS, MongoDB, AWS, GCP, WebScrapping, AI APIs",
      description: "Built and scaled a gaming jobs platform from a few hundred to 50K+ listings through automated scraping and stable pipelines. Owned parsing, cloud deployments, and learned real engineering - clean structure, scalable patterns, and production-ready backend work."
    },
    {
      period: "2021 - 2022",
      role: "Software Consultant",
      skills: "MERN, MEAN, VueJS, HTML, CSS, PostgreSQL, AWS-lambda",
      description: "Delivered projects across MERN, MEAN, and Vue stacks while leading my first live project end-to-end. Developed a love for debugging, learning fast, and writing code that actually makes sense and works."
    },
    {
      period: "2020 - 2021",
      role: "Software Consultant Intern",
      skills: "Salesforce, NodeJS, Python, Django, IT-Support(Help desk manager)",
      description: "Started as a Node.js dev but became the sole Salesforce developer — building apps, dashboards, and full workflows. Learned Python/Django on the side and understood how small ideas become real working systems."
    }
  ],
  socials: {
    linkedin: "https://linkedin.com/in/ravina-kumari",
    github: "https://github.com/ravina-kumari",
    instagram: "https://instagram.com/ravina",
    twitter: "https://twitter.com/ravina",
    discord: "https://discord.gg/ravina",
    email: "ravina@example.com"
  }
};

if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2));
}

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Middleware to check for 'Author' role
  const checkAuthor = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Authentication required" });
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { username: string, role: string };
      if (decoded.role !== 'author') {
        return res.status(403).json({ error: "Access denied: Only authors can manage content" });
      }
      (req as any).user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid or expired session" });
    }
  };

  // API Routes
  app.get("/api/portfolio", (req, res) => {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        return res.json(INITIAL_DATA);
      }
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(raw);
      res.json(data);
    } catch (err) {
      console.error("API Error (GET):", err);
      res.status(500).json({ error: "Failed to read data" });
    }
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for user: ${username}`);
    
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
      if (user.role === 'author') {
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
        });
        return res.json({ success: true, role: user.role });
      } else {
        return res.status(403).json({ error: "Access denied: Role mismatch" });
      }
    }
    res.status(401).json({ error: "Invalid username or password" });
  });

  app.post("/api/portfolio", checkAuthor, (req, res) => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
      console.log("Portfolio data updated successfully by author");
      res.json({ success: true });
    } catch (e) {
      console.error("API Error (POST):", e);
      res.status(500).json({ error: "Failed to save data" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  });
}

startServer();
