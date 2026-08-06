import FutureSimulator from "../components/FutureSimulator";
import CareerReadiness from "../components/CareerReadiness";

function Simulator({
  skills,
  selectedCareer
}) {
  return (
    <>
      <CareerReadiness
        skills={skills}
        selectedCareer={selectedCareer}
      />

      <FutureSimulator
        skills={skills}
        selectedCareer={selectedCareer}
      />
    </>
  );
}

export default Simulator;