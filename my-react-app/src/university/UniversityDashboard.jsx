import { Link } from "react-router-dom";

function UniversityDashboard() {
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
                        <p>42</p>
                    </div>

                    <div>
                        <h3>High Priority Challenges</h3>
                        <p>8</p>
                    </div>

                    <div>
                        <h3>Active Projects</h3>
                        <p>5</p>
                    </div>

                    <div>
                        <h3>Industry Collaborations</h3>
                        <p>3</p>
                    </div>

                </section>

                <section>

                    <h2>High Priority Challenges</h2>

                    <article>
                        <h3>
                            Water shortage in village
                        </h3>

                        <p>
                            District: Ranchi
                        </p>

                        <p>
                            People affected: 2,000
                        </p>

                        <p>
                            Supporters: 127
                        </p>

                        <p>
                            Priority: High
                        </p>

                        <button>
                            View Challenge
                        </button>
                    </article>

                    <article>
                        <h3>
                            Lack of healthcare facilities
                        </h3>

                        <p>
                            District: Bokaro
                        </p>

                        <p>
                            People affected: 1,500
                        </p>

                        <p>
                            Supporters: 94
                        </p>

                        <p>
                            Priority: High
                        </p>

                        <button>
                            View Challenge
                        </button>
                    </article>

                </section>

                <section>

                    <h2>Active Projects</h2>

                    <article>
                        <h3>
                            Water Monitoring System
                        </h3>

                        <p>
                            Team: Water Innovation Team
                        </p>

                        <p>
                            Faculty Mentor: Dr. XYZ
                        </p>

                        <p>
                            Industry Partner: ABC Technologies
                        </p>

                        <p>
                            Progress: 65%
                        </p>

                        <button>
                            View Project
                        </button>
                    </article>

                </section>

            </main>

        </div>
    );
}

export default UniversityDashboard;