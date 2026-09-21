import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Teams() {

    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);

    const [teamName, setTeamName] = useState("");
    const [projectId, setProjectId] = useState("");

    const [studentCount, setStudentCount] = useState(0);
    const [students, setStudents] = useState([]);

    const [facultyCount, setFacultyCount] = useState(0);
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {

        async function getData() {

            try {

                const teamsResponse = await axios.get(
                    "http://localhost:3000/teams"
                );

                const projectsResponse = await axios.get(
                    "http://localhost:3000/projects"
                );

                setTeams(teamsResponse.data);
                setProjects(projectsResponse.data);

            } catch (error) {

                console.log(error);

            }

        }

        getData();

    }, []);

    function handleStudentCountChange(value) {

        const count = Number(value);

        setStudentCount(count);

        setStudents(prevStudents =>
            Array.from(
                { length: count },
                (_, index) =>
                    prevStudents[index] || {
                        name: "",
                        roll_no: "",
                        course: ""
                    }
            )
        );

    }

    function handleFacultyCountChange(value) {

        const count = Number(value);

        setFacultyCount(count);

        setFaculty(prevFaculty =>
            Array.from(
                { length: count },
                (_, index) =>
                    prevFaculty[index] || {
                        name: "",
                        department: "",
                        designation: ""
                    }
            )
        );

    }

    function handleStudentChange(index, field, value) {

        setStudents(prevStudents =>
            prevStudents.map((student, studentIndex) =>
                studentIndex === index
                    ? {
                        ...student,
                        [field]: value
                    }
                    : student
            )
        );

    }

    function handleFacultyChange(index, field, value) {

        setFaculty(prevFaculty =>
            prevFaculty.map((member, facultyIndex) =>
                facultyIndex === index
                    ? {
                        ...member,
                        [field]: value
                    }
                    : member
            )
        );

    }

    async function createTeam(event) {

        event.preventDefault();

        if (!teamName || !projectId) {

            alert("Please enter team name and select a project.");
            return;

        }

        if (studentCount === 0) {

            alert("Please select the number of students.");
            return;

        }

        if (facultyCount === 0) {

            alert("Please select the number of faculty members.");
            return;

        }

        try {

            const response = await axios.post(
                "http://localhost:3000/teams",
                {
                    team_name: teamName,
                    project_id: projectId,
                    student_count: studentCount,
                    students: students,
                    faculty_count: facultyCount,
                    faculty: faculty
                }
            );

            setTeams(prevTeams => [
                response.data,
                ...prevTeams
            ]);

            setTeamName("");
            setProjectId("");

            setStudentCount(0);
            setStudents([]);

            setFacultyCount(0);
            setFaculty([]);

            alert("Team created successfully.");

        } catch (error) {

            console.log(error);

            alert("Failed to create team.");

        }

    }

    function getProjectName(projectId) {

        const project = projects.find(
            project =>
                String(project.id) === String(projectId)
        );

        if (!project) {
            return "Project not found";
        }

        return project.title;

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

                <h1>Teams</h1>

                <p>
                    Create and manage student teams for university projects.
                </p>


                <section>

                    <h2>Create Team</h2>

                    <form onSubmit={createTeam}>

                        <div>

                            <label>
                                Team Name
                            </label>

                            <br />

                            <input
                                type="text"
                                value={teamName}
                                onChange={event =>
                                    setTeamName(event.target.value)
                                }
                                placeholder="Enter team name"
                            />

                        </div>


                        <br />


                        <div>

                            <label>
                                Select Project
                            </label>

                            <br />

                            <select
                                value={projectId}
                                onChange={event =>
                                    setProjectId(event.target.value)
                                }
                            >

                                <option value="">
                                    Select a project
                                </option>

                                {projects.map(project => (

                                    <option
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.title}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <br />


                        <div>

                            <label>
                                Number of Students
                            </label>

                            <br />

                            <select
                                value={studentCount}
                                onChange={event =>
                                    handleStudentCountChange(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="0">
                                    Select number of students
                                </option>

                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (

                                    <option
                                        key={number}
                                        value={number}
                                    >
                                        {number}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <br />


                        {students.map((student, index) => (

                            <div key={index}>

                                <h3>
                                    Student {index + 1}
                                </h3>

                                <input
                                    type="text"
                                    placeholder="Student Name"
                                    value={student.name}
                                    onChange={event =>
                                        handleStudentChange(
                                            index,
                                            "name",
                                            event.target.value
                                        )
                                    }
                                />

                                <br />

                                <input
                                    type="text"
                                    placeholder="Roll Number"
                                    value={student.roll_no}
                                    onChange={event =>
                                        handleStudentChange(
                                            index,
                                            "roll_no",
                                            event.target.value
                                        )
                                    }
                                />

                                <br />

                                <input
                                    type="text"
                                    placeholder="Course"
                                    value={student.course}
                                    onChange={event =>
                                        handleStudentChange(
                                            index,
                                            "course",
                                            event.target.value
                                        )
                                    }
                                />

                                <br />
                                <br />

                            </div>

                        ))}


                        <div>

                            <label>
                                Number of Faculty / Mentors
                            </label>

                            <br />

                            <select
                                value={facultyCount}
                                onChange={event =>
                                    handleFacultyCountChange(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="0">
                                    Select number of faculty members
                                </option>

                                {[1, 2, 3, 4, 5].map(number => (

                                    <option
                                        key={number}
                                        value={number}
                                    >
                                        {number}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <br />


                        {faculty.map((member, index) => (

                            <div key={index}>

                                <h3>
                                    Faculty / Mentor {index + 1}
                                </h3>

                                <input
                                    type="text"
                                    placeholder="Faculty Name"
                                    value={member.name}
                                    onChange={event =>
                                        handleFacultyChange(
                                            index,
                                            "name",
                                            event.target.value
                                        )
                                    }
                                />

                                <br />

                                <input
                                    type="text"
                                    placeholder="Department"
                                    value={member.department}
                                    onChange={event =>
                                        handleFacultyChange(
                                            index,
                                            "department",
                                            event.target.value
                                        )
                                    }
                                />

                                <br />

                                <input
                                    type="text"
                                    placeholder="Designation"
                                    value={member.designation}
                                    onChange={event =>
                                        handleFacultyChange(
                                            index,
                                            "designation",
                                            event.target.value
                                        )
                                    }
                                />

                                <br />
                                <br />

                            </div>

                        ))}


                        <button type="submit">
                            Create Team
                        </button>

                    </form>

                </section>


                <hr />


                <section>

                    <h2>Existing Teams</h2>

                    {teams.length === 0 ? (

                        <p>
                            No teams available.
                        </p>

                    ) : (

                        teams.map(team => {

                            const teamStudents = team.students || [];
                            const teamFaculty = team.faculty || [];

                            return (

                                <article key={team.id}>

                                    <h2>
                                        {team.team_name}
                                    </h2>

                                    <p>
                                        Project: {getProjectName(team.project_id)}
                                    </p>

                                    <h3>
                                        Students ({teamStudents.length})
                                    </h3>

                                    {teamStudents.length === 0 ? (

                                        <p>
                                            No students added.
                                        </p>

                                    ) : (

                                        teamStudents.map((student, index) => (

                                            <div key={index}>

                                                <p>
                                                    Name: {student.name}
                                                </p>

                                                <p>
                                                    Roll No: {student.roll_no}
                                                </p>

                                                <p>
                                                    Course: {student.course}
                                                </p>

                                            </div>

                                        ))

                                    )}

                                    <h3>
                                        Faculty / Mentors ({teamFaculty.length})
                                    </h3>

                                    {teamFaculty.length === 0 ? (

                                        <p>
                                            No faculty members added.
                                        </p>

                                    ) : (

                                        teamFaculty.map((member, index) => (

                                            <div key={index}>

                                                <p>
                                                    Name: {member.name}
                                                </p>

                                                <p>
                                                    Department: {member.department}
                                                </p>

                                                <p>
                                                    Designation: {member.designation}
                                                </p>

                                            </div>

                                        ))

                                    )}

                                </article>

                            );

                        })

                    )}

                </section>

            </main>

        </div>
    );
}

export default Teams;