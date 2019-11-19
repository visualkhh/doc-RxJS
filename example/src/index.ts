import {fromEvent, interval, Observable, of, Subscription, timer} from "rxjs";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import {fromArray} from "rxjs/internal/observable/fromArray";
import {debounceTime, map} from "rxjs/operators";

// fromArray([1,2,3,4,5,6]).pipe(map(it => it+'..'), debounceTime(20000)).subscribe(it => {
interval(1000).pipe(map(it => it+'..')).subscribe(it => {
    console.log(it+"-----11--111111111a111111d-")
})
