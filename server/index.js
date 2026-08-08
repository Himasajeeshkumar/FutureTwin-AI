import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askAI } from "./services/aiService.js";
import connectDB from "./config/db.js";
import Resume from "./models/Resume.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import JobMatch from "./models/JobMatch.js";
import SkillGap from "./models/SkillGap.js";
import CareerSimulation from "./models/CareerSimulation.js";
import MentorChat from "./models/MentorChat.js";
import { scoreResume } from "./utils/scoreResume.js";
import PasswordReset from "./models/PasswordReset.js";
import { sendOTP } from "./utils/sendEmail.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://futuretwin-ai-1.onrender.com"
  ],
  credentials: true,
}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("FutureTwin AI Backend Running 🚀");
});
app.post("/resume", verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    const prompt = `
You are FutureTwin AI Resume Analyzer.

Your job is to analyze a student's resume like a professional ATS (Applicant Tracking System).

IMPORTANT:

Do NOT calculate Resume Score.
Do NOT calculate ATS Score.

Only analyze and extract information.

Your responsibilities:

1. Parse the resume accurately.
2. Extract all personal details.
3. Extract education.
4. Extract work experience.
5. Extract internships.
6. Extract every project.
7. Extract every certification.
8. Extract every technical skill.
9. Identify strengths.
10. Identify weaknesses.
11. Identify missing skills.
12. Recommend suitable career roles.
13. Suggest improvements.

Rules:

- Count internships as experience.
- Never ignore certifications.
- Never ignore projects.
- Parse LinkedIn, GitHub and Portfolio links.
- If a field is unavailable return an empty string.
- Never invent information.
- Return ONLY valid JSON.
- Do not add markdown.
- Do not explain.

Return JSON exactly in this format:

{
  "parsedResume": {
  "personal": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "portfolio": ""
  },

  "summary": "",

  "education": [
    {
      "degree": "",
      "college": "",
      "year": "",
      "cgpa": ""
    }
  ],

  "experience": [
    {
      "job": "",
      "company": "",
      "duration": "",
      "description": []
    }
  ],

  "projects": [
    {
      "title": "",
      "description": [],
      "technologies": [],
      "github": "",
      "live": ""
    }
  ],

  "skills": [
    {
      "category": "",
      "items": []
    }
  ],

"certifications": [
  {
    "name": "",
    "issuer": "",
    "year": "",
    "credential": ""
  }
],

"strengths": [],

"weaknesses": [],

"missingSkills": [],

"careerRecommendation": ""

Resume:

Additional Instructions:

- Strengths should contain 3–5 concise points highlighting the candidate's strongest qualities.
- Weaknesses should contain realistic areas for improvement based only on the resume.
- MissingSkills should list relevant technical or professional skills that would improve employability.
- CareerRecommendation should be a short paragraph recommending suitable roles and next learning steps.
- Never leave these fields empty unless there is absolutely no information to infer from the resume.

${message}
`;

    let reply = await askAI(prompt);

    reply = reply.trim();

    reply = reply.replace(/^```json\s*/i, "");
    reply = reply.replace(/^```\s*/i, "");
    reply = reply.replace(/```$/i, "");

    console.log("AI Response:");

    const analysis = JSON.parse(reply);

    // Calculate ATS and Resume Scores
    const scores = scoreResume(analysis.parsedResume);

    // Merge scores into analysis
    analysis.atsScore = scores.atsScore;
    analysis.resumeScore = scores.resumeScore;
    analysis.recruiterScore = scores.recruiterScore;
    analysis.interviewReadiness = scores.interviewReadiness;
    analysis.verdict = scores.verdict;
    analysis.sectionScores = scores.sectionScores;

    // Save to MongoDB
    await Resume.create({

        userId: req.user.id,

        resumeText: message,

        parsedResume: analysis.parsedResume,

        analysis

    });

    // Return complete analysis
    res.json(analysis);
  } catch (error) {
    console.error(error);

    res.status(500).json({
    error: error.message,
  });
  }
});

app.post("/generate-summary", verifyToken, async (req, res) => {

    try {

        const { resume } = req.body;

        if (!resume) {
            return res.status(400).json({
                error: "Resume data is required."
            });
        }

        const prompt = `
You are FutureTwin AI Resume Writer.

Generate a professional resume summary based ONLY on the candidate information provided below.

Requirements:

- Write 2–4 sentences.
- Professional and ATS-friendly.
- Suitable for a fresher / early-career candidate.
- Highlight the candidate's strongest technical skills.
- Mention relevant experience, internships, projects, or education when useful.
- Do not invent experience, skills, companies, achievements, or technologies.
- Avoid first-person language.
- Do not use bullet points.
- Return ONLY the summary text.
- Do not add quotation marks.
- Do not add headings.

Candidate Resume:

${JSON.stringify(resume, null, 2)}
`;

        const summary = await askAI(prompt);

        res.json({
            summary: summary.trim()
        });

    } catch (error) {

        console.error("Summary generation error:", error);

        res.status(500).json({
            error: "Unable to generate AI summary."
        });

    }

});

const PORT = process.env.PORT || 5000;
app.post("/mentor", verifyToken, async (req, res) => {

    try {

        const { message } = req.body;

        const prompt = `
You are FutureTwin AI Career Mentor.

Your goal is to help students become industry-ready.

You specialize in:

- AI
- Machine Learning
- Data Science
- Software Engineering
- Backend Development
- Frontend Development
- Full Stack Development
- Cloud Computing
- DevOps

Rules:

- Be friendly.
- Be motivating.
- Give practical advice.
- Explain simply.
- Recommend projects.
- Recommend certifications.
- Recommend learning resources.
- Give interview tips.
- Give placement strategies.
- If asked for a roadmap, divide it into:
  Beginner
  Intermediate
  Advanced
  Interview Preparation
- Reply in plain text.
- Never use Markdown tables.
`;

        const reply = await askAI(`${prompt}

        User Question:

        ${message}`);

        await MentorChat.create({

            userId: req.user.id,

            question: message,

            answer: reply

        });

        res.json({
            reply
        });

    }catch (error) {

    

        res.status(500).json({
            error: error.message
        });

    }

});

app.post("/job-match", verifyToken, async (req, res) => {

    try {

        const { resume, jobDescription } = req.body;

 const prompt = `
You are FutureTwin AI ATS Job Matching Engine.

Compare the resume with the job description.

Evaluate:

- Programming Languages
- Technical Skills
- Frameworks
- Tools
- Projects
- Experience
- Education
- Certifications

Rules:

- Count internships as experience.
- Count projects as experience.
- Count certifications.
- Mention every matching skill.
- Mention every missing skill.
- Give realistic suggestions.
- Estimate hiring chance.
- Do not exaggerate.
- Return ONLY JSON.

Return:

{
  "matchScore":0,
  "matchingSkills":[],
  "missingSkills":[],
  "suggestions":[],
  "hiringChance":"",
  "overallVerdict":""
}

Resume:

${resume}

Job Description:

${jobDescription}
`;
        let reply = await askAI(prompt);

        reply = reply.trim();

        reply = reply.replace(/^```json\s*/i, "");
        reply = reply.replace(/^```\s*/i, "");
        reply = reply.replace(/```$/i, "");

        const result = JSON.parse(reply);

        await JobMatch.create({

            userId: req.user.id,

            resume,

            jobDescription,

            result

        });


        res.json(result);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

});
app.post("/simulator", verifyToken, async (req, res) => {

    try {

        const { career, skills } = req.body;

       const prompt = `
You are FutureTwin AI Career Simulator.

Predict a student's career growth based on their profile.

Career Goal:
${career}

Current Skills:
${skills.join(", ")}

Evaluate based on:
- Current skills
- Market demand
- Learning curve
- Projects
- Experience
- Resume quality

Return ONLY valid JSON.

{
  "successProbability": 0,
  "salary": "",
  "timeline": "",
  "missingSkills": [],
  "recommendedProjects": [],
  "roadmap": [],
  "interviewReadiness": "",
  "advice": ""
}

Rules:

- successProbability MUST be an INTEGER between 0 and 100.
- Never return decimal values like 0.8 or 0.75.
- Never include the "%" symbol.
- Salary should reflect the current Indian job market.
- Timeline should be realistic.
- Recommend 3-5 projects.
- Recommend 4-8 missing skills.
- Roadmap should contain 5-6 learning steps.
- Advice should be practical and actionable.
`;

let reply = await askAI(prompt);

reply = reply.trim();

        reply = reply.replace(/^```json\s*/i, "");
        reply = reply.replace(/^```\s*/i, "");
        reply = reply.replace(/```$/i, "");

        const result = JSON.parse(reply);


        if (result.successProbability <= 1) {
            result.successProbability = Math.round(result.successProbability * 100);
        }

        await CareerSimulation.create({

            userId: req.user.id,

            career,

            skills,

            result

        });

      
        res.json(result);

    } catch (error) {

    

        res.status(500).json({
            error: error.message
        });

    }

});

app.post("/skill-gap",verifyToken, async (req, res) => {

    try {

        const { career, skills } = req.body;

       const prompt = `
You are FutureTwin AI Skill Gap Analyzer.

Target Career:

${career}

Current Skills:

${skills.join(", ")}

Analyze the gap between current skills and industry expectations.

Return ONLY JSON.

{
  "matchPercentage":0,
  "missingSkills":[],
  "priority":[],
  "resources":[
    {
      "title":"",
      "platform":"",
      "level":""
    }
  ],
  "estimatedTime":"",
  "advice":""
}

Rules:

- Match percentage must be realistic.
- Prioritize skills in learning order.
- Recommend official learning resources.
- Include beginner-friendly platforms when possible.
- Estimated learning time should be practical.
`;

        let reply = await askAI(prompt);

        reply = reply.trim();

        reply = reply.replace(/^```json\s*/i, "");
        reply = reply.replace(/^```\s*/i, "");
        reply = reply.replace(/```$/i, "");

        const result = JSON.parse(reply);

        await SkillGap.create({

            userId: req.user.id,

            career,

            skills,

            result

        });

        res.json(result);

    }
    catch (error) {

  

        res.status(500).json({
            error: error.message
        });

    }

});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid email or password"
      });
    }

    // Create JWT
    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.json({

      message: "Login successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });

  }

  catch (error) {

    

    res.status(500).json({

      error: error.message

    });

  }

});

app.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "Email is required."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                error: "No account found with this email."
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await PasswordReset.deleteMany({
            email: normalizedEmail
        });

        await PasswordReset.create({
            email: normalizedEmail,
            otp,
            expiresAt
        });

        await sendOTP(
            normalizedEmail,
            otp
        );

        res.json({
            message: "OTP sent successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to send password reset OTP."
        });

    }

});

app.post("/verify-otp", async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                error: "Email and OTP are required."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const reset = await PasswordReset.findOne({
            email: normalizedEmail,
            otp: otp.toString()
        });

        if (!reset) {
            return res.status(400).json({
                error: "Invalid OTP."
            });
        }

        if (reset.expiresAt < new Date()) {

            await PasswordReset.deleteOne({
                _id: reset._id
            });

            return res.status(400).json({
                error: "OTP has expired."
            });

        }

        res.json({
            message: "OTP verified successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to verify OTP."
        });

    }

});

app.post("/reset-password", async (req, res) => {

    try {

        const {
            email,
            otp,
            newPassword
        } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                error: "Email, OTP and new password are required."
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const reset = await PasswordReset.findOne({
            email: normalizedEmail,
            otp: otp.toString()
        });

        if (!reset) {
            return res.status(400).json({
                error: "Invalid OTP."
            });
        }

        if (reset.expiresAt < new Date()) {

            await PasswordReset.deleteOne({
                _id: reset._id
            });

            return res.status(400).json({
                error: "OTP has expired."
            });

        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await User.findOneAndUpdate(
            { email: normalizedEmail },
            { password: hashedPassword }
        );

        await PasswordReset.deleteOne({
            _id: reset._id
        });

        res.json({
            message: "Password reset successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to reset password."
        });

    }

});

app.get("/dashboard", verifyToken, async (req, res) => {

    try {

        
        const latestResume = await Resume
            .findOne({ userId: req.user.id })
            .sort({ createdAt: -1 });

        const latestJobMatch = await JobMatch
            .findOne({ userId: req.user.id })
            .sort({ createdAt: -1 });

        const latestSkillGap = await SkillGap
            .findOne({ userId: req.user.id })
            .sort({ createdAt: -1 });

        const latestSimulation = await CareerSimulation
            .findOne({ userId: req.user.id })
            .sort({ createdAt: -1 });

        const mentorCount = await MentorChat.countDocuments({
            userId: req.user.id
        });

        res.json({

            user: req.user.id,

            resume: latestResume,

            jobMatch: latestJobMatch,

            skillGap: latestSkillGap,

            simulation: latestSimulation,

            mentorChats: mentorCount

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
