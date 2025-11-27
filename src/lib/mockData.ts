// Mock data for BizTalk English Learning Platform

export interface User {
  id: string;
  email: string;
  name: string;
  level: string;
  isPro: boolean;
  streak: number;
  freezesAvailable: number;
  joinedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  topic: 'Science' | 'Social' | 'Soft Skills' | 'Business' | 'Culture';
  format: 'reading' | 'audio' | 'video';
  duration: number;
  progress: number;
  content: string;
  audioUrl?: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface VocabCard {
  id: string;
  word: string;
  translation: string;
  example: string;
  level: string;
  nextReview: string;
  repetitions: number;
  easeFactor: number;
}

export interface VocabDeck {
  id: string;
  name: string;
  topic: string;
  cards: VocabCard[];
  dueCount: number;
}

export const mockUser: User = {
  id: 'user-1',
  email: 'learner@biztalk.com',
  name: 'Alex Johnson',
  level: 'B2',
  isPro: false,
  streak: 7,
  freezesAvailable: 1,
  joinedAt: '2024-01-15',
};

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Climate Change and Global Impact',
    description: 'Explore the science behind climate change and its effects on our planet.',
    level: 'B2',
    topic: 'Science',
    format: 'reading',
    duration: 15,
    progress: 0,
    content: `Climate change represents one of the most pressing challenges facing humanity today. Scientists have observed significant increases in global temperatures over the past century, with the last decade being the warmest on record.

The primary driver of this warming trend is the emission of greenhouse gases, particularly carbon dioxide, from human activities. These gases trap heat in the atmosphere, creating what is known as the greenhouse effect.

The consequences of climate change are far-reaching and affect every ecosystem on Earth. Rising temperatures lead to melting ice caps, rising sea levels, and more frequent extreme weather events. Many species struggle to adapt to rapidly changing conditions, leading to biodiversity loss.

However, there is hope. Renewable energy technologies, improved efficiency, and global cooperation offer pathways to mitigate climate change. The transition to a sustainable future requires action at all levels - from individual choices to international policy.`,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is the primary driver of climate change mentioned in the text?',
        options: [
          'Natural temperature fluctuations',
          'Greenhouse gas emissions from human activities',
          'Solar radiation changes',
          'Volcanic activity',
        ],
        correctAnswer: 'Greenhouse gas emissions from human activities',
        explanation: 'The text states that "the primary driver of this warming trend is the emission of greenhouse gases, particularly carbon dioxide, from human activities."',
      },
      {
        id: 'q2',
        type: 'true-false',
        question: 'The last decade has been the warmest on record.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'The passage explicitly mentions that "the last decade being the warmest on record."',
      },
    ],
  },
  {
    id: 'lesson-2',
    title: 'Effective Communication in the Workplace',
    description: 'Learn strategies for clear and professional communication with colleagues.',
    level: 'B1',
    topic: 'Soft Skills',
    format: 'audio',
    duration: 12,
    progress: 45,
    content: `Effective communication is the cornerstone of a successful workplace. Whether you're presenting ideas in a meeting, writing an email, or having a one-on-one conversation, how you communicate can significantly impact your professional relationships and career advancement.

Active listening is perhaps the most underrated communication skill. It involves fully concentrating on what others are saying rather than just waiting for your turn to speak. By demonstrating genuine interest and understanding, you build trust and rapport with colleagues.

Clear and concise expression is equally important. Avoid jargon when possible, structure your thoughts logically, and be mindful of your audience's perspective. In written communication, always proofread before sending, and in verbal communication, watch your tone and body language.

Remember that communication is a two-way street. Encourage feedback, be open to different viewpoints, and adapt your communication style to different situations and personalities.`,
    audioUrl: '/mock-audio.mp3',
    questions: [
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'According to the text, what is active listening?',
        options: [
          'Waiting for your turn to speak',
          'Fully concentrating on what others are saying',
          'Taking notes during conversations',
          'Speaking clearly and loudly',
        ],
        correctAnswer: 'Fully concentrating on what others are saying',
        explanation: 'The text defines active listening as "fully concentrating on what others are saying rather than just waiting for your turn to speak."',
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'The Digital Revolution',
    description: 'Understanding how technology has transformed modern society.',
    level: 'C1',
    topic: 'Culture',
    format: 'video',
    duration: 20,
    progress: 0,
    content: `The digital revolution has fundamentally altered every aspect of human existence, from how we communicate and work to how we learn and entertain ourselves. This transformation, which began in earnest in the late 20th century, continues to accelerate at an unprecedented pace.

At the heart of this revolution lies the exponential growth in computing power and connectivity. The internet has evolved from a military research project to a ubiquitous platform that connects billions of people worldwide. Social media platforms have created new forms of community and communication, while also raising concerns about privacy and misinformation.

Artificial intelligence and machine learning are ushering in yet another wave of change. These technologies promise to automate routine tasks, provide personalized experiences, and solve complex problems. However, they also present challenges related to employment, ethics, and control.

As we navigate this digital landscape, critical thinking and digital literacy become essential skills. Understanding both the opportunities and risks of technology empowers us to make informed decisions and shape a future that serves humanity's best interests.`,
    questions: [
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'What skills does the author emphasize as essential in the digital age?',
        options: [
          'Programming and coding',
          'Critical thinking and digital literacy',
          'Social media management',
          'Hardware maintenance',
        ],
        correctAnswer: 'Critical thinking and digital literacy',
        explanation: 'The passage concludes by stating that "critical thinking and digital literacy become essential skills" in navigating the digital landscape.',
      },
    ],
  },
];

export const mockVocabDecks: VocabDeck[] = [
  {
    id: 'deck-1',
    name: 'Business English Essentials',
    topic: 'Business',
    dueCount: 12,
    cards: [
      {
        id: 'card-1',
        word: 'synergy',
        translation: 'sự cộng hưởng / the interaction of elements that produce a greater effect together',
        example: 'The merger created synergy between the two companies.',
        level: 'B2',
        nextReview: '2024-03-20',
        repetitions: 3,
        easeFactor: 2.5,
      },
      {
        id: 'card-2',
        word: 'leverage',
        translation: 'tận dụng / to use something to maximum advantage',
        example: 'We need to leverage our existing resources more effectively.',
        level: 'C1',
        nextReview: '2024-03-19',
        repetitions: 2,
        easeFactor: 2.3,
      },
    ],
  },
  {
    id: 'deck-2',
    name: 'Academic Vocabulary',
    topic: 'Science',
    dueCount: 8,
    cards: [
      {
        id: 'card-3',
        word: 'empirical',
        translation: 'thực nghiệm / based on observation or experience',
        example: 'The theory is supported by empirical evidence.',
        level: 'C1',
        nextReview: '2024-03-21',
        repetitions: 4,
        easeFactor: 2.8,
      },
    ],
  },
];

export const mockProgress = {
  listening: 72,
  speaking: 65,
  reading: 78,
  writing: 68,
  weeklyGoal: 5,
  completedThisWeek: 3,
};

export const mockLeaderboard = [
  { rank: 1, name: 'Emma Chen', score: 2450, avatar: '👩' },
  { rank: 2, name: 'Marcus Silva', score: 2380, avatar: '👨' },
  { rank: 3, name: 'Alex Johnson', score: 2210, avatar: '🙋' },
  { rank: 4, name: 'Sofia Rodriguez', score: 2105, avatar: '👩‍🦰' },
  { rank: 5, name: 'James Park', score: 1998, avatar: '👨‍💼' },
];

export const mockBadges = [
  { id: 'streak-7', name: '7-Day Streak', icon: '🔥', earned: true },
  { id: 'vocab-100', name: '100 Words Mastered', icon: '📚', earned: true },
  { id: 'perfect-lesson', name: 'Perfect Score', icon: '⭐', earned: false },
  { id: 'early-bird', name: 'Early Bird', icon: '🌅', earned: true },
];
