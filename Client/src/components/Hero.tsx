import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Code, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code className="absolute top-1/4 left-1/4 h-8 w-8 text-blue-400 opacity-30 animate-float" />
        <Sparkles className="absolute top-3/4 right-1/4 h-6 w-6 text-purple-400 opacity-40 animate-float-delayed" />
        <Code className="absolute bottom-1/4 left-3/4 h-10 w-10 text-indigo-400 opacity-20 animate-float" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4 animate-fade-in">
              ✨ Professional Freelancer & Full Stack Developer
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent animate-gradient">
              Krishna Chavan
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto font-light">
            Transforming Ideas into Powerful Digital Solutions
          </p>

          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
            Specializing in MERN Stack development, creating scalable web applications,
            CRM solutions, and providing comprehensive technical expertise for businesses worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="https://wa.me/919284769125" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                <span className="mr-2">🚀</span>
                Hire Me Now
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>
            </a>

            <a href="/Krishna_Chavan_Resume.pdf" download="Krishna_Chavan_Resume.pdf">
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </Button>
            </a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToAbout}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ArrowDown className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
