import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
const port = 3000;
const upload = multer({
    storage: multer.memoryStorage()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY)
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)
    : null;

if (!supabase) {
    console.warn("⚠️ SUPABASE_URL or SUPABASE_SECRET_KEY not set in .env. Running in standalone fallback mode.");
}

app.get("/", (req, res) => {
    res.send("Backend working");
});

app.get("/challenges", async (req, res) => {
    try {
        if (!supabase) {
            return res.status(200).json([]);
        }

        const { data, error } = await supabase
            .from("challenges")
            .select("*, challenge_media(*)")
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Challenge Error:", error);
            return res.status(500).json(error);
        }

        const formatted = (data || []).map(c => ({
            ...c,
            media: c.challenge_media || []
        }));

        res.status(200).json(formatted);

    } catch (error) {
        console.log("SERVER ERROR:", error);
        res.status(500).json(error);
    }
});

app.patch("/challenges/:id/support", async (req, res) => {
    try {

        const { id } = req.params;

        const { data: challenge, error: getError } = await supabase
            .from("challenges")
            .select("supporters")
            .eq("id", id)
            .single();

        if (getError) {
            console.log("Challenge Error:", getError);
            return res.status(500).json(getError);
        }

        const newSupporters = (challenge.supporters || 0) + 1;

        const { data, error } = await supabase
            .from("challenges")
            .update({
                supporters: newSupporters
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.log("Support Error:", error);
            return res.status(500).json(error);
        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);
        res.status(500).json(error);

    }
});

app.get("/challenges/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const { data: challenge, error } = await supabase
            .from("challenges")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.log("Challenge Error:", error);
            return res.status(500).json(error);
        }

        const { data: media, error: mediaError } = await supabase
            .from("challenge_media")
            .select("*")
            .eq("challenge_id", id);

        if (mediaError) {
            console.log("Media Error:", mediaError);
            return res.status(500).json(mediaError);
        }

        res.status(200).json({
            challenge: challenge,
            media: media
        });

    } catch (error) {

        console.log("SERVER ERROR:", error);
        res.status(500).json(error);

    }
});

app.get("/projects", async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Project Error:", error);
            return res.status(500).json(error);
        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);
        res.status(500).json(error);

    }
});

app.get("/industry-partners", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("industry_partners")
            .select("*")
            .eq("status", "Accepted")
            .order("created_at", { ascending: false });

        if (error) {

            console.log("Industry Partner Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.get("/industry-partner-applications", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("industry_partners")
            .select("*")
            .eq("status", "Pending")
            .order("created_at", { ascending: false });

        if (error) {

            console.log("Industry Partner Application Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.patch("/industry-partner-applications/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from("industry_partners")
            .update({
                status: status
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {

            console.log("Industry Partner Status Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.get("/industry-partners/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("industry_partners")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {

            console.log("Industry Partner Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.get("/teams", async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("teams")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Team Error:", error);
            return res.status(500).json(error);
        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);
        res.status(500).json(error);

    }
});

app.get("/projects/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {

            console.log("Project Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.get("/company/collaborations/:company_id", async (req, res) => {

    try {

        const { company_id } = req.params;

        const { data, error } = await supabase
            .from("project_collaborations")
            .select(`
                *,
                projects (
                    id,
                    title,
                    description,
                    status,
                    progress
                )
            `)
            .eq("company_id", company_id)
            .order("created_at", { ascending: false });

        if (error) {

            console.log("Collaboration Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.get("/collaboration-requests", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("project_collaborations")
            .select(`
                *,
                projects (
                    id,
                    title,
                    description,
                    status,
                    progress
                ),
                industry_partners (
                    id,
                    company_name,
                    industry,
                    contact_person,
                    email
                )
            `)
            .order("created_at", { ascending: false });

        if (error) {

            console.log("Collaboration Request Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.patch("/collaboration-requests/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const { data: collaboration, error: collaborationError } =
            await supabase
                .from("project_collaborations")
                .update({
                    status: status
                })
                .eq("id", id)
                .select()
                .single();

        if (collaborationError) {

            console.log("Collaboration Error:", collaborationError);

            return res.status(500).json(collaborationError);

        }


        if (status === "Accepted") {

            const { data: company, error: companyError } =
                await supabase
                    .from("industry_partners")
                    .select("company_name")
                    .eq("id", collaboration.company_id)
                    .single();

            if (companyError) {

                console.log("Company Error:", companyError);

                return res.status(500).json(companyError);

            }


            const { error: projectError } = await supabase
                .from("projects")
                .update({
                    industry_partner: company.company_name
                })
                .eq("id", collaboration.project_id);

            if (projectError) {

                console.log("Project Error:", projectError);

                return res.status(500).json(projectError);

            }

        }


        res.status(200).json(collaboration);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const { data: existingUser, error: existingError } =
            await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .maybeSingle();

        if (existingError) {
            return res.status(500).json(existingError);
        }

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered."
            });
        }

        const { data, error } = await supabase
            .from("users")
            .insert({
                name: name,
                email: email,
                password: password,
                role: role
            })
            .select()
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        res.status(200).json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration failed."
        });

    }
});

app.post("/login", async (req, res) => {

    try {

        const { email, password, role } = req.body;

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password", password)
            .eq("role", role)
            .maybeSingle();

        if (error) {
            return res.status(500).json(error);
        }

        if (!data) {
            return res.status(401).json({
                message: "Invalid email, password, or role."
            });
        }

        res.status(200).json({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed."
        });

    }
});

app.post("/teams", async (req, res) => {
    try {

        const {
            team_name,
            project_id,
            student_count,
            students,
            faculty_count,
            faculty
        } = req.body;

        const { data, error } = await supabase
            .from("teams")
            .insert({
                team_name: team_name,
                project_id: project_id,
                student_count: student_count,
                students: students,
                faculty_count: faculty_count,
                faculty: faculty
            })
            .select()
            .single();

        if (error) {
            console.log("Team Error:", error);
            return res.status(500).json(error);
        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);
        res.status(500).json(error);

    }
});

app.post("/projects", async (req, res) => {
    try {

        const {
            challenge_id,
            title,
            description
        } = req.body;

        const { data: existingProject, error: checkError } = await supabase
            .from("projects")
            .select("*")
            .eq("challenge_id", challenge_id)
            .maybeSingle();

        if (checkError) {
            console.log("Project Check Error:", checkError);
            return res.status(500).json(checkError);
        }

        if (existingProject) {
            return res.status(400).json({
                message: "This challenge has already been taken up."
            });
        }

        const { data, error } = await supabase
            .from("projects")
            .insert({
                challenge_id: challenge_id,
                title: title,
                description: description
            })
            .select()
            .single();

        if (error) {
            console.log("Project Error:", error);
            return res.status(500).json(error);
        }

        const { error: statusError } = await supabase
            .from("challenges")
            .update({
                status: "Taken Up"
            })
            .eq("id", challenge_id);

        if (statusError) {
            console.log("Status Error:", statusError);
            return res.status(500).json(statusError);
        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);
        res.status(500).json(error);

    }
});

app.post("/industry-partners", async (req, res) => {

    try {

        const {
            company_name,
            industry,
            description,
            contact_person,
            email
        } = req.body;

        const { data, error } = await supabase
            .from("industry_partners")
            .insert({
                company_name: company_name,
                industry: industry,
                description: description,
                contact_person: contact_person,
                email: email,
                status: "Pending"
            })
            .select()
            .single();

        if (error) {

            console.log("Industry Partner Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.post("/projects/:id/collaborate", async (req, res) => {

    try {

        const { id } = req.params;
        const { company_id } = req.body;

        const { data: existingRequest, error: existingError } =
            await supabase
                .from("project_collaborations")
                .select("*")
                .eq("project_id", id)
                .eq("company_id", company_id)
                .maybeSingle();

        if (existingError) {

            console.log("Existing Request Error:", existingError);

            return res.status(500).json(existingError);

        }

        if (existingRequest) {

            return res.status(400).json({
                message: "Collaboration request already exists."
            });

        }

        const { data, error } = await supabase
            .from("project_collaborations")
            .insert({
                project_id: id,
                company_id: company_id,
                status: "Requested"
            })
            .select()
            .single();

        if (error) {

            console.log("Collaboration Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});
app.post("/users", async (req, res) => {
    try {
        const { name, surname } = req.body;

        console.log("Received:", name, surname);

        const { data, error } = await supabase
            .from("User")
            .insert({
                name: name,
                surname: surname
            })
            .select();

        console.log("Data:", data);
        console.log("Error:", error);

        if (error) {
            return res.status(500).json(error);
        }

        res.status(200).json(data);

    } catch (error) {
        console.log("SERVER ERROR:", error);
        res.status(500).json(error);
    }
});

app.post("/challenges", upload.array("files"), async (req, res) => {
    try {
        if (!supabase) {
            return res.status(500).json({ message: "Supabase client not initialized" });
        }

        const {
            title,
            description,
            category,
            district,
            area,
            affected_people,
            affected_group,
            additional_info
        } = req.body;

        console.log("Received challenge body:", req.body);
        console.log("Files count:", req.files ? req.files.length : 0);

        const insertPayload = {
            title: title,
            description: description,
            category: category || "General",
            district: district || "General",
            area: area || "",
            affected_people: affected_people ? parseInt(affected_people, 10) : 0,
            additional_info: additional_info || ""
        };

        if (affected_group) {
            insertPayload.affected_group = affected_group;
        }

        let { data: challenge, error } = await supabase
            .from("challenges")
            .insert(insertPayload)
            .select()
            .single();

        if (error && affected_group) {
            // Fall back without affected_group if column is absent in Supabase challenges table
            console.log("Retrying challenge insert without affected_group column:", error.message);
            delete insertPayload.affected_group;
            const retry = await supabase
                .from("challenges")
                .insert(insertPayload)
                .select()
                .single();
            challenge = retry.data;
            error = retry.error;
        }

        if (error) {
            console.log("Challenge Insert Error:", error);
            return res.status(500).json(error);
        }

        const uploadedMedia = [];

        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                const cleanName = (file.originalname || "file").replace(/[^a-zA-Z0-9.-]/g, "_");
                const filePath = `${challenge.id}/${Date.now()}-${i}-${cleanName}`;

                const { error: uploadError } = await supabase.storage
                    .from("challenge-media")
                    .upload(filePath, file.buffer, {
                        contentType: file.mimetype
                    });

                if (uploadError) {
                    console.log("Supabase Storage Upload Error:", uploadError);
                    // Continue uploading remaining files if one fails
                } else {
                    const { data: urlData } = supabase.storage
                        .from("challenge-media")
                        .getPublicUrl(filePath);

                    const { data: mediaRecord, error: mediaError } = await supabase
                        .from("challenge_media")
                        .insert({
                            challenge_id: challenge.id,
                            file_url: urlData.publicUrl,
                            file_type: file.mimetype
                        })
                        .select()
                        .single();

                    if (mediaError) {
                        console.log("Challenge Media DB Error:", mediaError);
                    } else if (mediaRecord) {
                        uploadedMedia.push(mediaRecord);
                    }
                }
            }
        }

        res.status(200).json({
            ...challenge,
            media: uploadedMedia
        });

    } catch (error) {
        console.log("SERVER ERROR:", error);
        res.status(500).json({ message: "Server error creating challenge", error: String(error) });
    }
});

app.patch("/challenges/:id/support", async (req, res) => {

    try {

        const { id } = req.params;

        const { data: challenge, error: getError } = await supabase
            .from("challenges")
            .select("supporters")
            .eq("id", id)
            .single();

        if (getError) {

            console.log("Get Supporters Error:", getError);

            return res.status(500).json(getError);

        }

        const newSupporters = (challenge.supporters || 0) + 1;

        const { data, error } = await supabase
            .from("challenges")
            .update({
                supporters: newSupporters
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {

            console.log("Update Supporters Error:", error);

            return res.status(500).json(error);

        }

        res.status(200).json(data);

    } catch (error) {

        console.log("SERVER ERROR:", error);

        res.status(500).json(error);

    }

});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});