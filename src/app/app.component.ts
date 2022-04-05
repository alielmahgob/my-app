import { Component } from '@angular/core';
import { environment } from "../environments/environment"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  selectedFeature: string = "recipe"

  onSelectFeature(event: string) {
    this.selectedFeature = event
  }

  getEnv(): string {
    return environment.API_URL
  }
}
