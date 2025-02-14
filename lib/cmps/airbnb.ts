import { elementExists, elementVisible, waitForThenClick } from "../rule-executors";
import { RunContext } from "../rules";
import { waitFor } from "../utils";
import AutoConsentCMPBase from "./base";

export default class Airbnb extends AutoConsentCMPBase {
  constructor() {
    super("airbnb");
  }

  runContext: RunContext = {
    urlPattern: '^https://(www\\.)?airbnb\\.[^/]+/'
  }

  prehideSelectors = [
    "div[data-testid=main-cookies-banner-container]",
    "div:has(> div:first-child):has(> div:last-child):has(> section [data-testid=\"strictly-necessary-cookies\"])"
  ]

  get hasSelfTest(): boolean {
    return true;
  }

  get isIntermediate(): boolean {
    return false;
  }

  get isCosmetic(): boolean {
    return false;
  }

  async detectCmp() {
    return elementExists('div[data-testid=main-cookies-banner-container]');
  }

  async detectPopup() {
    return elementVisible('div[data-testid=main-cookies-banner-container', 'any');
  }

  async optOut() {
    await waitForThenClick('div[data-testid=main-cookies-banner-container] button._snbhip0');
    let check;
    // eslint-disable-next-line no-cond-assign
    while (check = document.querySelector('[data-testid=modal-container] button[aria-checked=true]:not([disabled])') as HTMLElement) { // each click may toggle multiple checkboxes
      check.click();
    }
    return waitForThenClick('button[data-testid=save-btn]');
  }

  async optIn() {
    return waitForThenClick('div[data-testid=main-cookies-banner-container] button._148dgdpk');
  }

  async test() {
    return await waitFor(
      () => !!document.cookie.match('OptanonAlertBoxClosed'),
      20,
      200
    );
  }
}
