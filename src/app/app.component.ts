import { Component } from '@angular/core';

export interface TabItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tabs: TabItem[] = [
    {
      label: 'Training',
      route: '/',
    },
    {
      label: 'Food',
      route: 'two',
    },
    {
      label: 'Friends',
      route: 'three',
    },
  ];
  
  public isActiveTab(tabRoute: string): boolean {
    return tabRoute === window.location.pathname;
  }
}
