import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CompanyDashboard() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {

        async function getData() {

            try {

                const projectsResponse = await axios.get(
                    "http://localhost:3000/projects"
                );

                const teamsResponse = await axios.get(
                    "http://localhost:3000/teams"
                );

                setProjects(projectsResponse.data);
                setTeams(teamsResponse.data);

            } catch (error) {

                console.log(error);

            }

        }

        getData();

    }, []);

    const activeProjects = projects.filter(
        project =>
            project.status !== "Completed"
    );

    const collaborations = projects.filter(
        project =>
            project.industry_partner
    );

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

                <h1>Company Dashboard</h1>

                <p>
                    Explore university projects and collaborate on
                    community challenges.
                </p>


                <section>

                    <h2>Overview</h2>

                    <div>

                        <article>

                            <h3>
                                Available Projects
                            </h3>

                            <p>
                                {activeProjects.length}
                            </p>

                        </article>


                        <article>

                            <h3>
                                Active Collaborations
                            </h3>

                            <p>
                                {collaborations.length}
                            </p>

                        </article>


                        <article>

                            <h3>
                                Teams Working
                            </h3>

                            <p>
                                {teams.length}
                            </p>

                        </article>

                    </div>

                </section>


                <section>

                    <h2>Projects Available for Collaboration</h2>

                    {activeProjects.length === 0 ? (

                        <p>
                            No projects available.
                        </p>

                    ) : (

                        activeProjects.map(project => (

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
                                        Looking for industry collaboration
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

                </section>

            </main>

        </div>
    );
}

export default CompanyDashboard;