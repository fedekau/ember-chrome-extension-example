import Component from '@ember/component';

export default Component.extend({
  actions: {
    clear() {
      this.get('onClearClicked')();
    }
  }
});
