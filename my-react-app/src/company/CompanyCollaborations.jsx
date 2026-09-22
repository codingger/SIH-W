import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CompanyCollaborations() {

    const currentCompanyId = 1;

    const [collaborations, setCollaborations] = useState([]);

    useEffect(() => {

        async function getCollaborations() {

            try {

                const response = await axios.get(
                    `http://localhost:3000/company/collaborations/${currentCompanyId}`
                );

                setCollaborations(response.data);

            } catch (error) {

                console.log(error);

            }

        }

        getCollaborations();

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

                <h1>My Collaborations</h1>

                <p>
                    Projects you have requested to collaborate on.
                </p>


                {collaborations.length === 0 ? (

                    <p>
                        No collaboration requests yet.
                    </p>

                ) : (

                    collaborations.map(collaboration => (

                        <article key={collaboration.id}>

                            <h2>
                                {collaboration.projects.title}
                            </h2>

                            <p>
                                {collaboration.projects.description}
                            </p>

                            <p>
                                Project Status:{" "}
                                {collaboration.projects.status}
                            </p>

                            <p>
                                Progress:{" "}
                                {collaboration.projects.progress}%
                            </p>

                            <p>
                                Collaboration Status:{" "}
                                {collaboration.status}
                            </p>

                        </article>

                    ))

                )}

            </main>

        </div>
    );
}

export default CompanyCollaborations;