import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  getTasks(): Task[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasks(tasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
