// Website's homepage (maybe the only page for now)
import type { Exercise } from "./lib/definitions";
import HomepageContainer from "./ui/homepage-render-component";
import { fetchExercisesFromDB } from "./lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/exercise")
      .then((res) => res.json())
      .then(setExerciseData);
  }, []);

  return (
    <>
      <HomepageContainer exerciseData={exerciseData} />
    </>
  );
}
