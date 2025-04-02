import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css',
})
export class MissiondetailsComponent {
  @Input() mission: Mission | null = null;
  @Input() isVisible: boolean = false;
  @Output() hide = new EventEmitter<void>();

  hideModal() {
    this.isVisible = false;
    this.hide.emit();
  }
}
