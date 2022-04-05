import { Component } from '@angular/core';

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
}
