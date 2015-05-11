/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/common/object-assign.d.ts" />

import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import * as Events from 'events';
import MessageStore from '../stores/MessageStore';
import ThreadStore from '../stores/ThreadStore';
import * as assign from 'object-assign';

let EventEmitter = Events.EventEmitter;
let ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'change';

declare class UnreadThreadStore extends Events.EventEmitter {
  dispatchToken: string;
  emitChange(): void;
}

let unreadThreadStore: UnreadThreadStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback: string) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback: Function) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCount: function() {
    var threads = ThreadStore.getAll();
    var unreadCount = 0;
    for (var id in threads) {
      if (!threads[id].lastMessage.isRead) {
        unreadCount++;
      }
    }
    return unreadCount;
  }

});

unreadThreadStore.dispatchToken = ChatAppDispatcher.register(function(action: any) {
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
    MessageStore.dispatchToken
  ]);

  switch (action.type) {

    case ActionTypes.CLICK_THREAD:
      unreadThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      unreadThreadStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default unreadThreadStore;
