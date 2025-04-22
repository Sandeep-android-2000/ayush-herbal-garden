export interface Tour {
  id: number;
  title: string;
  description: string;
  plantIds: number[];
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}