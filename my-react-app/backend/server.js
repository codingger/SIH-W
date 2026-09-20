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

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

app.get("/", (req, res) => {
    res.send("Backend working");
});

app.get("/challenges", async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("challenges")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Challenge Error:", error);
            return res.status(500).json(error);
        }

        res.status(200).json(data);

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
        const {
            title,
            description,
            category,
            district,
            area,
            affected_people,
            additional_info
        } = req.body;

        console.log("Received:", req.body);
        console.log("Files:", req.files);

        const { data: challenge, error } = await supabase
            .from("challenges")
            .insert({
                title: title,
                description: description,
                category: category,
                district: district,
                area: area,
                affected_people: affected_people,
                additional_info: additional_info
            })
            .select()
            .single();

        if (error) {
            console.log("Challenge Error:", error);
            return res.status(500).json(error);
        }

        for (let i = 0; i < req.files.length; i++) {

            const file = req.files[i];

            const filePath =
                `${challenge.id}/${Date.now()}-${i}-${file.originalname}`;


            const { error: uploadError } = await supabase.storage
                .from("challenge-media")
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype
                });

            if (uploadError) {
                console.log("Upload Error:", uploadError);
                return res.status(500).json(uploadError);
            }

            const { data: urlData } = supabase.storage
                .from("challenge-media")
                .getPublicUrl(filePath);

            const { error: mediaError } = await supabase
                .from("challenge_media")
                .insert({
                    challenge_id: challenge.id,
                    file_url: urlData.publicUrl,
                    file_type: file.mimetype
                });

            if (mediaError) {
                console.log("Media Error:", mediaError);
                return res.status(500).json(mediaError);
            }
        }

        res.status(200).json(challenge);

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