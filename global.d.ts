import { EnhancedStore } from "@reduxjs/toolkit";

declare global {
  interface Window {
    reduxStore: EnhancedStore;
  }
}
