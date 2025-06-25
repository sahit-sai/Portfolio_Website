import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "@/redux/slices/projectsSlice";
import { RootState, AppDispatch } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// Static fallback data
const staticProjects = [
  {
    _id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce site with product listings, a shopping cart, and a secure checkout process.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://th.bing.com/th/id/OIP.V_iBTMBioz4pHXcPk7ZSHgHaE7?w=297&h=197&c=7&r=0&o=7&dpr=1.6&pid=1.7&rm=3",
    liveUrl: "#",
    githubUrl: "#",
    category: "Web App"
  },
  {
    _id: "2",
    title: "Job Portal",
    description: "A platform for job seekers to find openings and for employers to post vacancies.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "data:image/webp;base64,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",
    liveUrl: "#",
    githubUrl: "#",
    category: "Web App"
  },
  {
    _id: "3",
    title: "Personal Portfolio",
    description: "A sleek, modern portfolio website to showcase skills and projects, just like this one!",
    tags: ["React", "Tailwind CSS", "Vite"],
    image: "https://th.bing.com/th/id/OIP.ckEuBPxKmkLEW8J1Pzga4QHaF7?w=247&h=197&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    liveUrl: "#",
    githubUrl: "#",
    category: "Website"
  },
  {
    _id: "4",
    title: "Spotify Clone",
    description: "A web application that mimics the core functionalities of Spotify, including music streaming and playlist management.",
    tags: ["React", "Redux", "Spotify API", "Styled Components"],
    image: "https://th.bing.com/th/id/OIP.GqNc0QzXfyhuyeDxX5J5ggHaFj?w=257&h=182&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    liveUrl: "#",
    githubUrl: "#",
    category: "Web App"
  }
];

export const Portfolio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, status } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const projectsToDisplay = status === 'failed' || projects.length === 0 ? staticProjects : projects;

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my expertise in full stack development and technical solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {status === 'loading' ? (
            <p className="text-center col-span-2">Loading projects...</p>
          ) : projectsToDisplay.map((project: any) => (
            <div key={project._id} className="group bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex gap-3">
                    <Button asChild size="sm" className="bg-white text-black hover:bg-gray-100">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                    {project.category}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags && Array.isArray(project.tags) && project.tags.map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
