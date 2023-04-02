import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/shared/models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authType: String = '';
  title: String = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;
  errors: Errors = new Errors();
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authServie:AuthService,
    private router:Router
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }
  submitForm() {
    this.isSubmitting = true;

    let credentials = this.authForm.value;
    // check out what you get!

    this.authServie.attemptAuth(this.authType, credentials).subscribe(
      rspt =>{
        this.router.navigateByUrl('/');
      }
      ,
      err =>{
        console.log("error");
        this.isSubmitting = false;
      }
    )
    console.log(credentials);
  }
}
