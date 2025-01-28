import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskServices {
  private storageKey = 'tasks';

  // Récupérer toutes les tâches
  getTasks(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Ajouter une nouvelle tâche
  addTask(task: any): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  // Sauvegarder les tâches dans le localStorage
  private saveTasks(tasks: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
