<header>
	<div class="title">Vanilla</div>
	<div class="buttons" />
</header>

<style>
	header {
		padding: 0.6rem;
		display: grid;
		grid-template-columns: 1fr 9fr;

		background-color: #eeeeee;
	}

	.title {
		font-size: 1.16rem;
		color: #464646;
	}

	.buttons {
		display: grid;
		gap: 0.6rem;
		grid-auto-flow: column;
		justify-content: right;
	}

	@media (prefers-color-scheme: dark) {
		header {
			background-color: #1a1b1c;
		}

		.title {
			color: #afaeae;
		}
	}
</style>
