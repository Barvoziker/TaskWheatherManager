import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import { TaskServices } from '../../services/task.services';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private taskService: TaskServices
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.dismiss(true);
    }
  }

  dismiss(taskAdded: boolean = false): void {
    this.modalController.dismiss(taskAdded);
  }
}
