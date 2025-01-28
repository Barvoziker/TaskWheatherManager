import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import { TaskServices } from '../../services/task.services';
import { TaskFormComponent } from '../task-form/task-form.component';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private modalController: ModalController,
    private taskService: TaskServices
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  async openTaskForm() {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
      handleBehavior: 'cycle'
    });

    await modal.present();

    const { data: taskAdded } = await modal.onDidDismiss();
    if (taskAdded) {
      this.loadTasks();
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
