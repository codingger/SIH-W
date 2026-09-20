import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Challenges() {

    const navigate = useNavigate();

    const [challenges, setChallenges] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [district, setDistrict] = useState("");
    const [area, setArea] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");

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

    const areas = [...new Set(
        challenges
            .map(challenge => challenge.area)
            .filter(area => area)
    )];

    function getPriority(supporters) {

        if (supporters >= 10) {
            return "High";
        }

        if (supporters >= 5) {
            return "Medium";
        }

        return "Low";
    }

    const filteredChallenges = challenges
        .filter(challenge => {

            const matchesSearch =
                challenge.title.toLowerCase().includes(search.toLowerCase()) ||
                challenge.description.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                category === "" ||
                challenge.category === category;

            const matchesDistrict =
                district === "" ||
                challenge.district === district;

            const matchesArea =
                area === "" ||
                challenge.area === area;

            const matchesPriority =
                priority === "" ||
                getPriority(challenge.supporters) === priority;

            const matchesStatus =
                status === "" ||
                challenge.status === status;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDistrict &&
                matchesArea &&
                matchesPriority &&
                matchesStatus
            );

        })
        .sort((a, b) => {

            if (sortBy === "support") {
                return b.supporters - a.supporters;
            }

            if (sortBy === "least-support") {
                return a.supporters - b.supporters;
            }

            if (sortBy === "newest") {
                return new Date(b.created_at) - new Date(a.created_at);
            }

            if (sortBy === "oldest") {
                return new Date(a.created_at) - new Date(b.created_at);
            }

            return 0;

        });

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

                <h1>Community Challenges</h1>

                <p>
                    Review and prioritize challenges submitted by communities.
                </p>

                <section>

                    <h2>Filters</h2>

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

                    <select
                        value={area}
                        onChange={(event) =>
                            setArea(event.target.value)
                        }
                    >
                        <option value="">
                            All Areas / Villages
                        </option>

                        {areas.map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={priority}
                        onChange={(event) =>
                            setPriority(event.target.value)
                        }
                    >
                        <option value="">
                            All Priorities
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Low">
                            Low
                        </option>
                    </select>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="Under Review">
                            Under Review
                        </option>

                        <option value="Taken Up">
                            Taken Up
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value)
                        }
                    >
                        <option value="">
                            Sort By
                        </option>

                        <option value="support">
                            Most Supported
                        </option>

                        <option value="least-support">
                            Least Supported
                        </option>

                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>
                    </select>

                </section>

                <section>

                    <h2>
                        {filteredChallenges.length} Challenges
                    </h2>

                    {filteredChallenges.length === 0 ? (

                        <p>
                            No challenges found.
                        </p>

                    ) : (

                        filteredChallenges.map(challenge => (

                            <article key={challenge.id}>

                                <h2>
                                    {challenge.title}
                                </h2>

                                <p>
                                    District: {challenge.district}
                                </p>

                                <p>
                                    Area / Village: {challenge.area}
                                </p>

                                <p>
                                    Category: {challenge.category}
                                </p>

                                <p>
                                    People affected: {challenge.affected_people}
                                </p>

                                <p>
                                    Supporters: {challenge.supporters}
                                </p>

                                <p>
                                    Priority: {getPriority(challenge.supporters)}
                                </p>

                                <p>
                                    Status: {challenge.status}
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

            </main>

        </div>
    );
}

export default Challenges;