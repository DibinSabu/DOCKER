import axios from "axios";
import { WorkoutApi, type Workout } from "../general/utils";
import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

type Props={
    workout:Workout
}
const WorkoutDetails = ({workout}:Props) => {
     const context = useContext(WorkoutContext);
            if (!context) {
            throw new Error("WorkoutContext is undefined. Wrap with WorkoutProvider?");
            }
        
            const {dispatch} = context;

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${WorkoutApi}workout/${workout._id}`);
            console.log("Deleted successfully!",res.data);
            dispatch({type:'DELETE_WORKOUT',payload:res.data})
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

  return (
    <div>
      <h5>{workout.title}</h5>
      <p>LOAD: {workout.load}</p>
      <p>REPS: {workout.reps}</p>
      <p>{workout.createdAt}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default WorkoutDetails
