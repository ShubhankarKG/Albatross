import React, { useEffect } from "react";
import { generateInitialAlphabet } from "../constants/initialAlphabetObject";
import { letterFreq } from "../constants/letterFreq";
import { IAlphabet, IChartData } from "../types";
import letterFreqJson from "../constants/letterfreq.json";
import "./Manual.css";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ManualProps {}

const Manual: React.FC<ManualProps> = () => {
  const [cipherText, setCipherText] = React.useState<string>("");
  const [plainText, setPlainText] = React.useState<string>("");
  const [alphabets, setAlphabets] = React.useState<IAlphabet>(
    generateInitialAlphabet()
  );
  const [isEmpty, setIsEmpty] = React.useState<boolean>(true);
  const [chartData, setChartData] = React.useState<IChartData[]>([]);

  const isAlphabet = (char: string): boolean => {
    return /^[a-z]$/i.test(char);
  };

  // function that sorts an object by value descending
  const sortObject = (obj: IAlphabet) => {
    const sorted = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
    return sorted;
  };

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

        const totalAlphabets = Object.values(newAlphabets).reduce(
          (a, b) => a + b,
          0
        );

        const newChartData = sortObject(newAlphabets)
          .filter((char) => newAlphabets[char] !== 0)
          .map((char) => ({
            char,
            freq: parseFloat(
              ((newAlphabets[char] / totalAlphabets) * 100).toFixed(3)
            ),
          }));

        setAlphabets(newAlphabets);
        console.log(newChartData);
        setChartData(newChartData);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cipherText]);

  useEffect(() => {
    let newPlainText = "";

    // gfg algo
    const sortedAlphabets = sortObject(alphabets)
      .slice(0, 10)
      .filter((val) => alphabets[val] > 0);

    if (sortedAlphabets.length)
      newPlainText =
        newPlainText + `Top ${sortedAlphabets.length} possibilities :\n\n`;

    sortedAlphabets.forEach((val, idx) => {
      const diff = val.charCodeAt(0) - letterFreq[idx].charCodeAt(0);

      newPlainText = newPlainText + `${idx + 1}. `;
      cipherText.split("").forEach((text) => {
        newPlainText =
          newPlainText +
          (isAlphabet(text)
            ? String.fromCharCode(
                ((text.charCodeAt(0) - 97 + diff + 26) % 26) + 97
              )
            : text);
      });
      newPlainText = newPlainText + "\n";
    });

    setPlainText(newPlainText);
  }, [cipherText, alphabets]);

  const handleCipherTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCipherText(event.target.value.toLowerCase());
    setIsEmpty(event.target.value.length === 0);
  };

  return (
    <div className="flex flex-col h-full mt-8">
      <div className="flex h-6/7 text-sm">
        <div
          style={{
            backgroundColor: "rgb(243, 246, 253)",
          }}
          className="mx-2 rounded-2xl overflow-y-scroll md:w-1/4 box-shadow"
        >
          <p style={{ color: "#042069" }} className="text-center text-xl my-2">
            Letters Chart
          </p>
          <div className="flex flex-col">
            {letterFreqJson
              .sort((a, b) => b.frequency - a.frequency)
              .map((letterObject, index) => {
                return (
                  <div className="flex flex-row justify-around" key={index}>
                    <p className="text-center">
                      {letterObject.letter} ({letterObject.frequency} %){" "}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(243, 246, 253)",
          }}
          className="flex flex-col mx-2 rounded-2xl overflow-y-scroll md:w-1/4 box-shadow"
        >
          <p style={{ color: "#042069" }} className="text-center text-xl my-2">
            Character Frequency
          </p>
          {/* {chartData.map(({char, freq}) => {
                return (
                  <div className="flex flex-row justify-around" key={char}>
                    <p className="text-center">{char} = </p>
                    <p className="text-center">
                      {freq} chars
                    </p>
                  </div>
                );
              })} */}
          <ResponsiveContainer width="90%">
            <BarChart layout="vertical" data={chartData} barSize={10}>
              <XAxis type="number" dataKey="freq" />
              <YAxis type="category" dataKey="char" />
              <Tooltip />
              <Bar dataKey="freq" fill="#042069" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            backgroundColor: "rgb(243, 246, 253)",
          }}
          className="flex-col mx-2 rounded-2xl p-4 md:w-1/2 box-shadow"
        >
          <div
            className="text-black bg-white my-8 rounded-2xl border border-blue-600 h-2/5"
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
              className="w-full resize-none h-3/4"
              rows={5}
              value={cipherText}
              onChange={handleCipherTextChange}
              placeholder="Enter ciphertext here"
            />
          </div>
          <div
            className="my-1 rounded-2xl border border-blue-600 h-2/5"
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
              className="w-full resize-none h-3/4"
              rows={5}
              value={plainText}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual;
