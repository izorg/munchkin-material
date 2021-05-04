// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fetch as fetchPolyfill } from "whatwg-fetch";

window.fetch = fetchPolyfill as typeof window.fetch;
