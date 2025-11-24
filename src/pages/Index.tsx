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

type Category = 'fitness' | 'learning' | 'health' | 'finance';

interface Habit {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  streak: number;
}

interface Lesson {
  id: string;
  title: string;
  category: Category;
  duration: string;
  isPremium: boolean;
}

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', title: 'Утренняя разминка', category: 'fitness', completed: true, streak: 7 },
    { id: '2', title: '15 минут чтения', category: 'learning', completed: false, streak: 3 },
    { id: '3', title: 'Выпить 2л воды', category: 'health', completed: true, streak: 5 },
    { id: '4', title: 'Записать расходы', category: 'finance', completed: false, streak: 12 },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Привет! Я твой ИИ-коуч 🚀 Готов помочь с любыми вопросами по привычкам!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const lessons: Lesson[] = [
    { id: '1', title: 'Разминка для спины в офисе', category: 'fitness', duration: '12 мин', isPremium: false },
    { id: '2', title: 'Основы цифрового маркетинга', category: 'learning', duration: '15 мин', isPremium: false },
    { id: '3', title: 'Практика осознанности', category: 'health', duration: '10 мин', isPremium: true },
    { id: '4', title: 'Личный бюджет: первые шаги', category: 'finance', duration: '15 мин', isPremium: false },
    { id: '5', title: 'HIIT тренировка дома', category: 'fitness', duration: '20 мин', isPremium: true },
    { id: '6', title: 'Английский: практика диалогов', category: 'learning', duration: '15 мин', isPremium: true },
  ];

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
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
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="habits" className="gap-2">
              <Icon name="CheckCircle2" size={18} />
              <span className="hidden sm:inline">Привычки</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="lessons" className="gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Уроки</span>
            </TabsTrigger>
            <TabsTrigger value="coach" className="gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">ИИ-коуч</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-4 mt-6 animate-slide-up">
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
          </TabsContent>

          <TabsContent value="calendar" className="mt-6 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Календарь привычек</CardTitle>
                <CardDescription>Отслеживай свой прогресс</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['fitness', 'learning', 'health', 'finance'].map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${getCategoryColor(cat as Category)}`} />
                      <span className="text-sm capitalize">{cat}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-4 mt-6 animate-slide-up">
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Premium подписка</h3>
                    <p className="text-sm text-muted-foreground">Получи доступ ко всем урокам</p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Оформить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${getCategoryColor(lesson.category)} flex items-center justify-center text-white flex-shrink-0`}>
                        <Icon name={getCategoryIcon(lesson.category)} size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          {lesson.isPremium && (
                            <Badge variant="secondary" className="bg-accent text-accent-foreground flex-shrink-0">
                              <Icon name="Crown" size={12} className="mr-1" />
                              Pro
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {lesson.duration}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {lesson.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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