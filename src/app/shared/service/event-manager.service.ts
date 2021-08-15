import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, share, map } from 'rxjs/operators';
import {EventWithContent} from '..';

/**
 * An utility class to manage RX events
 */
@Injectable({
  providedIn: 'root'
})
export class EventManager {
  observable: Observable<EventWithContent<any> | string>;
  observer: Observer<EventWithContent<any> | string>;

  constructor() {
    this.observable = Observable.create((observer: Observer<EventWithContent<any> | string>) => {
      this.observer = observer;
    }).pipe(share());
  }

  /**
   * Method to broadcast the event to observer
   */
  broadcast(event: EventWithContent<any> | string): void {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  /**
   * Method to subscribe to an event with callback
   */
  subscribe(eventName: string, callback: any): Subscription {
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: EventWithContent<any> | string) => {
          if (typeof event === 'string') {
            return event === eventName;
          }
          return event.name === eventName;
        }),
        map((event: EventWithContent<any> | string) => {
          if (typeof event !== 'string') {
            // when releasing generator-jhipster v7 then current return will be changed to
            // (to avoid redundant code response.content in JhiEventManager.subscribe callbacks):
            // return event.content;
            return event;
          }
        })
      )
      .subscribe(callback);
    return subscriber;
  }

  /**
   * Method to unsubscribe the subscription
   */
  destroy(subscriber: Subscription): void {
    subscriber.unsubscribe();
  }
}
