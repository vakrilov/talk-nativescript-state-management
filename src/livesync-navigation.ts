import { NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { onBeforeLivesync, onAfterLivesync } from "nativescript-angular/platform-common";
import { RouterExtensions } from "nativescript-angular/router";
import { snapshotManager } from '@datorama/akita';

let cachedUrl: string;
let storeSnapshot;
onBeforeLivesync.subscribe(moduleRef => {
  console.log("#### onBeforeLivesync");
  if (moduleRef) {
    const router = <Router>moduleRef.injector.get(Router);
    cachedUrl = router.url;
    console.log("-------> Cached URL: " + cachedUrl);

    storeSnapshot = snapshotManager.getStoresSnapshot();
    console.dir(storeSnapshot);
    console.log("-------> Cached Store: ");
  }
});

onAfterLivesync.subscribe(({ moduleRef, error }) => {
  console.log(`#### onAfterLivesync moduleRef: ${moduleRef} error: ${error}`);
  if (moduleRef) {
    if (storeSnapshot) {
      snapshotManager.setStoresSnapshot(storeSnapshot);
      storeSnapshot = null;
    }

    const router = <RouterExtensions>moduleRef.injector.get(RouterExtensions);
    const ngZone = <NgZone>moduleRef.injector.get(NgZone);
    if (router && cachedUrl) {
      ngZone.run(() => { // <--  should be wrapped in ngZone
        router.navigateByUrl(cachedUrl, { animated: false });
      });
    }
  }
}); 
