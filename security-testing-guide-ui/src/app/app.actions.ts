import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AppActions {
  static readonly SAVE_PROJECT_SETTINGS = '[Settings] Save project settings';

  saveProjectSettings(): AppAction {
    return {
      type: AppActions.SAVE_PROJECT_SETTINGS
    };
  }

}

export interface AppAction<T = any> extends Action {
  payload?: T;
}
