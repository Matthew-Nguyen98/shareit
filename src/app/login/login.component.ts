import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // form: any = {
    //     username: null,
    //     password: null
    // };
    @ViewChild('username') username!: ElementRef;
    @ViewChild('password') password!: ElementRef;
    // password = '';
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private http: HttpClient) { }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit(): void {
        // const { username, password } = this.form;
        
//         this.authService.login(this.username, this.password).subscribe(
//             data => {
//                 this.tokenStorage.saveToken(data.accessToken);
//                 this.tokenStorage.saveUser(data);
// 
//                 this.isLoginFailed = false;
//                 this.isLoggedIn = true;
//                 this.roles = this.tokenStorage.getUser().roles;
//                 this.reloadPage();
//             },
//             err => {
//                 this.errorMessage = err.error.message;
//                 this.isLoginFailed = true;
//             }
//         );
    }

    register(): void {
        // const { username, password } = this.username, this.password;
        const username = this.username.nativeElement.value;
        const password = this.password.nativeElement.value;

        // TODO: POST request
        this.http.post<any>('/api/auth/register', { username, password }).subscribe(data => {
            // this.postId = data.id;
            console.log(data);
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}
