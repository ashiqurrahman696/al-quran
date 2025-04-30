let surahs = document.querySelector('.surah-list'),
overlay = document.querySelector('.overlay'),
surahDetail = document.querySelector('.surah-detail'),
closeBtn = document.getElementById('close');
surahs.innerHTML = 'Loading surah list...';
surahDetail.innerHTML = 'Loading surah...';
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://online-quran-api.p.rapidapi.com/surahs',
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'e403a3caf4mshedeef7e6ebfdd98p1daea7jsn4def0b51f340',
		'x-rapidapi-host': 'online-quran-api.p.rapidapi.com'
	}
};

$.ajax(settings).done(function(response){
	surahs.innerHTML = '';
	let surahlist = response.surahList;
	surahlist.forEach(surahItem => {
		surahs.innerHTML += `<div class="surah" onclick="openSurah('${surahItem.name.replace("'", "")}')">${surahItem.number}. ${surahItem.bangla} (${surahItem.name})</div>`;
	});
});

function openSurah(surahName){
	overlay.classList.remove('hidden');
	const settings = {
		async: true,
		crossDomain: true,
		url: `https://online-quran-api.p.rapidapi.com/surahs/${surahName}`,
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'e403a3caf4mshedeef7e6ebfdd98p1daea7jsn4def0b51f340',
			'x-rapidapi-host': 'online-quran-api.p.rapidapi.com'
		}
	};

	$.ajax(settings).done(function(response){
		surahDetail.innerHTML = `<h2>${response.surahName}</h2>`;
		response.surah.forEach(surah => {
			surahDetail.innerHTML += `
				<p class="arabic">
					<span>${surah.verse}</span> ${surah.arabic}
				</p>
				<p class="bangla">${surah.bangla}</p>
				<p class="english">${surah.english}</p>
			`;
		});
		surahDetail.innerHTML += `<audio controls><source src="${response.audio}"></audio>`;
	});
}

closeBtn.addEventListener('click', function(){
	overlay.classList.add('hidden');
	surahDetail.innerHTML = 'Loading surah...';
});