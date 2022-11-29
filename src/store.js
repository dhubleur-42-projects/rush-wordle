import { createStore } from 'vuex'
import axios from 'axios'
import config from '../app.config'

axios.defaults.baseURL = config.API_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const userCode = generateUniqueCode();

function generateUniqueCode() {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";
	for (let i = 0; i < 10; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

const store = createStore({
  state () {
      return {
        infoStatus: '',
        infoType: 0,
        response: [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']],
        lastTest: true,
        currentRow: 0,
        words: ['','','','','',''],
        keyboardLine: [
          [{key: 'Q', type: 'N'}, {key: 'W', type: 'N'}, {key: 'E', type: 'N'}, {key: 'R', type: 'N'}, {key: 'T', type: 'N'}, {key: 'Y', type: 'N'}, {key: 'U', type: 'N'}, {key: 'I', type: 'N'}, {key: 'O', type: 'N'}, {key: 'P', type: 'N'}],
          [{key: 'A', type: 'N'}, {key: 'S', type: 'N'}, {key: 'D', type: 'N'}, {key: 'F', type: 'N'}, {key: 'G', type: 'N'}, {key: 'H', type: 'N'}, {key: 'J', type: 'N'}, {key: 'K', type: 'N'}, {key: 'L', type: 'N'}],
          [{key: 'Z', type: 'N'}, {key: 'X', type: 'N'}, {key: 'C', type: 'N'}, {key: 'V', type: 'N'}, {key: 'B', type: 'N'}, {key: 'N', type: 'N'}, {key: 'M', type: 'N'}]
        ]
      }
    },
  mutations: {
      updateStatus(state, payload) {
          state.infoStatus = payload.status;
          state.infoType = payload.type;
      },
      updateResult(state, payload) {
        state.response[payload.id] = payload.result;
      },
      resetValues(state) {
        state.infoStatus = '';
        state.infoType = 0;
        state.response = [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']];
        state.lastTest = true;
        state.currentRow = 0;
        state.words = ['','','','','',''];
        state.keyboardLine = [
          [{key: 'Q', type: 'N'}, {key: 'W', type: 'N'}, {key: 'E', type: 'N'}, {key: 'R', type: 'N'}, {key: 'T', type: 'N'}, {key: 'Y', type: 'N'}, {key: 'U', type: 'N'}, {key: 'I', type: 'N'}, {key: 'O', type: 'N'}, {key: 'P', type: 'N'}],
          [{key: 'A', type: 'N'}, {key: 'S', type: 'N'}, {key: 'D', type: 'N'}, {key: 'F', type: 'N'}, {key: 'G', type: 'N'}, {key: 'H', type: 'N'}, {key: 'J', type: 'N'}, {key: 'K', type: 'N'}, {key: 'L', type: 'N'}],
          [{key: 'Z', type: 'N'}, {key: 'X', type: 'N'}, {key: 'C', type: 'N'}, {key: 'V', type: 'N'}, {key: 'B', type: 'N'}, {key: 'N', type: 'N'}, {key: 'M', type: 'N'}]
        ];
      },
      setLastTest(state, payload) {
        state.lastTest = payload;
      },
      setResponse(state, payload) {
        state.response[state.currentRow] = payload.split('');
        for(let i = 0; i < 5; i++)
        {
           const letter = state.words[state.currentRow][i];
           const color = state.response[state.currentRow][i];
           for(let line = 0; line < 3; line++)
           {
             for(let count = 0; count < 10; count++)
             {
               if(state.keyboardLine[line][count] != undefined && state.keyboardLine[line][count].key == letter)
               {
                  if(state.keyboardLine[line][count].type == 'N')
                    state.keyboardLine[line][count].type = color;
                  else if((state.keyboardLine[line][count].type == 'Y' || state.keyboardLine[line][count].type == 'B') && color == 'G')
                    state.keyboardLine[line][count].type = color;
               }
             }
           }
        }
      }
   },
  actions: {
    async checkWord(context) {
        await axios.get('/check/' + context.state.words[context.state.currentRow], {
          headers: {
            UserCode: userCode
          }
        })
        .then(response => {
            context.commit('setLastTest', response.data);
        })
        .catch(function (error) {
            console.log(error);
            context.commit("updateStatus", {status: "Cannot contact API: " + error.message, type: 1})
        })
        return context.state.lastTest;
    },
    async guessWord(context) {
        await axios.get('/guess/' + context.state.words[context.state.currentRow], {
          headers: {
            UserCode: userCode
          }
        })
        .then(response => {
          context.commit('setResponse', response.data);
        })
        .catch(function (error) {
            console.log(error);
            context.commit("updateStatus", {status: "Cannot contact API: " + error.message, type: 1})
        })
        let valid = true;
        for(let i = 0; i < 5; i++)
        {
            if(context.state.response[context.state.currentRow][i] != 'G')
            valid = false;
        }
        return valid;
    },
    async generateWord(context) {
        await axios.get('/generate', {
          headers: {
            UserCode: userCode
          }
        })
        .catch(error => {
          console.log(error);
            context.commit("updateStatus", {status: "Cannot contact API: " + error.message, type: 1})
        })
    },
    async resetGame(context) {
        context.commit('resetValues');
        context.dispatch('generateWord');
    }
  }
})

export default store;