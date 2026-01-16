let surahs = document.querySelector('.surah-list'),
overlay = document.querySelector('.overlay'),
surahContainer = document.querySelector('.surah-container'),
surahDetail = document.querySelector('.surah-detail'),
closeBtn = document.getElementById('close');
surahs.innerHTML = 'Loading surah list...';
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

let banglaActive = true;
let englishActive = true;
let currentSurahData = null;

function renderSurah() {
	if (!currentSurahData) return;
	surahDetail.innerHTML = `<h2>${currentSurahData.surahName}</h2>
		<div>
			<label><input type="checkbox" id="bangla-toggle" ${banglaActive ? 'checked' : ''}> Bangla</label>
			<label><input type="checkbox" id="english-toggle" ${englishActive ? 'checked' : ''}> English</label>
		</div>`;
	currentSurahData.surah.forEach(surah => {
		surahDetail.innerHTML += `
			<p class="arabic" dir="rtl" lang="ar">
				${surah.arabic} <span>${surah.verse}</span>
			</p>`;
		if (banglaActive) {
			surahDetail.innerHTML += `<p class="bangla" lang="bn">${surah.bangla}</p>`;
		}
		if (englishActive) {
			surahDetail.innerHTML += `<p class="english">${surah.english}</p>`;
		}
		surahDetail.innerHTML += `<hr>`;
	});
	// Re-attach event listeners after rendering
	document.getElementById('bangla-toggle').addEventListener('change', function() {
		banglaActive = this.checked;
		renderSurah();
	});
	document.getElementById('english-toggle').addEventListener('change', function() {
		englishActive = this.checked;
		renderSurah();
	});
}

function openSurah(surahName){
	overlay.classList.remove('hidden');
	surahContainer.classList.add('scale-up');
	surahContainer.classList.remove('scale-down');
	surahDetail.innerHTML = 'Loading surah...';
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
		currentSurahData = response;
		renderSurah();
	});
}

closeBtn.addEventListener('click', function(){
	surahContainer.classList.remove('scale-up');
	surahContainer.classList.add('scale-down');
	setTimeout(function(){
		overlay.classList.add('hidden');
		surahDetail.innerHTML = '';
		currentSurahData = null;
	}, 500);
});

overlay.addEventListener('click', function(e){
	if(!surahContainer.contains(e.target)){
		surahContainer.classList.remove('scale-up');
		surahContainer.classList.add('scale-down');
		setTimeout(function(){
			overlay.classList.add('hidden');
			surahDetail.innerHTML = '';
			currentSurahData = null;
		}, 500);
	}
});
