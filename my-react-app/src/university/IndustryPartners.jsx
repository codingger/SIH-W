import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function IndustryPartners() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {

        async function getPartners() {

            try {

                const response = await axios.get(
                    "http://localhost:3000/industry-partners"
                );

                setPartners(response.data);

            } catch (error) {

                console.log(error);

            }
        }

        getPartners();

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

                <h1>Industry Partners</h1>

                <p>
                    Companies and organizations available for collaboration.
                </p>

                {partners.length === 0 ? (

                    <p>
                        No industry partners available.
                    </p>

                ) : (

                    partners.map(partner => (

                        <article key={partner.id}>

                            <h2>
                                {partner.company_name}
                            </h2>

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