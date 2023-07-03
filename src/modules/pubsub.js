const pubSub = (() => {
  const events = {};

  const getEvents = () => events;

  const subscribe = (event, callback) => {
    console.log("subbing");
    let index;

    if (!events.hasOwnProperty(event)) {
      events[event] = [];
    }

    index = events[event].push(callback) - 1;

    return {
      unsubscribe() {
        events[event].splice(index, 1);
      },
    };
  };

  const publish = (event, data = {}) => {
    console.log("pubbing");
    if (!events.hasOwnProperty(event)) {
      return [];
    }

    return events[event].map((callback) => callback(data));
  };

  return { getEvents, subscribe, publish };
})();

export default pubSub;
