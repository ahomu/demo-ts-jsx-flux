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
import ChatMessageUtils from '../utils/ChatMessageUtils';
import * as Events from 'events';
import * as assign from 'object-assign';

let EventEmitter = Events.EventEmitter;
let ActionTypes = ChatConstants.ActionTypes;
const CHANGE_EVENT = 'change';

let _currentID: number = null;
let _threads = {};

declare class ThreadStore extends Events.EventEmitter {
  dispatchToken: string;
  emitChange(): void;
  getCurrentID(): number;
  init(rawMessages: Array<any>): void;
  getAll(): Array<any>;
}

let threadStore: ThreadStore = assign({}, EventEmitter.prototype, {

  init: function(rawMessages) {
    rawMessages.forEach(function(message) {
      var threadID = message.threadID;
      var thread = _threads[threadID];
      if (thread && thread.lastTimestamp > message.timestamp) {
        return;
      }
      _threads[threadID] = {
        id          : threadID,
        name        : message.threadName,
        lastMessage : ChatMessageUtils.convertRawMessage(message, _currentID)
      };
    }, this);

    if (!_currentID) {
      var allChrono = this.getAllChrono();
      _currentID = allChrono[allChrono.length - 1].id;
    }

    _threads[_currentID].lastMessage.isRead = true;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * @param {string} id
   */
  get: function(id) {
    return _threads[id];
  },

  getAll: function() {
    return _threads;
  },

  getAllChrono: function() {
    var orderedThreads = [];
    for (var id in _threads) {
      var thread = _threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }
      return 0;
    });
    return orderedThreads;
  },

  getCurrentID: function() {
    return _currentID;
  },

  getCurrent: function() {
    return this.get(this.getCurrentID());
  }

});

interface ActionEvent {
  type: string;
  threadID: number;
  rawMessages: Array<any>;
}

threadStore.dispatchToken = ChatAppDispatcher.register(function(action: ActionEvent) {

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      threadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      threadStore.init(action.rawMessages);
      threadStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default threadStore;
