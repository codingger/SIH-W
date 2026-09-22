import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [district, setDistrict] = useState("");
    const navigate = useNavigate()

    const [challenges, setChallenges] = useState([]);

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

        getChallenges();

    }, []);

    const categories = [...new Set(
        challenges.map(challenge => challenge.category)
    )];

    const districts = [...new Set(
        challenges.map(challenge => challenge.district)
    )];

    async function handleSupport(id) {

        try {

            const response = await axios.patch(
                `http://localhost:3000/challenges/${id}/support`
            );

            setChallenges(prevChallenges =>
                prevChallenges.map(challenge =>
                    challenge.id === id
                        ? response.data
                        : challenge
                )
            );

        } catch (error) {

            console.log("Support Error:", error);

        }
    }

    function submitChallenge() {
        navigate("/submit");
    }

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch =
            challenge.title.toLowerCase().includes(search.toLowerCase()) ||
            challenge.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "" || challenge.category === category;

        const matchesDistrict =
            district === "" || challenge.district === district;

        return matchesSearch && matchesCategory && matchesDistrict;
    });

    return (
        <div>

            <header>

                <h2>Societal Innovation Portal</h2>

                <Link to="/login">
                    Login
                </Link>

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
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
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

                            {districts.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
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
                                        Category: {challenge.category}
                                    </p>

                                    <p>
                                        {challenge.supporters} supporters
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(`/challenges/${challenge.id}`)
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