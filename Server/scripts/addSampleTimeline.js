import mongoose from "mongoose";
import dotenv from "dotenv";
import Timeline from "../src/api/timeline/timeline.model.js";

dotenv.config({ path: "./Server/.env" }); // Correct path to .env

console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log

const sampleTimelineData = [
  {
    title: "Full Stack Developer Intern",
    company: "World Door Infotech Pvt. Ltd., Pune",
    year: "June 2025 – Present",
    description:
      "Working on MERN stack projects and contributing to web application development.",
    type: "work",
  },
  {
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    year: "2023 – 2025",
    description:
      "Developed scalable backend systems and integrated third-party APIs.",
    type: "work",
  },
  {
    title: "Junior Developer",
    company: "Innovatech Pvt. Ltd.",
    year: "2021 – 2023",
    description:
      "Assisted in frontend development and optimized database queries.",
    type: "work",
  },
];

const addSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await Timeline.insertMany(sampleTimelineData);
    console.log("Sample timeline data added successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding sample data:", error);
    mongoose.connection.close();
  }
};

addSampleData();
