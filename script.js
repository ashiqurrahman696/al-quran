let surahs = document.querySelector('.surah-list'),
overlay = document.querySelector('.overlay'),
surahContainer = document.querySelector('.surah-container'),
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
		surahs.innerHTML += `<div class="surah" onclick="openSurah('${surahItem.name.replace("'", "")}')">${surahItem.number}. <span lang="bn">${surahItem.bangla}</span> (${surahItem.name})</div>`;
	});
});

function openSurah(surahName){
	overlay.classList.remove('hidden');
	surahContainer.classList.add('scale-up');
	surahContainer.classList.remove('scale-down');
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
				<p class="arabic" dir="rtl" lang="ar">
					${surah.arabic} <span>${surah.verse}</span>
				</p>
				<p class="bangla" lang="bn">${surah.bangla}</p>
				<p class="english">${surah.english}</p>
			`;
		});
	});
}

closeBtn.addEventListener('click', function(){
	surahContainer.classList.remove('scale-up');
	surahContainer.classList.add('scale-down');
	setTimeout(function(){
		overlay.classList.add('hidden');
		surahDetail.innerHTML = 'Loading surah...';
	}, 500);
});

overlay.addEventListener('click', function(e){
	if(!surahContainer.contains(e.target)){
		surahContainer.classList.remove('scale-up');
		surahContainer.classList.add('scale-down');
		setTimeout(function(){
			overlay.classList.add('hidden');
			surahDetail.innerHTML = 'Loading surah...';
		}, 500);
	}
});