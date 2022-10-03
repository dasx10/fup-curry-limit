import type CurryLimitResultType from 'fup-curry-limit-result-type';
import type TupleConsistentType  from 'fup-tuple-consistent-type';
import type TupleGainType        from 'fup-tuple-gain-type';

import type { CurryLimitCore }   from 'fup-curry-limit-core';

export type CurryLimit <
    ExpectedParameters extends readonly unknown[] = unknown[],
    ExpectedResult     extends unknown = unknown
> = CurryLimitCore<ExpectedParameters, ExpectedResult> & {
    <Limit extends number>(limit: Limit): <
        Parameters  extends ExpectedParameters,
        Result      extends ExpectedResult,
        Arguments   extends TupleConsistentType<TupleGainType<Limit, Parameters>>
    >(executor: (...parameters: Parameters) => Result, ...arguments: Arguments) => CurryLimitResultType<
        Limit,
        Arguments,
        Parameters,
        Result
    >;

    <
        Parameters  extends ExpectedParameters,
        Result      extends ExpectedResult,
    >(executor: (...parameters: Parameters) => Result): <
      Limit extends number,
      Arguments   extends TupleConsistentType<TupleGainType<Limit, Parameters>>
    > (limit: Limit, ...arguments: Arguments) => CurryLimitResultType<
        Limit,
        Arguments,
        Parameters,
        Result
    >;

    <
        Limit       extends number,
        Parameters  extends ExpectedParameters,
        Result      extends ExpectedResult,
        Arguments   extends TupleConsistentType<TupleGainType<Limit, Parameters>>
    > (executor: (...parameters: Parameters) => Result, limit: Limit, ...args: Arguments): CurryLimitResultType<
        Limit,
        Arguments,
        Parameters,
        Result
    >

    core: CurryLimitCore<ExpectedParameters, ExpectedResult>
};

/**
 * @example
 * const only2Curry = curryLimit(2);         // ((...arguments) => result) => (y, x) => result | (y) => (x) => result
 * const add        = (y, x) => x + y;       // (y, x) => x + y
 * const result     = only2Curry(add, 1, 2); // 3
 * const add1       = only2Curry(add, 1);    // (x) => x + 1
 * const resultAdd1 = add1(3);               // 4
 * const addC       = only2Curry(add);       // (y, x) => x + y | (y) => (x) => x + y
 * const add4       = addC(4);               // (x) => x + 4
 * const resultAdd4 = add4(5);               // 9
 */
declare const curryLimit: CurryLimit;
export default curryLimit;
