let SHARED_OBJECT = null;
export default {
  attach: (object, func) => { SHARED_OBJECT = { object, func }; },
  apply: (...args) => {
    /*
    console.log(`shareobj set object = ${SHARED_OBJECT.object}`);
    console.log(`shareobj set func = ${SHARED_OBJECT.func}`);
    console.log(`shareobj set args = ${args}`);
    */
    if (SHARED_OBJECT && SHARED_OBJECT.object && SHARED_OBJECT.func) {
      Reflect.apply(SHARED_OBJECT.func, SHARED_OBJECT.object, args);
    }
  },
  dettach: () => { SHARED_OBJECT = null; },
};
