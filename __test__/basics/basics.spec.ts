import {Parjs} from "../../dist/bindings/parsers";
import {ResultKind, ParserResult, SuccessResult, FailResult} from "../../dist/abstract/basics/result";
import {expectSuccess, expectFailure} from '../custom-matchers';



describe("basics: anyChar example", () => {
    let parser = Parjs.anyChar;
    let successInput = "a";
    let tooMuchInput = "ab";
    let failInput = "";
    let uniqueState = {};
    it("single char input success", () => {
        let result = parser.parse(successInput, uniqueState) as SuccessResult<string>;
    });
    it("empty input failure", () => {
        let result = parser.parse(failInput, uniqueState) as FailResult;
        expectFailure(result, ResultKind.SoftFail, uniqueState);
    });

    it("fails on too much input", () => {
        let result = parser.parse(tooMuchInput, uniqueState);
        expectFailure(result, ResultKind.SoftFail, uniqueState);
    });

    describe("non-string inputs", () => {
        it("throws on null, undefined", () => {
            expect(() => parser.parse(null)).toThrow();
            expect(() => parser.parse(undefined)).toThrow();
        });
        it("throws on non-string", () => {
            expect(() => parser.parse(5 as any)).toThrow();
        });
    });
});