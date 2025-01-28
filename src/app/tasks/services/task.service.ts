import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  getTasks(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addTask(task: any): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: any): void {
    const tasks = this.getTasks().map(task =>
      task.name === updatedTask.name ? updatedTask : task
    );
    this.saveTasks(tasks);
  }

  private saveTasks(tasks: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
