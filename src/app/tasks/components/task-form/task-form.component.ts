import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { Geolocation } from '@capacitor/geolocation';
import {NgIf} from "@angular/common";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private taskService: TaskService,
    private platform: Platform
    ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      location: [''],
      categories: [[]]
    });
  }

  async getCurrentLocation() {
    if (this.platform.is('hybrid')) {
      // Appareil mobile
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        this.taskForm.patchValue({
          location: `Lat: ${latitude}, Lon: ${longitude}`
        });
      } catch (error) {
        console.error('Erreur lors de la récupération de la position sur mobile :', error);
      }
    } else if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      // Navigateur web
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.taskForm.patchValue({
              location: `Lat: ${latitude}, Lon: ${longitude}`
            });
          },
          (error) => {
            console.error('Erreur lors de la récupération de la position sur le navigateur :', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
      }
    }
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
