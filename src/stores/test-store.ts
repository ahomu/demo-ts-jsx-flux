import {Component} from 'react';
import {TestDomain} from './test-domain';

/**
 * @class TestStore
 */
export class TestStore {
  /**
   * @returns {string}
   */
  hoge(foo: number, bar: string): string {
    console.log('I\'m TestStore');
    let domain: TestDomain = new TestDomain();
    return domain.hoge();
  }
}
