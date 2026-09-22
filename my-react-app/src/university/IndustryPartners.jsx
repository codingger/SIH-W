import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IndustryPartners() {

    const [partners, setPartners] = useState([]);
    const [applications, setApplications] = useState([]);
    const [collaborationRequests, setCollaborationRequests] = useState([]);

    useEffect(() => {

        async function getData() {

            try {

                const partnersResponse = await axios.get(
                    "http://localhost:3000/industry-partners"
                );

                const applicationsResponse = await axios.get(
                    "http://localhost:3000/industry-partner-applications"
                );

                const collaborationResponse = await axios.get(
                    "http://localhost:3000/collaboration-requests"
                );

                setPartners(partnersResponse.data);
                setApplications(applicationsResponse.data);

                setCollaborationRequests(
                    collaborationResponse.data.filter(
                        request => request.status === "Requested"
                    )
                );

            } catch (error) {

                console.log(error);

            }

        }

        getData();

    }, []);


    async function updateApplication(id, status) {

        try {

            const response = await axios.patch(
                `http://localhost:3000/industry-partner-applications/${id}`,
                {
                    status: status
                }
            );

            setApplications(prevApplications =>
                prevApplications.filter(
                    application => application.id !== id
                )
            );

            if (status === "Accepted") {

                setPartners(prevPartners => [
                    response.data,
                    ...prevPartners
                ]);

            }

        } catch (error) {

            console.log(error);

        }

    }


    async function updateCollaboration(id, status) {

        try {

            const response = await axios.patch(
                `http://localhost:3000/collaboration-requests/${id}`,
                {
                    status: status
                }
            );

            setCollaborationRequests(prevRequests =>
                prevRequests.filter(
                    request => request.id !== id
                )
            );

            console.log(response.data);

        } catch (error) {

            console.log(error);

        }

    }


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

                <h1>Industry Partners</h1>

                <p>
                    Review company applications, collaboration requests,
                    and approved industry partners.
                </p>


                <h2>Industry Partner Applications</h2>

                {applications.length === 0 ? (

                    <p>
                        No pending applications.
                    </p>

                ) : (

                    applications.map(application => (

                        <article key={application.id}>

                            <h3>
                                {application.company_name}
                            </h3>

                            <p>
                                Industry: {application.industry}
                            </p>

                            <p>
                                {application.description}
                            </p>

                            <p>
                                Contact: {application.contact_person}
                            </p>

                            <p>
                                Email: {application.email}
                            </p>

                            <p>
                                Status: {application.status}
                            </p>


                            <button
                                onClick={() =>
                                    updateApplication(
                                        application.id,
                                        "Accepted"
                                    )
                                }
                            >
                                Accept
                            </button>


                            <button
                                onClick={() =>
                                    updateApplication(
                                        application.id,
                                        "Rejected"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </article>

                    ))

                )}


                <h2>Project Collaboration Requests</h2>

                {collaborationRequests.length === 0 ? (

                    <p>
                        No pending collaboration requests.
                    </p>

                ) : (

                    collaborationRequests.map(request => (

                        <article key={request.id}>

                            <h3>
                                {request.projects?.title}
                            </h3>

                            <p>
                                Project: {request.projects?.description}
                            </p>

                            <p>
                                Company:{" "}
                                {request.industry_partners?.company_name}
                            </p>

                            <p>
                                Industry:{" "}
                                {request.industry_partners?.industry}
                            </p>

                            <p>
                                Contact:{" "}
                                {request.industry_partners?.contact_person}
                            </p>

                            <p>
                                Email:{" "}
                                {request.industry_partners?.email}
                            </p>

                            <p>
                                Status: {request.status}
                            </p>


                            <button
                                onClick={() =>
                                    updateCollaboration(
                                        request.id,
                                        "Accepted"
                                    )
                                }
                            >
                                Accept
                            </button>


                            <button
                                onClick={() =>
                                    updateCollaboration(
                                        request.id,
                                        "Rejected"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </article>

                    ))

                )}


                <h2>Approved Industry Partners</h2>

                {partners.length === 0 ? (

                    <p>
                        No industry partners available.
                    </p>

                ) : (

                    partners.map(partner => (

                        <article key={partner.id}>

                            <h3>
                                {partner.company_name}
                            </h3>

                            <p>
                                Industry: {partner.industry}
                            </p>

                            <p>
                                {partner.description}
                            </p>

                            <p>
                                Contact: {partner.contact_person}
                            </p>

                            <p>
                                Email: {partner.email}
                            </p>

                        </article>

                    ))

                )}

            </main>

        </div>
    );
}

export default IndustryPartners;