let sharedComp = null;

export default class CompSharing {
  static setComp(comp) {
    sharedComp = comp;
  }

  static unsetComp() {
    sharedComp = null;
  }

  static execSharedFunc() {
    if (sharedComp && sharedComp.sharedFunc) {
      sharedComp.sharedFunc();
    }
  }
}
