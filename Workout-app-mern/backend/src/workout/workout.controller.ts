import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.createWorkout(createWorkoutDto);
  }

  @Get()
  findAllWorkout() {
    return this.workoutService.findAllWorkout();
  }

  @Get(':id')
  findOneWorkout(@Param('id') id: string) {
    return this.workoutService.findOneWorkout(id);
  }

  @Patch(':id')
  updateWorkout(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.updateWorkout(id, updateWorkoutDto);
  }

  @Delete(':id')
  removeWorkout(@Param('id') id: string) {
    return this.workoutService.removeWorkout(id);
  }
}
