A [Pino v7+ transport](https://getpino.io/#/docs/transports?id=v7-transports) to send events to [Slack](https://slack.com/)

## Usage

```js
import pino from "pino";

const logger = pino({
	transport: {
		target: "@anatoliy/pino-slack-transport",
		level: "info",
		options: {
			webhookUrl: "https://hooks.slack.com/services/xxx/xxx/xxx",
			channel: "#pino-log",
			username: "webhookbot",
			icon_emoji: ":ghost:",
		},
	},
});

logger.info("test log!");
```

[app.ts](example/app.ts)

## Reference

- [https://getpino.io/#/docs/transports?id=writing-a-transport](https://github.com/pinojs/pino/blob/master/docs/transports.md#writing-a-transport)
