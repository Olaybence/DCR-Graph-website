import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  edit_id: string;


  constructor(private router: Router) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.edit_id = evt.url.split('/').pop();
       console.log("I got it in .ts!!! " + this.edit_id);
      }
    })
    }



  ngOnInit(): void {

  }



}
