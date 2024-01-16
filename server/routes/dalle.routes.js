import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const config = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        console.log('Received prompt:', prompt);

        const response = await config.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        // Log the entire response
        console.log('\n\nOpenAI API Revised prompt:', response.data[0].revised_prompt);

        const image = response.data[0].b64_json;
        res.status(200).json({ photo: image });



        // Check if response.data and response.data.data are defined
        // if (response.data && response.data.data) {
        //     // Check if there is at least one result
        //     if (response.data.data.length > 0) {
        //         console.log('OpenAI API Response:', response.data);
        //     } else {
        //         res.status(500).json({ message: "No data in response from OpenAI" });
        //     }
        // } else {
        //     res.status(500).json({ message: "Invalid response structure from OpenAI" });
        // }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;

// import express from 'express';
// import * as dotenv from 'dotenv';
// import OpenAI from 'openai';

// dotenv.config();

// const router = express.Router();

// const config = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// router.route('/').get((req, res) => {
//     res.status(200).json({ message: "Hello from DALL.E ROUTES" });
// });

// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         console.log('Received prompt:', prompt);

//         const response = await config.images.generate({
//             model: "dall-e-3",
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json',
//         });

//         // Log the entire response
//         console.log('OpenAI API Full Response:', response);

//         // Extracting and initializing the image variable

//         const revisedPrompt = response.data[0]?.revised_prompt || '';

//         // Log the revised prompt and image
//         console.log('Revised Prompt:', revisedPrompt);
//         console.log('Image:', image);

//         res.status(200).json({ photo: image });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// export default router;
