import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import hoist from 'hoist-non-react-statics';

const Wrapper = (listenerMap) => (WrappedComponent, displayName) => {

  class ListenerWrapper extends PureComponent {

    constructor(props) {
      super(props);
      this.listeners = {};
    }

    getListener = (name) => {
      if (!this.listeners[name]) {
        this.listeners[name] = (e) => {
          listenerMap[name]({ e, key: this.props['data-id'] })
        }
      }
      return this.listeners[name];
    }

    setNode = (node) => {
      if (node && this.node !== node) {
        this.node = node;
        this.unlisten(this.node);
        this.listen(node);
      }
    }

    listen = (node) => {
      if (node) {
        Object.keys(listenerMap).forEach((key) => {
          node.addEventListener(key, this.getListener(key))
        });
      }
    }
    
    unlisten = (node) => {
      if (node) {
        Object.keys(listenerMap).forEach((key) => {
          node.removeEventListener(key, this.getListener(key));
        });
      }
    }

    componentWillUnmount() {
      unlisten(this.node);
    }

    render() {
      const { pseudoRef, ...props } = this.props; 
      return (
        <WrappedComponent
          {...props}
          pseudoRef={(instance) => {
            this.setNode(findDOMNode(instance))
            if (typeof pseudoRef === 'function') pseudoRef(instance);
          }}
        />
      );
    }
  }

  hoist(ListenerWrapper, WrappedComponent);
  ListenerWrapper.displayName = `ListenerWrapper(${displayName})`;

  return ListenerWrapper
}

export default Wrapper