import build from "pino-abstract-transport";

export async function sendToSlack({
	url,
	channel,
	username,
	emoji,
	message,
}: {
	url: string;
	channel: string;
	username?: string;
	emoji?: string;
	message: any;
}) {
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			channel: channel,
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text:
							"```\n" +
							JSON.stringify(message).replaceAll(",", ",\n") +
							"\n```",
					},
				},
			],
		}),
	});
}

export default async function (opts: {
	webhookUrl: string;
	channel: string;
	username?: string;
	emoji?: string;
	verbose?: boolean;
}) {
	const {
		webhookUrl,
		channel,
		username = "webhookbot",
		emoji = ":ghost:",
		verbose = false,
	} = opts;

	if (!webhookUrl || !channel) {
		throw new Error("The required options(webhookUrl, channel) are missing");
	}

	return build(async (source) => {
		for await (const obj of source) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { time, level, msg, err, error, stack, ...props } = obj;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const {
				message: errMessage,
				stack: errStack,
				...errorProps
			} = err || error || {};

			await sendToSlack({
				url: webhookUrl,
				channel,
				username,
				emoji,
				message: verbose ? JSON.stringify(obj) : msg,
			});
		}
	});
}
