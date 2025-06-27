import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchTimeline } from '@/redux/slices/timelineSlice';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Code, Database, Globe, Users } from "lucide-react";

export const About = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: timeline, status } = useSelector((state: RootState) => state.timeline);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTimeline());
    }
  }, [status, dispatch]);

  const staticTimelineData = [
    {
      _id: "685e5175c366e3179143c074",
      title: "Full Stack Developer Intern",
      company: "World Door Infotech Pvt. Ltd., Pune",
      year: "June 2025 – Present",
      description: "Currently working as a full stack developer intern contributing to multiple live projects. Responsible for both frontend and backend development to build scalable and user-friendly web solutions.",
      type: "work",
      achievements: [
        "Worked on the production website ekoham.co.in",
        "Currently improving and restructuring unochargers.in for better performance and usability",
        "Gained experience in real-time development, deployment, and collaboration with teams",
        "Ensured clean UI/UX, optimized structure, and functional integrity across projects"
      ]
    },
    {
      _id: "685e4f85c366e3179143c055",
      title: "Freelance Full-Stack Web Developer",
      company: "crackoffcampus.com (Startup)",
      year: "April-May 2024",
      description: "Designed and developed a complete job-portal website for a startup, handling both front-end and back-end. Ensured on-time delivery and a clean, user-friendly interface.",
      type: "work",
      achievements: [
        "Delivered the project on the agreed deadline with excellent client feedback",
        "1000 + active users within months of launch",
        "Integrated Cashfree as the payment gateway for premium services",
        "Built an admin dashboard for posting jobs; applicants can apply directly"
      ]
    },
    {
      _id: "685e4e16c366e3179143c048",
      title: "Full Stack Developer Intern",
      company: "Cloud Counselage Pvt. Ltd., Mumbai",
      year: "Sep 13 – Nov 8, 2024",
      description: "Worked on full stack web development projects as part of the internship program. Gained hands-on experience with both frontend and backend technologies through real-world applications.",
      type: "work",
      achievements: [
        "Attended multiple workshops focused on corporate and business ethics",
        "Strengthened core concepts in frontend and backend development",
        "Collaborated effectively within a professional team environment",
        "Gained exposure to industry-level workflows and project management practices"
      ]
    },
    {
      _id: "685e4c30c366e3179143c03b",
      title: "B.E. in Computer Engineering",
      company: "Sandip Institute of Technology and Research Centre",
      year: "2022-2026",
      description: "CGPA: 9.14\nCore Subjects: Data Structures, Operating Systems, Database Management Systems, Machine Learning",
      type: "education",
      achievements: [
        "🥇 Won 1st Prize in Tie-Day competition at SANDIPOTSAV 2K23",
        "🤝 Selected as Class Representative and Cultural Head of CESA, showcasing leadership and teamwork",
        "📜 Earned certification in Java + DSA from Apna College",
        "✅ Solved 90+ DSA problems to strengthen core programming skills"
      ]
    },
    {
      _id: "685e4bf2c366e3179143c02e",
      title: "Higher Secondary Education (Science Stream)",
      company: "Badrinarayan Barwale Junior College, Jalna",
      year: "2020–2022",
      description: "Completed 11th and 12th grade in the Science stream. Consistently ranked among the top 5 students in the college, demonstrating strong academic performance and discipline.",
      type: "education",
      achievements: [
        "Scored 88.98% in the MHT-CET (entrance exam), reflecting excellent preparation and subject knowledge."
      ]
    },
    {
      _id: "685e4aaec366e3179143c015",
      title: "Secondary School Education (Class 10 – CBSE)",
      company: "Vivekananda English School, Partur",
      year: "2019–2020",
      description: "Completed Class 10 under the CBSE curriculum with a strong academic and co-curricular record. Demonstrated excellence in academics and active participation in sports.",
      type: "education",
      achievements: [
        "Scored 80.2% in Class 10 CBSE Board Exams",
        "Second topper of the school in the Olympiad Exam"
      ]
    }
  ];

  const timelineItems = status === 'succeeded' && Array.isArray(timeline) && timeline.length > 0
    ? [...timeline].reverse() // Show most recent first
    : staticTimelineData;
  const mainTimeline = timelineItems.slice(0, 4);
  const additionalTimeline = timelineItems.slice(4);

  const skills = [
    {
      category: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Tailwind CSS", "Bootstrap"],
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication"],
      icon: Code,
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Database",
      items: ["MongoDB", "MySQL", "Mongoose ODM", "Database Design"],
      icon: Database,
      color: "from-purple-500 to-violet-500"
    },
    {
      category: "Tools & Others",
      items: ["Git & GitHub", "LaTeX", "VS Code", "Postman", "npm/yarn"],
      icon: Users,
      color: "from-orange-500 to-red-500"
    },
  ];

  const stats = [
    { number: "5+", label: "Projects Completed", icon: Award },
    { number: "100%", label: "Client Satisfaction", icon: Users },
    { number: "2+", label: "Years Experience", icon: Calendar },
    { number: "24/7", label: "Support Available", icon: Globe },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            ABOUT ME
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Passionate Developer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into powerful digital solutions with clean code and innovative design.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio Section */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-gray-900">My Journey</h3>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    As a dedicated <span className="font-semibold text-blue-600">full stack developer</span>, I specialize in creating robust web applications
                    using the MERN stack. My journey in web development has been driven by a passion for
                    clean code, exceptional user experiences, and solving complex technical challenges.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    I have successfully delivered projects for various clients, from <span className="font-semibold text-purple-600">startups to established businesses</span>,
                    helping them build scalable web solutions. My expertise extends beyond just coding -
                    I also provide comprehensive technical documentation using LaTeX and offer
                    expert debugging and maintenance solutions.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3">What drives me:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Creating impactful digital solutions
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Continuous learning and innovation
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Building long-term client relationships
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skillCategory, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${skillCategory.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        <skillCategory.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">{skillCategory.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Timeline Items */}
            {additionalTimeline.length > 0 && (
              <div className="space-y-8">
                {additionalTimeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 relative">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        {index < additionalTimeline.length - 1 && (
                          <div className="absolute top-4 left-2 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600 opacity-30"></div>
                        )}
                      </div>
                      <Card className="ml-6 flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              {item.year}
                            </span>
                            <Badge variant={item.type === 'work' ? 'default' : 'secondary'} className="capitalize">
                              {item.type}
                            </Badge>
                          </div>
                          <h4 className="font-bold text-xl mb-1 text-gray-900">{item.title}</h4>
                          <div className="text-base font-medium text-gray-700 mb-2">{item.company}</div>
                          <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                          <div className="space-y-2">
                            <h5 className="font-semibold text-gray-800">Key Achievements:</h5>
                            <ul className="space-y-1">
                              {item.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-center text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Experience & Education</h3>
            <div className="space-y-8">
              {mainTimeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 relative">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      {index < mainTimeline.length - 1 && (
                        <div className="absolute top-4 left-2 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600 opacity-30"></div>
                      )}
                    </div>
                    <Card className="ml-6 flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                          <Badge variant={item.type === 'work' ? 'default' : 'secondary'} className="capitalize">
                            {item.type}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-xl mb-1 text-gray-900">{item.title}</h4>
                        <div className="text-base font-medium text-gray-700 mb-2">{item.company}</div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-gray-800">Key Achievements:</h5>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
