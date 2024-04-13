import { defineConfig } from "astro/config";
import relativeLinks from "astro-relative-links";

export default defineConfig({
	build: {
		assets: "assets",
	},
	integrations: [relativeLinks()],
});
