import { AwaitControlInitializer } from './types';

export default class AwaitControl {
  private static control: AwaitControl;

  public keyReducer: string = 'rrAwaitControl';

  public static init(config?: AwaitControlInitializer): AwaitControl {
    if (!AwaitControl.control) {
      AwaitControl.control = new AwaitControl();
    }

    if (config?.keyReducer) {
      AwaitControl.control.keyReducer = config.keyReducer;
    }

    return AwaitControl.control;
  }

  public static getControl(): AwaitControl {
    if (!AwaitControl.control) {
      throw new Error('AwaitControl was not initialized.');
    }

    return AwaitControl.control;
  }

  private constructor() {}
}
