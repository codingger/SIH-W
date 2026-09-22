import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function IndustryPartnerApplication() {

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [description, setDescription] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");

    async function submitApplication(event) {

        event.preventDefault();

        try {

            await axios.post(
                "http://localhost:3000/industry-partners",
                {
                    company_name: companyName,
                    industry: industry,
                    description: description,
                    contact_person: contactPerson,
                    email: email
                }
            );

            alert("Industry Partner application submitted.");

            navigate("/company");

        } catch (error) {

            console.log(error);

        }

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

                <h1>Become an Industry Partner</h1>

                <p>
                    Submit your company details to collaborate with universities.
                </p>


                <form onSubmit={submitApplication}>

                    <div>

                        <label>
                            Company Name
                        </label>

                        <br />

                        <input
                            type="text"
                            value={companyName}
                            onChange={event =>
                                setCompanyName(event.target.value)
                            }
                            required
                        />

                    </div>


                    <br />


                    <div>

                        <label>
                            Industry
                        </label>

                        <br />

                        <input
                            type="text"
                            value={industry}
                            onChange={event =>
                                setIndustry(event.target.value)
                            }
                            required
                        />

                    </div>


                    <br />


                    <div>

                        <label>
                            Description
                        </label>

                        <br />

                        <textarea
                            value={description}
                            onChange={event =>
                                setDescription(event.target.value)
                            }
                            required
                        />

                    </div>


                    <br />


                    <div>

                        <label>
                            Contact Person
                        </label>

                        <br />

                        <input
                            type="text"
                            value={contactPerson}
                            onChange={event =>
                                setContactPerson(event.target.value)
                            }
                            required
                        />

                    </div>


                    <br />


                    <div>

                        <label>
                            Email
                        </label>

                        <br />

                        <input
                            type="email"
                            value={email}
                            onChange={event =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>


                    <br />


                    <button type="submit">
                        Submit Application
                    </button>

                </form>

            </main>

        </div>
    );
}

export default IndustryPartnerApplication;