import { createContext, useReducer } from "react";
import type { Workout } from "../general/utils";

export interface WorkoutsState{
    workouts: Workout[] | null
}

export type WorkoutAction = |{type: 'SET_WORKOUTS'; payload: Workout[]} | {type:'CREATE_WORKOUTS'; payload: Workout} | {type:'DELETE_WORKOUT'; payload: Workout}

export interface WorkoutsContextType extends WorkoutsState{
    dispatch: React.Dispatch<WorkoutAction>
}

export const WorkoutContext = createContext<WorkoutsContextType | undefined>(undefined)

export const workoutsReducer = (state:WorkoutsState,action:WorkoutAction): WorkoutsState =>{
    switch(action.type)
    {
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUTS':
            return{
                workouts: [action.payload,...(state.workouts || [])]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts!.filter((w)=> w._id !== action.payload._id)
            }
        default:
            return state;
    }
}

interface Props{
    children: React.ReactNode;
}

export const WorkoutProvider = (props:Props) => {
    const [state,dispatch] = useReducer(workoutsReducer,{workouts:null});
    return( <WorkoutContext.Provider value={{...state,dispatch}}>
                {props.children}
            </WorkoutContext.Provider>
        )
}
