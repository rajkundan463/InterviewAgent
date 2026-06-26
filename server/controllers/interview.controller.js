import fs from "fs";
import FormData from "form-data";

import aiClient from "../services/ai.service.js";

import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

export const analyzeResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Resume required"
            });
        }

        const form = new FormData();

        form.append(
            "resume",
            fs.createReadStream(req.file.path)
        );

        const response = await aiClient.post(
            "/resume",
            form,
            {
                headers: form.getHeaders(),
            }
        );

        const data = response.data;

        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(200).json(data);
    } catch (error) {

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.error(
            "Resume Analysis Error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            message: "Failed to analyze resume."
        });

    }
};

export const generateQuestion = async (req, res) => {
    try {

        let {
            role,
            experience,
            mode,
            resumeText,
            projects,
            skills
        } = req.body;

        role = role?.trim();
        experience = experience?.trim();
        mode = mode?.trim();

        if (!role || !experience || !mode) {
            return res.status(400).json({
                message: "Role, Experience and Mode are required."
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (user.credits < 50) {
            return res.status(400).json({
                message: "Not enough credits. Minimum 50 required."
            });
        }

        const response = await aiClient.post(
            "/generate-questions",
            {
                role,
                experience,
                mode,
                resumeText: resumeText || "",
                projects: projects || [],
                skills: skills || [],
            }
        );

        const questionsArray = response.data.questions;

        if (!questionsArray || questionsArray.length !== 5) {
            return res.status(500).json({
                message: "AI failed to generate valid questions."
            });
        }

        user.credits -= 50;
        await user.save();

        const interview = await Interview.create({
            userId: user._id,
            role,
            experience,
            mode,
            resumeText,

            questions: questionsArray.map((question, index) => ({
                question,
                difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
                timeLimit: [60, 60, 90, 90, 120][index],
            })),
        });

        return res.json({
            interviewId: interview._id,
            creditsLeft: user.credits,
            userName: user.name,
            questions: interview.questions,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to generate interview."
        });

    }
};

export const submitAnswer = async (req, res) => {

    try {

        const {
            interviewId,
            questionIndex,
            answer,
            timeTaken,
        } = req.body;

        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found."
            });
        }

        const question = interview.questions[questionIndex];

        if (!answer) {

            question.score = 0;
            question.feedback = "You did not submit an answer.";
            question.answer = "";

            await interview.save();

            return res.json({
                feedback: question.feedback
            });

        }

        if (timeTaken > question.timeLimit) {

            question.score = 0;
            question.feedback =
                "Time limit exceeded. Answer not evaluated.";

            question.answer = answer;

            await interview.save();

            return res.json({
                feedback: question.feedback
            });

        }

        const response = await aiClient.post(
            "/submit-answer",
            {
                question: question.question,
                answer,
            }
        );

        const parsed = response.data;

        if (!parsed) {
            return res.status(500).json({
                message: "AI evaluation failed."
            });
        }

        question.answer = answer;
        question.confidence = parsed.confidence;
        question.communication = parsed.communication;
        question.correctness = parsed.correctness;
        question.score = parsed.finalScore;
        question.feedback = parsed.feedback;

        await interview.save();

        return res.status(200).json({
            feedback: parsed.feedback
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to submit answer."
        });

    }

};

export const finishInterview = async (req, res) => {
    try {
        const { interviewId } = req.body
        const interview = await Interview.findById(interviewId)
        if (!interview) {
            return res.status(400).json({ message: "failed to find Interview" })
        }

        const totalQuestions = interview.questions.length;

        let totalScore = 0;
        let totalConfidence = 0;
        let totalCommunication = 0;
        let totalCorrectness = 0;

        interview.questions.forEach((q) => {
            totalScore += q.score || 0;
            totalConfidence += q.confidence || 0;
            totalCommunication += q.communication || 0;
            totalCorrectness += q.correctness || 0;
        });

        const finalScore = totalQuestions
            ? totalScore / totalQuestions
            : 0;

        const avgConfidence = totalQuestions
            ? totalConfidence / totalQuestions
            : 0;

        const avgCommunication = totalQuestions
            ? totalCommunication / totalQuestions
            : 0;

        const avgCorrectness = totalQuestions
            ? totalCorrectness / totalQuestions
            : 0;

        interview.finalScore = finalScore;
        interview.status = "completed";

        await interview.save();

        return res.status(200).json({
            finalScore: Number(finalScore.toFixed(1)),
            confidence: Number(avgConfidence.toFixed(1)),
            communication: Number(avgCommunication.toFixed(1)),
            correctness: Number(avgCorrectness.toFixed(1)),
            questionWiseScore: interview.questions.map((q) => ({
                question: q.question,
                score: q.score || 0,
                feedback: q.feedback || "",
                confidence: q.confidence || 0,
                communication: q.communication || 0,
                correctness: q.correctness || 0,
            })),
        })
    } catch (error) {
        return res.status(500).json({ message: `failed to finish Interview ${error}` })
    }
}


export const getMyInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .select("role experience mode finalScore status createdAt");

        return res.status(200).json(interviews)

    } catch (error) {
        return res.status(500).json({ message: `failed to find currentUser Interview ${error}` })
    }
}

export const getInterviewReport = async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id)

        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }


        const totalQuestions = interview.questions.length;

        let totalConfidence = 0;
        let totalCommunication = 0;
        let totalCorrectness = 0;

        interview.questions.forEach((q) => {
            totalConfidence += q.confidence || 0;
            totalCommunication += q.communication || 0;
            totalCorrectness += q.correctness || 0;
        });
        const avgConfidence = totalQuestions
            ? totalConfidence / totalQuestions
            : 0;

        const avgCommunication = totalQuestions
            ? totalCommunication / totalQuestions
            : 0;

        const avgCorrectness = totalQuestions
            ? totalCorrectness / totalQuestions
            : 0;

        return res.json({
            finalScore: interview.finalScore,
            confidence: Number(avgConfidence.toFixed(1)),
            communication: Number(avgCommunication.toFixed(1)),
            correctness: Number(avgCorrectness.toFixed(1)),
            questionWiseScore: interview.questions
        });

    } catch (error) {
        return res.status(500).json({ message: `failed to find currentUser Interview report ${error}` })
    }
}




