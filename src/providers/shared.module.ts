import { NgModule } from '@angular/core';

import { AuthProvider } from './auth.service';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { AccountService } from './account.service';

@NgModule({
  providers: [
    AuthProvider,
    ApiService,
    ConfigService,
    UserService,
    ProductService,
    AccountService
  ]
})
export class SharedModule {}