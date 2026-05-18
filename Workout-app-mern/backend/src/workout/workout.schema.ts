import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";


export type WorkoutDocument = Workout & Document

@Schema({timestamps:true})
export class Workout {
    @Prop({required: true})
    title:string;

    @Prop({required: true})
    load: number;

    @Prop({required: true})
    reps: number;

    @Prop({})
    user_id?:string
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout)