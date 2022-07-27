import { Router } from "express";
import * as SurveysController from "./controllers/surveys";

// Survey routes
const surveysRoutes = Router({ mergeParams: true });
surveysRoutes.get("/:surveyId", SurveysController.getSurveyById);
surveysRoutes.get("/", SurveysController.getAllSurveys);

// Top-level routes
const router = Router({ mergeParams: true });
router.use("/survey", surveysRoutes);

export default router;
