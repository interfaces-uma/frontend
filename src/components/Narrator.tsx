export const useNarrator = () => {
	const speak = (text: string) => {
		const narratorEnabled = localStorage.getItem("helpSound") === "true";
		if (!narratorEnabled || !text) return;

		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "es-ES";
		window.speechSynthesis.speak(utterance);
	};

	return { speak };
};
