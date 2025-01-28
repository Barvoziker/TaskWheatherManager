export interface Task {
  id: number;
  name: string;
  description?: string;
  dueDate?: Date;
  priority?: 'High' | 'Medium' | 'Low';
  location?: string;
  validated: boolean;
}
