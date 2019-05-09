import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DbStoreService} from '../../shared/db-store.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelect = new EventEmitter<String>();

  constructor(private db: DbStoreService, public auth: AuthService) {}

  ngOnInit() {
  }

  onSave() {
    this.db.storeRcp()
      .subscribe((response) => {
        console.log(response);
      });
  }

  onFetch() {
    this.db.fetchRcp();
  }

  // loadRecipes() {
  //   this.db.fetchRcp();
  // }


}
