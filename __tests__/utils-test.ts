import { camelCase } from '../dist/utils';

describe('Testing utilities', () => {
  it('validation for camelCase function ', () => {
    expect(camelCase('TEST_CASE')).toEqual('testCase');
    expect(camelCase('test__case')).toEqual('testCase');
    expect(camelCase('test_case')).toEqual('testCase');
    expect(camelCase('test_case_1')).toEqual('testCase1');
    expect(camelCase('test case')).toEqual('testCase');
    expect(camelCase('test case 1')).toEqual('testCase1');
    expect(camelCase('_test_case_')).toEqual('testCase');
    expect(camelCase('_Test_Case_')).toEqual('testCase');
  });
});
