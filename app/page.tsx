"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import N8nDemo from "@/app/components/N8nDemo";

const convertToTelegramMarkdownV2 = async (
  rawMarkdown: string
): Promise<string> => {
  if (!rawMarkdown) return "";
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
  const [isLoading, setIsLoading] = useState(false);

  // Convert the input text using our logic
  const handleConvert = async () => {
    setIsLoading(true);
    setOutputText(await convertToTelegramMarkdownV2(inputText));
    setIsLoading(false);
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

        <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:grid-rows-1 items-center justify-center">
          {/* Input TextArea */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Raw Markdown</legend>
            <textarea
              className="textarea h-48 border-2 w-full"
              placeholder="input here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </fieldset>

          {/* Convert Button */}
          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={handleConvert}>
              {isLoading ? <span className="loading"></span> : "Convert"}
            </button>
          </div>

          {/* Output TextArea with Copy Button */}
          <fieldset className="fieldset relative w-full">
            <legend className="fieldset-legend">Telegram MarkdownV2</legend>
            <textarea
              className="textarea h-48 border-2 w-full"
              placeholder="Converted Telegram MarkdownV2 will appear here..."
              disabled
              value={outputText}
            ></textarea>
            <button
              className="btn btn-ghost btn-sm absolute bottom-1 right-1"
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
      <div className="w-full max-w-5xl mt-10">
        <div className="divider text-2xl">Use via API</div>
        <div className="my-10">
          <div className="mockup-code">
            <pre data-prefix="$">
              <code>
                curl -X POST https://api.md2tg.projectstain.dev/ -d
                '&#123;\"markdown\":\"# hello world\"&#125;'
              </code>
            </pre>
          </div>
        </div>
        <div className="divider text-2xl">Use via n8n</div>
        <div className="my-10">
          <N8nDemo />
        </div>
      </div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <aside>
          <p>
            Built using{" "}
            <a
              href="https://www.npmjs.com/package/telegramify-markdown"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              telegramify-markdown
            </a>{" "}
            and Cloudflare Workers & Pages.
            <br />
            Built by{" "}
            <a
              href="https://www.projectstain.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              projectstain.dev
            </a>
          </p>
        </aside>
      </footer>
    </main>
  );
}
