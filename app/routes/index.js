import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  readingList: service(),

  model() {
    return this.get('readingList').list();
  },

  actions: {
    clear() {
      this.get('readingList').clear().then(() => this.refresh());
    }
  }
});
