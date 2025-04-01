import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Code2, ChevronRight, Layers } from "lucide-react";
import Swal from 'sweetalert2';
import { Globe, Layout, Cpu, Code, Package } from "lucide-react";

const TECH_ICONS = { React: Globe, Tailwind: Layout, Express: Cpu, Python: Code, default: Package };

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const TeamCount = project?.Team?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{TeamCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Member</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#3085d6',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        console.log("Fetched Data:", data); // Log the data
        const selectedProject = data.projects.find((p) => String(p.id) === id);
        console.log("Selected Project:", selectedProject); // Log the selected project

        if (selectedProject) {
          const enhancedProject = {
            ...selectedProject,
            Features: selectedProject.Features || [],
            TechStack: selectedProject.TechStack || [],
            Github: selectedProject.Github || 'https://github.com/khornSaokhouch',
            Img: selectedProject.Img || '/default-image.jpg',
          };
          setProject(enhancedProject);
        } else {
          console.error("No project found with ID:", id);
        }
      } catch (error) {
        console.error("Error loading project data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background Animations */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          {/* Breadcrumb and Header */}
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            {/* Content Area */}
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <p className="text-lg md:text-xl text-gray-400">{project.Description}</p>
              </div>

              <ProjectStats project={project} />

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">Technologies Used</h2>
                <div className="flex gap-4 md:gap-8 flex-wrap">
                  {project.TechStack.map((tech, idx) => (
                    <TechBadge key={idx} tech={tech} />
                  ))}
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">Team Member</h2>
                <ul className="space-y-4">
                  {project.Team.map((feature, idx) => (
                    <FeatureItem key={idx} feature={feature} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Image Area */}
            <div className="relative">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-700/10 to-purple-700/10">
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  onLoad={() => setIsImageLoaded(true)}
                  style={{ display: isImageLoaded ? "block" : "none" }}
                />
              </div>
            </div>
          </div>

          {/* Github and Live Demo */}
          <div className="mt-12">
            <a
              href={project.Github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 md:space-x-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 hover:text-white transition-all duration-300 text-sm md:text-lg font-semibold py-3 px-5 rounded-lg border border-blue-500/30"
              onClick={() => handleGithubClick(project.Github)}
            >
              <Github className="w-5 h-5" />
              <span>View Source Code</span>
            </a>
            <a
              href={project.ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center space-x-3 md:space-x-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/40 hover:text-white transition-all duration-300 text-sm md:text-lg font-semibold py-3 px-5 rounded-lg border border-purple-500/30"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
