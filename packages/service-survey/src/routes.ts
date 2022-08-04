import { Router } from "express";
import * as StatisticsController from "./controllers/statistics";
import * as SurveysController from "./controllers/surveys";

// Survey statistics routes
const statsRoutes = Router({ mergeParams: true });
statsRoutes.get("/enps", StatisticsController.calculateEnps);

// Survey routes
const surveysRoutes = Router({ mergeParams: true });
surveysRoutes.use("/:surveyId/statistics", statsRoutes);
surveysRoutes.get("/:surveyId", SurveysController.getSurveyById);
surveysRoutes.get("/", SurveysController.getAllSurveys);

// Top-level routes
const router = Router({ mergeParams: true });
router.use("/survey", surveysRoutes);

export default router;
