import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AppComponent } from './app.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'



FullCalendarModule.registerPlugins([
    dayGridPlugin,  
    listPlugin,
    timeGridPlugin,
    interactionPlugin
])

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FullCalendarModule,  // import the FullCalendar module! will make the FullCalendar component available
        MatSliderModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        BrowserAnimationsModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }

