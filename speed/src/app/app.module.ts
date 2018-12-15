import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { LaunchesListComponent } from './launches-list/launches-list.component';
import { FilterService } from './core/services/filter.service';
import { ApiService } from './core/services/api.service';
import { environment } from '../environments/environment.prod';
import { reducers, metaReducers } from './core/store/reducers';
import { LauncherEffects } from './core/store/reducers/launchers/launcher.effects';
import { AgenciesEffects } from './core/store/reducers/Agencies/agencies.effects';
import { StatesEffects } from './core/store/reducers/states/states.effects';
import { TypesEffects } from './core/store/reducers/types/types.effects';

@NgModule({
  declarations: [AppComponent, FilterListComponent, LaunchesListComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModuleMapLoaderModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([
      LauncherEffects,
      AgenciesEffects,
      StatesEffects,
      TypesEffects
    ]),
    environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ApiService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
