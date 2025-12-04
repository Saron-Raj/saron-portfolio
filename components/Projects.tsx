import React, { useState, useEffect } from 'react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Attempt to fetch GitHub repositories for user 'saronraj03' (derived from email)
    // Only show projects that have a 'homepage' (website) set, per user request.
    const fetchGithubRepos = async () => {
      try {
        const username = 'saronraj03'; 
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        
        if (response.ok) {
          const data = await response.json();
          const webProjects = data
            .filter((repo: any) => repo.homepage && repo.homepage.length > 0) // Filter: must have website (live demo)
            .map((repo: any) => ({
              id: repo.id.toString(),
              title: repo.name.replace(/-/g, ' ').toUpperCase(),
              description: repo.description || "No description provided.",
              technologies: [repo.language || "Web"], // Simplified tech detection
              imageUrl: `https://opengraph.githubassets.com/1/${username}/${repo.name}`, // Use GitHub Social preview image
              demoLink: repo.homepage,
              repoLink: repo.html_url
            }));

          setProjects(webProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubRepos();
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="projects" className="py-8 bg-transparent scroll-mt-24">
      <div className="w-full max-w-[95%] mx-auto px-4">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            A collection of my web development work and deployed applications.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out border border-gray-100 dark:border-gray-800 flex flex-col cursor-pointer h-full transform-gpu"
              >
                <div className="relative overflow-hidden h-52 bg-gray-200 dark:bg-slate-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${project.title}&background=random&color=fff&size=400`;
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                    <button className="text-white text-sm font-semibold tracking-wider border border-white/50 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
                        VIEW DETAILS
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium border border-blue-100 dark:border-blue-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
             </div>
             <p className="text-xl text-gray-500 font-medium">No projects with live demos found.</p>
             <p className="text-gray-400 mt-2">Check back later or visit my GitHub profile.</p>
             <a href={`https://github.com/saronraj03`} target="_blank" rel="noopener noreferrer" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
               Visit GitHub Profile
             </a>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProject(null)}></div>
             
             <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 scrollbar-hide">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                
                {/* Hero Image in Modal */}
                <div className="h-64 sm:h-80 md:h-96 w-full relative shrink-0">
                    <img 
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedProject.title}&background=random&color=fff&size=400`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-8">
                        <div>
                             <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 shadow-sm">{selectedProject.title}</h3>
                             <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies.map((tech, idx) => (
                                <span key={idx} className="text-xs px-3 py-1 bg-white/20 text-white backdrop-blur-md rounded-full border border-white/30 font-medium">
                                    {tech}
                                </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 bg-white dark:bg-slate-900">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                About this Project
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {selectedProject.description}
                            </p>
                            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm italic">
                                Note: This project information is dynamically fetched from GitHub. For full details and the latest updates, please check the repository or live site.
                            </p>
                        </div>

                        <div className="md:w-72 flex flex-col gap-4 shrink-0">
                            <a 
                                href={selectedProject.demoLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full text-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                Visit Live Site
                            </a>
                            {selectedProject.repoLink !== '#' && (
                                <a 
                                    href={selectedProject.repoLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full text-center px-6 py-4 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-xl transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                    View Source Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;