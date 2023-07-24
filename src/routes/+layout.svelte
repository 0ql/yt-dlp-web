<script lang="ts">
	import { page } from "$app/stores";
	import "./global.css";
	import "uno.css";
</script>

<svelte:head>
	<title>yt-dlp</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-5 grid grid-cols-2 gap-4">
	<h1 class="col-span-full">yt-dlp</h1>
	<nav
		class="col-span-full bg-[var(--bg-scnd-color)] p-2 rounded-lg b-solid b-[var(--bg-scnd-b-color)] flex justify-between gap-3 text-center"
	>
		<a
			class="{$page.route.id === '/download'
				? 'bg-[var(--bg-trd-color)] outline-solid outline-[var(--bg-trd-b-color)]'
				: ''} p-3 rounded-sm w-full no-underline flex justify-center gap-3"
			href="/download"
		>
			<i class="i-heroicons:arrow-down-tray-solid block text-xl" />
			Download</a
		>
		<a
			class="{$page.route.id === '/files'
				? 'bg-[var(--bg-trd-color)] outline-solid outline-[var(--bg-trd-b-color)]'
				: ''} p-3 rounded-sm w-full no-underline flex justify-center gap-3"
			href="/files"
		>
			<i class="i-heroicons:list-bullet-solid block text-xl" />
			Files</a
		>
	</nav>
	<slot />
</main>
