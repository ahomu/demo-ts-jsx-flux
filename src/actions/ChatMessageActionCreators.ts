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

import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
import ChatMessageUtils from '../utils/ChatMessageUtils';

let ActionTypes = ChatConstants.ActionTypes;

export default {

  createMessage: function(text, currentThreadID) {
    ChatAppDispatcher.dispatch({
      type            : ActionTypes.CREATE_MESSAGE,
      text            : text,
      currentThreadID : currentThreadID
    });
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
    ChatWebAPIUtils.createMessage(message);
  }

};
