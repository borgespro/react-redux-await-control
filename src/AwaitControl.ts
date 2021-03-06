import { ReducersMapObject } from 'redux';

import reducer from './reducer';
import { AwaitControlInitializer, Context } from './types';

export default class AwaitControl {
  private static control: AwaitControl;

  public baseContext: Context;

  public keyReducer: string = 'rrAwaitControl';

  public extractState = (s: any) => (key: string) => s[key];

  public static init(config?: AwaitControlInitializer): AwaitControl {
    if (!AwaitControl.control) {
      AwaitControl.control = new AwaitControl();
    }

    if (config?.keyReducer) {
      AwaitControl.control.keyReducer = config.keyReducer;
    }

    if (config?.extractState) {
      AwaitControl.control.extractState = config.extractState;
    }

    AwaitControl.control.baseContext = config?.baseContext || {};

    return AwaitControl.control;
  }

  public static getControl(): AwaitControl {
    if (!AwaitControl.control) {
      throw new Error('AwaitControl was not initialized.');
    }

    return AwaitControl.control;
  }

  private constructor() {}

  public mix<S>(reducers: ReducersMapObject<S, any>): ReducersMapObject<S, any> {
    if (reducers[this.keyReducer]) {
      throw new Error(`keyReducer: ${this.keyReducer} is already in use.`);
    }

    return { ...reducers, [this.keyReducer]: reducer };
  }
}
