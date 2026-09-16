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


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});