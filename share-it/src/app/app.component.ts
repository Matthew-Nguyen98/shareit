import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',

    //creates events title and across one date
    dateClick: this.handleDateClick.bind(this), // bind is important!
    
    events: [
      //creates an event range
      { title: 'event range ', start: '2021-02-27', end: '2021-03-03' },
      //creates an even over 1 day
      { title: 'event 2', date: '2021-02-28' }
    ]
  };

  //alerts the date clicked
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
  
  title: any;
}
