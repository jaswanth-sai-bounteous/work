export default function ExerciseCard({
  exercise,
  isDone,
  displayReps,
  disabled,
  onToggle,
}) {
  return (
    <article className={`exercise-card ${isDone ? 'done' : ''}`}>
      <div className="exercise-copy">
        <div className="exercise-title-row">
          <h3>{exercise.name}</h3>
          {isDone ? <span className="done-pill">Completed</span> : null}
        </div>
        <p className="exercise-meta">{displayReps}</p>
      </div>

      <div className="video-frame">
        <iframe
          src={exercise.video}
          title={exercise.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <button
        type="button"
        className="primary-button"
        onClick={onToggle}
        disabled={disabled}
      >
        {isDone ? 'Undo Done' : 'Mark as Done'}
      </button>
    </article>
  );
}
