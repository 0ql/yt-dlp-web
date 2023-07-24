<script lang="ts">
	export let checked: boolean;
</script>

<input type="checkbox" bind:checked />

<style>
	input[type="checkbox"] {
		appearance: none;
		position: relative;
		background-color: var(--bg-scnd-color);
		width: 4rem;
		height: 2rem;
		border-radius: 10000px;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
	input[type="checkbox"]::before {
		content: "";
		position: absolute;
		background-color: white;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 10000px;
		top: 0.4rem;
		left: 0.4rem;
		transition: ease 0.3s;
	}
	input[type="checkbox"]:checked::before {
		left: 2.4rem;
		transition: ease 0.3s;
	}
</style>
