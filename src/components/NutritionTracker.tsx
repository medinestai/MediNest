import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Apple, Plus, Target, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface NutritionTrackerProps {
  onNavigate: (view: string) => void;
}

export function NutritionTracker({ onNavigate }: NutritionTrackerProps) {
  const [foodInput, setFoodInput] = useState('');
  const [calories, setCalories] = useState('');

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  };

  const currentIntake = {
    calories: 1650,
    protein: 120,
    carbs: 200,
    fat: 45
  };

  const recentMeals = [
    { name: 'Grilled Chicken Salad', calories: 450, time: '12:30 PM', type: 'Lunch' },
    { name: 'Greek Yogurt with Berries', calories: 180, time: '10:00 AM', type: 'Snack' },
    { name: 'Oatmeal with Banana', calories: 320, time: '8:00 AM', type: 'Breakfast' }
  ];

  const nutritionTips = [
    'Stay hydrated - aim for 8 glasses of water daily',
    'Include lean proteins in every meal',
    'Choose whole grains over refined carbohydrates',
    'Eat a variety of colorful fruits and vegetables'
  ];

  const addFood = () => {
    if (foodInput && calories) {
      // In a real app, this would add to the meals list
      setFoodInput('');
      setCalories('');
    }
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
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
              <Apple className="w-8 h-8 text-green-600" />
              Nutrition Tracker
            </h1>
            <p className="text-gray-600">Monitor your daily nutrition and achieve your health goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Daily Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Calories</span>
                        <span className="text-sm text-black">{currentIntake.calories} / {dailyGoals.calories}</span>
                      </div>
                      <Progress 
                        value={(currentIntake.calories / dailyGoals.calories) * 100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Protein (g)</span>
                        <span className="text-sm text-black">{currentIntake.protein} / {dailyGoals.protein}</span>
                      </div>
                      <Progress 
                        value={(currentIntake.protein / dailyGoals.protein) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Carbs (g)</span>
                        <span className="text-sm text-black">{currentIntake.carbs} / {dailyGoals.carbs}</span>
                      </div>
                      <Progress 
                        value={(currentIntake.carbs / dailyGoals.carbs) * 100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Fat (g)</span>
                        <span className="text-sm text-black">{currentIntake.fat} / {dailyGoals.fat}</span>
                      </div>
                      <Progress 
                        value={(currentIntake.fat / dailyGoals.fat) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Food */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Food
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="food">Food Item</Label>
                    <Input
                      id="food"
                      value={foodInput}
                      onChange={(e) => setFoodInput(e.target.value)}
                      placeholder="e.g., Grilled Chicken Breast"
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div className="w-32">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="250"
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addFood} className="bg-black hover:bg-gray-800 text-white">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Meals */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Recent Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMeals.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                      <div>
                        <p className="text-black">{meal.name}</p>
                        <p className="text-sm text-gray-600">{meal.type} • {meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-black">{meal.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Summary */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-green-50/70 to-green-100/70 border border-green-200/50">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Weekly Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Calories</span>
                    <span className="text-black">1,890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days on Track</span>
                    <span className="text-black">5/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight Change</span>
                    <span className="text-green-600">-0.5 lbs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Tips */}
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Nutrition Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nutritionTips.map((tip, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/50 border border-gray-100">
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Water Intake */}
            <Card className="backdrop-blur-lg bg-gradient-to-br from-blue-50/70 to-blue-100/70 border border-blue-200/50">
              <CardHeader>
                <CardTitle className="text-black">Water Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl text-blue-600 mb-2">6/8</div>
                  <p className="text-sm text-gray-600 mb-4">Glasses today</p>
                  <Button variant="outline" className="w-full bg-white/50 border-blue-200">
                    Add Glass
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}