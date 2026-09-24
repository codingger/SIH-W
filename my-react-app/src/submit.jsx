import React, { useState } from "react";
import axios from "axios";

function Submit() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        district: "",
        area: "",
        affected_people: "",
        affected_group: "",
        additional_info: ""
    });

    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleFiles(event) {
    const selectedFiles = Array.from(event.target.files);

    setFiles(prevFiles => [
        ...prevFiles,
        ...selectedFiles
    ]);

    event.target.value = "";
}

async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    try {
        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("district", formData.district);
        data.append("area", formData.area);
        data.append("affected_people", formData.affected_people);
        data.append("additional_info", formData.additional_info);

        files.forEach(file => {
            data.append("files", file);
        });

        const response = await axios.post(
            "http://localhost:3000/challenges",
            data
        );

        console.log(response.data);

        setMessage("Challenge submitted successfully!");

        setFormData({
            title: "",
            description: "",
            category: "",
            district: "",
            area: "",
            affected_people: "",
            affected_group: "",
            additional_info: ""
        });

        setFiles([]);

    } catch (error) {
        console.log(error);
        setMessage("Failed to submit challenge.");
    }
}


    return (
        <div>
            <h1>Submit a Community Challenge</h1>

            <p>
                Tell us about a problem affecting your community.
            </p>

            <form onSubmit={handleSubmit}>

                <h2>Problem Details</h2>

                <div>
                    <label>Problem Title</label>
                    <br />

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the problem title"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Describe the Problem</label>
                    <br />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain what is happening and why it is a problem"
                        rows="6"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Category / Domain</label>
                    <br />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select a category
                        </option>

                        <option value="Water">
                            Water
                        </option>

                        <option value="Healthcare">
                            Healthcare
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

                        <option value="Infrastructure">
                            Infrastructure
                        </option>

                        <option value="Sanitation">
                            Sanitation
                        </option>

                        <option value="Rural Livelihood">
                            Rural Livelihood
                        </option>

                        <option value="Accessibility">
                            Accessibility
                        </option>

                        <option value="Public Services">
                            Public Services
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                <br />

                <h2>Location</h2>

                <div>
                    <label>District</label>
                    <br />

                    <input
                        type="text"
                        name="district"
                        list="district-list-submit"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Type or select district"
                        required
                    />
                    <datalist id="district-list-submit">
                        {['Ranchi', 'Dhanbad', 'Bokaro', 'Jamshedpur', 'East Singhbhum', 'West Singhbhum', 'Hazaribagh', 'Giridih', 'Deoghar', 'Palamu', 'Ramgarh', 'Chatra', 'Dumka', 'Garhwa', 'Godda', 'Gumla', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega'].map(d => (
                            <option key={d} value={d} />
                        ))}
                    </datalist>
                </div>

                <br />

                <div>
                    <label>Area / Village</label>
                    <br />

                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Enter area or village"
                        required
                    />
                </div>

                <br />

                <h2>Impact</h2>

                <div>
                    <label>Approximate Number of People Affected</label>
                    <br />

                    <input
                        type="number"
                        name="affected_people"
                        value={formData.affected_people}
                        onChange={handleChange}
                        placeholder="Example: 500"
                        min="0"
                    />
                </div>

                <br />

                <div>
                    <label>Who is affected?</label>
                    <br />

                    <select
                        name="affected_group"
                        value={formData.affected_group}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select
                        </option>

                        <option value="Children">
                            Children
                        </option>

                        <option value="Farmers">
                            Farmers
                        </option>

                        <option value="Students">
                            Students
                        </option>

                        <option value="Women">
                            Women
                        </option>

                        <option value="Elderly">
                            Elderly
                        </option>

                        <option value="Persons with disabilities">
                            Persons with disabilities
                        </option>

                        <option value="General Community">
                            General Community
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                <br />

                <h2>Evidence</h2>

                <div>
                    <label>Photos / Videos</label>
                    <br />

                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFiles}
                    />
                </div>

                <br />

                {files.length > 0 && (
                    <div>
                        <p>
                            {files.length} file(s) selected
                        </p>

                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <h2>Additional Information</h2>

                <div>
                    <textarea
                        name="additional_info"
                        value={formData.additional_info}
                        onChange={handleChange}
                        placeholder="Add any other useful information"
                        rows="5"
                    />
                </div>

                <br />

                <button type="submit">
                    Submit Challenge
                </button>

            </form>

            <p>{message}</p>
        </div>
    );
}

export default Submit;