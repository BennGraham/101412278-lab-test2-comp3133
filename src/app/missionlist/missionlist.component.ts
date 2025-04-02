import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';
import { MissiondetailsComponent } from '../missiondetails/missiondetails.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MissiondetailsComponent,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  loading = true;
  error: string | null = null;
  yearOptions = new Date().getFullYear() - 2005;
  selectedMission: Mission | null = null;
  showDetails = false;
  numCols: number = 3;

  years: number[] = Array.from(
    { length: this.yearOptions },
    (_, i) => 2005 + 1 + i
  ).reverse();

  constructor(private spacexService: SpacexapiService) {}

  ngOnInit(): void {
    const width = window.innerWidth;
    if (width <= 600) {
      this.numCols = 2;
    } else if (width <= 960) {
      this.numCols = 3;
    } else if (width <= 1280) {
      this.numCols = 4;
    } else {
      this.numCols = 5;
    }
    this.loadMissions();
  }

  onYearChange(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.loading = true;
    this.error = null;
    this.loadMissions(year);
  }

  private loadMissions(year?: string): void {
    this.spacexService.getMissions(year).subscribe((data: any) => {
      console.log(data);
      this.missions = data;
    });
  }

  showMissionDetails(mission: Mission): void {
    this.selectedMission = mission;
    this.showDetails = true;
  }

  hideModal(): void {
    this.showDetails = false;
    this.selectedMission = null;
  }

  onResize(event: any) {
    const width = event.target.innerWidth;
    if (width <= 600) {
      this.numCols = 2;
    } else if (width <= 960) {
      this.numCols = 3;
    } else if (width <= 1280) {
      this.numCols = 4;
    } else {
      this.numCols = 5;
    }
  }
}
