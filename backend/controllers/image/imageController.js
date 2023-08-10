import path from "path";
import fs from "fs";

export const getImageByName = async (req, res) => {
    const { imageName } = req.params;
    const __dirname = path.resolve();
    const imagePath = path.join(__dirname, `/uploads/${imageName}`);
    try {
        //check if image exists
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        }
        else {
            res.status(404).send("Image not found");
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
