import {JaseParserAction} from "../../../base/parser-action";
import {Issues} from "../../common";
/**
 * Created by User on 21-Nov-16.
 */
export class PrsSeqFunc extends JaseParserAction {
    isLoud = true;
    displayName = "seqFunc";
    constructor(private initial : AnyParserAction, private parserSelectors : ((result : any) => LoudParser<any>)[]) {
        super();
    }

    _apply(ps : ParsingState) {
        let {initial, parserSelectors} = this;
        let results = [];
        initial.apply(ps);
        if (!ps.result.isOk) {
            //propagate the failure of 'initial' upwards.
            return;
        }
        for (let i = 0; i < parserSelectors.length; i++) {
            let cur = parserSelectors[i];
            let prs = cur(ps.value);
            prs.isLoud || Issues.quietParserNotPermitted(this);
            prs.action.apply(ps);
            if (ps.result.isOk) {
                results.maybePush(ps.value);
            } else if (ps.result.isSoft) {
                //at this point, even a soft failure becomes a hard one
                ps.result = ResultKind.HardFail;
            } else {
                return;
            }
        }
        ps.value = results;
        return ResultKind.OK;
    }
}
