import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CompanyProjectDetails() {

    const { id } = useParams();

    const currentCompanyId = 4;

    const [project, setProject] = useState(null);
    const [teams, setTeams] = useState([]);
    const [company, setCompany] = useState(null);

    useEffect(() => {

        async function getData() {

            try {

                const projectResponse = await axios.get(
                    `http://localhost:3000/projects/${id}`
                );

                const teamsResponse = await axios.get(
                    "http://localhost:3000/teams"
                );

                const companyResponse = await axios.get(
                    `http://localhost:3000/industry-partners/${currentCompanyId}`
                );

                setProject(projectResponse.data);

                const projectTeams = teamsResponse.data.filter(
                    team => team.project_id === Number(id)
                );

                setTeams(projectTeams);

                setCompany(companyResponse.data);

            } catch (error) {

                console.log(error);

            }

        }

        getData();

    }, [id]);


    async function collaborate() {

        try {

            await axios.post(
                `http://localhost:3000/projects/${id}/collaborate`,
                {
                    company_id: currentCompanyId
                }
            );

            alert("Collaboration request sent.");

        } catch (error) {

            console.log(error);

        }

    }


    if (!project) {
        return <p>Loading project...</p>;
    }


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

                <h1>{project.title}</h1>

                <p>
                    {project.description}
                </p>


                <h2>Project Information</h2>

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
                    Industry Partner:{" "}
                    {project.industry_partner || "No industry partner yet"}
                </p>


                <h2>Teams</h2>

                {teams.length === 0 ? (

                    <p>
                        No teams assigned to this project.
                    </p>

                ) : (

                    teams.map(team => (

                        <article key={team.id}>

                            <h3>
                                {team.team_name}
                            </h3>

                            <p>
                                Students: {team.student_count}
                            </p>

                            <p>
                                Faculty: {team.faculty_count}
                            </p>

                        </article>

                    ))

                )}


                {!project.industry_partner && company?.status === "Accepted" && (

                    <section>

                        <h2>Collaborate</h2>

                        <p>
                            Interested in working on this project?
                        </p>

                        <button onClick={collaborate}>
                            Collaborate with this Project
                        </button>

                    </section>

                )}


                {!project.industry_partner && company?.status === "Pending" && (

                    <section>

                        <h2>Industry Partner Approval</h2>

                        <p>
                            Your Industry Partner application is still under review.
                        </p>

                    </section>

                )}


                {!project.industry_partner && company?.status === "Rejected" && (

                    <section>

                        <h2>Industry Partner Approval</h2>

                        <p>
                            Your Industry Partner application was rejected.
                        </p>

                    </section>

                )}

            </main>

        </div>
    );
}

export default CompanyProjectDetails;