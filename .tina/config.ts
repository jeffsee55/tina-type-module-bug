
import { defineStaticConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineStaticConfig({
	branch,
	clientId: "",   // Get this from tina.io
	token: "",      // Get this from tina.io
	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "uploads",
			publicFolder: "public",
		},
	},
	schema: {
		collections: [
			{
				name: "post",
				label: "Posts",
				path: "src/content/posts",
				format: "md",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "object",
						list: true,
						name: "compare",
						label: "Apps",
						fields: [
							{
								type: "reference",
								label: "App",
								name: "app",
								collections: ["app"],
							},
							{
								type: "string",
								label: "Reason to Use",
								name: "reason",
							}
						],
						ui: {
							itemProps: (item) => {
								return { label: ((item?.app ?? '').replace(/\.md$/, '').split('/').pop() as string).toUpperCase() + (item?.reason ? ': ' + item.reason : '') };
							},
						},
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
				],
			},
			{
				name: "app",
				label: "Apps",
				path: "src/content/apps",
				format: "md",
				fields: [
					{
						type: "string",
						name: "title",
						label: "Title",
						isTitle: true,
						required: true,
					},
					{
						type: "string",
						name: "price",
						label: "Price",
						required: true,
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
				],
			}
		],
	},
});
