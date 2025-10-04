"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

const convertToTelegramMarkdownV2 = async (
  rawMarkdown: string
): Promise<string> => {
  const response = await fetch("https://api.md2tg.projectstain.dev/", {
    method: "POST",
    body: JSON.stringify({ markdown: rawMarkdown }),
  });

  const { data } = await response.json();
  return data.telegram_text;
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Convert the input text using our logic
  const handleConvert = async () => {
    setOutputText(await convertToTelegramMarkdownV2(inputText));
  };

  // Copy the output text to the clipboard
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-24 bg-base-200">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Markdown to Telegram MarkdownV2 Converter
        </h1>

        <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 items-center justify-center">
          {/* Input TextArea */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Raw Markdown</legend>
            <textarea
              className="textarea h-24 border-2 w-full"
              placeholder="input here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </fieldset>

          {/* Convert Button */}
          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={handleConvert}>
              Convert
            </button>
          </div>

          {/* Output TextArea with Copy Button */}
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Telegram MarkdownV2</legend>
            <textarea
              className="textarea h-24 border-2 w-full"
              placeholder="Converted Telegram MarkdownV2 will appear here..."
              disabled
              value={outputText}
            ></textarea>
            <button
              className="btn btn-ghost btn-sm absolute top-2 right-2"
              onClick={handleCopy}
              disabled={!outputText}
              aria-label="Copy to clipboard"
            >
              {isCopied ? (
                <Check size={20} className="text-success" />
              ) : (
                <Clipboard size={20} />
              )}
            </button>
          </fieldset>
        </div>
      </div>
    </main>
  );
}
