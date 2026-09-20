import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CitizenChallengeDetails() {

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

    async function handleSupport() {

        try {

            const response = await axios.patch(
                `http://localhost:3000/challenges/${id}/support`
            );

            setChallenge(response.data);

        } catch (error) {

            console.log(error);

        }
    }

    if (!challenge) {
        return <p>Loading challenge...</p>;
    }

    return (
        <div>

            <button onClick={() => navigate("/")}>
                Back to Home
            </button>

            <h1>
                {challenge.title}
            </h1>

            <p>
                Category: {challenge.category}
            </p>

            <p>
                District: {challenge.district}
            </p>

            <p>
                Area / Village: {challenge.area}
            </p>

            <p>
                Supporters: {challenge.supporters}
            </p>

            <h2>Problem</h2>

            <p>
                {challenge.description}
            </p>

            <h2>People Affected</h2>

            <p>
                {challenge.affected_people}
            </p>

            {challenge.additional_info && (

                <div>

                    <h2>Additional Information</h2>

                    <p>
                        {challenge.additional_info}
                    </p>

                </div>

            )}

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

                        </div>

                    ))}

                </div>

            )}

            <br />

            <button onClick={handleSupport}>
                Support Challenge
            </button>

        </div>
    );
}

export default CitizenChallengeDetails;