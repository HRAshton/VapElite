var y = []; 
for (var i = 0; i < localStorage.length; i++) { 
	var item = localStorage
		.getItem(localStorage.key(i))
		split(','); 
	y.push({
		Title: localStorage.key(i), 
		Icon: item[2], 
		Rdp: item[1], 
		Folder: item[0] 
	});
};

const get = (url_, name_) => {

        fetch(url_)
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = name_;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again
        });

};

y.forEach((x, i) => { 
	const name = x.Folder + '___' + x.Title.replace(' ', '_'); 
	setTimeout(() => get(x.Rdp, name + '.rdp'), i * 300); 
	setTimeout(() => get(x.Icon, name + '.png'), i * 200); 
});