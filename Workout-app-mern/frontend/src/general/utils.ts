export type Workout={
    _id: string;
    title: string;
    load: number;
    reps:number;
    userId?:string;
    createdAt:string;
}

export type ReactSetState<T>=React.Dispatch<React.SetStateAction<T>>

export const WorkoutApi = 'http://localhost:3000/'