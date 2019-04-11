import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/user-admin/user/user.effects';
import { UserGroupEffects } from 'src/app/store/user-admin/user-group/usergroup.effects';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserRoleEffects } from 'src/app/store/user-admin/user-role/userrole.effects';
import { UserMembershipEffects } from 'src/app/store/user-admin/user-membership/usermembership.effects';

@NgModule({
  declarations: [UserComponent, ProfileComponent],
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    EffectsModule.forFeature([UserEffects, UserGroupEffects, UserRoleEffects, UserMembershipEffects]),
  ]
})
export class UserModule { }
