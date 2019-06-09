/**
 * @module parjs/internal/implementation/parsers
 */
/** */

import {ParsingState} from "../state";
import {ReplyKind} from "../../reply";
import {ParjsCombinator} from "../../index";

import {Parjser} from "../../loud";
import {BaseParjsParser} from "../parser";
import {defineCombinator} from "../combinators/combinator";

export function state(): Parjser<any> {
    return new class State extends BaseParjsParser {
        type = "state";
        expecting = "anything";

        _apply(ps: ParsingState): void {
            ps.value = ps.userState;
            ps.kind = ReplyKind.Ok;
        }

    }();
}