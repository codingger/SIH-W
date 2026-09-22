import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [teams, setTeams] = useState([]);
    const [requests, setRequests] = useState([]);
    const [partners, setPartners] = useState([]);

    useEffect(() => {

        async function getData() {

            try {

                const projectResponse = await axios.get(
                    `http://localhost:3000/projects/${id}`
                );

                const teamsResponse = await axios.get(
                    "http://localhost:3000/teams"
                );

                const requestsResponse = await axios.get(
                    "http://localhost:3000/collaboration-requests"
                );

                setProject(projectResponse.data);

                const projectTeams = teamsResponse.data.filter(
                    team => team.project_id === Number(id)
                );

                setTeams(projectTeams);

                const projectRequests = requestsResponse.data.filter(
                    request => request.project_id === Number(id)
                );

                setRequests(projectRequests);

            } catch (error) {

                console.log(error);

            }

        }

        getData();

    }, [id]);


    async function updateRequest(requestId, status) {

        try {

            const response = await axios.patch(
                `http://localhost:3000/collaboration-requests/${requestId}`,
                {
                    status: status
                }
            );

            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === requestId
                        ? {
                            ...request,
                            status: response.data.status
                        }
                        : request
                )
            );

            if (status === "Accepted") {

                setProject(prevProject => ({
                    ...prevProject,
                    industry_partner:
                        requests.find(
                            request => request.id === requestId
                        )?.industry_partners?.company_name
                }));

            }

        } catch (error) {

            console.log(error);

        }

    }


    if (!project) {
        return <p>Loading project...</p>;
    }


    const acceptedPartners = requests.filter(
        request => request.status === "Accepted"
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
                    Faculty Mentor:{" "}
                    {project.faculty_mentor || "Not assigned"}
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


                <h2>Industry Collaboration Requests</h2>

                {requests.length === 0 ? (

                    <p>
                        No industry collaboration requests.
                    </p>

                ) : (

                    requests.map(request => (

                        <article key={request.id}>

                            <h3>
                                {request.industry_partners.company_name}
                            </h3>

                            <p>
                                Industry:{" "}
                                {request.industry_partners.industry}
                            </p>

                            <p>
                                Contact:{" "}
                                {request.industry_partners.contact_person}
                            </p>

                            <p>
                                Status: {request.status}
                            </p>


                            {request.status === "Requested" && (

                                <div>

                                    <button
                                        onClick={() =>
                                            updateRequest(
                                                request.id,
                                                "Accepted"
                                            )
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() =>
                                            updateRequest(
                                                request.id,
                                                "Rejected"
                                            )
                                        }
                                    >
                                        Reject
                                    </button>

                                </div>

                            )}

                        </article>

                    ))

                )}


                <h2>Industry Partners</h2>

                {acceptedPartners.length === 0 ? (

                    <p>
                        No industry partners accepted for this project.
                    </p>

                ) : (

                    acceptedPartners.map(request => (

                        <article key={request.id}>

                            <h3>
                                {request.industry_partners.company_name}
                            </h3>

                            <p>
                                Industry:{" "}
                                {request.industry_partners.industry}
                            </p>

                            <p>
                                Contact:{" "}
                                {request.industry_partners.contact_person}
                            </p>

                            <p>
                                Email:{" "}
                                {request.industry_partners.email}
                            </p>

                        </article>

                    ))

                )}

            </main>

        </div>
    );
}

export default ProjectDetails;