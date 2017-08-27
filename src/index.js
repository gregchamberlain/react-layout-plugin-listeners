import Wrapper from './Wrapper';

export default (listenerMap) => ({
  Name: 'Listeners',
  Wrapper: Wrapper(listenerMap)
});