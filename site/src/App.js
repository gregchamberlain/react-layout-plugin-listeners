import React, { PureComponent } from 'react';
import createListenersPlugin from '../../src';
import Refs from 'react-layout-plugin-refs';
import { Layout, LayoutState } from 'react-layout-core'; 

const rVal = () => Math.floor(Math.random() * 255);

const createColor = () => `rgb(${rVal()}, ${rVal()}, ${rVal()})`;

const createStyle = () => ({
  padding: 15,
  margin: 5,
  backgroundColor: createColor()
});

const items = {
  root: { key: 'root', type: 'div', props: { style: createStyle() }, children: [{ key: 'a' }, { key: 'b' }] },
  a: { key: 'a', type: 'div', props: { style: createStyle() }, children: [], parent: 'root' },
  b: { key: 'b', type: 'div', props: { style: createStyle() }, children: [], parent: 'root' },
}

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.ListenerPlugin = createListenersPlugin({
      click: this.onClick
    });
    this.state = {
      layoutState: LayoutState.fromRaw(items)
    }
  }

  onClick = ({ e, key }) => {
    e.stopPropagation();
    console.log(key.toJS());
  }

  render() {
    return (
      <Layout
        layoutState={this.state.layoutState}
        plugins={[Refs, this.ListenerPlugin]}
      />
    );
  }
}

export default App;
