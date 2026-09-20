import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UniversityDashboard() {

    const navigate = useNavigate();

    const [challenges, setChallenges] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        async function getChallenges() {

            try {

                const response = await axios.get(
                    "http://localhost:3000/challenges"
                );

                setChallenges(response.data);

            } catch (error) {

                console.log(error);

            }
        }

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

        getChallenges();
        getProjects();

    }, []);

    function getPriority(supporters) {

        if (supporters >= 10) {
            return "High";
        }

        if (supporters >= 5) {
            return "Medium";
        }

        return "Low";
    }

    const highPriorityChallenges = challenges.filter(
        challenge => getPriority(challenge.supporters) === "High"
    );

    const industryCollaborations = projects.filter(
        project => project.industry_partner
    );

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

                <h1>University Dashboard</h1>

                <p>
                    Overview of community challenges, projects,
                    teams and industry collaborations.
                </p>


                <section>

                    <h2>Overview</h2>

                    <div>
                        <h3>Total Challenges</h3>
                        <p>{challenges.length}</p>
                    </div>

                    <div>
                        <h3>High Priority Challenges</h3>
                        <p>{highPriorityChallenges.length}</p>
                    </div>

                    <div>
                        <h3>Active Projects</h3>
                        <p>{projects.length}</p>
                    </div>

                    <div>
                        <h3>Industry Collaborations</h3>
                        <p>{industryCollaborations.length}</p>
                    </div>

                </section>


                <section>

                    <h2>High Priority Challenges</h2>

                    {highPriorityChallenges.length === 0 ? (

                        <p>
                            No high priority challenges.
                        </p>

                    ) : (

                        highPriorityChallenges.map(challenge => (

                            <article key={challenge.id}>

                                <h3>
                                    {challenge.title}
                                </h3>

                                <p>
                                    District: {challenge.district}
                                </p>

                                <p>
                                    Category: {challenge.category}
                                </p>

                                <p>
                                    Supporters: {challenge.supporters}
                                </p>

                                <p>
                                    Priority: {getPriority(challenge.supporters)}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/university/challenges/${challenge.id}`
                                        )
                                    }
                                >
                                    View Challenge
                                </button>

                            </article>

                        ))

                    )}

                </section>


                <section>

                    <h2>Active Projects</h2>

                    {projects.length === 0 ? (

                        <p>
                            No active projects.
                        </p>

                    ) : (

                        projects.map(project => (

                            <article key={project.id}>

                                <h3>
                                    {project.title}
                                </h3>

                                <p>
                                    Status: {project.status}
                                </p>

                                <p>
                                    Progress: {project.progress}%
                                </p>

                                <p>
                                    Faculty Mentor: {project.faculty_mentor || "Not assigned"}
                                </p>

                                <p>
                                    Industry Partner: {project.industry_partner || "Not assigned"}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/university/projects/${project.id}`
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

export default UniversityDashboard;