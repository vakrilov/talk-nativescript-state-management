import { NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { onBeforeLivesync, onAfterLivesync } from "nativescript-angular/platform-common";
import { RouterExtensions } from "nativescript-angular/router";

import { persistState, } from '@datorama/akita';

// Define localStorage. Akita uses it internally and crashes if it is not declared.
(<any>global).localStorage = undefined;

let inMemStore = {};
const inMemoryStorage = {
    setItem: (key, value) => inMemStore[key] = value,
    getItem: (key) => inMemStore[key],
    clear: () => inMemStore = {}
};
const persistAkitaStores = () => persistState({ storage: inMemoryStorage });

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
