import { IAlphabet, IReplaceTexts } from "../types";


export const generateInitialAlphabet = () => {
    const res: IAlphabet = {};
    for (let i=97; i<=122; i++) {
        res[String.fromCharCode(i)] = 0;
    }
    return res;
};

export const generateInitialReplaceTexts = () => {
    const res: IReplaceTexts = {};
    for (let i=97; i<=122; i++) {
        res[String.fromCharCode(i)] = ""
    }
    return res;
}