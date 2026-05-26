import ExerciseCard from './ExerciseCard';

export default function WorkoutDay({
  dayKey,
  workout,
  completedExercises,
  displayExercises,
  onToggleExercise,
  onCompleteDay,
  onResetDay,
}) {
  const dayCompleted = completedExercises[dayKey].length === workout.exercises.length;

  return (
    <section className="day-section">
      <div className="day-header">
        <div>
          <p className="eyebrow">Day {dayKey === 'upper' ? '01' : dayKey === 'core' ? '02' : '03'}</p>
          <h2>{workout.name}</h2>
        </div>
        <div className="day-actions">
          <span className={`status-chip ${dayCompleted ? 'complete' : ''}`}>
            {dayCompleted ? 'Workout complete' : 'In progress'}
          </span>
          <button type="button" className="primary-button" onClick={() => onCompleteDay(dayKey)}>
            Complete Day
          </button>
          <button type="button" className="secondary-button" onClick={() => onResetDay(dayKey)}>
            Reset Day
          </button>
        </div>
      </div>

      <div className="exercise-grid">
        {workout.exercises.map((exercise, index) => {
          const key = `${dayKey}-${index}`;
          const isDone = completedExercises[dayKey].includes(key);

          return (
            <ExerciseCard
              key={key}
              exercise={exercise}
              isDone={isDone}
              displayReps={displayExercises[dayKey][index].repsText}
              disabled={false}
              onToggle={() => onToggleExercise(dayKey, index)}
            />
          );
        })}
      </div>
    </section>
  );
}
