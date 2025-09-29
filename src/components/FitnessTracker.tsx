import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Activity, Target, TrendingUp, Heart, Zap, Trophy } from 'lucide-react';
import { Progress } from './ui/progress';

interface FitnessTrackerProps {
  onNavigate: (view: string) => void;
}

export function FitnessTracker({ onNavigate }: FitnessTrackerProps) {
  const [exerciseInput, setExerciseInput] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const dailyGoals = {
    steps: 10000,
    calories: 400,
    activeMinutes: 60,
    water: 8
  };

  const currentProgress = {
    steps: 7820,
    calories: 285,
    activeMinutes: 45,
    water: 6
  };

  const weeklyWorkouts = [
    { day: 'Mon', completed: true, type: 'Cardio', duration: 30 },
    { day: 'Tue', completed: true, type: 'Strength', duration: 45 },
    { day: 'Wed', completed: false, type: 'Yoga', duration: 60 },
    { day: 'Thu', completed: true, type: 'Running', duration: 40 },
    { day: 'Fri', completed: false, type: 'Swimming', duration: 30 },
    { day: 'Sat', completed: false, type: 'Cycling', duration: 60 },
    { day: 'Sun', completed: false, type: 'Rest', duration: 0 }
  ];

  const recentActivities = [
    { name: 'Morning Run', duration: 30, calories: 300, time: '7:00 AM' },
    { name: 'Weight Training', duration: 45, calories: 200, time: '6:00 PM' },
    { name: 'Yoga Session', duration: 60, calories: 150, time: '8:00 AM' }
  ];

  const fitnessRecommendations = [
    {
      title: 'Cardio Workout',
      description: 'Boost your heart health with 30 minutes of cardio',
      difficulty: 'Beginner',
      duration: '30 min',
      calories: '250-300'
    },
    {
      title: 'Strength Training',
      description: 'Build muscle with bodyweight exercises',
      difficulty: 'Intermediate',
      duration: '45 min',
      calories: '200-250'
    },
    {
      title: 'Flexibility & Mobility',
      description: 'Improve flexibility with stretching and yoga',
      difficulty: 'Beginner',
      duration: '20 min',
      calories: '80-120'
    }
  ];

  const addActivity = () => {
    if (exerciseInput && duration) {
      // In a real app, this would add to the activities list
      setExerciseInput('');
      setDuration('');
      setCalories('');
    }
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => onNavigate('home')} 
            variant="outline"
            className="bg-white/50 border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl text-black flex items-center gap-2">
              <Activity className="w-8 h-8 text-teal-600" />
              Fitness Tracker
            </h1>
            <p className="text-gray-600">Track your fitness journey and achieve your health goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Progress */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Steps</span>
                        <span className="text-sm text-black">{currentProgress.steps.toLocaleString()} / {dailyGoals.steps.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(currentProgress.steps / dailyGoals.steps) * 100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Calories Burned</span>
                        <span className="text-sm text-black">{currentProgress.calories} / {dailyGoals.calories}</span>
                      </div>
                      <Progress 
                        value={(currentProgress.calories / dailyGoals.calories) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Active Minutes</span>
                        <span className="text-sm text-black">{currentProgress.activeMinutes} / {dailyGoals.activeMinutes}</span>
                      </div>
                      <Progress 
                        value={(currentProgress.activeMinutes / dailyGoals.activeMinutes) * 100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Water Glasses</span>
                        <span className="text-sm text-black">{currentProgress.water} / {dailyGoals.water}</span>
                      </div>
                      <Progress 
                        value={(currentProgress.water / dailyGoals.water) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Log Activity */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Log Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise">Exercise</Label>
                    <Input
                      id="exercise"
                      value={exerciseInput}
                      onChange={(e) => setExerciseInput(e.target.value)}
                      placeholder="e.g., Running, Cycling"
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="30"
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calories-burned">Calories (optional)</Label>
                    <Input
                      id="calories-burned"
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="200"
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                </div>
                <Button 
                  onClick={addActivity}
                  className="mt-4 bg-black hover:bg-gray-800 text-white"
                >
                  Log Activity
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Workout Plan */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Weekly Workout Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyWorkouts.map((workout, index) => (
                    <div key={index} className={`p-3 rounded-lg text-center ${
                      workout.completed 
                        ? 'bg-green-100 border border-green-200' 
                        : 'bg-white/50 border border-gray-200'
                    }`}>
                      <div className="text-sm text-black mb-1">{workout.day}</div>
                      <div className="text-xs text-gray-600 mb-2">{workout.type}</div>
                      <div className="text-xs text-gray-500">{workout.duration}m</div>
                      {workout.completed && (
                        <div className="mt-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-black">{activity.name}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-black">{activity.duration} min</p>
                        <p className="text-sm text-gray-600">{activity.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/70 to-yellow-100/70 border border-yellow-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  This Week's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Workouts Completed</span>
                    <span className="text-black">3/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Calories</span>
                    <span className="text-black">1,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Days</span>
                    <span className="text-black">5/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Heart Rate */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-red-50/70 to-red-100/70 border border-red-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Heart Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl text-red-600 mb-2">72</div>
                  <p className="text-sm text-gray-600 mb-4">BPM (Resting)</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Zone</span>
                      <span className="text-black">125-140</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max HR</span>
                      <span className="text-black">188</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fitness Recommendations */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Recommended Workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fitnessRecommendations.map((rec, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/50 border border-gray-100">
                      <h4 className="text-sm text-black mb-1">{rec.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {rec.difficulty}
                        </span>
                        <span className="text-gray-500">{rec.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full bg-white/50 border-gray-200">
                  Start Workout
                </Button>
                <Button variant="outline" className="w-full bg-white/50 border-gray-200">
                  Log Water
                </Button>
                <Button variant="outline" className="w-full bg-white/50 border-gray-200">
                  View Statistics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}