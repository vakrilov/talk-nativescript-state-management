import { NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { onBeforeLivesync, onAfterLivesync } from "nativescript-angular/platform-common";
import { RouterExtensions } from "nativescript-angular/router";

import { persistState, } from '@datorama/akita';

let inMemStore = {};
const inMemoryStorage = {
    setItem: (key, value) => inMemStore[key] = value,
    getItem: (key) => inMemStore[key],
    clear: () => inMemStore = {}
};

// Go to node_modules/@datorama/akita/fesm5
// find `const isNotBrowser = typeof window === 'undefined';`
// and replace it with `const isNotBrowser = false`
function persistAkitaStores() {
    (<any>global).localStorage = {};
    persistState({ storage: inMemoryStorage });
    (<any>global).localStorage = undefined;
}
persistAkitaStores();

let cachedUrl: string;
onBeforeLivesync.subscribe(moduleRef => {
    console.log("#### onBeforeLivesync");
    if (moduleRef) {
        const router = <Router>moduleRef.injector.get(Router);
        cachedUrl = router.url;
        console.log("-------> Caching URL: " + cachedUrl);
        persistAkitaStores();
    }
});

onAfterLivesync.subscribe(({ moduleRef, error }) => {
    console.log(`#### onAfterLivesync moduleRef: ${moduleRef} error: ${error}`);
    if (moduleRef) {

        const router = <RouterExtensions>moduleRef.injector.get(RouterExtensions);
        const ngZone = <NgZone>moduleRef.injector.get(NgZone);
        if (router && cachedUrl) {
            ngZone.run(() => { // <--  should be wrapped in ngZone
                router.navigateByUrl(cachedUrl, { animated: false, clearHistory: true });
            });
        }
    }
});
