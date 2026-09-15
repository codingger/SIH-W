import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function App() {
    const [search, setSearch] = useState("");
    const [domain, setDomain] = useState("");
    const [district, setDistrict] = useState("");
    const navigate = useNavigate()

    const [challenges, setChallenges] = useState([
        {
            id: 1,
            title: "Water shortage in village",
            district: "Ranchi",
            domain: "Water",
            supporters: 23,
            description:
                "Residents are facing a shortage of clean drinking water during summer."
        },
        {
            id: 2,
            title: "Damaged roads near school",
            district: "Dhanbad",
            domain: "Infrastructure",
            supporters: 17,
            description:
                "The road near the school has multiple potholes and becomes difficult to use during rain."
        },
        {
            id: 3,
            title: "Lack of healthcare facilities",
            district: "Bokaro",
            domain: "Healthcare",
            supporters: 31,
            description:
                "People in the area have limited access to nearby healthcare facilities."
        }
    ]);

    function handleSupport(id) {
        setChallenges(prevChallenges =>
            prevChallenges.map(challenge =>
                challenge.id === id
                    ? {
                        ...challenge,
                        supporters: challenge.supporters + 1
                    }
                    : challenge
            )
        );
    }

    function viewProblem(challenge) {
        alert(
            `Problem: ${challenge.title}\n\n` +
            `District: ${challenge.district}\n` +
            `Domain: ${challenge.domain}\n\n` +
            challenge.description
        );
    }

    function submitChallenge() {
        navigate("/submit");
    }

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch =
            challenge.title.toLowerCase().includes(search.toLowerCase()) ||
            challenge.description.toLowerCase().includes(search.toLowerCase());

        const matchesDomain =
            domain === "" || challenge.domain === domain;

        const matchesDistrict =
            district === "" || challenge.district === district;

        return matchesSearch && matchesDomain && matchesDistrict;
    });

    return (
        <div>

            <header>
                <h2>Societal Innovation Portal</h2>
            </header>


            <main>

                <section>
                    <h1>
                        Have a problem in your community?
                    </h1>

                    <p>
                        Report it. Get it to the people who can solve it.
                    </p>

                    <button onClick={submitChallenge}>
                        + Submit a Challenge
                    </button>
                </section>


                <section>

                    <h2>Explore Community Challenges</h2>

                    <p>
                        Search existing challenges before submitting a new
                        problem to avoid duplicates.
                    </p>


                    <div>

                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                        <select
                            value={domain}
                            onChange={(event) =>
                                setDomain(event.target.value)
                            }
                        >
                            <option value="">
                                All Domains
                            </option>

                            <option value="Water">
                                Water
                            </option>

                            <option value="Healthcare">
                                Healthcare
                            </option>

                            <option value="Infrastructure">
                                Infrastructure
                            </option>

                            <option value="Education">
                                Education
                            </option>

                            <option value="Agriculture">
                                Agriculture
                            </option>

                            <option value="Environment">
                                Environment
                            </option>
                        </select>


                        <select
                            value={district}
                            onChange={(event) =>
                                setDistrict(event.target.value)
                            }
                        >
                            <option value="">
                                All Districts
                            </option>

                            <option value="Ranchi">
                                Ranchi
                            </option>

                            <option value="Dhanbad">
                                Dhanbad
                            </option>

                            <option value="Bokaro">
                                Bokaro
                            </option>
                        </select>

                    </div>


                    <div>

                        {filteredChallenges.length === 0 ? (

                            <p>
                                No existing challenge found.
                                You can submit this as a new challenge.
                            </p>

                        ) : (

                            filteredChallenges.map(challenge => (

                                <article key={challenge.id}>

                                    <h3>
                                        {challenge.title}
                                    </h3>

                                    <p>
                                        District: {challenge.district}
                                    </p>

                                    <p>
                                        Domain: {challenge.domain}
                                    </p>

                                    <p>
                                        {challenge.supporters} supporters
                                    </p>

                                    <button
                                        onClick={() =>
                                            viewProblem(challenge)
                                        }
                                    >
                                        View Problem
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleSupport(challenge.id)
                                        }
                                    >
                                        Support
                                    </button>

                                </article>

                            ))

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default App;