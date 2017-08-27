# React Layout Plugin Listeners

```
yarn install react-layout-plugin-listeners
```

or

```
npm install react-layout-plugin-listeners
```

## Usage

This plugin uses [react-layout-plugin-refs](https://github.com/gregchamberlain/react-layout-plugin-refs). It must be passed as a plugin before the Listeners plugin.

```js
import React, { Component } from 'react';
import { Layout, LayoutState } from 'react-layout-core';
import RefsPlugin from 'react-layout-plugin-refs';
import createListenersPlugin from 'react-layout-plugin-listeners';

class MyComponent extends Component {

  constructor(prop) {
    super(props);
    this.ListenerPlugin = createListenerPlugin({
      click: this.onItemClicked
    });
    this.state = {
      layoutState: new LayoutState('div')
    };
  }

  onItemClicked = ({ e, key }) => {
    // Do something when an Item is clicked.
  }

  render() {
    return (
      <Layout
        layoutState={this.state.layoutState}
        plugins={[RefsPlugin, this.ListenerPlugin]}
      />
    );
  }
}

export default MyComponent;
```

The default export of this package is a factory function that will return the plugin when passed a `Object` handlers. This `Object` should be structures with `event` names as keys and handler functions as values.

## Handler functions
The handler functions passed to `createListenersPlugin` will be called with and `Object` containing `e`, the event, and `key`, the `ItemKey` of the `Item` that triggered the event.