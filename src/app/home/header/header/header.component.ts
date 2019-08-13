import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../../core/user.service';
import { OptionalValuesService } from '../../../services/optional-values.service';
import { ApiService } from '../../../service/api/api.service';
import { RollserviceService } from '../../../services/rollservice.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options: any = [];
  showprofilebtn: boolean = true;
  public userName: string = '';
  public agency: string = '';
  public index: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private optionalService: OptionalValuesService,
    private apiService: ApiService,
    private rollserviceService: RollserviceService,
  ) {
    this.index = this.userName.indexOf('@');
    this.userName = this.userName.substring(0, this.index).toUpperCase();
    if (this.userName == undefined) {
      this.router.navigate([''], { skipLocationChange: true });
    }
  }
  switchprofile() {
    this.router.navigateByUrl('/user', { skipLocationChange: true });
  }
  ngOnInit() {
    this.userName = this.userService.getDetailFromStorage().USR_NM;
    this.agency = this.userService.getDetailFromStorage().SRC_CD;
    //this.options=this.StorageSessionService.getLocalS("profileopt");
    if (this.options) this.options.length == 0 ? this.showprofilebtn = false : this.showprofilebtn = true;

  }

  logout() {
    this.apiService.logout('LOGOUT');
    this.optionalService.applicationOptionalValue.next(null);
    this.optionalService.processOptionalValue.next(null);
    this.optionalService.serviceOptionalValue.next(null);
    this.optionalService.applicationProcessValue.next(null);
    this.optionalService.applicationArray = [];
    this.optionalService.serviceArray = [];
    this.optionalService.processArray = [];
    this.optionalService.applicationProcessArray = [];
    this.userService.clear();
    this.rollserviceService.clear();
    this.router.navigateByUrl('/login', { skipLocationChange: true });
  }

}
