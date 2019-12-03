javascript: function a() {
	Array.from(
		document.getElementsByClassName("tswa_boss"))
			.map(x => localStorage.setItem(
				x.title, 
				[
					document.getElementsByClassName("tswa_CurrentFolderLabel")[0]
						.children[0]
						.innerText, 
					x.onmouseup
						.toString()
						.split(',')[2]
						.split("'")[1], 
					x.getElementsByClassName("tswa_iconimg")[0]
						.src
				]
			))
}; a();