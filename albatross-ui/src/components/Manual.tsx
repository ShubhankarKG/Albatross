import React, { useCallback, useEffect } from "react";
import {
  generateInitialAlphabet,
  generateInitialReplaceTexts,
} from "../constants/initialAlphabetObject";
import { letterFreq, alphabetsArray } from "../constants/letterFreq";
import { IAlphabet, IReplaceTexts } from "../types";

interface ManualProps {}

export const Manual: React.FC<ManualProps> = () => {
  const [cipherText, setCipherText] = React.useState<string>("");
  const [plainText, setPlainText] = React.useState<string>("");
  const [alphabets, setAlphabets] = React.useState<IAlphabet>(
    generateInitialAlphabet()
  );
  const [keyPairs, setKeyPairs] = React.useState<IReplaceTexts>(
    generateInitialReplaceTexts()
  );
  const [isEmpty, setIsEmpty] = React.useState<boolean>(true);

  const isAlphabet = (char: string): boolean => {
    return /^[a-z]$/i.test(char);
  };

  // function that sorts an object by value descending
  const sortObject = (obj: IAlphabet) => {
    const sorted = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
    return sorted;
  };

  const updateKeyPair = useCallback((index: number | string, value: string) => {
    const key =
      typeof index === "number" ? String.fromCharCode(97 + index) : index;
    setKeyPairs((prevKeyPairs) => ({
      ...prevKeyPairs,
      [key]: value,
    }));
  }, []);

  useEffect(() => {
    if (isEmpty) {
      setAlphabets(() => generateInitialAlphabet());
    }
  }, [isEmpty]);

  useEffect(() => {
    // Timeout to give some time while editing the ciphertext and
    // defer updating state.
    const timeout = setTimeout(() => {
      if (cipherText) {
        let cipherTextArray = cipherText.toLowerCase().split("");
        const newAlphabets: IAlphabet = {};
        cipherTextArray.forEach((element) => {
          if (element in newAlphabets) {
            newAlphabets[element] += 1;
          } else if (isAlphabet(element)) {
            newAlphabets[element] = 1;
          }
        });
        setAlphabets(newAlphabets);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cipherText, updateKeyPair]);

  const generateKeyPairs = useCallback(() => {
    const sortedAlphabets = sortObject(alphabets);
    setKeyPairs(generateInitialReplaceTexts());
    sortedAlphabets.forEach((alphabet, index) => {
      updateKeyPair(alphabet, letterFreq[index]);
    });
  }, [alphabets, updateKeyPair]);

  useEffect(() => {
    generateKeyPairs();
  }, [generateKeyPairs]);

  useEffect(() => {
    let newPlainText = "";
    cipherText.split("").forEach((val) => {
      newPlainText = newPlainText + (isAlphabet(val) ? keyPairs[val] : val);
    });

    // gfg algo
    const sortedAlphabets = sortObject(alphabets)
      .slice(0, 5)
      .filter((val) => alphabets[val] > 0);

    if (sortedAlphabets.length)
      newPlainText = newPlainText + "\n\n Other possibilities:\n";

    sortedAlphabets.forEach((val, idx) => {
      const diff = val.charCodeAt(0) - keyPairs[val].charCodeAt(0);

      newPlainText = newPlainText + `${idx + 1}. `;
      cipherText.split("").forEach((text) => {
        newPlainText =
          newPlainText +
          (isAlphabet(text)
            ? String.fromCharCode(text.charCodeAt(0) + diff)
            : text);
      });
      newPlainText = newPlainText + "\n";
    });

    setPlainText(newPlainText);
  }, [cipherText, keyPairs, alphabets]);

  const handleCipherTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCipherText(event.target.value.toLowerCase());
    setIsEmpty(event.target.value.length === 0);
  };

  return (
    <div className="flex flex-col h-full mt-8">
      <div className="flex h-5/6">
        <div
          style={{
            flex: "1 1 0",
            backgroundColor: "#ffffcc",
          }}
          className="shadow-lg mx-2 rounded-2xl overflow-y-scroll"
        >
          <p style={{ color: "#042069" }} className="text-center text-xl my-2">
            Character Frequency
          </p>
          <div className="flex flex-col">
            {sortObject(alphabets)
              .filter((char) => alphabets[char] !== 0)
              .map((char) => {
                return (
                  <div className="flex flex-row justify-around" key={char}>
                    <p className="text-center text-xl">{char} = </p>
                    <p className="text-center text-xl">
                      {alphabets[char]} chars
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          style={{
            flex: "2 2 0",
            backgroundColor: "#ffffcc",
          }}
          className="flex-col shadow-lg mx-2 rounded-2xl p-4"
        >
          <div
            className="text-black bg-white my-8 rounded-2xl border border-blue-600"
            style={{
              flex: "1 1 0",
            }}
          >
            <p
              style={{ color: "#042069" }}
              className="text-center text-xl my-2"
            >
              Ciphertext
            </p>
            <textarea
              className="w-full resize-none"
              rows={5}
              value={cipherText}
              onChange={handleCipherTextChange}
              placeholder="Enter ciphertext here"
            />
          </div>
          <div
            className="my-1 rounded-2xl border border-blue-600"
            style={{
              flex: "1 1 0",
              backgroundColor: "#ccc",
            }}
          >
            <p
              style={{ color: "#042069" }}
              className="text-center text-xl my-2"
            >
              Plaintext
            </p>
            <textarea
              className="w-full resize-none"
              rows={5}
              value={plainText}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            flex: "1 1 0",
            backgroundColor: "#ffffcc",
          }}
          className="shadow-lg mx-2 rounded-2xl"
        >
          <p style={{ color: "#042069" }} className="text-center text-xl my-2">
            Replace Characters
          </p>
          <p className="px-2 mx-1 mt-1 text-sm">
            Click Replace to make ciphertext chars replacement with your input
            and clear to delete your entries
          </p>
          <div className="flex flex-row text-xs">
            <div className="flex flex-col">
              {alphabetsArray.slice(0, 13).map((char, key) => (
                <div className="table" key={char + "_" + key}>
                  <p className="table-cell font-bold">{char} = </p>
                  {alphabets[char] > 0 && keyPairs[char] === "" && (
                    <label>This key pair is mandatory!</label>
                  )}
                  <input
                    className="table-cell"
                    value={keyPairs[char]}
                    onChange={(e) =>
                      updateKeyPair(key, e.target.value.toLowerCase())
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {alphabetsArray.slice(13).map((char, key) => (
                <div className="table" key={char + "_" + key}>
                  <p className="table-cell font-bold">{char} = </p>
                  {alphabets[char] > 0 && keyPairs[char] === "" && (
                    <label>This key pair is mandatory!</label>
                  )}
                  <input
                    className="table-cell"
                    value={keyPairs[char]}
                    onChange={(e) =>
                      updateKeyPair(key + 13, e.target.value.toLowerCase())
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-around mt-2">
            <button
              onClick={generateKeyPairs}
              className="bg-red-600 text-white px-2 py-1 rounded-2xl mx-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
