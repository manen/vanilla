const cp = require('child_process');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512, 120, 180];

function convert(fileIn, fileOut, size) {
	return new Promise((res, rej) => {
		const p = cp.spawn(
			'inkscape',
			`${fileIn} -w ${size} -h ${size} -o ${fileOut}`.split(' ')
		);
		p.stdout = process.stdout;
		p.on('exit', (code) => {
			if (code == 0) res();
			else rej(new Error(`Exit code: ${code}`));
		}).on('error', (err) => rej(err));
	});
}

sizes.forEach((size) =>
	convert('public/icons/vanilla.svg', `public/icons/vanilla-${size}.png`, size)
);
