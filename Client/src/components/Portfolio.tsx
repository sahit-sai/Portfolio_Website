import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "@/redux/slices/projectsSlice";
import { RootState, AppDispatch } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const Portfolio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects = [], isLoading } = useSelector((state: RootState) => state.projects) || { projects: [], isLoading: false };
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(projects)) {
      setFilteredProjects([]);
      return;
    }
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p: any) => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const categories = [
    "All",
    ...Array.from(new Set((Array.isArray(projects) ? projects : []).map((p: any) => p.category)))
  ];

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my expertise in full stack development and technical solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects && filteredProjects.length > 0 ? filteredProjects.map((project: any, index) => (
            <div key={index} className="group bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
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
          )) : (
            <div className="col-span-2 text-center text-gray-500">No projects found.</div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-3">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};
