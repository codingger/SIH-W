import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CompanyProjects() {

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

                <h2>Company Portal</h2>

                <nav>

                    <p>
                        <Link to="/company">
                            Dashboard
                        </Link>
                    </p>

                    <p>
                        <Link to="/company/projects">
                            Projects
                        </Link>
                    </p>

                    <p>
                        <Link to="/company/collaborations">
                            My Collaborations
                        </Link>
                    </p>

                    <p>
                        <Link to="/company/progress">
                            Progress
                        </Link>
                    </p>

                </nav>

            </aside>


            <main>

                <h1>Projects</h1>

                <p>
                    Explore projects created from community challenges.
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
                                {project.description}
                            </p>

                            <p>
                                Status: {project.status}
                            </p>

                            <p>
                                Progress: {project.progress}%
                            </p>

                            {project.industry_partner ? (

                                <p>
                                    Industry Partner:{" "}
                                    {project.industry_partner}
                                </p>

                            ) : (

                                <p>
                                    Open for Industry Collaboration
                                </p>

                            )}

                            <button
                                onClick={() =>
                                    navigate(
                                        `/company/projects/${project.id}`
                                    )
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

export default CompanyProjects;