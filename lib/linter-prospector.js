'use babel';

import LinterProspectorView from './linter-prospector-view';
import { CompositeDisposable } from 'atom';

export default {

  linterProspectorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linterProspectorView = new LinterProspectorView(state.linterProspectorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linterProspectorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'linter-prospector:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linterProspectorView.destroy();
  },

  serialize() {
    return {
      linterProspectorViewState: this.linterProspectorView.serialize()
    };
  },

  toggle() {
    console.log('LinterProspector was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
