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

  constructor(private spacexService: SpacexapiService) {}

  ngOnInit(): void {
    this.spacexService.getMissions().subscribe((data: any) => {
      console.log(data);
      this.missions = data;
    });
  }
}
