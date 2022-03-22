import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    //create own oberservable

    const http$ = createHttpObservable('/api/course');

    const courses$ = http$
      .pipe(
        map(res => Object.values(res['payload']))
      );

    http$.subscribe(
      (courses) => console.log(courses),
      () => {},
      () => console.log("completed")
    );
    courses$.subscribe(
      (courses) => console.log(courses),
      () => {},
      () => console.log("completed")
    );

    //using rxjs

    //interval operator - emits 1,2 etc each second
    // const interval$ = interval(1000);
    // interval$.subscribe(val => console.log('stream 1 =>' + val));
    // interval$.subscribe(val => console.log('stream 2 =>' + val));

    //timer operator - emits 1,2 etc each second after 3 seconds
    // const interval$ = timer(3000, 1000);
    // const sub = interval$.subscribe(val => console.log('stream 1 =>' + val));

    // setTimeout(() => {
    //   sub.unsubscribe()
    // }, 5000);
    // interval$.subscribe(val => console.log('stream 2 =>' + val));

    //fromEvent operator
    // const click$ = fromEvent(document, 'click');
    // click$.subscribe(
    //   evt => console.log(evt), //emits click
    //   err => console.log(err), //emits error
    //   () => console.log('completed') //completed
    // );
    // interval$.subscribe(val => console.log('stream 2 =>' + val));

    //using standard js
    // document.addEventListener('click', evt => {
    //   console.log(evt);
    //   setTimeout(() => {
    //     console.log('finished...');
    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });
  }
}
