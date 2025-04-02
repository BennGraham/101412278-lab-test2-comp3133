import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Mission } from "../models/mission";
import { SpacexapiService } from "../network/spacexapi.service";

@Component({
  selector: "app-missionlist",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./missionlist.component.html",
  styleUrls: ["./missionlist.component.css"],
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  loading = true;
  error: string | null = null;
  yearOptions = new Date().getFullYear() - 2005;

  years: number[] = Array.from(
    { length: this.yearOptions },
    (_, i) => 2005 + 1 + i,
  ).reverse();

  constructor(private spacexService: SpacexapiService) {}

  ngOnInit(): void {
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
}
