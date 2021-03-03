import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AppComponent } from './app.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    listPlugin,
    timeGridPlugin,
    interactionPlugin
])

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,

    ],
    imports: [
        BrowserModule,
        FullCalendarModule,  // import the FullCalendar module! will make the FullCalendar component available
        MatSliderModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})

export class AppModule { }

