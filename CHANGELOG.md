# react-redux-await-control

## 0.15.3

### Patch Changes

- 49a94b4: Fixing error on getData(AsyncActionControl) with initialValue defined.

## 0.15.2

### Patch Changes

- a0458f4: Adding baseContext for AwaitControl instance

## 0.15.1

### Patch Changes

- 42c7458: Taking "get" function to utils file

## 0.15.0

### Minor Changes

- fa5b88f: [BREAKCHANGES] Putting context inside options on creating action.

## 0.14.0

### Minor Changes

- 1bd8823: It`s added getContext. This method on action allows save function, string and others thing that you like to save on action. This feature can allow you to reuse more code. =D

## 0.13.0

### Minor Changes

- 773c95d: Changing behavior of result on restarted actions

## 0.12.5

### Patch Changes

- bb90dcd: Fixing types for useAwaitControl hook

## 0.12.4

### Patch Changes

- 6638506: Adding possibility to set initial value in async action

## 0.12.3

### Patch Changes

- 75a614b: Adding possibility to change final status

## 0.12.2

### Patch Changes

- 227a0c6: [Config] Fix error on extractAction

## 0.12.1

### Patch Changes

- f3cd442: New test validations for start state action

## 0.12.0

### Minor Changes

- da22762: Supporting to parse store object

## 0.11.1

### Patch Changes

- 3e3d398: [HotFix] Fixing saved data on start!

## 0.11.0

### Minor Changes

- c985107: It`s added the possibility to create multi controls on hook useAwaitControl.
- 81fcf6e: [BREAKING CHANGES] It was altered the name of the method that verify if the action was cancelled. isCancelled -> wasCancelled

### Patch Changes

- 86680da: Exposing the types!

## 0.10.1

### Patch Changes

- 20c8a83: Adding toString to actions =D

## 0.10.0

### Minor Changes

- afbc570: Adding automatic save result in state as optional

### Patch Changes

- 796d892: Fixing dependencies
- e34a2d9: Removing dependencies
- e973501: Improving typings for useAwaitControl[Hook]
- f2e0c14: Adding redux-actions as dependency

## 0.9.1

### Patch Changes

- 22fc3d9: Fixing AsyncActionReducer type and one test for reducer

## 0.9.0

### Minor Changes

- b9683d7: It was added storing result data(failure and success) for async actions.

## 0.8.0

### Minor Changes

- f8e5e35: Adding funtionality to clear mapped action of the control reducer

## 0.7.5

### Patch Changes

- 1cce21e: Using BaseAction as pattern for Action return in the fuctions or methods.

## 0.7.4

### Patch Changes

- 83c54bd: Fix the exposition of types in project.

## 0.7.3

### Patch Changes

- 8309c5c: Fixing the exposition of the await control hook

## 0.7.2

### Patch Changes

- 55b7a59: Fix await control hook.

## 0.7.1

### Patch Changes

- 28a8875: Fix AwaitControl - Exposing mix method.

## 0.7.0

### Minor Changes

- It was added the initial documentation

## 0.6.0

### Minor Changes

- c0b8178: Mix method was added to help with reducers

### Patch Changes

- fe8101b: Mix method was fixed

## 0.5.0

### Minor Changes

- Adding hook with dipatchers and selectors

## 0.4.0

### Minor Changes

- 93e9a16: Suport for redux selectors

## 0.3.0

### Minor Changes

- Now it's possible to add a key for action, then it's possible controlling some actions of the same type

## 0.2.0

### Minor Changes

- 0e95440: Adding reducer for async action control
- 6e2122a: Fixing support for action prefix name for type

### Patch Changes

- e7c0285: Fixing yarn publishing

## 0.1.2

### Patch Changes

- 35c274e: Fixing changeset config

## 0.1.1

### Patch Changes

- 3dbf675: Installing and setting up CI/CD
- 73f07d0: Fixing changeset config
