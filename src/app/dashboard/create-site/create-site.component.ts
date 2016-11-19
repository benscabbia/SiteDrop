import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit {

  createForm: FormGroup;
  name: string;
  description: string;
  url: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    console.log('Create Site Received');    
    this.initForm();
  }

  private initForm(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', []],      
    }
    );
  }

  onSubmit() {
    console.log(this.createForm);    
  }

}
