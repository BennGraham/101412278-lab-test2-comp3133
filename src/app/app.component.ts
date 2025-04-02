import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MissionListComponent } from "./missionlist/missionlist.component";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, MissionListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "101412278-lab-test2-comp3133";
}
