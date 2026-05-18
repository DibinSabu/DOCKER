import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workout, WorkoutDocument } from './workout.schema';
import { Model, Types } from 'mongoose';
import { throwError } from 'rxjs';

@Injectable()
export class WorkoutService {

  constructor(@InjectModel(Workout.name) private workoutModel:Model<WorkoutDocument>,){}
  
  async createWorkout(createWorkoutDto: CreateWorkoutDto):Promise<Workout> {
    try {
      const workout = await this.workoutModel.create(createWorkoutDto);
      return workout
    } catch (error) {
      throw error
    }
}

  async findAllWorkout():Promise<Workout[]> {
    try {
      const workouts = await this.workoutModel.find().sort({createdAt: -1})
      return workouts;
    } catch (error) {
      console.log('Error found',error)
      throw error
    }
  }

  async findOneWorkout(id: string):Promise<Workout> {
    try {
       if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Invalid workout ID');
      }
      const workout = await this.workoutModel.findById(id)
      if (!workout) {
        throw new NotFoundException('No such workout');
      }
      return workout;
    } catch (error) {
      console.log('Error found',error)
      throw error
    }
  }

  async updateWorkout(id: string, updateWorkoutDto: UpdateWorkoutDto):Promise<Workout> {
    try {
      if(!Types.ObjectId.isValid(id)){
        throw new NotFoundException('No such ID')
      }
      const workout = await this.workoutModel.findByIdAndUpdate(id,
        updateWorkoutDto,
        {new:true},
      )
      if(!workout){
        throw new NotFoundException('No such Workout')
      }
      return workout;
    } catch (error) {
      throw error
    }
  }

  async removeWorkout(id: string):Promise<Workout> {
    try {
      if (!Types.ObjectId.isValid(id)){
        throw new NotFoundException('No such Workout Found')
      }
      const workout = await this.workoutModel.findByIdAndDelete(id)
      if(!workout){
        throw new NotFoundException('No such Workout Found')
      }
      return workout
    } catch (error) {
      throw error
    }
    
  }
}
