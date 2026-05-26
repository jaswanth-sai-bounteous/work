import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProgressPage from './components/ProgressPage';
import WorkoutDay from './components/WorkoutDay';
import { workoutOrder, workouts } from './data/workouts';

const STORAGE_KEYS = {
  completedExercises: 'workout.completedExercises',
  completionCounts: 'workout.completionCounts',
  streak: 'workout.streak',
  lastWorkoutDate: 'workout.lastWorkoutDate',
};

const INITIAL_COMPLETED = {
  upper: [],
  core: [],
  legs: [],
};

const INITIAL_COUNTS = {
  upper: 0,
  core: 0,
  legs: 0,
};

function loadJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function loadString(key, fallback) {
  if (typeof window === 'undefined') return fallback;

  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the app usable even if browser storage is unavailable.
  }
}

function saveString(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Keep the app usable even if browser storage is unavailable.
  }
}

function formatReps(reps, sets) {
  if (typeof reps === 'number' && typeof sets === 'number') {
    return `${sets} sets x ${reps} reps`;
  }

  if (typeof reps === 'number') {
    return `${reps} reps`;
  }

  return String(reps);
}

function isSameDay(dateA, dateB) {
  return dateA.toDateString() === dateB.toDateString();
}

function isYesterday(dateA, dateB) {
  const yesterday = new Date(dateB);
  yesterday.setDate(yesterday.getDate() - 1);
  return dateA.toDateString() === yesterday.toDateString();
}

function getTodayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const location = useLocation();
  const [completedExercises, setCompletedExercises] = useState(() =>
    loadJSON(STORAGE_KEYS.completedExercises, INITIAL_COMPLETED),
  );
  const [completionCounts, setCompletionCounts] = useState(() =>
    loadJSON(STORAGE_KEYS.completionCounts, INITIAL_COUNTS),
  );
  const [streak, setStreak] = useState(() => Number(loadString(STORAGE_KEYS.streak, '0')));
  const [lastWorkoutDate, setLastWorkoutDate] = useState(() =>
    loadString(STORAGE_KEYS.lastWorkoutDate, ''),
  );

  function getWorkout(dayKey) {
    return workouts[dayKey];
  }

  useEffect(() => {
    saveJSON(STORAGE_KEYS.completedExercises, completedExercises);
  }, [completedExercises]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.completionCounts, completionCounts);
  }, [completionCounts]);

  useEffect(() => {
    saveString(STORAGE_KEYS.streak, String(streak));
  }, [streak]);

  useEffect(() => {
    saveString(STORAGE_KEYS.lastWorkoutDate, lastWorkoutDate);
  }, [lastWorkoutDate]);

  const displayExercises = useMemo(() => {
    return workoutOrder.reduce((acc, dayKey) => {
      acc[dayKey] = getWorkout(dayKey).exercises.map((exercise) => ({
        ...exercise,
        repsText: formatReps(exercise.reps, exercise.sets),
      }));
      return acc;
    }, {});
  }, []);

  const totalWorkoutsCompleted = Object.values(completionCounts).reduce((sum, count) => sum + count, 0);
  const daysFinished = Object.values(completionCounts).filter((count) => count > 0).length;

  function registerWorkoutCompletion(dayKey) {
    setCompletionCounts((counts) => ({
      ...counts,
      [dayKey]: counts[dayKey] + 1,
    }));

    const today = new Date();
    const lastDate = lastWorkoutDate ? new Date(lastWorkoutDate) : null;
    if (!lastDate) {
      setStreak(1);
    } else if (isSameDay(lastDate, today)) {
      // Already counted for today.
    } else if (isYesterday(lastDate, today)) {
      setStreak((value) => value + 1);
    } else {
      setStreak(1);
    }

    if (!lastDate || !isSameDay(lastDate, today)) {
      setLastWorkoutDate(getTodayStamp());
    }
  }

  function handleToggleExercise(dayKey, index) {
    const exerciseKey = `${dayKey}-${index}`;
    const currentDayExercises = completedExercises[dayKey];
    const next = currentDayExercises.includes(exerciseKey)
      ? currentDayExercises.filter((item) => item !== exerciseKey)
      : [...currentDayExercises, exerciseKey];

    const dayWorkout = getWorkout(dayKey);
    const workoutComplete = next.length === dayWorkout.exercises.length;

    if (workoutComplete && currentDayExercises.length !== dayWorkout.exercises.length) {
      registerWorkoutCompletion(dayKey);
    }

    setCompletedExercises((current) => ({
      ...current,
      [dayKey]: next,
    }));
  }

  function handleResetDay(dayKey) {
    setCompletedExercises((current) => ({
      ...current,
      [dayKey]: [],
    }));
  }

  function handleCompleteDay(dayKey) {
    const workout = getWorkout(dayKey);
    const alreadyComplete = completedExercises[dayKey].length === workout.exercises.length;

    if (!alreadyComplete) {
      registerWorkoutCompletion(dayKey);
    }

    setCompletedExercises((current) => ({
      ...current,
      [dayKey]: [],
    }));
  }

  function handleResetProgress() {
    setCompletedExercises(INITIAL_COMPLETED);
    setCompletionCounts(INITIAL_COUNTS);
    setStreak(0);
    setLastWorkoutDate('');

    Object.values(STORAGE_KEYS).forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Ignore storage errors during reset.
      }
    });

    try {
      localStorage.removeItem('workout.difficultyLevel');
    } catch {
      // Ignore storage errors during reset.
    }
  }

  return (
    <div className="app-shell">
      <Navbar onReset={handleResetProgress} />

      <Routes>
        <Route
          path="/"
          element={
            <main className="page-shell">
              <section className="hero-card">
                <p className="eyebrow">3-Day Home Program</p>
                <h2>Soft, simple workouts you can actually stick with.</h2>
                <p className="hero-text">
                  Complete each exercise, reset each day when you’re done, and keep your progress saved in localStorage.
                </p>

                <div className="hero-actions">
                  <div className="mini-stats">
                    <span>{totalWorkoutsCompleted} total workouts</span>
                    <span>{streak} day streak</span>
                  </div>
                </div>
              </section>

              {workoutOrder.map((dayKey) => (
                <WorkoutDay
                  key={dayKey}
                  dayKey={dayKey}
                  workout={getWorkout(dayKey)}
                  completedExercises={completedExercises}
                  displayExercises={displayExercises}
                  onToggleExercise={handleToggleExercise}
                  onCompleteDay={handleCompleteDay}
                  onResetDay={handleResetDay}
                />
              ))}
            </main>
          }
        />
        <Route
          path="/progress"
          element={
            <ProgressPage
              completionCounts={completionCounts}
              totalWorkoutsCompleted={totalWorkoutsCompleted}
              daysFinished={daysFinished}
              streak={streak}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
