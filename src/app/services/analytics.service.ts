import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  sendEvent(action: string, value: string = "") {
    (<any>window).ga('send', 'event', {
      eventCategory: 'wishlist',
      eventLabel: 'actionOccurred',
      eventAction: action,
      eventValue: value
    });
  }
}
