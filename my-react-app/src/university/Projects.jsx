import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Projects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        async function getProjects() {

            try {

                const response = await axios.get(
                    "http://localhost:3000/projects"
                );

                setProjects(response.data);

            } catch (error) {

                console.log(error);

            }
        }

        getProjects();

    }, []);

    return (
        <div>

            <aside>
                <h2>University Portal</h2>

                <nav>
                    <p>
                        <Link to="/university">
                            Dashboard
                        </Link>
                    </p>

                    <p>
                        <Link to="/university/challenges">
                            Challenges
                        </Link>
                    </p>

                    <p>
                        <Link to="/university/projects">
                            Projects
                        </Link>
                    </p>

                    <p>
                        <Link to="/university/teams">
                            Teams
                        </Link>
                    </p>

                    <p>
                        <Link to="/university/industry">
                            Industry Partners
                        </Link>
                    </p>

                    <p>
                        <Link to="/university/progress">
                            Progress Reports
                        </Link>
                    </p>
                </nav>
            </aside>

            <main>

                <h1>Projects</h1>

                <p>
                    Projects created from community challenges.
                </p>

                {projects.length === 0 ? (

                    <p>
                        No projects available.
                    </p>

                ) : (

                    projects.map(project => (

                        <article key={project.id}>

                            <h2>
                                {project.title}
                            </h2>

                            <p>
                                Status: {project.status}
                            </p>

                            <p>
                                Progress: {project.progress}%
                            </p>

                            <p>
                                Faculty Mentor: {project.faculty_mentor}
                            </p>

                            <p>
                                Industry Partner: {project.industry_partner}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(`/university/projects/${project.id}`)
                                }
                            >
                                View Project
                            </button>

                        </article>

                    ))

                )}

            </main>

        </div>
    );
}

export default Projects;