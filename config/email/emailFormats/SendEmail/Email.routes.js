import { Router } from "express";
import {sendPackageEmail } from "./sendEmail.js";

const emailRoutes = Router();

emailRoutes.post("/sendPackageDetails",sendPackageEmail);

export default emailRoutes ;

