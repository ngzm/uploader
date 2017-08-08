export default {
  getUtcDate: (utcstring) => {
    const loco = new Date(utcstring).getTime();
    const ofst = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(loco - ofst);
  },
};
