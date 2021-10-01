import React, { useEffect } from 'react'

interface ManualProps {

}

interface IAlphabet {
    [keys: string]: number
}

export const Manual: React.FC<ManualProps> = () => {

    const [cipherText, setCipherText] = React.useState<string>('');
    const [plainText, setPlainText] = React.useState<string>('');
    const [alphabets, setAlphabets] = React.useState<IAlphabet>({
        'a': 0,
        'b': 0,
        'c': 0,
        'd': 0,
        'e': 0,
        'f': 0,
        'g': 0,
        'h': 0,
        'i': 0,
        'j': 0,
        'k': 0,
        'l': 0,
        'm': 0,
        'n': 0,
        'o': 0,
        'p': 0,
        'q': 0,
        'r': 0,
        's': 0,
        't': 0,
        'u': 0,
        'v': 0,
        'w': 0,
        'x': 0,
        'y': 0,
        'z': 0
    });

    const isAlphabet = (char: string): boolean => {
        return /^[a-z]$/i.test(char);
    }

    useEffect(() => {
        if (cipherText) {
            let cipherTextArray = cipherText.toLowerCase().split('');
            const newAlphabets: IAlphabet = {};
            cipherTextArray.forEach(element => {
                if (element in newAlphabets) {
                    newAlphabets[element] += 1;
                } else if (isAlphabet(element)) {
                    newAlphabets[element] = 1;
                }
            });
            setAlphabets(newAlphabets);
        }
    }, [cipherText]);

    const handleCipherTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCipherText(event.target.value);
    }

    const handlePlainTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPlainText(event.target.value);
    }

    // function that sorts an object by value descending
    const sortObject = (obj: IAlphabet) => {
        const sorted = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
        return sorted;
    }

    const generateAlphabets = () => {
        const alph = [];
        for (let i=0; i<26; i++) {
            alph.push(String.fromCharCode(97 + i));
        }
        return alph;
    }

    return (
        <div className="flex-col h-full mt-8">
        <div className="flex h-5/6">
            <div 
                style={{
                    flex: "1 1 0",
                    backgroundColor: "#ffffcc"
                }}
                className="shadow-lg mx-2 rounded-2xl"
            >
                <h1>Manual</h1>
            </div>
            <div 
                style={{
                    flex: "1 1 0",
                    backgroundColor: "#ffffcc"
                }}
                className="shadow-lg mx-2 rounded-2xl overflow-y-scroll"
            >
                <p style={{color: "#042069"}} className="text-center text-xl my-2">Character Frequency</p>
                <div className="flex flex-col">
                    {
                        sortObject(alphabets).filter(char => alphabets[char] !== 0).map(char => {
                            return (
                                <div className="flex flex-row justify-around">
                                    <p className="text-center text-xl">{char} = </p>
                                    <p className="text-center text-xl">{alphabets[char]} chars</p>
                                </div>
                                )
                            })
                    }
                </div>
            </div>
            <div 
                style={{
                    flex: "2 2 0",
                    backgroundColor: "#ffffcc"
                }}
                className="flex-col shadow-lg mx-2 rounded-2xl p-4"
            >
                <div className="text-black bg-white my-8 rounded-2xl border border-blue-600" style={{
                    flex: "1 1 0",
                }}>
                    <p style={{color: "#042069"}} className="text-center text-xl my-2">Ciphertext</p>
                    <textarea 
                    className="w-full resize-none" 
                    rows={5}
                    value={cipherText}
                    onChange={handleCipherTextChange} 
                    placeholder="Enter ciphertext here"
                    />

                </div>
                <div className="text-white my-1 rounded-2xl border border-blue-600" style={{
                    flex: "1 1 0",
                    backgroundColor: "#ccc"
                }}>
                    <p style={{color: "#042069"}} className="text-center text-xl my-2">Plaintext</p>
                    <textarea 
                    className="w-full resize-none" 
                    rows={5} 
                    value={plainText}
                    onChange={handlePlainTextChange}
                    disabled
                    />
                </div>
            </div>
            <div 
                style={{
                    flex: "1 1 0",
                    backgroundColor: "#ffffcc"
                }}
                className="shadow-lg mx-2 rounded-2xl"
            >
                <p style={{color: "#042069"}} className="text-center text-xl my-2">Replace Characters</p>
                <p className="px-2 mx-1 mt-1 text-sm">Click Replace to make ciphertext chars replacement with your input and 
                    clear to delete your entries
                </p>
                <div className="flex flex-row text-xs">
                    <div className="flex flex-col">
                        {
                            generateAlphabets().slice(0, 13).map(char => (
                                <div className="table">
                                    <p className="table-cell">{char} = </p> 
                                    <input className="table-cell" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-col">
                        {
                            generateAlphabets().slice(13).map(char => (
                                <div className="table">
                                    <p className="table-cell">{char} = </p> 
                                    <input className="table-cell" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-around">
                    <button className="bg-blue-600 text-white px-2 py-1 rounded-2xl mx-2">Replace</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded-2xl mx-2">Clear</button>
                </div>
            </div>
        </div>
        </div>
        
    );
}