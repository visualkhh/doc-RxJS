import {AsyncSubject, BehaviorSubject, from, interval, Observable, of, ReplaySubject, Subject} from 'rxjs'
import {concatMap, count, debounceTime, delay, distinct, distinctUntilChanged, elementAt, filter, find, first, mergeMap, reduce, single, skip, skipWhile, take, takeLast, takeWhile, tap} from 'rxjs/operators'
import readlin from 'readline'
// operator => https://www.learnrxjs.io/learn-rxjs/operators
describe('Test', () => {
  test('interval test', (done) => {
    const obs = interval(1000);
    obs.subscribe((x) => console.log(x));
    // done();
  }, 999999)

  test('interval pipe, filter test', (done) => {
    const obs = interval(1000)
      .pipe(
        filter((val) => val % 2 == 0)
      )
      .subscribe((x) => console.log(x));
  }, 999999)

  test('from, filter test', (done) => {
    const products = [
      {id: "1", name: "note", price: 2000, reviews: 10},
      {id: "2", name: "clothes", price: 3000, reviews: 10},
      {id: "3", name: "shoes", price: 4000, reviews: 0}
    ];

    from(products)
      .pipe(
        filter(p => p.price > 2500)
      )
      .subscribe(console.log, () => {
      }, done)
  })

  test('from, filter, skip test', (done) => {
    const products = [
      {id: "1", name: "note", price: 2000, reviews: 10},
      {id: "2", name: "clothes", price: 3000, reviews: 10},
      {id: "3", name: "shoes", price: 4000, reviews: 0},
      {id: "4", name: "notebook", price: 5000, reviews: 0}
    ];

    from(products)
      .pipe(
        skip(2)
      )
      .subscribe(console.log, () => {
      }, done)
  })

  test('skipWhile test', (done) => {
    const products = [
      {id: "1", name: "note", price: 2000, reviews: 10},
      {id: "2", name: "clothes", price: 3000, reviews: 10},
      {id: "3", name: "shoes", price: 4000, reviews: 0},
      {id: "4", name: "notebook", price: 2000, reviews: 0}
    ];
    // skipWhile → condition fn이 처음으로 false일 때까지 skip 그 이후는 무조건 생성
    // condition false가 반환될때까지 skip
    from(products)
      .pipe(
        skipWhile(v => v.price < 3000)
      )
      .subscribe(console.log, () => {
      }, done)
  })

  test('take test', (done) => {

    const products = [
      {id: "1", name: "note", price: 2000, reviews: 10},
      {id: "2", name: "clothes", price: 3000, reviews: 10},
      {id: "3", name: "shoes", price: 4000, reviews: 0},
      {id: "4", name: "notebook", price: 2000, reviews: 0}
    ];

    from(products)
      .pipe(
        take(3)
      )
      .subscribe(console.log, () => {
      }, done)
  })

  test('takeWhile test', (done) => {
    const products = [
      {id: "1", name: "note", price: 2000, reviews: 10},
      {id: "2", name: "clothes", price: 3000, reviews: 10},
      {id: "3", name: "shoes", price: 4000, reviews: 0},
      {id: "4", name: "notebook", price: 2000, reviews: 0}
    ];

    // takeWhile → condition fn이 처음으로 false일 때까지 생성 그 이후는 값을 안가져옴
    from(products).pipe(
      takeWhile(v => v.price < 4000)
    ).subscribe(console.log, () => {
    }, done)
  })

  test('taskLast test', (done) => {
    const products = [
      {id: "1", name: "note", price: 2000, reviews: 10},
      {id: "2", name: "clothes", price: 3000, reviews: 10},
      {id: "3", name: "shoes", price: 4000, reviews: 0},
      {id: "4", name: "notebook", price: 2000, reviews: 0}
    ];
    // takeLast → 뒤에서 부터 값 가져오기
    from(products)
      .pipe(
        takeLast(2)
      )
      .subscribe(console.log, () => {
      }, done)
  })

  test('distinct test', (done) => {
    // distinct → 중복제거 (ex: 클릭 똑같은거 할경우 막을수있음)
    // from([1, 3, 2, 3, 4, 4, 5])
    //   .pipe(
    //     distinct()
    //   )
    //   .subscribe(console.log, () => {
    //   }, done);


    // 객체인경우는 키값으로
    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];

    from(products).pipe(
      distinct(e => e.id)
    ).subscribe(console.log, () =>{} , done)
  })

  test(' reduce test', (done) => {

    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];
    // reduce → 다수의 값을 하나의 값으로 변경 (총 더하는 값)
    from (products)
      .pipe(
        reduce((a, c) => a + c.price, 0)
        //reduce((이전값, 현재순환값)=> 하나의 값으로 변경, 초기값)
      ).subscribe(console.log, () =>{} , done) // 13000
  })

  test('elementAt test', (done) => {
    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];
    // elementAt: 인덱스의 특정 위치의 값
    from(products)
      .pipe(
        elementAt(2) //index
      ).subscribe(console.log)
  })
  test('first test', (done) => {
    const obs = of(1, 2, 3);
    obs.pipe(first())
      .subscribe((val) => {
        console.log(val);
      });
  })
  test('first object test', (done) => {
    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];

    from (products)
      .pipe(
        first()
      ).subscribe(console.log)
  })
  test('if first  test', (done) => {
    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];

    from (products)
      .pipe(
        first(v => v.price > 3000)
      ).subscribe(console.log)
  })

  test('find test', (done) => {
    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];
    // find: 처음으로 true가 된 값 (predicate 필수)
    from(products)
      .pipe(
        find(v => v.price > 3000)
      ).subscribe(console.log)
  })
  /*
    ### first vs find 차이점
    [predicate] first:  옵션(null) / find: 필수 전달
    [값이 없을 경우] first: empty Error / find: undefined

    ## single → 전체에서 만족하는 하나의 값
    전체 스트림이 끝났을 때 특정조건이 모든 요소에 만족이 되는지
    [값이 없을 경우 / 여러개있는 경우] error
   */
  test('single test', (done) => {
    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 2 },
    ];

    from(products)
      .pipe(
        single(v => v.reviews === 0)
      ).subscribe(console.log)

    from(products)
      .pipe(
        single(v => v.reviews == 22)
      ).subscribe(console.log)

    from(products)
      .pipe(
        single(v => v.reviews > 1)
      ).subscribe(console.log)
  })
  test('count test', (done) => {

    const products = [
      { id: "1", name: "note", price: 2000, reviews: 10 },
      { id: "2", name: "clothes", price: 3000, reviews: 10 },
      { id: "3", name: "shoes", price: 4000, reviews: 0 },
      { id: "4", name: "notebook", price: 2000, reviews: 2 },
      // { id: "4", name: "notebook", price: 2000, reviews: 0 },
    ];
    //  count → 조건의 함수가 참일때 갯수 또는 총 갯수 (옵션: predicate)
    from(products)
      .pipe(
        count()
      ).subscribe(console.log)

    from(products)
      .pipe(
        count(v => v.reviews == -1)
      ).subscribe(console.log)
  })
  /*
    하나의 값을 전달하는 것은 complete될때 값이 나옴 (예: reduce, single, count)
    → 무한으로 생성하는 observer 실행이 안됨 (complete를 만들어줘야 사용가능)
   */
  test('tap test', (done) => {
    interval(1000)
      .pipe(
        tap(console.log),
        count() // 실행 안됨
      ).subscribe(console.log)
  })
  //무한으로 생성하는 observer일 경우 complete 만들어서 실행하는 예제
  test('tap test', (done) => {
    interval(1000)
      .pipe(
        tap(console.log),
        take(3),
        count()
      ).subscribe(console.log)
  })
  test('distinctUntilChanged test', (done) => {
    // const r = readlin.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // })
    // const question = () => {
    //   r.question('input', data => {
    //     console.log('---', data)
    //   })
    // }
    const inputs = ['s','h','o','w',' ','m','m','e',' ','t','t','h','e',' ','m','m','o','n','e','y'];
    from(inputs)
      .pipe(
        concatMap(x => of(x).pipe(delay(1000))),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(console.log)

  }, 99999999)

  // https://rxjs.dev/guide/observable
  test('create observable test', (done) => {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
    observable.subscribe(console.log, ()=>{}, done)
  }, 99999)


  test('subject test', (done) => {
    const sub = new Subject();
    sub.next(1);
    sub.subscribe(x => {
      console.log('Subscriber A', x);
    });
    sub.next(2); // OUTPUT => Subscriber A 2
    sub.subscribe(x => {
      console.log('Subscriber B', x);
    });
    sub.next(3); // OUTPUT => Subscriber A 3, Subscriber B 3 (logged from both subscribers)
    done()
  })
  test('replaySubject test', (done) => {
    const sub = new ReplaySubject(3);

    sub.next(1);
    sub.next(2);
    sub.subscribe(console.log); // OUTPUT => 1,2
    sub.next(3); // OUTPUT => 3
    sub.next(4); // OUTPUT => 4
    sub.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    sub.next(5); // OUTPUT => 5,5 (log from both subscribers)
  })
  test('behaviorSubject test', (done) => {
    const subject = new BehaviorSubject(123);

// two new subscribers will get initial value => output: 123, 123
    subject.subscribe(console.log);
    subject.subscribe(console.log);

// two subscribers will get new value => output: 456, 456
    subject.next(456);

// new subscriber will get latest value (456) => output: 456
    subject.subscribe(console.log);

// all three subscribers will get new value => output: 789, 789, 789
    subject.next(789);

// output: 123, 123, 456, 456, 456, 789, 789, 789
  })
  test('asyncSubject test', (done) => {
    const sub = new AsyncSubject();

    sub.subscribe(console.log);

    sub.next(123); //nothing logged

    sub.subscribe(console.log);

    sub.next(456); //nothing logged
    sub.complete(); //456, 456 logged by both subscribers
  })
})

