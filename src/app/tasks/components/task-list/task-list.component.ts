import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
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
  categories: string[] = ['Dépense', 'Loisir', 'Travail'];
  selectedCategories: string[] = [];

  constructor(
    private modalController: ModalController,
    private taskService: TaskService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
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
    const updatedTask = { ...task, validated: true };
    this.taskService.updateTask(updatedTask);
    this.loadTasks();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.filteredTasks = [...this.tasks];
  }

  filterTasks(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.applyFilters(searchTerm);
  }

  async openCategoryFilter() {
    const alert = await this.alertController.create({
      header: 'Filtrer par catégories',
      inputs: this.categories.map((category) => ({
        name: category,
        type: 'checkbox',
        label: category,
        value: category,
        checked: this.selectedCategories.includes(category),
      })),
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Appliquer',
          handler: (selected) => {
            this.selectedCategories = selected;
            this.applyFilters();
          },
        },
      ],
    });

    await alert.present();
  }

  applyFilters(searchTerm: string = ''): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        (task.categories &&
          task.categories.some((category) =>
            this.selectedCategories.includes(category)
          ));
      return matchesSearch && matchesCategory;
    });
  }

  reorderItems(event: any): void {
    const itemToMove = this.filteredTasks.splice(event.detail.from, 1)[0];
    this.filteredTasks.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }
}
