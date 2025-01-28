import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../../models/task.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [IonicModule, NgForOf, DatePipe, NgIf],
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(
    private modalController: ModalController,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks]; // Initialiser les tâches filtrées
  }

  async openTaskForm() {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
      handleBehavior: 'cycle',
    });

    await modal.present();

    const { data: taskAdded } = await modal.onDidDismiss();
    if (taskAdded) {
      this.loadTasks();
    }
  }

  markAsValidated(task: Task): void {
    task.validated = true;
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.filteredTasks = [...this.tasks]; // Mettre à jour les tâches filtrées
  }

  filterTasks(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredTasks = this.tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }
}
