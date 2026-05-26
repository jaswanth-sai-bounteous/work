export default function ProgressPage({
  completionCounts,
  totalWorkoutsCompleted,
  daysFinished,
  streak,
}) {
  const maxGoal = 3;
  const days = [
    { key: 'upper', label: 'Upper Body' },
    { key: 'core', label: 'Core' },
    { key: 'legs', label: 'Legs' },
  ];
  const completionRate = Math.min((totalWorkoutsCompleted / (maxGoal * days.length)) * 100, 100);

  return (
    <main className="page-shell">
      <section className="progress-hero">
        <div className="progress-hero-copy">
          <p className="eyebrow">Progress Overview</p>
          <h2>Gentle consistency creates lasting progress.</h2>
          <p className="hero-text">
            See your total work, days finished, and how close each day is to unlocking the next difficulty tier.
          </p>
        </div>

        <div className="progress-hero-metrics">
          <div className="progress-ring-card">
            <div className="progress-ring" style={{ '--progress': `${completionRate}%` }}>
              <strong>{Math.round(completionRate)}%</strong>
              <span>overall</span>
            </div>
            <p className="progress-note">All three days combined toward your next progression milestone.</p>
          </div>

          <div className="progress-summary-grid">
            <div className="progress-summary-card">
              <span>Total Workouts</span>
              <strong>{totalWorkoutsCompleted}</strong>
            </div>
            <div className="progress-summary-card">
              <span>Days Finished</span>
              <strong>{daysFinished}</strong>
            </div>
            <div className="progress-summary-card">
              <span>Current Streak</span>
              <strong>{streak}</strong>
            </div>
            <div className="progress-summary-card">
              <span>Days Goal</span>
              <strong>3</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="progress-panel">
        <div className="progress-panel-header">
          <div>
            <p className="eyebrow">Day Breakdown</p>
            <h3>Every finished day adds to your consistency.</h3>
          </div>
          <span className="progress-panel-pill">Simple weekly tracking</span>
        </div>

        <div className="progress-day-list">
          {days.map(({ key, label }) => {
            const count = completionCounts[key];
            const progress = Math.min((count / maxGoal) * 100, 100);
            const remaining = Math.max(maxGoal - count, 0);

            return (
              <article key={key} className="progress-day-card">
                <div className="progress-day-topline">
                  <div>
                    <h3>{label}</h3>
                    <p>{count} of {maxGoal} completions</p>
                  </div>
                  <span className={`progress-badge ${progress >= 100 ? 'complete' : ''}`}>
                    {progress >= 100 ? 'Complete' : `${remaining} left`}
                  </span>
                </div>

                <div className="progress-bar" aria-label={`${label} completion progress`}>
                  <span style={{ width: `${progress}%` }} />
                </div>

                <div className="progress-day-footer">
                  <span>{Math.round(progress)}% complete</span>
                  <span>{progress >= 100 ? 'Day finished' : 'Keep going'}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
