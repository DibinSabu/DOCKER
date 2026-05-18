import axios from "axios";
import { useContext, useState } from "react";
import { WorkoutApi } from "../general/utils";
import { WorkoutContext } from "../context/WorkoutContext";

const WorkoutForm = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw new Error("WorkoutContext is undefined. Wrap with WorkoutProvider?");
    }

    const { dispatch } = context;

    const [title, setTitle] = useState<string>('');
    const [load, setLoad] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ✅ validation (IMPORTANT FIX)
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        const workout = {
            title: title.trim(),
            load,
            reps
        };

        try {
            const res = await axios.post(`${WorkoutApi}workout`, workout);

            dispatch({
                type: 'CREATE_WORKOUTS',
                payload: res.data
            });

            setTitle('');
            setLoad(0);
            setReps(0);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Exercise Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Load (kg):</label>
            <input
                type="number"
                value={load}
                onChange={(e) => setLoad(Number(e.target.value))}
            />

            <label>Reps:</label>
            <input
                type="number"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
            />

            <button type="submit">
                Add Workout
            </button>
        </form>
    );
};

export default WorkoutForm;