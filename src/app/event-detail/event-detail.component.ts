import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../models/event';
import { Registration } from '../models/registration';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventId: string;
  event: EventModel;

  userName: string;
  userEmail: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['eventId'];
    this.http.get<EventModel>('http://localhost:8000/api/events/' + this.eventId).subscribe(response => {
      this.event = response;
    });
  }

  register() {
    if (this.userName && this.userEmail) {
      const body = {
        name: this.userName,
        email: this.userEmail
      };
      this.http.post<Registration>('http://localhost:8000/api/registrations/create/'
      + this.eventId, body ).subscribe(response => {
        this.event.registrations.push(response);
      });
    } else {
      alert('Enter your name and email to register.');
    }
  }

}
