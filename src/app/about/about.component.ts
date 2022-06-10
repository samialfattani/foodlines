import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

  constructor(private router:Router) { }

	goBackHome(){
		this.router.navigate(['/']);
	}

	getText(): String{
				return 'Hello I am here';
	}

  ngOnInit() {
  }

}
