import { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user');
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-10">
        <img
          src={portfolioData?.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
        />
        <h1 className="text-4xl font-bold mb-4">{portfolioData?.name || 'Your Name'}</h1>
        <p className="text-xl max-w-2xl mx-auto px-4">{portfolioData?.bio || 'Welcome to my portfolio'}</p>
      </section>

      {/* Academic Details Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Academic Background</h2>
        <div className="space-y-6">
          {portfolioData?.academicDetails?.map((academic, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{academic.degree}</h3>
              <p className="text-gray-600">{academic.institution}</p>
              <p className="text-gray-500">{academic.year}</p>
              <p className="mt-2">{academic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData?.projects?.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <ContactForm />
      </section>
    </div>
  );
} 