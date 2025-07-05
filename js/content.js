// Content data management
class ContentManager {
    constructor() {
        this.data = {
            education: [
                {
                    degree: "Master of Science in Data Science",
                    school: "University of Technology",
                    date: "2022-2024"
                },
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "State University",
                    date: "2018-2022"
                },
                {
                    degree: "Machine Learning Specialization",
                    school: "Online Institute",
                    date: "2021"
                }
            ],
            skills: {
                technical: [
                    { icon: "fab fa-python", name: "Python" },
                    { icon: "fas fa-database", name: "SQL" },
                    { icon: "fab fa-react", name: "React" },
                    { icon: "fab fa-js-square", name: "JavaScript" },
                    { icon: "fab fa-git-alt", name: "Git" },
                    { icon: "fab fa-docker", name: "Docker" }
                ],
                aiDataScience: [
                    { icon: "fas fa-brain", name: "Machine Learning" },
                    { icon: "fas fa-chart-line", name: "Data Analysis" },
                    { icon: "fas fa-robot", name: "Deep Learning" },
                    { icon: "fas fa-eye", name: "Computer Vision" },
                    { icon: "fas fa-language", name: "NLP" },
                    { icon: "fas fa-chart-bar", name: "Data Visualization" }
                ]
            },
            projects: [
                {
                    title: "AI Image Classifier",
                    description: "Deep learning model for image classification",
                    image: "path/to/image1.jpg",
                    tags: ["Python", "TensorFlow", "CNN"],
                    liveDemo: "#",
                    viewCode: "#"
                },
                {
                    title: "Data Analytics Dashboard",
                    description: "Interactive dashboard for business intelligence",
                    image: "path/to/image2.jpg",
                    tags: ["React", "D3.js", "Python"],
                    liveDemo: "#",
                    viewCode: "#"
                },
                {
                    title: "NLP Sentiment Analyzer",
                    description: "Real-time sentiment analysis tool",
                    image: "path/to/image3.jpg",
                    tags: ["Python", "NLTK", "Flask"],
                    liveDemo: "#",
                    viewCode: "#"
                }
            ],
            blogPosts: [
                {
                    title: "Understanding Deep Learning Fundamentals",
                    preview: "A comprehensive guide to neural networks and their applications in modern AI systems.",
                    date: "Dec 15, 2024",
                    category: "AI/ML",
                    readTime: "8 min read",
                    image: "path/to/blog1.jpg",
                    link: "#"
                },
                {
                    title: "Data Preprocessing Best Practices",
                    preview: "Essential techniques for cleaning and preparing data for machine learning projects.",
                    date: "Dec 10, 2024",
                    category: "Data Science",
                    readTime: "6 min read",
                    image: "path/to/blog2.jpg",
                    link: "#"
                },
                {
                    title: "Building Scalable ML Pipelines",
                    preview: "Learn how to create robust and scalable machine learning workflows for production.",
                    date: "Dec 5, 2024",
                    category: "MLOps",
                    readTime: "10 min read",
                    image: "path/to/blog3.jpg",
                    link: "#"
                }
            ],
            certifications: [
                {
                    title: "AWS Machine Learning Specialty",
                    issuer: "Amazon Web Services",
                    date: "2024",
                    icon: "fab fa-aws",
                    skills: ["AWS", "ML", "SageMaker", "Deep Learning"],
                    link: "#"
                },
                {
                    title: "Google Cloud Professional ML Engineer",
                    issuer: "Google Cloud",
                    date: "2024",
                    icon: "fab fa-google",
                    skills: ["GCP", "TensorFlow", "BigQuery", "AutoML"],
                    link: "#"
                },
                {
                    title: "Microsoft Azure AI Engineer",
                    issuer: "Microsoft",
                    date: "2023",
                    icon: "fab fa-microsoft",
                    skills: ["Azure", "Cognitive Services", "ML Studio"],
                    link: "#"
                }
            ]
        };

        this.init();
    }

    init() {
        this.populateEducation();
        this.populateSkills();
        this.populateProjects();
        this.populateBlog();
        this.populateCertifications();
    }

    populateEducation() {
        const educationTimeline = document.querySelector('.education-timeline');
        if (!educationTimeline) return;

        educationTimeline.innerHTML = this.data.education.map(item => `
            <div class="education-item">
                <div class="education-header">
                    <div class="education-degree">${item.degree}</div>
                    <div class="education-date">${item.date}</div>
                </div>
                <div class="education-school">${item.school}</div>
            </div>
        `).join('');
    }

    populateSkills() {
        const skillLists = document.querySelectorAll('.skill-list');
        if (skillLists.length < 2) return;

        // Technical Skills
        skillLists[0].innerHTML = this.data.skills.technical.map(skill => `
            <div class="skill-item">
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            </div>
        `).join('');

        // AI & Data Science Skills
        if (skillLists[1]) {
            skillLists[1].innerHTML = this.data.skills.aiDataScience.map(skill => `
                <div class="skill-item">
                    <i class="${skill.icon}"></i>
                    <span>${skill.name}</span>
                </div>
            `).join('');
        }
    }

    populateProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.data.projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-title-bar">
                    <h3 class="project-title-visible">${project.title}</h3>
                </div>
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveDemo}" class="project-link live-demo">Live Demo</a>
                        <a href="${project.viewCode}" class="project-link view-code">View Code</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    populateBlog() {
        const blogSection = document.querySelector('#blog .section-container');
        if (!blogSection) return;

        const blogHTML = `
            <div class="blog-cards-grid">
                ${this.data.blogPosts.map(post => `
                    <article class="blog-post">
                        <div class="blog-post-image">
                            <img src="${post.image}" alt="${post.title}">
                        </div>
                        <div class="blog-post-top">
                            <div class="blog-post-date">${post.date}</div>
                            <h3 class="blog-post-title">${post.title}</h3>
                        </div>
                        <div class="blog-post-bottom">
                            <p class="blog-post-preview">${post.preview}</p>
                            <div class="blog-meta">
                                <div class="meta-item">
                                    <i class="fas fa-clock"></i>
                                    <span class="blog-read-time">${post.readTime}</span>
                                </div>
                                <div class="blog-category">${post.category}</div>
                            </div>
                            <a href="${post.link}" class="read-more">
                                Read More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="view-all-container">
                <a href="/blog" class="view-all-btn">
                    View All Articles <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;

        blogSection.innerHTML = blogHTML;
    }

    populateCertifications() {
        const certsSection = document.querySelector('#certifications');
        if (!certsSection) return;

        const certsHTML = `
            <div class="section-container">
                <h2 class="section-title">Certifications</h2>
                <div class="certs-container">
                    <div class="certs-grid">
                        ${this.data.certifications.map(cert => `
                            <div class="cert-card">
                                <div class="cert-header">
                                    <div class="cert-icon">
                                        <i class="${cert.icon}"></i>
                                    </div>
                                    <div class="cert-info">
                                        <h3 class="cert-title">${cert.title}</h3>
                                        <p class="cert-issuer">${cert.issuer}</p>
                                    </div>
                                </div>
                                <div class="cert-content">
                                    <div class="cert-date">${cert.date}</div>
                                    <div class="cert-skills">
                                        ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                    </div>
                                    <a href="${cert.link}" class="cert-link">
                                        View Certificate <i class="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                        <div class="cert-card view-all-card">
                            <div class="view-all-icon">
                                <i class="fas fa-plus"></i>
                            </div>
                            <div class="view-all-text">View All</div>
                            <div class="view-all-subtext">See my complete certification portfolio</div>
                            <a href="/certifications" class="view-all-btn">
                                Browse All <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        certsSection.innerHTML = certsHTML;
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentManager();
});
