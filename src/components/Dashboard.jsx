import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  updateBio,
  addProject,
  addAcademicDetail,
  getProjects,
  getAcademicDetails,
  updateProject,
  updateAcademicDetail,
  deleteProject,
  deleteAcademicDetail
} from '../services/api';

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('bio');
  const [bio, setBio] = useState('');
  const [academicForm, setAcademicForm] = useState({
    degree: '',
    institution: '',
    year: '',
    description: '',
  });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    link: '',
    technologies: '',
    image: '',
  });
  const [projects, setProjects] = useState([]);
  const [academicDetails, setAcademicDetails] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingAcademic, setEditingAcademic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [projectsRes, academicsRes] = await Promise.all([
        getProjects(),
        getAcademicDetails()
      ]);
      setProjects(projectsRes.data);
      setAcademicDetails(academicsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load when component mounts or user changes
  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      fetchData();
    }
  }, [user, fetchData]);

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateBio(bio);
      const updatedUser = await refreshUser();
      if (updatedUser?.bio) {
        setBio(updatedUser.bio);
      }
      alert('Bio updated successfully!');
    } catch (error) {
      console.error('Failed to update bio:', error);
      alert('Failed to update bio');
    } finally {
      setUpdating(false);
    }
  };

  const handleAcademicSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      if (editingAcademic) {
        await updateAcademicDetail(editingAcademic._id, academicForm);
        setEditingAcademic(null);
      } else {
        await addAcademicDetail(academicForm);
      }
      setAcademicForm({
        degree: '',
        institution: '',
        year: '',
        description: '',
      });
      await fetchData();
      alert(editingAcademic ? 'Academic detail updated successfully!' : 'Academic detail added successfully!');
    } catch (error) {
      alert('Failed to save academic detail');
    } finally {
      setUpdating(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
      };
      
      if (editingProject) {
        await updateProject(editingProject._id, formData);
        setEditingProject(null);
      } else {
        await addProject(formData);
      }
      
      setProjectForm({
        title: '',
        description: '',
        link: '',
        technologies: '',
        image: '',
      });
      await fetchData();
      alert(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
    } catch (error) {
      alert('Failed to save project');
    } finally {
      setUpdating(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      link: project.link,
      technologies: project.technologies.join(', '),
      image: project.image || '',
    });
    setActiveTab('projects');
  };

  const handleEditAcademic = (academic) => {
    setEditingAcademic(academic);
    setAcademicForm({
      degree: academic.degree,
      institution: academic.institution,
      year: academic.year,
      description: academic.description,
    });
    setActiveTab('academic');
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        fetchData();
        alert('Project deleted successfully!');
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const handleDeleteAcademic = async (id) => {
    if (window.confirm('Are you sure you want to delete this academic detail?')) {
      try {
        await deleteAcademicDetail(id);
        fetchData();
        alert('Academic detail deleted successfully!');
      } catch (error) {
        alert('Failed to delete academic detail');
      }
    }
  };

  return (
    <div className="relative min-h-screen pt-20 px-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : (
        <>
          {/* Terminal background */}
          <img src="/assets/terminal.png" alt="Terminal background" className="absolute inset-0 min-h-screen w-full object-cover" style={{ zIndex: -1 }} />

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-12">
              <h1 className="head-text">Dashboard</h1>
              <p className="text-lg text-white-600 mt-3">Manage your portfolio content here</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('bio')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'bio'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                Bio
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'academic'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                Academic
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                }`}
              >
                Projects
              </button>
            </div>

            {/* Bio Section */}
            {activeTab === 'bio' && (
              <section className="space-y-8">
                <div className="bg-gray-800/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-6">Update Bio</h2>
                  <form onSubmit={handleBioSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="field-label">Your Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="field-input min-h-[200px]"
                        placeholder="Tell your story here. What drives you? What are your key achievements? What's your professional journey?"
                        rows="8"
                        disabled={updating}
                      ></textarea>
                      <p className="text-sm text-gray-400 mt-2">
                        This bio will appear on your portfolio's main page. Make it engaging and professional.
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className={`field-btn ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={updating}
                      >
                        {updating ? 'Updating...' : 'Update Bio'}
                        <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn__arrow" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Current Bio Preview */}
                {bio && (
                  <div className="bg-gray-800/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4">Current Bio Preview</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 whitespace-pre-wrap">{bio}</p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Academic Details Section */}
            {activeTab === 'academic' && (
              <section className="space-y-8">
                <div className="bg-gray-800/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {editingAcademic ? 'Edit Academic Detail' : 'Add Academic Detail'}
                  </h2>
                  <form onSubmit={handleAcademicSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="field-label">Degree</label>
                        <input
                          type="text"
                          placeholder="e.g., Bachelor of Science in Computer Science"
                          value={academicForm.degree}
                          onChange={(e) => setAcademicForm({ ...academicForm, degree: e.target.value })}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Institution</label>
                        <input
                          type="text"
                          placeholder="e.g., University of Technology"
                          value={academicForm.institution}
                          onChange={(e) => setAcademicForm({ ...academicForm, institution: e.target.value })}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Year</label>
                        <input
                          type="text"
                          placeholder="e.g., 2020-2024"
                          value={academicForm.year}
                          onChange={(e) => setAcademicForm({ ...academicForm, year: e.target.value })}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Description</label>
                        <textarea
                          placeholder="Brief description of your academic experience"
                          value={academicForm.description}
                          onChange={(e) => setAcademicForm({ ...academicForm, description: e.target.value })}
                          className="field-input"
                          rows="3"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-4">
                      <button type="submit" className="field-btn">
                        {editingAcademic ? 'Update' : 'Add'} Academic Detail
                        <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn__arrow" />
                      </button>
                      {editingAcademic && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAcademic(null);
                            setAcademicForm({
                              degree: '',
                              institution: '',
                              year: '',
                              description: '',
                            });
                          }}
                          className="px-6 py-3 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600/80 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Academic Details List */}
                {academicDetails.length > 0 && (
                  <div className="bg-gray-800/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6">Academic History</h3>
                    <div className="space-y-6">
                      {academicDetails.map((academic) => (
                        <div key={academic._id} className="p-6 bg-gray-700/80 rounded-lg">
                          <h4 className="text-lg font-semibold text-white">{academic.degree}</h4>
                          <p className="text-blue-400">{academic.institution}</p>
                          <p className="text-gray-400">{academic.year}</p>
                          <p className="mt-2 text-gray-300">{academic.description}</p>
                          <div className="mt-4 flex space-x-4">
                            <button
                              onClick={() => handleEditAcademic(academic)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAcademic(academic._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Projects Section */}
            {activeTab === 'projects' && (
              <section className="space-y-8">
                <div className="bg-gray-800/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {editingProject ? 'Edit Project' : 'Add Project'}
                  </h2>
                  <form onSubmit={handleProjectSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="field-label">Project Title</label>
                        <input
                          type="text"
                          placeholder="e.g., Portfolio Website"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Description</label>
                        <textarea
                          placeholder="Describe your project"
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="field-input"
                          rows="3"
                          required
                        ></textarea>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Project Link</label>
                        <input
                          type="url"
                          placeholder="https://your-project.com"
                          value={projectForm.link}
                          onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Technologies</label>
                        <input
                          type="text"
                          placeholder="React, Node.js, MongoDB (comma-separated)"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                          className="field-input"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Project Image URL</label>
                        <input
                          type="url"
                          placeholder="https://image-url.com/project-image.jpg"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          className="field-input"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-4">
                      <button type="submit" className="field-btn">
                        {editingProject ? 'Update' : 'Add'} Project
                        <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn__arrow" />
                      </button>
                      {editingProject && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setProjectForm({
                              title: '',
                              description: '',
                              link: '',
                              technologies: '',
                              image: '',
                            });
                          }}
                          className="px-6 py-3 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600/80 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Projects List */}
                {projects.length > 0 && (
                  <div className="bg-gray-800/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6">Your Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project) => (
                        <div key={project._id} className="p-6 bg-gray-700/80 rounded-lg">
                          {project.image && (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                          )}
                          <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                          <p className="mt-2 text-gray-300">{project.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-blue-400 hover:text-blue-300 transition-colors block"
                          >
                            View Project →
                          </a>
                          <div className="mt-4 flex space-x-4">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
} 