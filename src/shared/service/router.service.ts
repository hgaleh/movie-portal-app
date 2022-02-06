import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from '@angular/common';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable()
export class RouterService<T> {
    private q!: Params;
    public queryParams: Observable<T>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.queryParams = this.activatedRoute.queryParams.pipe(map(params => {
            this.q = params;
            return params as T;
        }));
    }

    public redirectToQuery(queryParams: T): void {
        this.q = {...this.q, ...queryParams};
        const url = this.router.createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams: this.q
        }).toString();
        this.location.go(url);
    }
}

const factory = (router: Router, activatedRoute: ActivatedRoute, location: Location) => new RouterService(router, activatedRoute, location);

export const ROUTER_SERVICE_PROVIDR = {
    provide: RouterService,
    useFactory: factory,
    deps: [
      Router,
      ActivatedRoute,
      Location
    ]
}