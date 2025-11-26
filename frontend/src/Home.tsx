// Website's homepage (maybe the only page for now)
import { fetchExercisesFromDB } from "./lib/api";
import type { Exercise } from "./lib/definitions";
import HomepageContainer from "./ui/homepage-render-component";
import { useEffect, useState } from "react";

export default function Home() {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchExercisesFromDB().then((data) => setExerciseData(data));
  }, []);

  return (
    <>
      <HomepageContainer exerciseData={exerciseData} />
    </>
  );
}
