import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Mission } from "../models/mission";

@Injectable({
  providedIn: "root",
})
export class SpacexapiService {
  private REST_API_SERVER = "https://api.spacexdata.com/v3/launches";

  constructor(private httpClient: HttpClient) {}

  public getMissions(): Observable<Mission[]> {
    return this.httpClient
      .get<Mission[]>(this.REST_API_SERVER)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An error occurred while fetching SpaceX mission data.";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
