import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ChallengeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [challenge, setChallenge] = useState(null);
    const [media, setMedia] = useState([]);

    useEffect(() => {

        async function getChallenge() {

            try {

                const response = await axios.get(
                    `http://localhost:3000/challenges/${id}`
                );

                setChallenge(response.data.challenge);
                setMedia(response.data.media);

            } catch (error) {

                console.log(error);

            }
        }

        getChallenge();

    }, [id]);

    function getPriority(supporters) {

        if (supporters >= 10) {
            return "High";
        }

        if (supporters >= 5) {
            return "Medium";
        }

        return "Low";
    }

    async function takeUpChallenge() {

        try {

            const response = await axios.post(
                "http://localhost:3000/projects",
                {
                    challenge_id: challenge.id,
                    title: challenge.title,
                    description: challenge.description
                }
            );

            console.log("Project created:", response.data);

            alert("Challenge taken up successfully!");

            navigate("/university/projects");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong.");
            }

        }
    }

    if (!challenge) {
        return <p>Loading challenge...</p>;
    }

    return (
        <div>

            <button onClick={() => navigate("/university")}>
                Back to Dashboard
            </button>

            <h1>
                {challenge.title}
            </h1>

            <p>
                Status: {challenge.status}
            </p>

            <p>
                Priority: {getPriority(challenge.supporters)}
            </p>

            <h2>Problem Description</h2>

            <p>
                {challenge.description}
            </p>

            <h2>Category</h2>

            <p>
                {challenge.category}
            </p>

            <h2>Location</h2>

            <p>
                District: {challenge.district}
            </p>

            <p>
                Area / Village: {challenge.area}
            </p>

            <h2>Impact</h2>

            <p>
                People affected: {challenge.affected_people}
            </p>

            <h2>Additional Information</h2>

            <p>
                {challenge.additional_info}
            </p>

            <h2>Evidence</h2>

            {media.length === 0 ? (

                <p>
                    No photos or videos submitted.
                </p>

            ) : (

                <div>

                    {media.map(file => (

                        <div key={file.id}>

                            {file.file_type.startsWith("image/") ? (

                                <img
                                    src={file.file_url}
                                    alt="Challenge evidence"
                                    width="300"
                                />

                            ) : (

                                <video
                                    src={file.file_url}
                                    controls
                                    width="400"
                                />

                            )}

                            <br />
                            <br />

                        </div>

                    ))}

                </div>

            )}

            <br />

            <button onClick={takeUpChallenge}>
                Take Up Challenge
            </button>

        </div>
    );
}

export default ChallengeDetails;