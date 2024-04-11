import { StoryBookModel } from "@/db_models/storybook_model";
import { NextRequest } from "next/server";

export const GET = (req:NextRequest) =>{
    StoryBookModel.find()
}