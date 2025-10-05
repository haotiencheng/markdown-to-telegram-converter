import { Suspense, useEffect, createElement } from "react";

const workflow = `{
  "nodes": [
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.md2tg.projectstain.dev",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "markdown",
              "value": "={{ $json.summary }}"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [-32, -112],
      "id": "607cd8b0-ce71-4fa0-b20f-7376421c3022",
      "name": "Telegramify Markdown Converter"
    },
    {
      "parameters": {
        "chatId": "=",
        "text": "={{ $('Telegramify Markdown Converter').item.json.data.telegram_text }}",
        "additionalFields": {
          "parse_mode": "MarkdownV2"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [224, -112],
      "id": "2fdb2e4a-c1da-4784-8195-6e71fbc434ca",
      "name": "Send a text message",
      "webhookId": "c016a89c-c7ee-4fa5-b27b-3d2905047123",
      "credentials": {
        "telegramApi": {
          "id": "IfxeKX2wdBh33BT2",
          "name": "Telegram account"
        }
      }
    }
  ],
  "connections": {
    "Telegramify Markdown Converter": {
      "main": [
        [
          {
            "node": "Send a text message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "instanceId": "7eabb75546dda7356cd478a367a52eb58a6aa6b56c163b156884273680faa217"
  }
}`;

export default function N8nDemo() {
  useEffect(() => {
    import("@n8n_io/n8n-demo-component/n8n-demo.bundled.js").catch(
      console.error
    );
  }, []);

  return createElement(
    Suspense,
    { fallback: createElement("div", null, <div className="loading"></div>) },
    createElement("n8n-demo", { workflow, frame: "true" })
  );
}
