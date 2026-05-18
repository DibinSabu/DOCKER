import axios from "axios";
import { useContext, useEffect } from "react"
import { WorkoutApi } from "../general/utils";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";


const Home = () => {
    
    const context = useContext(WorkoutContext);
    if (!context) {
    throw new Error("WorkoutContext is undefined. Wrap with WorkoutProvider?");
    }

    const {workouts, dispatch} = context
    
    //fetch all workouts
    useEffect(()=>{
        async function fetchData(){
            try {
                const res = await axios.get(`${WorkoutApi}workout`);
                dispatch({ type:'SET_WORKOUTS', payload:res.data })
            } catch (error) {
                console.log('Error:',error)
            } 
        }
        fetchData();
    },[])

return (
    <div>
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home
