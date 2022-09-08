import { Injectable } from '@angular/core';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  sendEvent(action: string, value: string = "") {
    try {
        if (typeof window.umami != 'undefined') {
            window.umami.trackEvent(`${value}`, action)
        }
    } catch (e) {
        console.error(e);
    }
  }
}
