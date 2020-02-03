import { Component } from '@angular/core';
import { devices } from 'src/data/dummy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  devices = devices;
  config = {
    columns: [
      { key: 'id', width: 100 },
      { key: 'location', width: 100 },
      { key: 'type', width: 100 },
      { key: 'device_health', width: 100 },
      { key: 'last_used', width: 100 },
      { key: 'price', width: 100 },
      { key: 'color', width: 100 },
    ]
  };
}
