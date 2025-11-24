import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Category = 'fitness' | 'learning' | 'health' | 'finance';

interface Habit {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  streak: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
}

interface Income {
  id: string;
  source: string;
  amount: number;
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  isRecurring: boolean;
}

interface WorkoutPlan {
  id: string;
  title: string;
  duration: string;
  exercises: string[];
  isCustom?: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
}

interface WorkoutGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

interface HealthMetric {
  date: string;
  weight?: number;
  steps?: number;
  sleep?: number;
  water?: number;
}

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', title: 'Утренняя разминка', category: 'fitness', completed: true, streak: 7 },
    { id: '2', title: '15 минут чтения', category: 'learning', completed: false, streak: 3 },
    { id: '3', title: 'Выпить 2л воды', category: 'health', completed: true, streak: 5 },
    { id: '4', title: 'Записать расходы', category: 'finance', completed: false, streak: 12 },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Изучить React hooks', description: 'Пройти документацию', category: 'learning', completed: false },
    { id: '2', title: 'Планка 2 минуты', description: 'Увеличить время', category: 'fitness', completed: false },
  ]);

  const [incomes, setIncomes] = useState<Income[]>([
    { id: '1', source: 'Зарплата', amount: 80000 },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Аренда жилья', amount: 30000, isRecurring: true },
    { id: '2', name: 'Коммунальные услуги', amount: 5000, isRecurring: true },
  ]);

  const [dailyExpense, setDailyExpense] = useState('');
  const [dailyExpenseAmount, setDailyExpenseAmount] = useState('');

  const [savingsGoal, setSavingsGoal] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(32000);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Category>('learning');

  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Привет! Я твой ИИ-коуч 🚀 Готов помочь с любыми вопросами!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    {
      id: '1',
      title: 'Утренняя зарядка для начинающих',
      duration: '15 мин',
      exercises: ['Приседания 3x15', 'Отжимания 3x10', 'Планка 3x30сек', 'Растяжка 5 мин']
    },
    {
      id: '2',
      title: 'HIIT тренировка',
      duration: '20 мин',
      exercises: ['Бёрпи 4x10', 'Прыжки 4x30сек', 'Альпинист 4x20', 'Отдых между подходами 30сек']
    },
    {
      id: '3',
      title: 'Йога для гибкости',
      duration: '30 мин',
      exercises: ['Приветствие солнцу', 'Поза собаки', 'Поза воина', 'Шавасана']
    },
    {
      id: '4',
      title: 'Силовая тренировка дома',
      duration: '40 мин',
      exercises: ['Приседания с весом 4x12', 'Выпады 3x15', 'Отжимания широкие 3x12', 'Пресс 4x20']
    },
  ]);

  const [customWorkoutTitle, setCustomWorkoutTitle] = useState('');
  const [customWorkoutDuration, setCustomWorkoutDuration] = useState('');
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseSets, setNewExerciseSets] = useState('');
  const [newExerciseReps, setNewExerciseReps] = useState('');

  const [workoutGoals, setWorkoutGoals] = useState<WorkoutGoal[]>([
    { id: '1', title: 'Отжимания', target: 50, current: 32, unit: 'раз' },
    { id: '2', title: 'Планка', target: 180, current: 120, unit: 'сек' },
    { id: '3', title: 'Тренировок в неделю', target: 5, current: 3, unit: 'шт' },
  ]);

  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { date: '2024-01-18', weight: 72, steps: 8500, sleep: 7.5, water: 2.0 },
    { date: '2024-01-17', weight: 72.5, steps: 10200, sleep: 8, water: 2.5 },
    { date: '2024-01-16', weight: 73, steps: 6800, sleep: 6.5, water: 1.8 },
  ]);

  const [todayWeight, setTodayWeight] = useState('');
  const [todaySteps, setTodaySteps] = useState('');
  const [todaySleep, setTodaySleep] = useState('');
  const [todayWater, setTodayWater] = useState('');

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      category: newTaskCategory,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const addDailyExpense = () => {
    if (!dailyExpense.trim() || !dailyExpenseAmount) return;
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: dailyExpense,
      amount: parseFloat(dailyExpenseAmount),
      isRecurring: false
    };
    
    setExpenses([...expenses, newExpense]);
    setDailyExpense('');
    setDailyExpenseAmount('');
  };

  const addIncome = (source: string, amount: number) => {
    const newIncome: Income = {
      id: Date.now().toString(),
      source,
      amount
    };
    setIncomes([...incomes, newIncome]);
  };

  const addExerciseToCustomPlan = () => {
    if (!newExerciseName.trim()) return;
    
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExerciseName,
      sets: newExerciseSets,
      reps: newExerciseReps,
    };
    
    setCustomExercises([...customExercises, exercise]);
    setNewExerciseName('');
    setNewExerciseSets('');
    setNewExerciseReps('');
  };

  const createCustomWorkout = () => {
    if (!customWorkoutTitle.trim() || customExercises.length === 0) return;
    
    const exerciseStrings = customExercises.map(ex => {
      const parts = [ex.name];
      if (ex.sets && ex.reps) parts.push(`${ex.sets}x${ex.reps}`);
      return parts.join(' ');
    });
    
    const newPlan: WorkoutPlan = {
      id: Date.now().toString(),
      title: customWorkoutTitle,
      duration: customWorkoutDuration || '30 мин',
      exercises: exerciseStrings,
      isCustom: true,
    };
    
    setWorkoutPlans([...workoutPlans, newPlan]);
    setCustomWorkoutTitle('');
    setCustomWorkoutDuration('');
    setCustomExercises([]);
  };

  const removeExercise = (id: string) => {
    setCustomExercises(customExercises.filter(ex => ex.id !== id));
  };

  const updateGoalProgress = (id: string, value: number) => {
    setWorkoutGoals(workoutGoals.map(goal => 
      goal.id === id ? { ...goal, current: value } : goal
    ));
  };

  const addHealthMetric = () => {
    const today = new Date().toISOString().split('T')[0];
    const metric: HealthMetric = {
      date: today,
      weight: todayWeight ? parseFloat(todayWeight) : undefined,
      steps: todaySteps ? parseInt(todaySteps) : undefined,
      sleep: todaySleep ? parseFloat(todaySleep) : undefined,
      water: todayWater ? parseFloat(todayWater) : undefined,
    };
    
    setHealthMetrics([metric, ...healthMetrics.filter(m => m.date !== today)]);
    setTodayWeight('');
    setTodaySteps('');
    setTodaySleep('');
    setTodayWater('');
  };

  const addRecurringExpense = (name: string, amount: number) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount,
      isRecurring: true
    };
    setExpenses([...expenses, newExpense]);
  };

  const getCategoryColor = (category: Category) => {
    const colors = {
      fitness: 'bg-fitness',
      learning: 'bg-learning',
      health: 'bg-health',
      finance: 'bg-finance',
    };
    return colors[category];
  };

  const getCategoryIcon = (category: Category) => {
    const icons = {
      fitness: 'Dumbbell',
      learning: 'GraduationCap',
      health: 'Heart',
      finance: 'Wallet',
    };
    return icons[category];
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const progressPercent = (completedToday / totalHabits) * 100;

  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const totalRecurringExpenses = expenses.filter(e => e.isRecurring).reduce((sum, exp) => sum + exp.amount, 0);
  const totalDailyExpenses = expenses.filter(e => !e.isRecurring).reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyProfit = totalIncome - totalRecurringExpenses - totalDailyExpenses;
  const savingsPercent = (currentSavings / savingsGoal) * 100;

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', text: inputMessage },
      { role: 'assistant', text: 'Отличный вопрос! Давай разберём это детально...' }
    ]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <header className="text-center space-y-2 py-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Твой План Роста
          </h1>
          <p className="text-muted-foreground text-lg">
            Развивайся каждый день вместе с ИИ-коучем
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-scale border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Сегодня</CardTitle>
                <div className="text-3xl">🔥</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Прогресс</span>
                  <span className="font-bold text-primary">{completedToday}/{totalHabits}</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Streak</CardTitle>
                <div className="text-3xl">⚡</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent">12</div>
                <p className="text-sm text-muted-foreground mt-1">дней подряд</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Награды</CardTitle>
                <div className="text-3xl">🏆</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 justify-center">
                <div className="text-2xl">🥇</div>
                <div className="text-2xl">🎯</div>
                <div className="text-2xl">💪</div>
                <div className="text-2xl opacity-30">🌟</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="habits" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="habits" className="gap-2">
              <Icon name="CheckCircle2" size={18} />
              <span className="hidden sm:inline">Привычки</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-2">
              <Icon name="Wallet" size={18} />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
            <TabsTrigger value="development" className="gap-2">
              <Icon name="GraduationCap" size={18} />
              <span className="hidden sm:inline">Развитие</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-2">
              <Icon name="Heart" size={18} />
              <span className="hidden sm:inline">Здоровье</span>
            </TabsTrigger>
            <TabsTrigger value="coach" className="gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">ИИ-коуч</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-4 mt-6 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Мои задачи</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить задачу
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая задача</DialogTitle>
                    <DialogDescription>Создай задачу для своего развития</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Название</Label>
                      <Input 
                        placeholder="Например: Пробежать 5км"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Описание</Label>
                      <Textarea 
                        placeholder="Детали задачи..."
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {(['fitness', 'learning', 'health', 'finance'] as Category[]).map((cat) => (
                          <Button
                            key={cat}
                            variant={newTaskCategory === cat ? 'default' : 'outline'}
                            onClick={() => setNewTaskCategory(cat)}
                            className="gap-2"
                          >
                            <Icon name={getCategoryIcon(cat)} size={16} />
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button onClick={addTask} className="w-full">Создать задачу</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-3">
              {tasks.map((task) => (
                <Card 
                  key={task.id}
                  className={`transition-all duration-300 hover:shadow-lg ${
                    task.completed ? 'border-primary border-2' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                          task.completed 
                            ? 'bg-primary text-primary-foreground animate-celebrate' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {task.completed ? (
                          <Icon name="Check" size={20} />
                        ) : (
                          <Icon name={getCategoryIcon(task.category)} size={20} />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <Badge variant="outline" className={`${getCategoryColor(task.category)} text-white border-0 mt-2`}>
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Ежедневные привычки</h2>
              <div className="grid gap-3">
                {habits.map((habit) => (
                  <Card 
                    key={habit.id}
                    className={`transition-all duration-300 hover:shadow-lg ${
                      habit.completed ? 'border-primary border-2' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            habit.completed 
                              ? 'bg-primary text-primary-foreground animate-celebrate' 
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {habit.completed ? (
                            <Icon name="Check" size={24} />
                          ) : (
                            <Icon name={getCategoryIcon(habit.category)} size={24} />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <h3 className={`font-semibold ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {habit.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`${getCategoryColor(habit.category)} text-white border-0`}>
                              {habit.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              🔥 {habit.streak} дней
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="mt-6 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Финансовый путь</CardTitle>
                        <CardDescription>Твой прогресс за месяц</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Icon name="Calculator" size={18} />
                            Рассчитать доход
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Калькулятор дохода</DialogTitle>
                            <DialogDescription>Управляй своими финансами</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="income">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="income">Доходы</TabsTrigger>
                              <TabsTrigger value="expenses">Расходы</TabsTrigger>
                            </TabsList>
                            <TabsContent value="income" className="space-y-4">
                              <div className="space-y-3">
                                {incomes.map((income) => (
                                  <div key={income.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                    <span className="font-medium">{income.source}</span>
                                    <span className="text-lg font-bold text-green-600">+{income.amount.toLocaleString('ru')} ₽</span>
                                  </div>
                                ))}
                              </div>
                              <div className="space-y-2 pt-4 border-t">
                                <Label>Добавить источник дохода</Label>
                                <Input placeholder="Название источника" id="income-source" />
                                <Input placeholder="Сумма" type="number" id="income-amount" />
                                <Button 
                                  onClick={() => {
                                    const source = (document.getElementById('income-source') as HTMLInputElement).value;
                                    const amount = parseFloat((document.getElementById('income-amount') as HTMLInputElement).value);
                                    if (source && amount) {
                                      addIncome(source, amount);
                                      (document.getElementById('income-source') as HTMLInputElement).value = '';
                                      (document.getElementById('income-amount') as HTMLInputElement).value = '';
                                    }
                                  }}
                                  className="w-full"
                                >
                                  <Icon name="Plus" size={16} className="mr-2" />
                                  Добавить
                                </Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="expenses" className="space-y-4">
                              <div className="space-y-3">
                                {expenses.filter(e => e.isRecurring).map((expense) => (
                                  <div key={expense.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                    <div>
                                      <span className="font-medium">{expense.name}</span>
                                      <Badge variant="outline" className="ml-2 text-xs">Ежемесячно</Badge>
                                    </div>
                                    <span className="text-lg font-bold text-red-600">-{expense.amount.toLocaleString('ru')} ₽</span>
                                  </div>
                                ))}
                              </div>
                              <div className="space-y-2 pt-4 border-t">
                                <Label>Добавить постоянный расход</Label>
                                <Input placeholder="Название (аренда, коммуналка...)" id="expense-name" />
                                <Input placeholder="Сумма" type="number" id="expense-amount" />
                                <Button 
                                  onClick={() => {
                                    const name = (document.getElementById('expense-name') as HTMLInputElement).value;
                                    const amount = parseFloat((document.getElementById('expense-amount') as HTMLInputElement).value);
                                    if (name && amount) {
                                      addRecurringExpense(name, amount);
                                      (document.getElementById('expense-name') as HTMLInputElement).value = '';
                                      (document.getElementById('expense-amount') as HTMLInputElement).value = '';
                                    }
                                  }}
                                  className="w-full"
                                >
                                  <Icon name="Plus" size={16} className="mr-2" />
                                  Добавить
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Доход</div>
                        <div className="text-2xl font-bold text-green-600">+{totalIncome.toLocaleString('ru')} ₽</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Расходы</div>
                        <div className="text-2xl font-bold text-red-600">-{(totalRecurringExpenses + totalDailyExpenses).toLocaleString('ru')} ₽</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Профит</div>
                        <div className={`text-2xl font-bold ${monthlyProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          {monthlyProfit >= 0 ? '+' : ''}{monthlyProfit.toLocaleString('ru')} ₽
                        </div>
                      </div>
                    </div>

                    <div className="relative pt-8">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="text-sm">Начало месяца</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-accent"></div>
                          <span className="text-sm">Конец месяца</span>
                        </div>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>1 число</span>
                        <span className="font-medium text-foreground">День 18</span>
                        <span>30 число</span>
                      </div>
                    </div>

                    <Card className="bg-muted/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Ежедневные траты</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Описание траты"
                            value={dailyExpense}
                            onChange={(e) => setDailyExpense(e.target.value)}
                          />
                          <Input 
                            placeholder="Сумма"
                            type="number"
                            value={dailyExpenseAmount}
                            onChange={(e) => setDailyExpenseAmount(e.target.value)}
                            className="w-32"
                          />
                          <Button onClick={addDailyExpense} size="icon">
                            <Icon name="Plus" size={18} />
                          </Button>
                        </div>
                        <ScrollArea className="h-48">
                          <div className="space-y-2">
                            {expenses.filter(e => !e.isRecurring).map((expense) => (
                              <div key={expense.id} className="flex justify-between items-center p-2 bg-background rounded">
                                <span className="text-sm">{expense.name}</span>
                                <span className="font-medium text-red-600">-{expense.amount} ₽</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Итого за день:</span>
                            <span className="text-lg font-bold text-red-600">-{totalDailyExpenses.toLocaleString('ru')} ₽</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Сбережения</CardTitle>
                    <CardDescription>Цель на месяц</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-48 h-48 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="currentColor"
                          strokeWidth="16"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="currentColor"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 80}`}
                          strokeDashoffset={`${2 * Math.PI * 80 * (1 - savingsPercent / 100)}`}
                          className="text-accent transition-all duration-500"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold">{Math.round(savingsPercent)}%</div>
                        <div className="text-sm text-muted-foreground">выполнено</div>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Накоплено:</span>
                        <span className="font-bold text-lg">{currentSavings.toLocaleString('ru')} ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Цель:</span>
                        <span className="font-medium">{savingsGoal.toLocaleString('ru')} ₽</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Осталось:</span>
                        <span className="font-bold text-primary">{(savingsGoal - currentSavings).toLocaleString('ru')} ₽</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label>Обновить сбережения</Label>
                      <Input 
                        type="number" 
                        placeholder="Новая сумма"
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value) setCurrentSavings(value);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="development" className="mt-6 animate-slide-up">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Мои задачи на развитие</CardTitle>
                  <CardDescription>Обучение и личностный рост</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {tasks.filter(t => t.category === 'learning').map((task) => (
                      <Card key={task.id} className="hover-scale">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                                task.completed 
                                  ? 'bg-learning text-white' 
                                  : 'bg-muted'
                              }`}
                            >
                              {task.completed ? <Icon name="Check" size={20} /> : <Icon name="GraduationCap" size={20} />}
                            </button>
                            <div className="flex-1">
                              <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Рекомендованные курсы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {['Цифровой маркетинг', 'Тайм-менеджмент', 'Публичные выступления'].map((course, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-learning flex items-center justify-center text-white">
                            <Icon name="BookOpen" size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{course}</h4>
                            <p className="text-sm text-muted-foreground">15 модулей • 2 часа</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Начать</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="mt-6 animate-slide-up">
            <Tabs defaultValue="tracker" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tracker">Трекер</TabsTrigger>
                <TabsTrigger value="workouts">Тренировки</TabsTrigger>
                <TabsTrigger value="goals">Цели</TabsTrigger>
                <TabsTrigger value="custom">Свой план</TabsTrigger>
              </TabsList>

              <TabsContent value="tracker" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Трекер здоровья</CardTitle>
                        <CardDescription>Отслеживай показатели каждый день</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Icon name="Plus" size={18} />
                            Добавить данные
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Сегодняшние показатели</DialogTitle>
                            <DialogDescription>Заполни данные за день</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Вес (кг)</Label>
                                <Input
                                  type="number"
                                  placeholder="72.5"
                                  value={todayWeight}
                                  onChange={(e) => setTodayWeight(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Шаги</Label>
                                <Input
                                  type="number"
                                  placeholder="10000"
                                  value={todaySteps}
                                  onChange={(e) => setTodaySteps(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Сон (часы)</Label>
                                <Input
                                  type="number"
                                  step="0.5"
                                  placeholder="7.5"
                                  value={todaySleep}
                                  onChange={(e) => setTodaySleep(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Вода (литры)</Label>
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="2.0"
                                  value={todayWater}
                                  onChange={(e) => setTodayWater(e.target.value)}
                                />
                              </div>
                            </div>
                            <Button onClick={addHealthMetric} className="w-full">
                              Сохранить
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <Icon name="Scale" size={24} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Вес</div>
                              <div className="text-2xl font-bold">{healthMetrics[0]?.weight || '-'} кг</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                              <Icon name="Footprints" size={24} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Шаги</div>
                              <div className="text-2xl font-bold">{healthMetrics[0]?.steps?.toLocaleString('ru') || '-'}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                              <Icon name="Moon" size={24} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Сон</div>
                              <div className="text-2xl font-bold">{healthMetrics[0]?.sleep || '-'} ч</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-cyan-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                              <Icon name="Droplet" size={24} />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Вода</div>
                              <div className="text-2xl font-bold">{healthMetrics[0]?.water || '-'} л</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">История показателей</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <div className="space-y-3">
                            {healthMetrics.map((metric) => (
                              <div key={metric.date} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="text-sm font-medium">{new Date(metric.date).toLocaleDateString('ru')}</div>
                                </div>
                                <div className="flex gap-4 text-sm">
                                  {metric.weight && <span>⚖️ {metric.weight}кг</span>}
                                  {metric.steps && <span>👣 {metric.steps.toLocaleString('ru')}</span>}
                                  {metric.sleep && <span>😴 {metric.sleep}ч</span>}
                                  {metric.water && <span>💧 {metric.water}л</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Готовые планы тренировок</CardTitle>
                    <CardDescription>Выбери подходящую программу для дома</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {workoutPlans.map((plan) => (
                        <Card key={plan.id} className="hover-scale">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                              <div className="w-14 h-14 rounded-xl bg-fitness flex items-center justify-center text-white flex-shrink-0">
                                {plan.isCustom ? <Icon name="Star" size={28} /> : <Icon name="Dumbbell" size={28} />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <h3 className="font-bold text-lg">{plan.title}</h3>
                                    {plan.isCustom && (
                                      <Badge variant="outline" className="mt-1">Мой план</Badge>
                                    )}
                                  </div>
                                  <Badge variant="secondary" className="flex-shrink-0">
                                    <Icon name="Clock" size={12} className="mr-1" />
                                    {plan.duration}
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  {plan.exercises.map((exercise, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                      <Icon name="CheckCircle2" size={16} className="text-fitness flex-shrink-0" />
                                      <span>{exercise}</span>
                                    </div>
                                  ))}
                                </div>
                                <Button className="mt-4 w-full bg-fitness hover:bg-fitness/90">
                                  Начать тренировку
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Цели по тренировкам</CardTitle>
                    <CardDescription>Отслеживай прогресс к целям</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workoutGoals.map((goal) => {
                        const percent = Math.min((goal.current / goal.target) * 100, 100);
                        return (
                          <Card key={goal.id} className="bg-muted/30">
                            <CardContent className="p-5">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-lg">{goal.title}</h4>
                                  <Badge className="bg-fitness">
                                    {goal.current} / {goal.target} {goal.unit}
                                  </Badge>
                                </div>
                                <Progress value={percent} className="h-3" />
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">{Math.round(percent)}% выполнено</span>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.current - 1))}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateGoalProgress(goal.id, Math.min(goal.target, goal.current + 1))}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Создать свой план тренировок</CardTitle>
                    <CardDescription>Составь персональную программу</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Название плана</Label>
                          <Input
                            placeholder="Например: Моя утренняя зарядка"
                            value={customWorkoutTitle}
                            onChange={(e) => setCustomWorkoutTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Длительность</Label>
                          <Input
                            placeholder="30 мин"
                            value={customWorkoutDuration}
                            onChange={(e) => setCustomWorkoutDuration(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <Label className="text-base font-semibold">Упражнения</Label>
                        <div className="grid md:grid-cols-3 gap-3">
                          <Input
                            placeholder="Название упражнения"
                            value={newExerciseName}
                            onChange={(e) => setNewExerciseName(e.target.value)}
                          />
                          <Input
                            placeholder="Подходы (3)"
                            value={newExerciseSets}
                            onChange={(e) => setNewExerciseSets(e.target.value)}
                          />
                          <Input
                            placeholder="Повторы (15)"
                            value={newExerciseReps}
                            onChange={(e) => setNewExerciseReps(e.target.value)}
                          />
                        </div>
                        <Button onClick={addExerciseToCustomPlan} variant="outline" className="w-full">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить упражнение
                        </Button>

                        {customExercises.length > 0 && (
                          <div className="space-y-2 pt-3 border-t">
                            {customExercises.map((exercise) => (
                              <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                  <Icon name="Dumbbell" size={16} className="text-fitness" />
                                  <span className="font-medium">{exercise.name}</span>
                                  {exercise.sets && exercise.reps && (
                                    <Badge variant="outline" className="text-xs">
                                      {exercise.sets}x{exercise.reps}
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeExercise(exercise.id)}
                                >
                                  <Icon name="X" size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={createCustomWorkout}
                        disabled={!customWorkoutTitle || customExercises.length === 0}
                        className="w-full bg-gradient-to-r from-fitness to-health"
                      >
                        <Icon name="Save" size={18} className="mr-2" />
                        Создать план тренировок
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="coach" className="mt-6 animate-slide-up">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      🤖
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>ИИ-коуч</CardTitle>
                    <CardDescription>Всегда готов помочь</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4 p-4">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 ${
                            msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="Спроси совет у коуча..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="flex-shrink-0">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;