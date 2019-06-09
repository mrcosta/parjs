/**
 * @module parjs/internal/implementation/combinators
 */
/** */

import {ParsingState} from "../state";

import {BaseParjsParser} from "../parser";
import {Parjser} from "../../loud";

/**
 * Returns a parser that, when it is first applied, will call `resolver`
 * and behave like the parser returned by that function.
 * @param resolver
 */
export function late<T>(resolver: () => Parjser<T>): Parjser<T> {
    return new class Late extends BaseParjsParser {
        type = "late";
        expecting = "late (unbound)";
        _resolved: BaseParjsParser;

       _apply(ps: ParsingState): void {
            if (this._resolved) {
                this._resolved.apply(ps);
                return;
            }
            this._resolved = resolver() as any as BaseParjsParser;
            this._resolved.apply(ps);
            this.expecting = this._resolved.expecting;
        }
    }();
}