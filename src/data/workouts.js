export const workouts = {
  upper: {
    name: 'Upper Body',
    exercises: [
      {
        id: 'wall_pushups',
        name: 'Wall Push-ups',
        sets: 2,
        reps: 10,
        video: 'https://www.youtube.com/embed/YB0egDzsu18',
      },
      {
        id: 'incline_pushups',
        name: 'Incline Push-ups',
        sets: 2,
        reps: 8,
        video: 'https://www.youtube.com/embed/cfns5VDVVvk',
      },
      {
        id: 'arm_circles',
        name: 'Arm Circles',
        sets: 2,
        reps: 15,
        video: 'https://www.youtube.com/embed/140RTNMciH8',
      },
      {
        id: 'shoulder_taps',
        name: 'Knee Shoulder Taps',
        sets: 2,
        reps: 10,
        video: 'https://www.youtube.com/embed/4kt39vFERSM',
      },
    ],
  },
  core: {
    name: 'Core',
    exercises: [
      {
        name: 'Plank',
        reps: '30 sec',
        video: 'https://www.youtube.com/embed/pSHjTRCQxIw',
      },
      {
        name: 'Leg Raises',
        reps: 12,
        video: 'https://www.youtube.com/embed/JB2oyawG9KI',
      },
      {
        name: 'Dead Bugs',
        reps: 12,
        video: 'https://www.youtube.com/embed/GbSC02oU3To',
      },
      {
        name: 'Mountain Climbers',
        reps: 20,
        video: 'https://www.youtube.com/embed/nmwgirgXLYM',
      },
    ],
  },
  legs: {
    name: 'Legs (Glutes)',
    exercises: [
      {
        name: 'Glute Bridges',
        reps: 15,
        video: 'https://www.youtube.com/embed/Xp33YgPZgns',
      },
      {
        name: 'Bulgarian Split Squats',
        reps: 12,
        video: 'https://www.youtube.com/embed/2C-uNgKwPLE',
      },
      {
        name: 'Squats',
        reps: 15,
        video: 'https://www.youtube.com/embed/aclHkVaku9U',
      },
      {
        name: 'Donkey Kicks',
        reps: 15,
        video: 'https://www.youtube.com/embed/SJ1Xuz9D-ZQ',
      },
    ],
  },
};

export const workoutOrder = ['upper', 'core', 'legs'];
